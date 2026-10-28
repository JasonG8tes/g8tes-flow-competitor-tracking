import { describe, expect, it } from "vitest";
import {
  mechanismAccepted,
  stepStatus,
  validateAcceptanceDraft,
} from "../domain/rules";
import { initialState, reduce } from "../domain/store";

describe("S-010 client acceptance", () => {
  it("rejects comment-only completion", () => {
    const result = validateAcceptanceDraft({
      mechanismAccepted: "",
      acceptedScope: "",
      acceptanceNotes: "Looks fine, please proceed.",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.issues.some((i) => i.code === "COMMENT_ONLY")).toBe(true);
    }
  });

  it("surfaces comment-only as lastError without throwing", () => {
    let state = initialState();
    state = reduce(state, {
      type: "draft-acceptance",
      patch: { acceptanceNotes: "Looks fine, please proceed." },
    });
    const next = reduce(state, { type: "record-acceptance" });
    expect(next.lastError).toMatch(/Comment-only completion is rejected/);
    expect(next.acceptance.acceptanceCompleteFlag).toBe("Pending");
  });

  it("requires SF001 and SF002", () => {
    const result = validateAcceptanceDraft({
      mechanismAccepted: "",
      acceptedScope: "",
      acceptanceNotes: "",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.issues.map((i) => i.field)).toEqual(
        expect.arrayContaining(["SF001", "SF002"]),
      );
    }
  });

  it("records Yes + scope, writes background attestation, unlocks S-020", () => {
    let state = initialState();
    state = reduce(state, {
      type: "draft-acceptance",
      patch: { mechanismAccepted: "Yes", acceptedScope: "both" },
    });
    state = reduce(state, { type: "record-acceptance" });
    expect(state.acceptance.acceptanceCompleteFlag).toBe("Pass");
    expect(mechanismAccepted(state)).toBe(true);
    expect(stepStatus(state, "S-020")).toBe("ready");
    expect(state.attestations.some((a) => a.controlId === "C-S01")).toBe(true);
    expect(state.attestations[0]?.result).toBe("Pass");
    expect(state.attestations[0]?.who).toContain("Sam Okada");
  });

  it("records No without unlocking competition base", () => {
    let state = initialState();
    state = reduce(state, {
      type: "draft-acceptance",
      patch: { mechanismAccepted: "No", acceptedScope: "store" },
    });
    state = reduce(state, { type: "record-acceptance" });
    expect(state.acceptance.acceptanceCompleteFlag).toBe("Pass");
    expect(mechanismAccepted(state)).toBe(false);
    expect(stepStatus(state, "S-020")).toBe("blocked");
  });
});
