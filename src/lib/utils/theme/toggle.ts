import { browser } from "$app/environment";

/** The single source of truth for themes — `Theme` is derived from it, not vice versa. */
export const themes = ["dark", "light"] as const;

export type Theme = (typeof themes)[number];

export const STORAGE_KEY = "storedTheme";

/**
 * localStorage is untrusted input: a stale or hand-edited value must not be
 * assumed to be a `Theme`.
 */
export function isTheme(value: string | null): value is Theme {
	return value !== null && (themes as readonly string[]).includes(value);
}

export function readStoredTheme(): Theme | null {
	const stored = localStorage.getItem(STORAGE_KEY);
	return isTheme(stored) ? stored : null;
}

export function applyTheme(theme: Theme): void {
	document.body.setAttribute("data-theme", theme);
	localStorage.setItem(STORAGE_KEY, theme);
}

export function setInitialTheme(): void {
	if (!browser) return;

	// A stored preference wins over the OS setting.
	const storedTheme = readStoredTheme();

	if (storedTheme) {
		document.body.setAttribute("data-theme", storedTheme);
		return;
	}

	const userPrefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;

	document.body.setAttribute("data-theme", userPrefersDark ? "dark" : "light");
}
