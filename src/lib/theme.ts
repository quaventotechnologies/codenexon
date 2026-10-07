export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "codenexon_theme";


// Inline script for <head>: applies a saved dark choice before first paint. Light is the default.
export const themeInitScript = `(function(){try{var d=localStorage.getItem("${THEME_STORAGE_KEY}")==="dark";var r=document.documentElement;r.classList.toggle("dark",d);r.style.colorScheme=d?"dark":"light"}catch(e){}})()`;

// Fallback when localStorage is unavailable (private mode, blocked storage)
let memoryTheme: Theme = "light";
const listeners = new Set<() => void>();

export function getTheme(): Theme {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    // Fall through to the in-memory choice
  }
  return memoryTheme;
}

export function applyTheme(theme: Theme) {
  const isDark = theme === "dark";
  const root = document.documentElement;
  root.classList.toggle("dark", isDark);
  root.style.colorScheme = isDark ? "dark" : "light";
}

export function setTheme(theme: Theme) {
  memoryTheme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage blocked: theme still applies for this session
  }
  applyTheme(theme);
  listeners.forEach((listener) => listener());
}

export function subscribeTheme(listener: () => void) {
  listeners.add(listener);

  // Keep other open tabs in sync
  const onStorage = (e: StorageEvent) => {
    if (e.key !== THEME_STORAGE_KEY) return;
    applyTheme(getTheme());
    listener();
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}
