import { CMS_KEY, CMS_URL } from "$env/static/private";
import { PayloadSDK } from "@payloadcms/sdk";
import type { Config, Project } from "./payload-types";

// Re-export types consumers are likely to need
export type { Media, Project, Technology } from "./payload-types";

/**
 * Converts a relative Payload media URL (e.g. /api/media/file/...)
 * to an absolute URL using the configured CMS base URL.
 */
export function cmsMediaUrl(relativeUrl: string): string {
	if (relativeUrl.startsWith("http")) return relativeUrl;
	return `${CMS_URL}${relativeUrl}`;
}

// ---------------------------------------------------------------------------
// SDK singleton
// ---------------------------------------------------------------------------

const sdk = new PayloadSDK<Config>({
	baseURL: `${CMS_URL}/api`,
	baseInit: CMS_KEY
		? { headers: { Authorization: `third-party-access API-Key ${CMS_KEY}` } }
		: undefined
});

// ---------------------------------------------------------------------------
// Collection helpers
// ---------------------------------------------------------------------------

/**
 * Fetch all projects, with relationships and media auto-populated.
 * No pagination — fetches up to 100 docs (Payload's max default).
 * Increase `limit` if the collection grows beyond that.
 */
export async function getProjects(opts: { depth?: number; limit?: number } = {}) {
	const { depth = 2, limit = 100 } = opts;
	return sdk.find({ collection: "projects", depth, limit });
}

/**
 * Fetch a single project by its Payload document ID.
 */
export async function getProjectById(id: Project["id"], opts: { depth?: number } = {}) {
	const { depth = 2 } = opts;
	return sdk.findByID({ collection: "projects", id, depth });
}

export async function createFormEntry({ formData }: { formData: Record<string, any> }) {
	try {
		const response = await sdk.create({
			collection: "forms",
			data: formData
		});

		return response;
	} catch (err) {
		console.error("Error creating form entry in Payload:", err);
		return { success: false, error: err instanceof Error ? err.message : "Unknown error" };
	}
}

export async function createContactFormEntry({ formData }: { formData: Record<string, any> }) {
	try {
		const data = {
			form_name: "contact",
			form_subject: `New contact form submission from ${formData.name}`,
			form_body: JSON.stringify(formData.message, null, 2)
				.replace(/\n/g, "<br>")
				.replace(/ /g, "&nbsp;"),
			sender_data: { name: formData.name, email: formData.email }
		};

		return await createFormEntry({ formData: data });
	} catch (err) {
		console.error("Error creating contact form entry in Payload:", err);
		return { success: false, error: err instanceof Error ? err.message : "Unknown error" };
	}
}
