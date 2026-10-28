/** Controlled lists from the add-on register (v0.3.1). Do not invent extra values. */

export const YES_NO = ["Yes", "No"] as const;
export type YesNo = (typeof YES_NO)[number];

export const CONTROLLED = ["Pass", "Fail", "Pending"] as const;
export type Controlled = (typeof CONTROLLED)[number];

export const SCRAPE_SCOPES = ["store", "online", "both"] as const;
export type ScrapeScope = (typeof SCRAPE_SCOPES)[number];

export const COMPETITOR_CHANNELS = ["store", "online"] as const;
export type CompetitorChannel = (typeof COMPETITOR_CHANNELS)[number];

export const MATCH_CONFIDENCE = ["High", "Med", "Low"] as const;
export type MatchConfidence = (typeof MATCH_CONFIDENCE)[number];

export const SCRAPE_OUTCOMES = [
  "Success",
  "Fail_Parser",
  "Fail_Network",
  "Fail_Blocked",
] as const;
export type ScrapeOutcome = (typeof SCRAPE_OUTCOMES)[number];

export const PRICE_INDEX_FLAGS = [
  "Competitive",
  "At_par",
  "Not_competitive",
] as const;
export type PriceIndexFlag = (typeof PRICE_INDEX_FLAGS)[number];

export const MATCH_DECISIONS = ["Confirm", "Reject", "Rematch", "Defer"] as const;
export type MatchDecision = (typeof MATCH_DECISIONS)[number];

export const HEALTH_STATES = ["OK", "Parser_Break", "Source_Blocked"] as const;
export type HealthState = (typeof HEALTH_STATES)[number];

export const LIST_LABELS = {
  Yes: "Yes",
  No: "No",
  Pass: "Pass",
  Fail: "Fail",
  Pending: "Pending",
  store: "Store",
  online: "Online / omni",
  both: "Store and online",
  High: "High",
  Med: "Med",
  Low: "Low",
  Success: "Success",
  Fail_Parser: "Fail — parser break",
  Fail_Network: "Fail — network",
  Fail_Blocked: "Fail — source blocked",
  Competitive: "Competitive",
  At_par: "At par",
  Not_competitive: "Not competitive",
  Confirm: "Confirm",
  Reject: "Reject",
  Rematch: "Rematch",
  Defer: "Defer",
  OK: "OK",
  Parser_Break: "Parser break",
  Source_Blocked: "Source blocked",
} as const;

export function labelOf(value: string): string {
  return (LIST_LABELS as Record<string, string>)[value] ?? value;
}
