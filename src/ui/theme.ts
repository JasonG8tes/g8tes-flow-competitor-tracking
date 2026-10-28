export type Theme = "light" | "dark";

const KEY = "g8tes-theme";

export function readTheme(): Theme {
  const saved = localStorage.getItem(KEY);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function writeTheme(theme: Theme): void {
  localStorage.setItem(KEY, theme);
  document.documentElement.setAttribute("data-theme", theme);
}

export function toggleTheme(current: Theme): Theme {
  const next = current === "light" ? "dark" : "light";
  writeTheme(next);
  return next;
}
