import { useState } from "react";
import { stepById, type StepId } from "../../register/addonRegister";
import { scrapeStartBlocks } from "../../domain/rules";
import type { CompetitorChannel } from "../../register/lists";
import type { AppState } from "../../domain/types";
import { ConfidenceBadge, FieldShell, Notice, TextField } from "../bits";

export function CamofoxLab({
  state,
  stepId,
}: {
  state: AppState;
  stepId: "S-050" | "S-060";
}) {
  const step = stepById(stepId);
  const channel: CompetitorChannel = stepId === "S-050" ? "store" : "online";
  const [declared, setDeclared] = useState(false);
  const blocks = scrapeStartBlocks(state, channel, declared);

  return (
    <section>
      <header className="step-head">
        <div>
          <p className="brand-kicker">{step.id} · {step.artifact} · owner {step.ownerRole}</p>
          <h1>{step.name}</h1>
          <p className="lede">
            Camofox lab/test path. Parser method is Confidence LOW. This
            screen is a scaffold — it does not run a live scrape and does not
            claim proof.
          </p>
        </div>
        <ConfidenceBadge value="LOW" />
      </header>

      <div className="panel gate">
        <h3>Live scrape is off</h3>
        <p className="hint">{state.camofox.note}</p>
        <div className="fields">
          <FieldShell df="SF002" mode="CARRY">
            <TextField value={state.acceptance.acceptedScope || "—"} disabled />
          </FieldShell>
          <FieldShell df="SF017" mode="CARRY">
            <TextField
              value={
                state.legalAssessments.length
                  ? state.legalAssessments
                      .map((a) => `${a.competitorCode}:${a.legalAllowed || "unset"}`)
                      .join(" · ")
                  : "no sources assessed"
              }
              disabled
            />
          </FieldShell>
          <FieldShell df="SF027" mode="CAPTURE">
            <label className="who">
              <input
                type="checkbox"
                checked={declared}
                onChange={(e) => setDeclared(e.target.checked)}
              />
              Client internet declared (SF027 = Yes)
            </label>
          </FieldShell>
        </div>
      </div>

      <div className="panel later">
        <h3>Camofox adapter (scaffold)</h3>
        <ul>
          <li>Path: {state.camofox.path}</li>
          <li>Endpoint hint (local lab only): {state.camofox.endpointHint}</li>
          <li>Live scrape enabled: {String(state.camofox.liveScrapeEnabled)}</li>
          <li>Proof claimed: {String(state.camofox.proofClaimed)}</li>
          <li>No LLM module is bundled in this repo.</li>
        </ul>
        <p className="hint">
          Intended later: deterministic extract via Camofox on invented / public
          lab fixtures. Not implemented in this slice.
        </p>
      </div>

      <div className="panel">
        <h3>Start {channel} scrape — blocked</h3>
        {blocks.map((b) => (
          <Notice kind="gate" key={b.control + b.message}>
            {b.control}: {b.message}
          </Notice>
        ))}
        <div className="actions">
          <button className="btn secondary" disabled>
            Start {channel} scrape (disabled)
          </button>
        </div>
      </div>
    </section>
  );
}

export function LaterStep({
  state,
  stepId,
  onDisable,
}: {
  state: AppState;
  stepId: StepId;
  onDisable?: (reason: string) => void;
}) {
  const step = stepById(stepId);
  const [reason, setReason] = useState(state.disableReason);
  const [error, setError] = useState<string | null>(null);
  const shownError = error ?? state.lastError;

  return (
    <section>
      <header className="step-head">
        <div>
          <p className="brand-kicker">{step.id} · {step.artifact} · owner {step.ownerRole}</p>
          <h1>{step.name}</h1>
          <p className="lede">{step.notes}</p>
        </div>
        <ConfidenceBadge value={step.confidence} />
      </header>
      <div className="panel later">
        <h3>Not in the S-010 / S-020 slice</h3>
        <p className="hint">
          Register fields exist. Implementation waits on Confidence LOW items
          (match score, at-par bands, parser proof, retention).
        </p>
      </div>
      {stepId === "S-100" && (
        <div className="panel">
          <h3>Disable / revoke add-on</h3>
          <FieldShell df="SF040" mode="CAPTURE" wide>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Mandatory reason"
            />
          </FieldShell>
          <div className="actions">
            <button
              className="btn danger"
              disabled={state.disabled}
              onClick={() => {
                setError(null);
                try {
                  onDisable?.(reason);
                } catch (err) {
                  setError(err instanceof Error ? err.message : String(err));
                }
              }}
            >
              Disable add-on
            </button>
          </div>
          {shownError && <Notice kind="error">{shownError}</Notice>}
          {state.disabled && (
            <Notice kind="ok">
              Add-on disabled. Schedules would stop. Flow FF068 would be
              cleared when Flow is linked.
            </Notice>
          )}
        </div>
      )}
    </section>
  );
}
