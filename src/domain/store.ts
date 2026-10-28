import type { RoleCode, StepId } from "../register/addonRegister";
import { CAMOFOX_LAB, DEMO_BASE_SEED, DEMO_CLIENT, DEMO_USERS } from "./demo";
import {
  defaultSourceId,
  uniqueSources,
  validateAcceptanceDraft,
  validateCompetitionBaseComplete,
  validateCompetitionRow,
  validateLegalDraft,
} from "./rules";
import type {
  AcceptanceRecord,
  AppState,
  AuditEvent,
  BackgroundAttestation,
  CompetitionBaseRow,
  DemoUser,
  LegalAssessment,
} from "./types";

export const STORAGE_KEY = "g8tes-flow-competitor-tracking.v1";

const emptyAcceptance = (): AcceptanceRecord => ({
  mechanismAccepted: "",
  acceptedScope: "",
  acceptanceNotes: "",
  acceptanceCompleteFlag: "Pending",
  recordedAt: null,
});

export function initialState(): AppState {
  return {
    clientName: DEMO_CLIENT,
    currentUserId: "U-S06",
    acceptance: emptyAcceptance(),
    competitionBase: [],
    competitionBaseCompleteFlag: "Pending",
    legalAssessments: [],
    attestations: [],
    audit: [],
    camofox: { ...CAMOFOX_LAB },
    disabled: false,
    disableReason: "",
    lastError: null,
  };
}

export function currentUser(state: AppState): DemoUser {
  return DEMO_USERS.find((u) => u.id === state.currentUserId) ?? DEMO_USERS[5];
}

function uid(): string {
  return crypto.randomUUID();
}

function nowIso(): string {
  return new Date().toISOString();
}

function pushAudit(
  state: AppState,
  stepId: StepId | "SYSTEM",
  action: string,
  detail: string,
): AppState {
  const user = currentUser(state);
  const event: AuditEvent = {
    id: uid(),
    at: nowIso(),
    who: user.displayName,
    role: user.role,
    stepId,
    action,
    detail,
  };
  return { ...state, audit: [...state.audit, event] };
}

function attest(
  state: AppState,
  controlId: string,
  stepId: StepId,
): AppState {
  const user = currentUser(state);
  const row: BackgroundAttestation = {
    controlId,
    stepId,
    result: "Pass",
    who: `${user.displayName} (${user.role})`,
    when: nowIso(),
  };
  return { ...state, attestations: [...state.attestations, row] };
}

export type Action =
  | { type: "switch-user"; userId: string }
  | { type: "reset-demo" }
  | {
      type: "draft-acceptance";
      patch: Partial<
        Pick<
          AcceptanceRecord,
          "mechanismAccepted" | "acceptedScope" | "acceptanceNotes"
        >
      >;
    }
  | { type: "record-acceptance" }
  | { type: "add-base-row"; row: Omit<CompetitionBaseRow, "id"> }
  | { type: "remove-base-row"; id: string }
  | { type: "seed-demo-base" }
  | { type: "complete-base" }
  | { type: "reopen-base" }
  | { type: "draft-legal"; competitorCode: string; patch: Partial<LegalAssessment> }
  | { type: "record-legal"; competitorCode: string }
  | { type: "disable-addon"; reason: string };

export function reduce(state: AppState, action: Action): AppState {
  try {
    return { ...reduceUnsafe(state, action), lastError: null };
  } catch (err) {
    return {
      ...state,
      lastError: err instanceof Error ? err.message : String(err),
    };
  }
}

function reduceUnsafe(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "switch-user":
      return { ...state, currentUserId: action.userId };
    case "reset-demo":
      return initialState();
    case "draft-acceptance":
      return {
        ...state,
        acceptance: { ...state.acceptance, ...action.patch },
      };
    case "record-acceptance": {
      const check = validateAcceptanceDraft(state.acceptance);
      if (!check.ok) {
        throw new Error(check.issues.map((i) => i.message).join(" "));
      }
      let next: AppState = {
        ...state,
        acceptance: {
          ...state.acceptance,
          acceptanceCompleteFlag: "Pass",
          recordedAt: nowIso(),
        },
      };
      next = attest(next, "C-S01", "S-010");
      return pushAudit(
        next,
        "S-010",
        "T-S01 recorded",
        `SF001=${next.acceptance.mechanismAccepted}; SF002=${next.acceptance.acceptedScope}`,
      );
    }
    case "add-base-row": {
      if (state.acceptance.mechanismAccepted !== "Yes") {
        throw new Error("S-020 requires SF001 Mechanism Accepted = Yes.");
      }
      const check = validateCompetitionRow(action.row);
      if (!check.ok) {
        throw new Error(check.issues.map((i) => i.message).join(" "));
      }
      const dup = state.competitionBase.some(
        (r) =>
          r.competitorCode === action.row.competitorCode &&
          r.hierarchyNodeCode === action.row.hierarchyNodeCode,
      );
      if (dup) {
        throw new Error(
          "That competitor is already assigned to this hierarchy node.",
        );
      }
      const row: CompetitionBaseRow = { ...action.row, id: uid() };
      let next: AppState = {
        ...state,
        competitionBase: [...state.competitionBase, row],
        competitionBaseCompleteFlag: "Pending",
        legalAssessments: ensureLegalRows(
          state.legalAssessments,
          [...state.competitionBase, row],
        ),
      };
      return pushAudit(
        next,
        "S-020",
        "Base row added",
        `${row.competitorCode} × ${row.hierarchyNodeCode} × ${row.competitorChannel}`,
      );
    }
    case "remove-base-row": {
      const nextRows = state.competitionBase.filter((r) => r.id !== action.id);
      let next: AppState = {
        ...state,
        competitionBase: nextRows,
        competitionBaseCompleteFlag: "Pending",
        legalAssessments: ensureLegalRows(state.legalAssessments, nextRows),
      };
      return pushAudit(next, "S-020", "Base row removed", action.id);
    }
    case "seed-demo-base": {
      if (state.acceptance.mechanismAccepted !== "Yes") {
        throw new Error("S-020 requires SF001 Mechanism Accepted = Yes.");
      }
      const rows: CompetitionBaseRow[] = DEMO_BASE_SEED.map((r) => ({
        ...r,
        id: uid(),
      }));
      let next: AppState = {
        ...state,
        competitionBase: rows,
        competitionBaseCompleteFlag: "Pending",
        legalAssessments: ensureLegalRows([], rows),
      };
      return pushAudit(
        next,
        "S-020",
        "Demo base seeded",
        `${rows.length} invented competitor × hierarchy × channel rows`,
      );
    }
    case "complete-base": {
      const check = validateCompetitionBaseComplete(state);
      if (!check.ok) {
        throw new Error(check.issues.map((i) => i.message).join(" "));
      }
      let next: AppState = {
        ...state,
        competitionBaseCompleteFlag: "Pass",
        legalAssessments: ensureLegalRows(
          state.legalAssessments,
          state.competitionBase,
        ),
      };
      return pushAudit(
        next,
        "S-020",
        "T-S02 recorded",
        `SF009=Pass; rows=${next.competitionBase.length}`,
      );
    }
    case "reopen-base":
      return pushAudit(
        { ...state, competitionBaseCompleteFlag: "Pending" },
        "S-020",
        "Base reopened",
        "SF009 set to Pending",
      );
    case "draft-legal": {
      const legalAssessments = state.legalAssessments.map((a) =>
        a.competitorCode === action.competitorCode
          ? { ...a, ...action.patch, legalAssessmentCompleteFlag: "Pending" as const }
          : a,
      );
      return { ...state, legalAssessments };
    }
    case "record-legal": {
      const draft = state.legalAssessments.find(
        (a) => a.competitorCode === action.competitorCode,
      );
      if (!draft) throw new Error("No legal row for that competitor.");
      const check = validateLegalDraft(draft);
      if (!check.ok) {
        throw new Error(check.issues.map((i) => i.message).join(" "));
      }
      const legalAssessments = state.legalAssessments.map((a) =>
        a.competitorCode === action.competitorCode
          ? { ...a, legalAssessmentCompleteFlag: "Pass" as const }
          : a,
      );
      let next: AppState = { ...state, legalAssessments };
      next = attest(next, "C-S03", "S-040");
      return pushAudit(
        next,
        "S-040",
        "T-S04 recorded",
        `${draft.sourceId} SF017=${draft.legalAllowed}`,
      );
    }
    case "disable-addon": {
      if (!action.reason.trim()) {
        throw new Error("SF040 Disable Reason is mandatory.");
      }
      let next: AppState = {
        ...state,
        disabled: true,
        disableReason: action.reason.trim(),
      };
      next = attest(next, "C-S09", "S-100");
      return pushAudit(next, "S-100", "T-S10 recorded", action.reason.trim());
    }
    default:
      return state;
  }
}

function ensureLegalRows(
  existing: LegalAssessment[],
  rows: CompetitionBaseRow[],
): LegalAssessment[] {
  const sources = uniqueSources(rows);
  return sources.map((source) => {
    const prior = existing.find((a) => a.competitorCode === source.competitorCode);
    if (prior) return prior;
    return {
      competitorCode: source.competitorCode,
      sourceId: defaultSourceId(source.competitorCode),
      legalAllowed: "",
      legalNotes: "",
      legalAssessedAt: "",
      legalAssessmentCompleteFlag: "Pending",
    };
  });
}

export function persist(state: AppState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function hydrate(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState();
    const parsed = JSON.parse(raw) as AppState;
    if (!parsed.acceptance || !parsed.camofox) return initialState();
    return {
      ...initialState(),
      ...parsed,
      camofox: { ...CAMOFOX_LAB },
    };
  } catch {
    return initialState();
  }
}

export function actorRole(state: AppState): RoleCode {
  return currentUser(state).role;
}
