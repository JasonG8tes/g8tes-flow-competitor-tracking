import type { ReactNode } from "react";
import type { Confidence, FieldMode } from "../register/addonRegister";
import { fieldByCode, type DfCode } from "../register/addonRegister";
import { labelOf } from "../register/lists";

export function ModeBadge({ mode }: { mode: FieldMode }) {
  return <span className={`mode ${mode}`}>{mode}</span>;
}

export function ConfidenceBadge({ value }: { value: Confidence }) {
  return <span className={`conf ${value}`}>Confidence {value}</span>;
}

export function StatusMark({
  status,
}: {
  status: "done" | "ready" | "blocked" | "scaffold";
}) {
  const text = {
    done: "done",
    ready: "ready",
    blocked: "blocked",
    scaffold: "scaffold",
  }[status];
  return <span className={`status ${status}`}>{text}</span>;
}

export function FieldShell({
  df,
  mode,
  children,
  wide,
}: {
  df: DfCode;
  mode: FieldMode;
  children: ReactNode;
  wide?: boolean;
}) {
  const field = fieldByCode(df);
  return (
    <div className={`field${wide ? " wide" : ""}`}>
      <label>
        <span>
          {field.label} <ModeBadge mode={mode} />
        </span>
        <span className="df">{df}</span>
      </label>
      {children}
    </div>
  );
}

export function SelectField({
  value,
  onChange,
  options,
  disabled,
  emptyLabel = "Select…",
}: {
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  disabled?: boolean;
  emptyLabel?: string;
}) {
  return (
    <select
      className={disabled ? "readonly" : undefined}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">{emptyLabel}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {labelOf(opt)}
        </option>
      ))}
    </select>
  );
}

export function TextField({
  value,
  onChange,
  disabled,
  placeholder,
}: {
  value: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}) {
  return (
    <input
      className={disabled ? "readonly" : undefined}
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
}

export function Notice({
  kind,
  children,
}: {
  kind: "error" | "ok" | "gate";
  children: ReactNode;
}) {
  return <div className={kind === "gate" ? "error gate" : kind}>{children}</div>;
}

