import {
  channelsRequiredByScope,
  type RoleCode,
  type StepId,
} from "../register/addonRegister";
import type { CompetitorChannel, ScrapeScope } from "../register/lists";
import { DEMO_HIERARCHY, FORBIDDEN_COMPETITOR_NAMES } from "./demo";
import type {
  AcceptanceRecord,
  AppState,
  CompetitionBaseRow,
  LegalAssessment,
  RuleIssue,
  RuleResult,
} from "./types";

const DEMO_NAME = /^Demo\s+\S/;
const COMP_CODE = /^COMP-[A-Z0-9]+(?:-[A-Z0-9]+)*$/;
const SRC_ID = /^SRC-[A-Z0-9-]+$/;

export const LIVE_SCRAPE_ENABLED = false;

export function issues(...items: Array<RuleIssue | null>): RuleResult {
  const found = items.filter((i): i is RuleIssue => i !== null);
  return found.length ? { ok: false, issues: found } : { ok: true };
}

export function mechanismAccepted(state: AppState): boolean {
  return (
    state.acceptance.mechanismAccepted === "Yes" &&
    state.acceptance.acceptanceCompleteFlag === "Pass"
  );
}

export function canWriteStep(role: RoleCode, stepId: StepId): boolean {
  const owner: Record<StepId, RoleCode> = {
    "S-010": "LD",
    "S-020": "CM",
    "S-030": "CM",
    "S-040": "LG",
    "S-050": "IT",
    "S-060": "IT",
    "S-070": "CM",
    "S-080": "CM",
    "S-090": "IT",
    "S-100": "LD",
  };
  return role === owner[stepId];
}

function missing(field: string, message: string): RuleIssue {
  return { code: "MISSING_CAPTURE", field, message };
}

export function validateAcceptanceDraft(
  draft: Pick<
    AcceptanceRecord,
    "mechanismAccepted" | "acceptedScope" | "acceptanceNotes"
  >,
): RuleResult {
  const notesOnly =
    draft.acceptanceNotes.trim().length > 0 &&
    draft.mechanismAccepted === "" &&
    draft.acceptedScope === "";
  if (notesOnly) {
    return issues({
      code: "COMMENT_ONLY",
      field: "SF003",
      message:
        "Comment-only completion is rejected. Record SF001 Mechanism Accepted and SF002 Accepted Scope.",
    });
  }
  return issues(
    draft.mechanismAccepted === ""
      ? missing("SF001", "SF001 Mechanism Accepted is required (Yes or No).")
      : null,
    draft.acceptedScope === ""
      ? missing("SF002", "SF002 Accepted Scope is required (store / online / both).")
      : null,
  );
}

export function validateCompetitorLabel(
  code: string,
  displayName: string,
): RuleResult {
  const trimmedCode = code.trim();
  const trimmedName = displayName.trim();
  return issues(
    !COMP_CODE.test(trimmedCode)
      ? {
          code: "BAD_CODE",
          field: "SF005",
          message:
            "SF005 Competitor Code must look like COMP-STORE-A (invented demo codes only).",
        }
      : null,
    !DEMO_NAME.test(trimmedName)
      ? {
          code: "BAD_NAME",
          field: "SF006",
          message:
            "SF006 Display Name must start with “Demo ” (invented demo competitors only).",
        }
      : null,
    FORBIDDEN_COMPETITOR_NAMES.some((n) =>
      trimmedName.toLowerCase().includes(n),
    )
      ? {
          code: "REAL_NAME",
          field: "SF006",
          message:
            "Real partner / marketplace names are not allowed in demo data.",
        }
      : null,
  );
}

export function validateCompetitionRow(
  row: Omit<CompetitionBaseRow, "id">,
): RuleResult {
  const label = validateCompetitorLabel(
    row.competitorCode,
    row.competitorDisplayName,
  );
  const nodeOk = DEMO_HIERARCHY.some((n) => n.code === row.hierarchyNodeCode);
  return issues(
    ...(label.ok ? [] : label.issues),
    !row.competitorChannel
      ? missing("SF007", "SF007 Competitor Channel is required (store or online).")
      : null,
    !row.hierarchyNodeCode
      ? missing("SF008", "SF008 Hierarchy Node Code is required.")
      : null,
    row.hierarchyNodeCode && !nodeOk
      ? {
          code: "UNKNOWN_NODE",
          field: "SF008",
          message: `Unknown hierarchy node ${row.hierarchyNodeCode}.`,
        }
      : null,
  );
}

export function validateCompetitionBaseComplete(
  state: AppState,
): RuleResult {
  if (!mechanismAccepted(state)) {
    return issues({
      code: "ACCEPTANCE_REQUIRED",
      field: "SF001",
      message: "S-020 requires SF001 Mechanism Accepted = Yes (CARRY from S-010).",
    });
  }
  if (state.competitionBase.length === 0) {
    return issues({
      code: "EMPTY_BASE",
      message:
        "Competition base needs at least one competitor × hierarchy × channel row.",
    });
  }
  const rowIssues: RuleIssue[] = [];
  for (const row of state.competitionBase) {
    const r = validateCompetitionRow(row);
    if (!r.ok) rowIssues.push(...r.issues);
  }
  const scope = state.acceptance.acceptedScope as ScrapeScope;
  const needed = channelsRequiredByScope(scope);
  const present = new Set(state.competitionBase.map((r) => r.competitorChannel));
  for (const ch of needed) {
    if (!present.has(ch)) {
      rowIssues.push({
        code: "SCOPE_GAP",
        field: "SF007",
        message: `Accepted scope “${scope}” requires at least one ${ch} competitor row.`,
      });
    }
  }
  return rowIssues.length ? { ok: false, issues: rowIssues } : { ok: true };
}

export function uniqueSources(rows: CompetitionBaseRow[]): Array<{
  competitorCode: string;
  channel: CompetitorChannel;
  displayName: string;
}> {
  const map = new Map<
    string,
    { competitorCode: string; channel: CompetitorChannel; displayName: string }
  >();
  for (const row of rows) {
    map.set(row.competitorCode, {
      competitorCode: row.competitorCode,
      channel: row.competitorChannel,
      displayName: row.competitorDisplayName,
    });
  }
  return [...map.values()];
}

export function defaultSourceId(competitorCode: string): string {
  return `SRC-${competitorCode}`;
}

export function validateLegalDraft(draft: LegalAssessment): RuleResult {
  return issues(
    !draft.sourceId.trim()
      ? missing("SF016", "SF016 Source ID is required.")
      : !SRC_ID.test(draft.sourceId.trim())
        ? {
            code: "BAD_SOURCE",
            field: "SF016",
            message: "SF016 Source ID should look like SRC-COMP-STORE-A.",
          }
        : null,
    draft.legalAllowed === ""
      ? missing(
          "SF017",
          "SF017 Legal Allowed must be recorded as Yes or No. Do not leave blank. Do not invent a verdict.",
        )
      : null,
    !draft.legalAssessedAt
      ? missing("SF019", "SF019 Legal Assessed At is required.")
      : null,
  );
}

export type ScrapeBlockReason = {
  control: string;
  message: string;
};

/**
 * C-S02 / C-S04 / live-scrape hard stop.
 * Live runs stay off even if a human later records Legal Allowed = Yes —
 * this slice does not enable a live scraper. Camofox remains lab scaffold.
 */
export function scrapeStartBlocks(
  state: AppState,
  channel: CompetitorChannel,
  clientInternetDeclared: boolean,
): ScrapeBlockReason[] {
  const blocks: ScrapeBlockReason[] = [];
  if (!mechanismAccepted(state)) {
    blocks.push({
      control: "C-S04",
      message: "Acceptance missing — SF001 must be Yes before any scrape.",
    });
  }
  const scope = state.acceptance.acceptedScope;
  if (scope && scope !== "both" && scope !== channel) {
    blocks.push({
      control: "C-S04",
      message: `Accepted scope is ${scope}; ${channel} scrape is out of scope.`,
    });
  }
  const sources = uniqueSources(state.competitionBase).filter(
    (s) => s.channel === channel,
  );
  if (sources.length === 0) {
    blocks.push({
      control: "C-S04",
      message: `No ${channel} sources in the competition base.`,
    });
  }
  for (const source of sources) {
    const assessment = state.legalAssessments.find(
      (a) => a.competitorCode === source.competitorCode,
    );
    if (!assessment || assessment.legalAllowed !== "Yes") {
      blocks.push({
        control: "C-S02",
        message: `${source.competitorCode}: S-040 Legal Allowed ≠ Yes. Scrape blocked. Do not invent a verdict.`,
      });
    }
  }
  if (!clientInternetDeclared) {
    blocks.push({
      control: "C-S04",
      message: "SF027 Client Internet Declared must be Yes (client-side connection).",
    });
  }
  if (!LIVE_SCRAPE_ENABLED || !state.camofox.liveScrapeEnabled) {
    blocks.push({
      control: "LIVE_SCRAPE_OFF",
      message:
        "Live scrape runs are not enabled. Camofox is the lab/test path (Confidence LOW — no parser proof).",
    });
  }
  return blocks;
}

export function stepStatus(
  state: AppState,
  stepId: StepId,
): "done" | "ready" | "blocked" | "scaffold" {
  if (state.disabled && stepId !== "S-100") return "blocked";
  switch (stepId) {
    case "S-010":
      return state.acceptance.acceptanceCompleteFlag === "Pass"
        ? "done"
        : "ready";
    case "S-020":
      if (!mechanismAccepted(state)) return "blocked";
      return state.competitionBaseCompleteFlag === "Pass" ? "done" : "ready";
    case "S-040":
      if (state.competitionBaseCompleteFlag !== "Pass") return "blocked";
      if (state.legalAssessments.some((a) => a.legalAssessmentCompleteFlag === "Pass"))
        return "done";
      return "ready";
    case "S-050":
    case "S-060":
      return "scaffold";
    case "S-030":
    case "S-070":
    case "S-080":
    case "S-090":
      return "scaffold";
    case "S-100":
      return state.disabled ? "done" : "ready";
    default:
      return "scaffold";
  }
}

export function hierarchyLabel(code: string): string {
  return DEMO_HIERARCHY.find((n) => n.code === code)?.label ?? code;
}

export function hierarchyPath(code: string): string {
  const parts: string[] = [];
  let current = DEMO_HIERARCHY.find((n) => n.code === code) ?? null;
  while (current) {
    parts.unshift(`${current.level}: ${current.label}`);
    current = current.parentCode
      ? (DEMO_HIERARCHY.find((n) => n.code === current!.parentCode) ?? null)
      : null;
  }
  return parts.join(" → ");
}
