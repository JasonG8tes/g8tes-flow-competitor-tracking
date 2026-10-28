import { useState } from "react";
import { stepById } from "../../register/addonRegister";
import { YES_NO } from "../../register/lists";
import { canWriteStep, uniqueSources } from "../../domain/rules";
import type { Action } from "../../domain/store";
import { currentUser } from "../../domain/store";
import type { AppState } from "../../domain/types";
import {
  ConfidenceBadge,
  FieldShell,
  Notice,
  SelectField,
  TextField,
} from "../bits";

export function S040LegalGate({
  state,
  dispatch,
}: {
  state: AppState;
  dispatch: (action: Action) => void;
}) {
  const step = stepById("S-040");
  const user = currentUser(state);
  const writable = canWriteStep(user.role, "S-040") && !state.disabled;
  const [error, setError] = useState<string | null>(null);
  const shownError = error ?? state.lastError;
  const sources = uniqueSources(state.competitionBase);

  return (
    <section>
      <header className="step-head">
        <div>
          <p className="brand-kicker">{step.id} · {step.artifact} · owner {step.ownerRole}</p>
          <h1>{step.name}</h1>
          <p className="lede">
            Hard gate. Legal Allowed is captured per source by Legal — this
            software does not invent a ToS verdict. Live scrape stays off.
          </p>
        </div>
        <ConfidenceBadge value={step.confidence} />
      </header>

      <div className="panel gate">
        <h3>Confidence LOW — no invented legal conclusions</h3>
        <p className="hint">
          UAE / source terms-of-use research is open. C-S02 blocks S-050 and
          S-060 unless SF017 Legal Allowed = Yes for that source. Blank is
          not Yes. A human LG user may record Yes later; this slice still
          will not start a live scrape.
        </p>
      </div>

      {state.competitionBaseCompleteFlag !== "Pass" && (
        <Notice kind="gate">
          Complete S-020 first so source rows exist. Gate UI is ready; verdicts
          are not pre-filled.
        </Notice>
      )}

      {sources.length === 0 && (
        <div className="panel">
          <p className="hint">No sources yet. Competition base is empty.</p>
        </div>
      )}

      {state.legalAssessments.map((row) => (
        <div className="panel" key={row.competitorCode}>
          <h3>
            {row.competitorCode}{" "}
            <span className="hint">
              {sources.find((s) => s.competitorCode === row.competitorCode)?.displayName}
            </span>
          </h3>
          <div className="fields">
            <FieldShell df="SF005" mode="CARRY">
              <TextField value={row.competitorCode} disabled />
            </FieldShell>
            <FieldShell df="SF016" mode="CAPTURE">
              <TextField
                value={row.sourceId}
                disabled={!writable}
                onChange={(value) =>
                  dispatch({
                    type: "draft-legal",
                    competitorCode: row.competitorCode,
                    patch: { sourceId: value },
                  })
                }
              />
            </FieldShell>
            <FieldShell df="SF017" mode="CAPTURE">
              <SelectField
                value={row.legalAllowed}
                disabled={!writable}
                options={YES_NO}
                emptyLabel="Not assessed (no verdict invented)"
                onChange={(value) =>
                  dispatch({
                    type: "draft-legal",
                    competitorCode: row.competitorCode,
                    patch: { legalAllowed: value as typeof row.legalAllowed },
                  })
                }
              />
            </FieldShell>
            <FieldShell df="SF019" mode="CAPTURE">
              <input
                type="date"
                className={!writable ? "readonly" : undefined}
                disabled={!writable}
                value={row.legalAssessedAt}
                onChange={(e) =>
                  dispatch({
                    type: "draft-legal",
                    competitorCode: row.competitorCode,
                    patch: { legalAssessedAt: e.target.value },
                  })
                }
              />
            </FieldShell>
            <FieldShell df="SF018" mode="CAPTURE" wide>
              <textarea
                className={!writable ? "readonly" : undefined}
                disabled={!writable}
                value={row.legalNotes}
                placeholder="Optional notes. Do not treat this as a legal opinion from the software."
                onChange={(e) =>
                  dispatch({
                    type: "draft-legal",
                    competitorCode: row.competitorCode,
                    patch: { legalNotes: e.target.value },
                  })
                }
              />
            </FieldShell>
            <FieldShell df="SF020" mode="CAPTURE">
              <TextField value={row.legalAssessmentCompleteFlag} disabled />
            </FieldShell>
          </div>
          <div className="actions">
            <button
              className="btn"
              disabled={!writable}
              onClick={() => {
                setError(null);
                try {
                  dispatch({ type: "record-legal", competitorCode: row.competitorCode });
                } catch (err) {
                  setError(err instanceof Error ? err.message : String(err));
                }
              }}
            >
              Record assessment (human verdict)
            </button>
          </div>
        </div>
      ))}

      {shownError && <Notice kind="error">{shownError}</Notice>}
      {user.role !== "LG" && (
        <p className="hint">C-03 / C-02: switch to Uma Frost (LG) to record assessments. Legal ≠ scrape operator.</p>
      )}
    </section>
  );
}
