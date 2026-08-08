import { formatProjectData, getProjects } from "$lib/cms/payload";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	const { docs } = await getProjects();

	const projects = docs
		.filter((project) => !project.display?.hide)
		.map((project) => formatProjectData(project));

	return { projects };
};
