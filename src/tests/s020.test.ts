import { describe, expect, it } from "vitest";
import {
  validateCompetitionBaseComplete,
  validateCompetitorLabel,
  validateCompetitionRow,
} from "../domain/rules";
import { initialState, reduce } from "../domain/store";
import type { AppState } from "../domain/types";

function accepted(scope: "store" | "online" | "both" = "both"): AppState {
  let state = initialState();
  state = reduce(state, {
    type: "draft-acceptance",
    patch: { mechanismAccepted: "Yes", acceptedScope: scope },
  });
  return reduce(state, { type: "record-acceptance" });
}

describe("S-020 competition base", () => {
  it("requires invented Demo display names and COMP- codes", () => {
    expect(validateCompetitorLabel("COMP-STORE-A", "Demo Competitor Store A").ok).toBe(
      true,
    );
    expect(validateCompetitorLabel("STORE-A", "Demo Competitor Store A").ok).toBe(
      false,
    );
    expect(validateCompetitorLabel("COMP-STORE-A", "Competitor Store A").ok).toBe(
      false,
    );
    expect(validateCompetitorLabel("COMP-AMZ", "Demo Amazon Marketplace").ok).toBe(
      false,
    );
  });

  it("captures competitor × hierarchy × channel", () => {
    expect(
      validateCompetitionRow({
        competitorCode: "COMP-OMNI-B",
        competitorDisplayName: "Demo Omni B",
        competitorChannel: "online",
        hierarchyNodeCode: "CAT-DAIRY",
      }).ok,
    ).toBe(true);
  });

  it("blocks base setup until acceptance Yes", () => {
    const state = initialState();
    expect(validateCompetitionBaseComplete(state).ok).toBe(false);
    const blocked = reduce(state, {
      type: "add-base-row",
      row: {
        competitorCode: "COMP-STORE-A",
        competitorDisplayName: "Demo Competitor Store A",
        competitorChannel: "store",
        hierarchyNodeCode: "CAT-DAIRY",
      },
    });
    expect(blocked.lastError).toMatch(/SF001/);
    expect(blocked.competitionBase).toHaveLength(0);
  });

  it("seeds invented demo rows and completes when scope channels are covered", () => {
    let state = accepted("both");
    state = reduce(state, { type: "switch-user", userId: "U-S01" });
    state = reduce(state, { type: "seed-demo-base" });
    expect(state.competitionBase.length).toBe(4);
    expect(
      state.competitionBase.every((r) => r.competitorDisplayName.startsWith("Demo ")),
    ).toBe(true);
    const channels = new Set(state.competitionBase.map((r) => r.competitorChannel));
    expect(channels.has("store")).toBe(true);
    expect(channels.has("online")).toBe(true);
    expect(validateCompetitionBaseComplete(state).ok).toBe(true);
    state = reduce(state, { type: "complete-base" });
    expect(state.competitionBaseCompleteFlag).toBe("Pass");
  });

  it("requires both channels when accepted scope is both", () => {
    let state = accepted("both");
    state = reduce(state, {
      type: "add-base-row",
      row: {
        competitorCode: "COMP-STORE-A",
        competitorDisplayName: "Demo Competitor Store A",
        competitorChannel: "store",
        hierarchyNodeCode: "CAT-DAIRY",
      },
    });
    const result = validateCompetitionBaseComplete(state);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.issues.some((i) => i.code === "SCOPE_GAP")).toBe(true);
    }
  });
});
