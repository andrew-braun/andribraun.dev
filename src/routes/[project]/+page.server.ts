import { populatedMedia } from "$lib/cms/media";
import { formatProjectData, getProjectBySlug } from "$lib/cms/payload";
import { siteData } from "$lib/data/site/site-data";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
	const { docs } = await getProjectBySlug(params.project);
	const projectDoc = docs[0];

	if (!projectDoc || projectDoc.display?.hide) {
		error(404, "Not found");
	}

	const project = formatProjectData(projectDoc);
	const image = populatedMedia(project.images?.[0])?.url;

	return {
		project,
		seo: {
			title: `${project.title ?? project.slug} | Andri Braun`,
			description: project.summary ?? siteData.description,
			// Built conditionally: `exactOptionalPropertyTypes` rejects `image: undefined`.
			...(image ? { image } : {})
		}
	};
};
