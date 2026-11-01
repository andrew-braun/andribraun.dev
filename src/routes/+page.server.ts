import { formatProjectData, getVisibleProjects } from "$lib/cms/payload";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	const docs = await getVisibleProjects();
	const projects = docs.map((project) => formatProjectData(project));

	return { projects };
};
