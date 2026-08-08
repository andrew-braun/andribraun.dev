import { formatProjectData, getProjectBySlug } from "$lib/cms/payload";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
	const projectEntity = await getProjectBySlug(params.project);

	if (
		!projectEntity ||
		!projectEntity.docs ||
		projectEntity.docs.length === 0 ||
		!projectEntity.docs[0]
	) {
		error(404, "Not found");
	}

	const project = formatProjectData(projectEntity.docs[0]);

	if (project) {
		return { project };
	}

	error(404, "Not found");
};
