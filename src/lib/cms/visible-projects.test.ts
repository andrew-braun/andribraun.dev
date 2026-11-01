import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Project } from "$lib/cms/payload";
import { getVisibleProjects } from "$lib/cms/payload";

const find = vi.hoisted(() => vi.fn());

vi.mock("$env/static/private", () => ({ CMS_KEY: "", CMS_URL: "https://cms.example.test" }));
vi.mock("@payloadcms/sdk", () => ({
	PayloadSDK: class {
		find = find;
	}
}));

const visibleProject: Project = {
	id: 1,
	title: "Visible project",
	slug: "visible-project",
	display: { hide: false },
	createdAt: "2026-01-01T00:00:00.000Z",
	updatedAt: "2026-01-01T00:00:00.000Z"
};

const hiddenProject: Project = {
	id: 2,
	title: "Hidden project",
	slug: "hidden-project",
	display: { hide: true },
	createdAt: "2026-01-01T00:00:00.000Z",
	updatedAt: "2026-01-01T00:00:00.000Z"
};

describe("getVisibleProjects", () => {
	beforeEach(() => {
		find.mockResolvedValue({ docs: [visibleProject, hiddenProject] });
	});

	it("excludes projects marked hidden in the CMS", async () => {
		const projects = await getVisibleProjects();

		expect(projects.map((project) => project.id)).toEqual([visibleProject.id]);
	});
});
