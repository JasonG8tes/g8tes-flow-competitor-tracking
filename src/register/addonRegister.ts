/**
 * Source of truth: flow_AddOn_Competitive_Price_Scraping_Register.xlsx v0.3.1 DRAFT.
 * Fields, steps, and controls are copied from the register — not invented.
 */
import type { CompetitorChannel, ScrapeScope } from "./lists";

export const REGISTER_VERSION = "v0.3.1 DRAFT";
export const PRODUCT_NAME = "Competitive Price Scraping";
export const PRODUCT_HOME = "flow";
export const REPO = "JasonG8tes/g8tes-flow-competitor-tracking";

export type FieldMode = "CAPTURE" | "CARRY" | "CALC";
export type Confidence = "HIGH" | "MED" | "LOW";
export type InputControl =
  | "DROPDOWN"
  | "TEXT"
  | "DATE"
  | "NUMBER"
  | "CALCULATED";

export type StepId =
  | "S-010"
  | "S-020"
  | "S-030"
  | "S-040"
  | "S-050"
  | "S-060"
  | "S-070"
  | "S-080"
  | "S-090"
  | "S-100";

export type DfCode =
  | "SF001"
  | "SF002"
  | "SF003"
  | "SF004"
  | "SF005"
  | "SF006"
  | "SF007"
  | "SF008"
  | "SF009"
  | "SF010"
  | "SF011"
  | "SF012"
  | "SF013"
  | "SF014"
  | "SF015"
  | "SF016"
  | "SF017"
  | "SF018"
  | "SF019"
  | "SF020"
  | "SF021"
  | "SF022"
  | "SF023"
  | "SF024"
  | "SF025"
  | "SF026"
  | "SF027"
  | "SF028"
  | "SF029"
  | "SF030"
  | "SF031"
  | "SF032"
  | "SF033"
  | "SF034"
  | "SF035"
  | "SF036"
  | "SF037"
  | "SF038"
  | "SF039"
  | "SF040"
  | "SF041"
  | "SF042";

export type RoleCode = "LD" | "CM" | "CG" | "IT" | "LG" | "PM";

export interface ProcessStep {
  id: StepId;
  phaseBlock: string;
  phase: string;
  name: string;
  ownerRole: RoleCode;
  ownerDept: RoleCode;
  slaDays: number;
  input: string;
  output: string;
  decisionPoint: string;
  artifact: string;
  notes: string;
  grouping: string;
  confidence: Confidence;
  firstSlice: boolean;
}

export interface FieldDef {
  code: DfCode;
  label: string;
  origin: StepId;
  type: "CORE" | "UNIQUE";
  control: InputControl;
  sourceList: string;
  capturedBy: RoleCode;
  notes: string;
}

export interface StepField {
  stepId: StepId;
  df: DfCode;
  mode: FieldMode;
  mandatory: boolean;
  editable: boolean;
  control: InputControl;
  sourceList: string;
}

export interface ControlDef {
  id: string;
  step: string;
  type: string;
  what: string;
}

export const STEPS: ProcessStep[] = [
  {
    id: "S-010",
    phaseBlock: "B1",
    phase: "1. Enable",
    name: "Client Accepts Scraping Mechanism",
    ownerRole: "LD",
    ownerDept: "LD",
    slaDays: 5,
    input:
      "Add-on commercial offer + mechanism summary (no LLM to client; client internet)",
    output: "Acceptance record: Yes/No + scope (store / omni / both)",
    decisionPoint:
      "Yes - Client accepted scraping mechanism for scoped channels",
    artifact: "T-S01",
    notes:
      "Optional Flow add-on if client accepts. Confidence MED on commercial packaging. Background attest on CTA.",
    grouping: "CLIENT",
    confidence: "MED",
    firstSlice: true,
  },
  {
    id: "S-020",
    phaseBlock: "B2",
    phase: "1. Enable",
    name: "Competition Base Setup",
    ownerRole: "CM",
    ownerDept: "CM",
    slaDays: 5,
    input: "Acceptance Yes + hierarchy from flow",
    output: "Competitor list × hierarchy × channel (store vs online)",
    decisionPoint: "Yes - Competition base complete for scoped hierarchy",
    artifact: "T-S02",
    notes:
      "Client-defined competitors. Demo labels only — never real partner names.",
    grouping: "HIERARCHY / CHANNEL",
    confidence: "HIGH",
    firstSlice: true,
  },
  {
    id: "S-030",
    phaseBlock: "B3",
    phase: "2. Matching",
    name: "Product Matching Table",
    ownerRole: "CM",
    ownerDept: "CM",
    slaDays: 10,
    input: "Competition base + client SKU list (invented)",
    output:
      "Match table: client SKU ↔ competitor URL/barcode/product id + match confidence",
    decisionPoint:
      "Yes - Match table complete for in-scope SKUs OR deferred set recorded",
    artifact: "T-S03",
    notes: "Matching rules Confidence LOW (lab). Not in first slice.",
    grouping: "SKU",
    confidence: "LOW",
    firstSlice: false,
  },
  {
    id: "S-040",
    phaseBlock: "B4",
    phase: "2. Matching",
    name: "Legal / ToS Assessment Gate per Source",
    ownerRole: "LG",
    ownerDept: "LG",
    slaDays: 10,
    input: "Competitor/source list from S-020",
    output: "Per-source legal assessment: Allowed Yes/No + notes + assessed_at",
    decisionPoint:
      "Yes - Every in-scope source assessed; scrape blocked if any required source = No",
    artifact: "T-S04",
    notes:
      "UAE/ToS research open — Confidence LOW. Do not invent legal conclusions. Hard gate: block S-050/S-060 until Yes for that source.",
    grouping: "SOURCE",
    confidence: "LOW",
    firstSlice: false,
  },
  {
    id: "S-050",
    phaseBlock: "B5",
    phase: "3. Scrape Runs",
    name: "Store Competitor Scrape Run",
    ownerRole: "IT",
    ownerDept: "IT",
    slaDays: 2,
    input: "Accepted sources (store channel) + match table + client internet",
    output: "Scrape result rows: timestamp, source, price, promo flag, raw ref",
    decisionPoint:
      "Yes - Store scrape run completed or failed with structured health code",
    artifact: "T-S05",
    notes:
      "Client-side internet; no LLM to client. Parser method Confidence LOW. Lab/test path = Camofox. Scaffold only — no live scrape, no proof claim.",
    grouping: "SOURCE / SKU",
    confidence: "LOW",
    firstSlice: false,
  },
  {
    id: "S-060",
    phaseBlock: "B6",
    phase: "3. Scrape Runs",
    name: "Omni / Online Scrape Run",
    ownerRole: "IT",
    ownerDept: "IT",
    slaDays: 2,
    input: "Accepted online sources + match table + client internet",
    output: "Online scrape result rows (separate mode/tool from store)",
    decisionPoint:
      "Yes - Omni scrape run completed or failed with structured health code",
    artifact: "T-S06",
    notes:
      "Separate tool/mode from store scraper. Parser Confidence LOW. Lab/test path = Camofox. Scaffold only.",
    grouping: "SOURCE / SKU",
    confidence: "LOW",
    firstSlice: false,
  },
  {
    id: "S-070",
    phaseBlock: "B7",
    phase: "4. Index & Act",
    name: "Price Index Publish",
    ownerRole: "CM",
    ownerDept: "CM",
    slaDays: 2,
    input:
      "Latest scrape results + client RSP (from promo DF039 when promo enabled, or Flow RSP field)",
    output: "Price index: Competitive / At par / Not competitive vs reference RSP",
    decisionPoint: "Yes - Index published for in-scope SKUs",
    artifact: "T-S07",
    notes: "At-par band thresholds Confidence LOW — do not invent hard formula.",
    grouping: "SKU",
    confidence: "LOW",
    firstSlice: false,
  },
  {
    id: "S-080",
    phaseBlock: "B8",
    phase: "4. Index & Act",
    name: "Match-Quality Human Confirm",
    ownerRole: "CM",
    ownerDept: "CM",
    slaDays: 5,
    input: "Matches flagged low-confidence from S-030 or scrape",
    output: "Human confirm/reject/rematch for each flagged match",
    decisionPoint:
      "Yes - All low-confidence flags resolved or explicitly deferred",
    artifact: "T-S08",
    notes: "Human decides. Match scoring Confidence LOW.",
    grouping: "SKU",
    confidence: "MED",
    firstSlice: false,
  },
  {
    id: "S-090",
    phaseBlock: "B9",
    phase: "5. Health",
    name: "Scrape Health / Parser-Break Alert",
    ownerRole: "IT",
    ownerDept: "IT",
    slaDays: 1,
    input: "Scrape run outcomes + parser health signals",
    output: "Health record: OK / Parser break / Source blocked + alert sent flag",
    decisionPoint: "Yes - Health state recorded; break opens remediation task",
    artifact: "T-S09",
    notes: "Alerting = notification helper, not sold AI agent.",
    grouping: "SOURCE",
    confidence: "MED",
    firstSlice: false,
  },
  {
    id: "S-100",
    phaseBlock: "B10",
    phase: "5. Health",
    name: "Disable / Revoke Add-on",
    ownerRole: "LD",
    ownerDept: "LD",
    slaDays: 3,
    input: "Client request or legal withdrawal",
    output: "Add-on disabled; scrape schedules stopped; FF068/flow flag cleared",
    decisionPoint: "Yes - Add-on disabled and schedules stopped",
    artifact: "T-S10",
    notes: "Retention of historical scrape data Confidence LOW.",
    grouping: "CLIENT",
    confidence: "MED",
    firstSlice: false,
  },
];

export const FIELDS: FieldDef[] = [
  { code: "SF001", label: "Mechanism Accepted", origin: "S-010", type: "CORE", control: "DROPDOWN", sourceList: "List_YesNo", capturedBy: "LD", notes: "" },
  { code: "SF002", label: "Accepted Scope", origin: "S-010", type: "CORE", control: "DROPDOWN", sourceList: "List_ScrapeScope", capturedBy: "LD", notes: "store|online|both" },
  { code: "SF003", label: "Acceptance Notes", origin: "S-010", type: "CORE", control: "TEXT", sourceList: "", capturedBy: "LD", notes: "Optional" },
  { code: "SF004", label: "Acceptance Complete Flag", origin: "S-010", type: "UNIQUE", control: "DROPDOWN", sourceList: "List_Controlled", capturedBy: "LD", notes: "Background" },
  { code: "SF005", label: "Competitor Code", origin: "S-020", type: "CORE", control: "TEXT", sourceList: "", capturedBy: "CM", notes: "Invented e.g. COMP-STORE-A" },
  { code: "SF006", label: "Competitor Display Name", origin: "S-020", type: "CORE", control: "TEXT", sourceList: "", capturedBy: "CM", notes: "Demo Competitor Store A — never real partner names" },
  { code: "SF007", label: "Competitor Channel", origin: "S-020", type: "CORE", control: "DROPDOWN", sourceList: "List_CompetitorChannels", capturedBy: "CM", notes: "store|online" },
  { code: "SF008", label: "Hierarchy Node Code", origin: "S-020", type: "CORE", control: "TEXT", sourceList: "", capturedBy: "CM", notes: "From flow hierarchy — invented" },
  { code: "SF009", label: "Competition Base Complete Flag", origin: "S-020", type: "UNIQUE", control: "DROPDOWN", sourceList: "List_Controlled", capturedBy: "CM", notes: "" },
  { code: "SF010", label: "Client SKU Code", origin: "S-030", type: "CORE", control: "TEXT", sourceList: "", capturedBy: "CM", notes: "Invented SKUs" },
  { code: "SF011", label: "Competitor Product Key", origin: "S-030", type: "CORE", control: "TEXT", sourceList: "", capturedBy: "CM", notes: "URL or barcode or id" },
  { code: "SF012", label: "Competitor Product URL", origin: "S-030", type: "CORE", control: "TEXT", sourceList: "", capturedBy: "CM", notes: "Optional if barcode" },
  { code: "SF013", label: "Competitor Barcode", origin: "S-030", type: "CORE", control: "TEXT", sourceList: "", capturedBy: "CM", notes: "Optional if URL" },
  { code: "SF014", label: "Match Confidence", origin: "S-030", type: "CORE", control: "DROPDOWN", sourceList: "List_MatchConfidence", capturedBy: "CM", notes: "Rules Confidence LOW" },
  { code: "SF015", label: "Match Table Complete Flag", origin: "S-030", type: "UNIQUE", control: "DROPDOWN", sourceList: "List_Controlled", capturedBy: "CM", notes: "" },
  { code: "SF016", label: "Source ID", origin: "S-040", type: "CORE", control: "TEXT", sourceList: "", capturedBy: "LG", notes: "Links to competitor/source" },
  { code: "SF017", label: "Legal Allowed", origin: "S-040", type: "CORE", control: "DROPDOWN", sourceList: "List_YesNo", capturedBy: "LG", notes: "Hard gate — do not invent" },
  { code: "SF018", label: "Legal Notes", origin: "S-040", type: "CORE", control: "TEXT", sourceList: "", capturedBy: "LG", notes: "Do not invent legal conclusions" },
  { code: "SF019", label: "Legal Assessed At", origin: "S-040", type: "CORE", control: "DATE", sourceList: "", capturedBy: "LG", notes: "" },
  { code: "SF020", label: "Legal Assessment Complete Flag", origin: "S-040", type: "UNIQUE", control: "DROPDOWN", sourceList: "List_Controlled", capturedBy: "LG", notes: "Background" },
  { code: "SF021", label: "Scrape Run ID", origin: "S-050", type: "CORE", control: "TEXT", sourceList: "", capturedBy: "IT", notes: "" },
  { code: "SF022", label: "Scrape Channel Mode", origin: "S-050", type: "CORE", control: "DROPDOWN", sourceList: "List_CompetitorChannels", capturedBy: "IT", notes: "" },
  { code: "SF023", label: "Scrape Timestamp", origin: "S-050", type: "CORE", control: "DATE", sourceList: "", capturedBy: "IT", notes: "" },
  { code: "SF024", label: "Scraped Price", origin: "S-050", type: "CORE", control: "NUMBER", sourceList: "", capturedBy: "IT", notes: "" },
  { code: "SF025", label: "Competitor Promo Flag", origin: "S-050", type: "CORE", control: "DROPDOWN", sourceList: "List_YesNo", capturedBy: "IT", notes: "" },
  { code: "SF026", label: "Scrape Outcome Code", origin: "S-050", type: "CORE", control: "DROPDOWN", sourceList: "List_ScrapeOutcomes", capturedBy: "IT", notes: "" },
  { code: "SF027", label: "Client Internet Declared", origin: "S-050", type: "CORE", control: "DROPDOWN", sourceList: "List_YesNo", capturedBy: "IT", notes: "Must be Yes" },
  { code: "SF028", label: "Store Scrape Complete Flag", origin: "S-050", type: "UNIQUE", control: "DROPDOWN", sourceList: "List_Controlled", capturedBy: "IT", notes: "" },
  { code: "SF029", label: "Omni Scrape Complete Flag", origin: "S-060", type: "UNIQUE", control: "DROPDOWN", sourceList: "List_Controlled", capturedBy: "IT", notes: "" },
  { code: "SF030", label: "Reference RSP", origin: "S-070", type: "CORE", control: "NUMBER", sourceList: "", capturedBy: "CM", notes: "Source Confidence LOW" },
  { code: "SF031", label: "Competitor Min Price", origin: "S-070", type: "CORE", control: "CALCULATED", sourceList: "", capturedBy: "CM", notes: "" },
  { code: "SF032", label: "Competitor Avg Price", origin: "S-070", type: "CORE", control: "CALCULATED", sourceList: "", capturedBy: "CM", notes: "" },
  { code: "SF033", label: "Price Index Flag", origin: "S-070", type: "CORE", control: "DROPDOWN", sourceList: "List_PriceIndexFlags", capturedBy: "CM", notes: "Band Confidence LOW" },
  { code: "SF034", label: "Index Published Flag", origin: "S-070", type: "UNIQUE", control: "DROPDOWN", sourceList: "List_Controlled", capturedBy: "CM", notes: "" },
  { code: "SF035", label: "Match Confirm Decision", origin: "S-080", type: "CORE", control: "DROPDOWN", sourceList: "List_MatchDecisions", capturedBy: "CM", notes: "" },
  { code: "SF036", label: "Match Confirm Complete Flag", origin: "S-080", type: "UNIQUE", control: "DROPDOWN", sourceList: "List_Controlled", capturedBy: "CM", notes: "" },
  { code: "SF037", label: "Health State", origin: "S-090", type: "CORE", control: "DROPDOWN", sourceList: "List_HealthStates", capturedBy: "IT", notes: "" },
  { code: "SF038", label: "Alert Sent Flag", origin: "S-090", type: "CORE", control: "DROPDOWN", sourceList: "List_YesNo", capturedBy: "IT", notes: "" },
  { code: "SF039", label: "Health Record Complete Flag", origin: "S-090", type: "UNIQUE", control: "DROPDOWN", sourceList: "List_Controlled", capturedBy: "IT", notes: "" },
  { code: "SF040", label: "Disable Reason", origin: "S-100", type: "CORE", control: "TEXT", sourceList: "", capturedBy: "LD", notes: "Mandatory" },
  { code: "SF041", label: "Schedules Stopped Flag", origin: "S-100", type: "CORE", control: "DROPDOWN", sourceList: "List_YesNo", capturedBy: "IT", notes: "" },
  { code: "SF042", label: "Disable Complete Flag", origin: "S-100", type: "UNIQUE", control: "DROPDOWN", sourceList: "List_Controlled", capturedBy: "LD", notes: "Clears flow FF068" },
];

export const STEP_FIELDS: StepField[] = [
  { stepId: "S-010", df: "SF001", mode: "CAPTURE", mandatory: true, editable: true, control: "DROPDOWN", sourceList: "List_YesNo" },
  { stepId: "S-010", df: "SF002", mode: "CAPTURE", mandatory: true, editable: true, control: "DROPDOWN", sourceList: "List_ScrapeScope" },
  { stepId: "S-010", df: "SF003", mode: "CAPTURE", mandatory: false, editable: true, control: "TEXT", sourceList: "" },
  { stepId: "S-010", df: "SF004", mode: "CAPTURE", mandatory: true, editable: true, control: "DROPDOWN", sourceList: "List_Controlled" },
  { stepId: "S-020", df: "SF001", mode: "CARRY", mandatory: false, editable: false, control: "DROPDOWN", sourceList: "List_YesNo" },
  { stepId: "S-020", df: "SF005", mode: "CAPTURE", mandatory: true, editable: true, control: "TEXT", sourceList: "" },
  { stepId: "S-020", df: "SF006", mode: "CAPTURE", mandatory: true, editable: true, control: "TEXT", sourceList: "" },
  { stepId: "S-020", df: "SF007", mode: "CAPTURE", mandatory: true, editable: true, control: "DROPDOWN", sourceList: "List_CompetitorChannels" },
  { stepId: "S-020", df: "SF008", mode: "CAPTURE", mandatory: true, editable: true, control: "TEXT", sourceList: "" },
  { stepId: "S-020", df: "SF009", mode: "CAPTURE", mandatory: true, editable: true, control: "DROPDOWN", sourceList: "List_Controlled" },
  { stepId: "S-040", df: "SF005", mode: "CARRY", mandatory: false, editable: false, control: "TEXT", sourceList: "" },
  { stepId: "S-040", df: "SF016", mode: "CAPTURE", mandatory: true, editable: true, control: "TEXT", sourceList: "" },
  { stepId: "S-040", df: "SF017", mode: "CAPTURE", mandatory: true, editable: true, control: "DROPDOWN", sourceList: "List_YesNo" },
  { stepId: "S-040", df: "SF018", mode: "CAPTURE", mandatory: false, editable: true, control: "TEXT", sourceList: "" },
  { stepId: "S-040", df: "SF019", mode: "CAPTURE", mandatory: true, editable: true, control: "DATE", sourceList: "" },
  { stepId: "S-040", df: "SF020", mode: "CAPTURE", mandatory: true, editable: true, control: "DROPDOWN", sourceList: "List_Controlled" },
  { stepId: "S-050", df: "SF017", mode: "CARRY", mandatory: false, editable: false, control: "TEXT", sourceList: "" },
  { stepId: "S-050", df: "SF002", mode: "CARRY", mandatory: false, editable: false, control: "TEXT", sourceList: "" },
  { stepId: "S-050", df: "SF027", mode: "CAPTURE", mandatory: true, editable: true, control: "DROPDOWN", sourceList: "List_YesNo" },
  { stepId: "S-060", df: "SF017", mode: "CARRY", mandatory: false, editable: false, control: "TEXT", sourceList: "" },
  { stepId: "S-060", df: "SF027", mode: "CAPTURE", mandatory: true, editable: true, control: "DROPDOWN", sourceList: "List_YesNo" },
];

export const CONTROLS: ControlDef[] = [
  { id: "C-01", step: "ALL", type: "IMMUTABLE_TRAIL", what: "Insert-only audit trail" },
  { id: "C-02", step: "ALL", type: "SEPARATION_OF_DUTIES", what: "Legal assessor ≠ sole scrape operator where practical" },
  { id: "C-03", step: "ALL", type: "ROLE_SCOPED_WRITE", what: "Owner-role write only" },
  { id: "C-07", step: "ALL", type: "CARRY_FORWARD_READONLY", what: "CAPTURE once → CARRY downstream" },
  { id: "C-S01", step: "S-010", type: "BACKGROUND_ATTEST", what: "On CTA success write Pass+who/when for mechanism acceptance." },
  { id: "C-S02", step: "S-040", type: "VALIDATION", what: "Block S-050/S-060 for any source where Allowed ≠ Yes." },
  { id: "C-S03", step: "S-040", type: "BACKGROUND_ATTEST", what: "On CTA success write Pass+who/when per source assessment." },
  { id: "C-S04", step: "S-050,S-060", type: "VALIDATION", what: "Refuse scrape start if acceptance missing OR source not Allowed OR no client-internet declaration." },
  { id: "C-S05", step: "S-050,S-060", type: "VALIDATION", what: "No free-text done — structured result or structured failure code required." },
  { id: "C-S10", step: "ALL", type: "NO_LLM_TO_CLIENT", what: "Add-on must not ship an LLM to the client; parsers/browser automation only." },
];

export const ROLE_NAMES: Record<RoleCode, string> = {
  LD: "Leadership",
  CM: "Commercial / Buying",
  CG: "Category",
  IT: "IT / Client Admin",
  LG: "Legal / Compliance",
  PM: "Project Management",
};

export function stepById(id: StepId): ProcessStep {
  const step = STEPS.find((s) => s.id === id);
  if (!step) throw new Error(`Unknown step ${id}`);
  return step;
}

export function fieldByCode(code: DfCode): FieldDef {
  const field = FIELDS.find((f) => f.code === code);
  if (!field) throw new Error(`Unknown field ${code}`);
  return field;
}

export function fieldsForStep(id: StepId): StepField[] {
  return STEP_FIELDS.filter((f) => f.stepId === id);
}

export function channelsRequiredByScope(scope: ScrapeScope): CompetitorChannel[] {
  if (scope === "both") return ["store", "online"];
  return [scope];
}
