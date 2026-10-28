import type { CamofoxLab, DemoUser, HierarchyNode } from "./types";

/** Invented demo users only — register Users sheet. */
export const DEMO_USERS: DemoUser[] = [
  {
    id: "U-S01",
    displayName: "Nora Blake",
    role: "CM",
    dept: "CM",
    email: "nora.blake@demo.g8tes.local",
  },
  {
    id: "U-S02",
    displayName: "Omar Reed",
    role: "CG",
    dept: "CG",
    email: "omar.reed@demo.g8tes.local",
  },
  {
    id: "U-S03",
    displayName: "Quinn Adler",
    role: "IT",
    dept: "IT",
    email: "quinn.adler@demo.g8tes.local",
  },
  {
    id: "U-S04",
    displayName: "Uma Frost",
    role: "LG",
    dept: "LG",
    email: "uma.frost@demo.g8tes.local",
  },
  {
    id: "U-S05",
    displayName: "Priya Shah",
    role: "PM",
    dept: "PM",
    email: "priya.shah@demo.g8tes.local",
  },
  {
    id: "U-S06",
    displayName: "Sam Okada",
    role: "LD",
    dept: "LD",
    email: "sam.okada@demo.g8tes.local",
  },
];

export const DEMO_CLIENT = "Demo Retailer";

/**
 * Invented 4-level merchandise hierarchy (Card H).
 * Level ordering is Confidence LOW / configurable — this is demo structure only.
 */
export const DEMO_HIERARCHY: HierarchyNode[] = [
  { code: "DEPT-GROCERY", label: "Grocery", level: "Department", parentCode: null },
  { code: "SEC-FRESH", label: "Fresh", level: "Section", parentCode: "DEPT-GROCERY" },
  { code: "SEC-AMBIENT", label: "Ambient", level: "Section", parentCode: "DEPT-GROCERY" },
  { code: "CAT-DAIRY", label: "Dairy", level: "Category", parentCode: "SEC-FRESH" },
  { code: "CAT-BAKERY", label: "Bakery", level: "Category", parentCode: "SEC-FRESH" },
  { code: "CAT-BEV", label: "Beverages", level: "Category", parentCode: "SEC-AMBIENT" },
  { code: "SUB-MILK", label: "Milk", level: "Sub Category", parentCode: "CAT-DAIRY" },
  { code: "SUB-YOGURT", label: "Yogurt", level: "Sub Category", parentCode: "CAT-DAIRY" },
  { code: "SUB-BREAD", label: "Bread", level: "Sub Category", parentCode: "CAT-BAKERY" },
  { code: "SUB-SOFT", label: "Soft drinks", level: "Sub Category", parentCode: "CAT-BEV" },
];

/** Suggested invented competitors — never real partner names. */
export const DEMO_COMPETITOR_TEMPLATES = [
  {
    competitorCode: "COMP-STORE-A",
    competitorDisplayName: "Demo Competitor Store A",
    competitorChannel: "store" as const,
  },
  {
    competitorCode: "COMP-STORE-C",
    competitorDisplayName: "Demo Competitor Store C",
    competitorChannel: "store" as const,
  },
  {
    competitorCode: "COMP-OMNI-B",
    competitorDisplayName: "Demo Omni B",
    competitorChannel: "online" as const,
  },
  {
    competitorCode: "COMP-OMNI-D",
    competitorDisplayName: "Demo Omni D",
    competitorChannel: "online" as const,
  },
];

export const DEMO_BASE_SEED = [
  {
    competitorCode: "COMP-STORE-A",
    competitorDisplayName: "Demo Competitor Store A",
    competitorChannel: "store" as const,
    hierarchyNodeCode: "CAT-DAIRY",
  },
  {
    competitorCode: "COMP-STORE-A",
    competitorDisplayName: "Demo Competitor Store A",
    competitorChannel: "store" as const,
    hierarchyNodeCode: "CAT-BAKERY",
  },
  {
    competitorCode: "COMP-OMNI-B",
    competitorDisplayName: "Demo Omni B",
    competitorChannel: "online" as const,
    hierarchyNodeCode: "CAT-DAIRY",
  },
  {
    competitorCode: "COMP-OMNI-B",
    competitorDisplayName: "Demo Omni B",
    competitorChannel: "online" as const,
    hierarchyNodeCode: "CAT-BEV",
  },
];

export const CAMOFOX_LAB: CamofoxLab = {
  path: "camofox",
  proofClaimed: false,
  liveScrapeEnabled: false,
  confidence: "LOW",
  endpointHint: "http://127.0.0.1:8787",
  note: "Camofox is the lab/test path for parsers (S-050 / S-060). Confidence LOW — scaffold only. Do not claim proof. Live scrape stays off until S-040 Legal/ToS = Yes per source and a later slice enables the lab runner.",
};

/** Real-world names that must never appear in demo competitor labels. */
export const FORBIDDEN_COMPETITOR_NAMES = [
  "amazon",
  "noon",
  "carrefour",
  "lulu",
  "spinneys",
  "waitrose",
  "tesco",
  "walmart",
  "sainsbury",
  "asda",
  "morrisons",
  "aldi",
  "lidl",
  "target",
  "costco",
  "sharaf dg",
  "lulu hypermarket",
  "union coop",
  "choithrams",
];
