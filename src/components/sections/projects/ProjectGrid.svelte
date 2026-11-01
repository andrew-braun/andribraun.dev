<script lang="ts">
	import type { Project } from "$lib/cms/payload";
	import type { ComponentProps } from "svelte";

	import { testimonials } from "$components/sections/projects/projects-data";
	import Title from "$components/text/Title.svelte";
	import Bento from "$components/ui/layouts/Bento.svelte";
	import { assignColor } from "$styles/variables";
	import GridItem from "./cards/GridItem.svelte";

	interface Props {
		projects: Project[];
	}

	// Projects with no explicit order sort to the back.
	const UNORDERED = 999;

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
			.toSorted((a, b) => (a.display?.order ?? UNORDERED) - (b.display?.order ?? UNORDERED))
			.forEach((project, index) => {
				// The nth testimonial follows every `testimonialFrequency`-th project. None yet means none shown.
				const testimonial =
					index % testimonialFrequency === 0
						? testimonials[index / testimonialFrequency - 1]
						: undefined;

				if (testimonial) {
					items.push({ type: "testimonial", testimonial });
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
	<Title title="Projects" subtitle="selected from recent work" tag="h2" />
	<Bento items={gridItems}>
		{#snippet cellSnippet(item, index)}
			<GridItem {...item} color={assignColor(index)} />
		{/snippet}
	</Bento>
</section>
