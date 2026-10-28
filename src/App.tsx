import { useEffect, useMemo, useReducer, useState } from "react";
import { REGISTER_VERSION, STEPS, type StepId } from "./register/addonRegister";
import { DEMO_USERS } from "./domain/demo";
import { stepStatus } from "./domain/rules";
import {
  currentUser,
  hydrate,
  persist,
  reduce,
  type Action,
} from "./domain/store";
import type { AppState } from "./domain/types";
import { AuditTrail } from "./ui/AuditTrail";
import { StatusMark } from "./ui/bits";
import { CamofoxLab, LaterStep } from "./ui/steps/CamofoxLab";
import { S010Acceptance } from "./ui/steps/S010Acceptance";
import { S020CompetitionBase } from "./ui/steps/S020CompetitionBase";
import { S040LegalGate } from "./ui/steps/S040LegalGate";
import { readTheme, toggleTheme, type Theme } from "./ui/theme";

function safeReduce(state: AppState, action: Action): AppState {
  return reduce(state, action);
}

export function App() {
  const [state, dispatch] = useReducer(safeReduce, undefined, hydrate);
  const [stepId, setStepId] = useState<StepId>("S-010");
  const [theme, setTheme] = useState<Theme>(() =>
    typeof document === "undefined"
      ? "light"
      : (document.documentElement.getAttribute("data-theme") as Theme) ||
        readTheme(),
  );
  const user = currentUser(state);

  useEffect(() => {
    persist(state);
  }, [state]);

  const guardedDispatch = useMemo(() => {
    return (action: Action) => {
      dispatch(action);
    };
  }, []);

  return (
    <div className="app">
      <nav className="nav">
        <div className="nav-brand">
          <p className="brand-kicker">flow add-on · not the flow spine</p>
          <h1 className="brand-title">Competitive Price Scraping</h1>
          <p className="brand-sub">
            {state.clientName} · {REGISTER_VERSION}
          </p>
        </div>
        <h2>Add-on steps</h2>
        {STEPS.map((step) => {
          const status = stepStatus(state, step.id);
          return (
            <button
              key={step.id}
              className={`nav-btn${stepId === step.id ? " active" : ""}`}
              onClick={() => setStepId(step.id)}
            >
              <span className="nav-id">{step.id}</span>
              <span className="nav-name">{step.name}</span>
              <span className="nav-meta">
                {step.phase} · <StatusMark status={status} />
              </span>
            </button>
          );
        })}
      </nav>

      <div className="main-col">
        <header className="topbar">
          <div>
            <p className="brand-kicker">first slice S-010 then S-020</p>
            <h1 className="brand-title">Competitive Price Scraping</h1>
            <p className="lede">
              Client-side module. No LLM to client. Invented demo only.
            </p>
          </div>
          <div className="top-meta">
            <div className="pill-row">
              <span className="pill">No LLM to client</span>
              <span className="pill">Invented demo only</span>
              <span className="pill">Camofox = lab path</span>
              <span className="pill">S-040 gate closed</span>
            </div>
            <div className="who">
              <span className="badge-role">{user.role}</span>
              <select
                className="user-select"
                value={state.currentUserId}
                onChange={(e) =>
                  guardedDispatch({ type: "switch-user", userId: e.target.value })
                }
              >
                {DEMO_USERS.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.displayName} · {u.role}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="btn ghost"
                aria-label="Switch night and day"
                onClick={() => setTheme(toggleTheme(theme))}
              >
                {theme === "light" ? "Night" : "Day"}
              </button>
              <button
                type="button"
                className="btn ghost"
                onClick={() => guardedDispatch({ type: "reset-demo" })}
              >
                Reset demo
              </button>
            </div>
          </div>
        </header>

        <main className="main">
          {stepId === "S-010" && (
            <S010Acceptance state={state} dispatch={guardedDispatch} />
          )}
          {stepId === "S-020" && (
            <S020CompetitionBase state={state} dispatch={guardedDispatch} />
          )}
          {stepId === "S-040" && (
            <S040LegalGate state={state} dispatch={guardedDispatch} />
          )}
          {(stepId === "S-050" || stepId === "S-060") && (
            <CamofoxLab state={state} stepId={stepId} />
          )}
          {stepId !== "S-010" &&
            stepId !== "S-020" &&
            stepId !== "S-040" &&
            stepId !== "S-050" &&
            stepId !== "S-060" && (
              <LaterStep
                state={state}
                stepId={stepId}
                onDisable={(reason) =>
                  guardedDispatch({ type: "disable-addon", reason })
                }
              />
            )}
          <AuditTrail state={state} />
        </main>
      </div>
    </div>
  );
}
