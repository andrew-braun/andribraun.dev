import { dev } from "$app/environment";
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

/**
 * A resized CMS image from Netlify Image CDN, which also picks AVIF or WebP from the
 * browser's Accept header. The CDN only exists on Netlify, so dev gets the original.
 */
export function cmsImageUrl(url: string, width: number, extraParams = ""): string {
	return dev ? url : `/.netlify/images?url=${encodeURIComponent(url)}&w=${width}${extraParams}`;
}

export function cmsImageSrcset(url: string, widths: number[]): string {
	return widths.map((width) => `${cmsImageUrl(url, width)} ${width}w`).join(", ");
}
