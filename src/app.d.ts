// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		/** The shape passed to `error()` and received by +error.svelte. */
		interface Error {
			message: string;
		}
		// interface Locals {}
		/** Optional per-page metadata; the root layout falls back to `siteData` for anything missing. */
		interface PageData {
			seo?: { title: string; description: string; image?: string };
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
