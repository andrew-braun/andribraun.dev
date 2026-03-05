import type { Media } from "$lib/cms/payload";
import { cmsMediaUrl, getProjects } from "$lib/cms/payload";
import type { PageServerLoad } from "./$types";

function absoluteUrl(media: Media): Media {
	if (!media.url) return media;
	return { ...media, url: cmsMediaUrl(media.url) };
}

export const load: PageServerLoad = async () => {
	const { docs } = await getProjects();

	const projects = docs.map((project) => ({
		...project,
		thumbnail:
			project.thumbnail && typeof project.thumbnail === "object"
				? absoluteUrl(project.thumbnail)
				: project.thumbnail,
		images: project.images?.map((img) => (typeof img === "object" ? absoluteUrl(img) : img)) ?? null
	}));

	return { projects };
};
