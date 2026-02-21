import { CMS_KEY, CMS_URL } from "$env/static/private";
import * as qs from "qs-esm";
import type { PayloadListResponse, Project } from "./types";

// ---------------------------------------------------------------------------
// Internal utilities
// ---------------------------------------------------------------------------

/**
 * Build a fully-qualified CMS API URL, appending an optional query object
 * as a stringified query string.
 */
function buildUrl(path: string, params?: Record<string, unknown>): string {
	const base = `${CMS_URL}/api${path}`;
	if (!params || Object.keys(params).length === 0) return base;
	return base + qs.stringify(params, { addQueryPrefix: true });
}

/**
 * Central fetch wrapper. Throws a descriptive error on non-2xx responses.
 */
async function cmsGet<T>(path: string, params?: Record<string, unknown>): Promise<T> {
	const url = buildUrl(path, params);
	const res = await fetch(url, {
		headers: CMS_KEY ? { Authorization: `third-party-access API-Key ${CMS_KEY}` } : undefined
	});

	if (!res.ok) {
		let message = `CMS request failed: ${res.status} ${res.statusText}`;
		try {
			const body = await res.json();
			if (body?.errors?.[0]?.message) message += ` — ${body.errors[0].message}`;
			else if (body?.message) message += ` — ${body.message}`;
		} catch {
			// ignore JSON parse errors on error bodies
		}
		throw new Error(message);
	}

	return res.json() as Promise<T>;
}

// ---------------------------------------------------------------------------
// Collection helpers
// ---------------------------------------------------------------------------

/**
 * Fetch all projects, with relationships and media auto-populated.
 * No pagination — fetches up to 100 docs (Payload's max default).
 * Increase `limit` if the collection grows beyond that.
 */
export async function getProjects(
	opts: { depth?: number; limit?: number } = {}
): Promise<PayloadListResponse<Project>> {
	const { depth = 2, limit = 100 } = opts;
	return cmsGet<PayloadListResponse<Project>>("/projects", { depth, limit });
}

/**
 * Fetch a single project by its Payload document ID.
 */
export async function getProjectById(id: string, opts: { depth?: number } = {}): Promise<Project> {
	const { depth = 2 } = opts;
	return cmsGet<Project>(`/projects/${id}`, { depth });
}
