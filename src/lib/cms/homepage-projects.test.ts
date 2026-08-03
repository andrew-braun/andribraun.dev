import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Project } from "$lib/cms/payload";
import { getProjects } from "$lib/cms/payload";
import { load } from "../../routes/+page.server";

vi.mock("$lib/cms/payload", () => ({
	cmsMediaUrl: (url: string) => `https://cms.example.test${url}`,
	getProjects: vi.fn()
}));

const visibleProject: Project = {
	id: 1,
	title: "Visible project",
	display: { hide: false },
	createdAt: "2026-01-01T00:00:00.000Z",
	updatedAt: "2026-01-01T00:00:00.000Z"
};

const hiddenProject: Project = {
	id: 2,
	title: "Hidden project",
	display: { hide: true },
	createdAt: "2026-01-01T00:00:00.000Z",
	updatedAt: "2026-01-01T00:00:00.000Z"
};

describe("homepage project loading", () => {
	beforeEach(() => {
		vi.mocked(getProjects).mockResolvedValue({
			docs: [visibleProject, hiddenProject]
		} as Awaited<ReturnType<typeof getProjects>>);
	});

	it("excludes projects marked hidden in the CMS", async () => {
		// `PageServerLoad` widens the return type to include `void`; narrow it back.
		const { projects } = (await load({} as never)) as { projects: Project[] };

		expect(projects.map((project) => project.id)).toEqual([visibleProject.id]);
	});
});
