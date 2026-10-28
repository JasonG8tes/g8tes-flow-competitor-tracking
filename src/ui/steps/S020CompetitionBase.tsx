import { useState } from "react";
import { fieldsForStep, stepById } from "../../register/addonRegister";
import { COMPETITOR_CHANNELS, type CompetitorChannel } from "../../register/lists";
import {
  DEMO_COMPETITOR_TEMPLATES,
  DEMO_HIERARCHY,
} from "../../domain/demo";
import {
  canWriteStep,
  hierarchyPath,
  mechanismAccepted,
  uniqueSources,
} from "../../domain/rules";
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

export function S020CompetitionBase({
  state,
  dispatch,
}: {
  state: AppState;
  dispatch: (action: Action) => void;
}) {
  const step = stepById("S-020");
  const user = currentUser(state);
  const writable =
    canWriteStep(user.role, "S-020") &&
    mechanismAccepted(state) &&
    state.competitionBaseCompleteFlag !== "Pass" &&
    !state.disabled;
  const [error, setError] = useState<string | null>(null);
  const shownError = error ?? state.lastError;
  const [code, setCode] = useState("COMP-STORE-A");
  const [name, setName] = useState("Demo Competitor Store A");
  const [channel, setChannel] = useState<CompetitorChannel | "">("store");
  const [node, setNode] = useState("CAT-DAIRY");

  const applyTemplate = (codeValue: string) => {
    const t = DEMO_COMPETITOR_TEMPLATES.find((c) => c.competitorCode === codeValue);
    if (!t) return;
    setCode(t.competitorCode);
    setName(t.competitorDisplayName);
    setChannel(t.competitorChannel);
  };

  const addRow = () => {
    setError(null);
    try {
      if (!channel) throw new Error("SF007 Competitor Channel is required.");
      dispatch({
        type: "add-base-row",
        row: {
          competitorCode: code,
          competitorDisplayName: name,
          competitorChannel: channel,
          hierarchyNodeCode: node,
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  const seed = () => {
    setError(null);
    try {
      dispatch({ type: "seed-demo-base" });
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  const complete = () => {
    setError(null);
    try {
      dispatch({ type: "complete-base" });
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  const sources = uniqueSources(state.competitionBase);
  const nodes = DEMO_HIERARCHY.filter((n) => n.level === "Category" || n.level === "Sub Category");

  return (
    <section>
      <header className="step-head">
        <div>
          <p className="brand-kicker">{step.id} · {step.artifact} · owner {step.ownerRole}</p>
          <h1>{step.name}</h1>
          <p className="lede">
            Competition base = invented competitors × merchandise hierarchy ×
            store vs online. Demo labels only.
          </p>
        </div>
        <ConfidenceBadge value={step.confidence} />
      </header>

      <div className="panel">
        <h3>CARRY from S-010</h3>
        <div className="fields">
          <FieldShell df="SF001" mode="CARRY">
            <TextField value={state.acceptance.mechanismAccepted || "—"} disabled />
          </FieldShell>
          <FieldShell df="SF002" mode="CARRY">
            <TextField value={state.acceptance.acceptedScope || "—"} disabled />
          </FieldShell>
        </div>
        {!mechanismAccepted(state) && (
          <Notice kind="gate">
            S-020 is closed until Leadership records SF001 = Yes. This is not
            the flow spine — acceptance lives on this add-on only.
          </Notice>
        )}
      </div>

      <div className="panel">
        <h3>CAPTURE a competitor × hierarchy × channel row</h3>
        <p className="hint">
          {fieldsForStep("S-020").filter((f) => f.mode === "CAPTURE").length} CAPTURE
          fields. Display names must start with “Demo ”. Codes look like COMP-STORE-A.
        </p>
        <div className="fields">
          <FieldShell df="SF005" mode="CAPTURE">
            <select
              disabled={!writable}
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                applyTemplate(e.target.value);
              }}
            >
              {DEMO_COMPETITOR_TEMPLATES.map((t) => (
                <option key={t.competitorCode} value={t.competitorCode}>
                  {t.competitorCode}
                </option>
              ))}
              <option value="COMP-">Custom invented code…</option>
            </select>
            {!DEMO_COMPETITOR_TEMPLATES.some((t) => t.competitorCode === code) && (
              <TextField
                value={code}
                disabled={!writable}
                onChange={setCode}
                placeholder="COMP-STORE-X"
              />
            )}
          </FieldShell>
          <FieldShell df="SF006" mode="CAPTURE">
            <TextField value={name} disabled={!writable} onChange={setName} />
          </FieldShell>
          <FieldShell df="SF007" mode="CAPTURE">
            <SelectField
              value={channel}
              disabled={!writable}
              options={COMPETITOR_CHANNELS}
              onChange={(value) => setChannel(value as CompetitorChannel | "")}
            />
          </FieldShell>
          <FieldShell df="SF008" mode="CAPTURE">
            <select
              disabled={!writable}
              value={node}
              onChange={(e) => setNode(e.target.value)}
            >
              {nodes.map((n) => (
                <option key={n.code} value={n.code}>
                  {n.code} — {hierarchyPath(n.code)}
                </option>
              ))}
            </select>
          </FieldShell>
          <FieldShell df="SF009" mode="CAPTURE">
            <TextField value={state.competitionBaseCompleteFlag} disabled />
          </FieldShell>
        </div>
        <div className="actions">
          <button className="btn secondary" disabled={!writable} onClick={addRow}>
            Add row to base
          </button>
          <button className="btn ghost" disabled={!writable} onClick={seed}>
            Load invented demo base
          </button>
          {state.competitionBaseCompleteFlag === "Pass" &&
            canWriteStep(user.role, "S-020") && (
              <button
                className="btn ghost"
                onClick={() => dispatch({ type: "reopen-base" })}
              >
                Reopen base
              </button>
            )}
        </div>
        {shownError && <Notice kind="error">{shownError}</Notice>}
      </div>

      <div className="panel">
        <h3>Competition base register (T-S02)</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>SF005 Code</th>
                <th>SF006 Name</th>
                <th>SF007 Channel</th>
                <th>SF008 Hierarchy</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {state.competitionBase.length === 0 && (
                <tr>
                  <td colSpan={5}>No rows yet — add invented competitors.</td>
                </tr>
              )}
              {state.competitionBase.map((row) => (
                <tr key={row.id}>
                  <td>{row.competitorCode}</td>
                  <td>{row.competitorDisplayName}</td>
                  <td>{row.competitorChannel}</td>
                  <td>
                    {row.hierarchyNodeCode}
                    <div className="hint">{hierarchyPath(row.hierarchyNodeCode)}</div>
                  </td>
                  <td>
                    {writable && (
                      <button
                        className="btn ghost"
                        onClick={() =>
                          dispatch({ type: "remove-base-row", id: row.id })
                        }
                      >
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="panel">
        <h3>Matrix — competitors × hierarchy × store vs online</h3>
        <Matrix state={state} />
        <p className="hint">
          Unique sources for S-040:{" "}
          {sources.length
            ? sources.map((s) => `${s.competitorCode} (${s.channel})`).join(", ")
            : "none yet"}
          .
        </p>
        <div className="actions">
          <button
            className="btn"
            disabled={
              !canWriteStep(user.role, "S-020") ||
              !mechanismAccepted(state) ||
              state.disabled ||
              state.competitionBaseCompleteFlag === "Pass"
            }
            onClick={complete}
          >
            Mark competition base complete
          </button>
        </div>
        {state.competitionBaseCompleteFlag === "Pass" && (
          <Notice kind="ok">
            T-S02 recorded. Sources now appear on S-040 as unevaluated Legal/ToS
            gates (Allowed is blank — no verdict invented).
          </Notice>
        )}
        {user.role !== "CM" && (
          <p className="hint">C-03: switch to Nora Blake (CM) to edit the base.</p>
        )}
      </div>
    </section>
  );
}

function Matrix({ state }: { state: AppState }) {
  const sources = uniqueSources(state.competitionBase);
  const nodeCodes = [...new Set(state.competitionBase.map((r) => r.hierarchyNodeCode))];
  if (sources.length === 0) {
    return <p className="hint">Matrix fills as rows are captured.</p>;
  }
  return (
    <div className="table-wrap">
      <table className="matrix">
        <thead>
          <tr>
            <th>Hierarchy</th>
            {sources.map((s) => (
              <th key={s.competitorCode}>
                {s.displayName}
                <div className="hint">{s.channel}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {nodeCodes.map((node) => (
            <tr key={node}>
              <td>
                {node}
                <div className="hint">{hierarchyPath(node)}</div>
              </td>
              {sources.map((s) => {
                const hit = state.competitionBase.find(
                  (r) =>
                    r.competitorCode === s.competitorCode &&
                    r.hierarchyNodeCode === node,
                );
                return (
                  <td key={s.competitorCode}>
                    {hit ? (
                      <span className={`cell-${hit.competitorChannel}`}>
                        {hit.competitorChannel}
                      </span>
                    ) : (
                      <span className="cell-empty">—</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
