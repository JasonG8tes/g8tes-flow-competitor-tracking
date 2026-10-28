import type {
  CompetitorChannel,
  Controlled,
  ScrapeScope,
  YesNo,
} from "../register/lists";
import type { RoleCode, StepId } from "../register/addonRegister";

export interface DemoUser {
  id: string;
  displayName: string;
  role: RoleCode;
  dept: RoleCode;
  email: string;
}

export interface HierarchyNode {
  code: string;
  label: string;
  level: "Department" | "Section" | "Category" | "Sub Category";
  parentCode: string | null;
}

export interface AcceptanceRecord {
  mechanismAccepted: YesNo | "";
  acceptedScope: ScrapeScope | "";
  acceptanceNotes: string;
  acceptanceCompleteFlag: Controlled;
  recordedAt: string | null;
}

export interface CompetitionBaseRow {
  id: string;
  competitorCode: string;
  competitorDisplayName: string;
  competitorChannel: CompetitorChannel;
  hierarchyNodeCode: string;
}

export interface LegalAssessment {
  competitorCode: string;
  sourceId: string;
  legalAllowed: YesNo | "";
  legalNotes: string;
  legalAssessedAt: string;
  legalAssessmentCompleteFlag: Controlled;
}

export interface BackgroundAttestation {
  controlId: string;
  stepId: StepId;
  result: "Pass";
  who: string;
  when: string;
}

export interface AuditEvent {
  id: string;
  at: string;
  who: string;
  role: RoleCode;
  stepId: StepId | "SYSTEM";
  action: string;
  detail: string;
}

export interface CamofoxLab {
  /** Lab/test path only. Not a completed parser proof. */
  path: "camofox";
  proofClaimed: false;
  liveScrapeEnabled: false;
  confidence: "LOW";
  endpointHint: string;
  note: string;
}

export interface AppState {
  clientName: string;
  currentUserId: string;
  acceptance: AcceptanceRecord;
  competitionBase: CompetitionBaseRow[];
  competitionBaseCompleteFlag: Controlled;
  legalAssessments: LegalAssessment[];
  attestations: BackgroundAttestation[];
  audit: AuditEvent[];
  camofox: CamofoxLab;
  disabled: boolean;
  disableReason: string;
  lastError: string | null;
}

export type RuleIssue = {
  code: string;
  message: string;
  field?: string;
};

export type RuleResult = { ok: true } | { ok: false; issues: RuleIssue[] };
