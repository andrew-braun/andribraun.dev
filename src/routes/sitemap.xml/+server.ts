import { getVisibleProjects } from "$lib/cms/payload";
import { siteData } from "$lib/data/site/site-data";
import type { RequestHandler } from "./$types";

export const prerender = true;

export const GET: RequestHandler = async () => {
	const docs = await getVisibleProjects({ depth: 0 });

	const projectUrls = docs.map(
		(project) =>
			`<url><loc>${siteData.url}/${project.slug}</loc><lastmod>${project.updatedAt}</lastmod></url>`
	);

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url><loc>${siteData.url}/</loc></url>
${projectUrls.join("\n")}
</urlset>`;

	return new Response(body, { headers: { "Content-Type": "application/xml" } });
};
