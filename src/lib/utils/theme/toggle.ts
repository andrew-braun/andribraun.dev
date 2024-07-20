import { browser } from '$app/environment';

export function setInitialTheme(): void {
	// Adjust color scheme based on user preference
	if (browser) {
		// Check for stored theme first
		const storedTheme = localStorage.getItem('storedTheme');

		if (storedTheme) {
			document.body.setAttribute('data-theme', storedTheme);
			return;
		}

		// Otherwise, check for dark/light
		const userPrefersDark =
			window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

		document.body.setAttribute('data-theme', userPrefersDark ? 'dark' : 'light');
	}
}
