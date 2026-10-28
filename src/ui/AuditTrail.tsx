import type { AppState } from "../domain/types";

export function AuditTrail({ state }: { state: AppState }) {
  const latest = [...state.audit].reverse().slice(0, 8);
  return (
    <div className="panel">
      <h3>C-01 insert-only trail · background attestations</h3>
      <p className="hint">
        Attestations are not a user form. Pass + who + when is written on CTA
        success only.
      </p>
      {state.attestations.length === 0 && latest.length === 0 && (
        <p className="hint">No events yet.</p>
      )}
      <ul className="audit">
        {state.attestations
          .slice()
          .reverse()
          .map((a) => (
            <li key={`${a.controlId}-${a.when}`}>
              {a.controlId} {a.stepId} {a.result} · {a.who} · {a.when}
            </li>
          ))}
        {latest.map((e) => (
          <li key={e.id}>
            {e.at} · {e.who} ({e.role}) · {e.stepId} · {e.action} — {e.detail}
          </li>
        ))}
      </ul>
    </div>
  );
}
