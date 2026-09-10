import { browser } from "$app/environment";

/**
 * Whether the reader has asked for reduced motion.
 *
 * The `prefers-reduced-motion` block in `global.css` neutralises CSS animation, but motion
 * driven by JavaScript timers — the typewriter, and any scroll called with an explicit
 * `behavior` — is invisible to it and has to check this instead.
 *
 * Read at the moment of use rather than cached: the setting can change mid-session.
 */
export function prefersReducedMotion(): boolean {
	if (!browser) return false;

	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
