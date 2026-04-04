<script lang="ts">
	import type { Project } from "$lib/cms/payload";
	import type { ComponentProps } from "svelte";

	import Title from "$components/text/Title.svelte";
	import Bento from "$components/ui/layouts/Bento.svelte";
	import { assignColor } from "$styles/variables";
	import GridItem from "./cards/GridItem.svelte";

	interface Props {
		projects: Project[];
	}

	const { projects }: Props = $props();

	const gridItems = $derived.by(() => {
		const items: ComponentProps<typeof GridItem>[] = [
			{
				type: "terminal"
			}
		];

		// Testimonial frequency--how often to insert a testimonial card in the grid
		const testimonialFrequency = 3;
		// Where to put the CTA card--after how many project cards
		const ctaCardPosition = Math.min(7, projects.length + 1);

		projects

			.map(
				(project) =>
					({
						...project,
						display: { ...project.display, order: project.display?.order ?? 999 }
					}) as Project
			) // Ensure all projects have an order for sorting
			.sort((a, b) => (a?.display?.order as number) - (b?.display?.order as number))
			.forEach((project, index) => {
				// Check if we should insert a testimonial card
				if (index > 0 && index % testimonialFrequency === 0) {
					items.push({
						type: "testimonial",
						testimonial: {
							quote:
								"This is a testimonial quote that highlights the impact of the projects showcased here.",
							author: "Jane Doe, CEO of Tech Company",
							context: "Jane worked with Andri on a project and provided this feedback."
						}
					});
				}

				// Standard project card
				items.push({
					type: "project",
					project
				});
			});

		// Insert the CTA card after the specified number of project cards, or earlier if there are fewer projects
		if (projects.length > 0) {
			items.splice(ctaCardPosition, 0, {
				type: "cta"
			});
		}

		return items;
	});
</script>

<section id="portfolio" class="page-section">
	<Title title="Projects" tag="h2" />
	<Bento items={gridItems}>
		{#snippet cellSnippet(item: any, index: number)}
			<GridItem {...item} color={assignColor(index)} />
		{/snippet}
	</Bento>
</section>
