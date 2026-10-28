import { useState } from "react";
import { CONTROLS, fieldsForStep, stepById } from "../../register/addonRegister";
import { SCRAPE_SCOPES, YES_NO } from "../../register/lists";
import { canWriteStep } from "../../domain/rules";
import type { Action } from "../../domain/store";
import { currentUser } from "../../domain/store";
import type { AppState } from "../../domain/types";
import {
  ConfidenceBadge,
  FieldShell,
  Notice,
  SelectField,
} from "../bits";

export function S010Acceptance({
  state,
  dispatch,
}: {
  state: AppState;
  dispatch: (action: Action) => void;
}) {
  const step = stepById("S-010");
  const user = currentUser(state);
  const writable = canWriteStep(user.role, "S-010") && !state.disabled;
  const [error, setError] = useState<string | null>(null);
  const shownError = error ?? state.lastError;
  const capture = fieldsForStep("S-010");

  const record = () => {
    setError(null);
    try {
      dispatch({ type: "record-acceptance" });
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <section>
      <header className="step-head">
        <div>
          <p className="brand-kicker">{step.id} · {step.artifact} · owner {step.ownerRole}</p>
          <h1>{step.name}</h1>
          <p className="lede">
            Explicit client acceptance of the scraping mechanism. CAPTURE is
            Yes/No + scope — notes alone cannot close the step.
          </p>
        </div>
        <ConfidenceBadge value={step.confidence} />
      </header>

      <div className="panel">
        <h3>Mechanism summary (not an LLM, not flow spine)</h3>
        <div className="mechanism">
          <div>
            <p>What the client would accept</p>
            <ul>
              <li>Client-side module using the client’s own internet connection.</li>
              <li>Deterministic parsers / browser automation only.</li>
              <li>No LLM is supplied to the client (C-S10).</li>
              <li>Competition base is client-defined: competitors × hierarchy × store vs online.</li>
            </ul>
          </div>
          <div>
            <p>Hard gates after acceptance</p>
            <ul>
              <li>S-040 Legal/ToS must be Yes per source before any scrape run.</li>
              <li>This build does not invent legal verdicts and does not enable live scrapes.</li>
              <li>Camofox is the lab/test path for parsers — Confidence LOW, no proof claim.</li>
              <li>Separate add-on UI — not the flow 8-column board.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="panel">
        <h3>CAPTURE fields for this step</h3>
        <p className="hint">
          {capture.filter((f) => f.mandatory).length} mandatory CAPTURE fields.
          Attestation is written in the background on CTA (C-S01) — not a form.
        </p>
        <div className="fields">
          <FieldShell df="SF001" mode="CAPTURE">
            <SelectField
              value={state.acceptance.mechanismAccepted}
              disabled={!writable}
              options={YES_NO}
              onChange={(value) =>
                dispatch({
                  type: "draft-acceptance",
                  patch: { mechanismAccepted: value as typeof state.acceptance.mechanismAccepted },
                })
              }
            />
          </FieldShell>
          <FieldShell df="SF002" mode="CAPTURE">
            <SelectField
              value={state.acceptance.acceptedScope}
              disabled={!writable}
              options={SCRAPE_SCOPES}
              onChange={(value) =>
                dispatch({
                  type: "draft-acceptance",
                  patch: { acceptedScope: value as typeof state.acceptance.acceptedScope },
                })
              }
            />
          </FieldShell>
          <FieldShell df="SF003" mode="CAPTURE" wide>
            <textarea
              className={!writable ? "readonly" : undefined}
              disabled={!writable}
              value={state.acceptance.acceptanceNotes}
              placeholder="Optional. Cannot complete the step by notes alone."
              onChange={(e) =>
                dispatch({
                  type: "draft-acceptance",
                  patch: { acceptanceNotes: e.target.value },
                })
              }
            />
          </FieldShell>
          <FieldShell df="SF004" mode="CAPTURE">
            <input
              className="readonly"
              readOnly
              value={state.acceptance.acceptanceCompleteFlag}
            />
          </FieldShell>
        </div>

        {!writable && (
          <p className="hint">C-03 role-scoped write: switch to Sam Okada (LD) to record acceptance.</p>
        )}
        {shownError && <Notice kind="error">{shownError}</Notice>}
        {state.acceptance.acceptanceCompleteFlag === "Pass" && (
          <Notice kind="ok">
            T-S01 recorded. SF001={state.acceptance.mechanismAccepted}, SF002=
            {state.acceptance.acceptedScope}.{" "}
            {state.acceptance.mechanismAccepted === "Yes"
              ? "S-020 is unlocked."
              : "Acceptance recorded as No — competition base stays closed."}
          </Notice>
        )}
        <div className="actions">
          <button className="btn" disabled={!writable} onClick={record}>
            Record acceptance
          </button>
        </div>
      </div>

      <div className="panel">
        <h3>Controls on this step</h3>
        <div className="controls">
          {CONTROLS.filter((c) => c.step === "ALL" || c.step === "S-010").map((c) => (
            <span className="ctrl" key={c.id}>
              {c.id} {c.what}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
