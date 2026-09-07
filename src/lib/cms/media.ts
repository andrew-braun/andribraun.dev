import type { Media } from "./payload-types";

/**
 * Client-safe media helpers.
 *
 * These live apart from `payload.ts` deliberately: that module imports
 * `$env/static/private`, so importing a value from it into a component would pull
 * server-only config toward the browser bundle.
 */

/**
 * A media relationship is only a `Media` object when Payload populated it at the
 * requested depth; otherwise it arrives as a bare id. Narrow before rendering.
 */
export function populatedMedia(relation: number | Media | null | undefined): Media | null {
	return typeof relation === "object" && relation !== null && relation.url ? relation : null;
}
