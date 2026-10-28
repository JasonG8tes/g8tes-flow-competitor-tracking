import { describe, expect, it } from "vitest";
import {
  LIVE_SCRAPE_ENABLED,
  scrapeStartBlocks,
  stepStatus,
} from "../domain/rules";
import { CAMOFOX_LAB } from "../domain/demo";
import { initialState, reduce } from "../domain/store";
import { CONTROLS } from "../register/addonRegister";

function readyBase() {
  let state = initialState();
  state = reduce(state, {
    type: "draft-acceptance",
    patch: { mechanismAccepted: "Yes", acceptedScope: "both" },
  });
  state = reduce(state, { type: "record-acceptance" });
  state = reduce(state, { type: "switch-user", userId: "U-S01" });
  state = reduce(state, { type: "seed-demo-base" });
  state = reduce(state, { type: "complete-base" });
  return state;
}

describe("S-040 legal gate and scrape blocks", () => {
  it("does not invent Legal Allowed = Yes", () => {
    const state = readyBase();
    expect(state.legalAssessments.length).toBeGreaterThan(0);
    expect(state.legalAssessments.every((a) => a.legalAllowed === "")).toBe(true);
    expect(
      state.legalAssessments.every((a) => a.legalAssessmentCompleteFlag === "Pending"),
    ).toBe(true);
  });

  it("blocks store and omni scrape while Allowed ≠ Yes (C-S02)", () => {
    const state = readyBase();
    const store = scrapeStartBlocks(state, "store", true);
    const online = scrapeStartBlocks(state, "online", true);
    expect(store.some((b) => b.control === "C-S02")).toBe(true);
    expect(online.some((b) => b.control === "C-S02")).toBe(true);
    expect(store.some((b) => b.control === "LIVE_SCRAPE_OFF")).toBe(true);
  });

  it("still refuses live scrape after a human records Yes", () => {
    let state = readyBase();
    state = reduce(state, { type: "switch-user", userId: "U-S04" });
    for (const row of state.legalAssessments) {
      state = reduce(state, {
        type: "draft-legal",
        competitorCode: row.competitorCode,
        patch: { legalAllowed: "Yes", legalAssessedAt: "2026-10-28" },
      });
      state = reduce(state, {
        type: "record-legal",
        competitorCode: row.competitorCode,
      });
    }
    const blocks = scrapeStartBlocks(state, "store", true);
    expect(LIVE_SCRAPE_ENABLED).toBe(false);
    expect(state.camofox.liveScrapeEnabled).toBe(false);
    expect(state.camofox.proofClaimed).toBe(false);
    expect(blocks.some((b) => b.control === "LIVE_SCRAPE_OFF")).toBe(true);
    expect(stepStatus(state, "S-050")).toBe("scaffold");
    expect(stepStatus(state, "S-060")).toBe("scaffold");
  });

  it("Camofox remains lab scaffold with Confidence LOW", () => {
    expect(CAMOFOX_LAB.path).toBe("camofox");
    expect(CAMOFOX_LAB.confidence).toBe("LOW");
    expect(CAMOFOX_LAB.proofClaimed).toBe(false);
  });

  it("ships C-S10 no-LLM control", () => {
    expect(CONTROLS.some((c) => c.id === "C-S10")).toBe(true);
    expect(CONTROLS.find((c) => c.id === "C-S10")?.what).toMatch(/must not ship an LLM/);
  });
});
