import { formatProjectData, getProjectBySlug } from "$lib/cms/payload";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
	const { docs } = await getProjectBySlug(params.project);
	const projectDoc = docs[0];

	if (!projectDoc || projectDoc.display?.hide) {
		error(404, "Not found");
	}

	return { project: formatProjectData(projectDoc) };
};
