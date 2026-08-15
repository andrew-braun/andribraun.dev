import { CMS_KEY, CMS_URL } from "$env/static/private";
import type { ContactFormData } from "$root/src/components/forms/Contact/contact.schema";
import { PayloadSDK } from "@payloadcms/sdk";
import type { Config, Media, Project } from "./payload-types";

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
	// Omit `baseInit` entirely when unauthenticated rather than passing undefined.
	...(CMS_KEY
		? { baseInit: { headers: { Authorization: `third-party-access API-Key ${CMS_KEY}` } } }
		: {})
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

/**
 * Fetch a single project by its slug.
 */

export async function getProjectBySlug(slug: Project["slug"]) {
	return sdk.find({
		collection: "projects",
		where: { slug: { equals: slug } },
		depth: 2,
		limit: 1
	});
}

function absoluteUrl(media: Media): Media {
	if (!media?.url) return media;
	return { ...media, url: cmsMediaUrl(media.url) };
}

export function formatProjectData(project: Project) {
	console.log("formatProjectData", project);
	return {
		...project,
		thumbnail:
			project.thumbnail && typeof project.thumbnail === "object"
				? absoluteUrl(project.thumbnail)
				: (project.thumbnail ?? null),
		images: project.images?.map((img) => (typeof img === "object" ? absoluteUrl(img) : img)) ?? null
	};
}

export async function createContactFormEntry({
	formData
}: {
	formData: ContactFormData;
}): Promise<{ success: boolean }> {
	try {
		await sdk.create({
			collection: "forms",
			data: {
				form_name: "contact",
				form_subject: `New contact form submission from ${formData.name}`,
				form_body: JSON.stringify(formData, null, 2),
				sender_data: { name: formData.name, email: formData.email }
			}
		});

		return { success: true };
	} catch {
		return { success: false };
	}
}
