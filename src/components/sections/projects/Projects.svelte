<script lang="ts">
	import type { Project, Technology } from "$lib/cms/payload";
	import Title from "$components/text/Title.svelte";
	import TerminalPlaceholderCard from "./cards/TerminalPlaceholderCard.svelte";
	import ProjectCard from "./cards/ProjectCard.svelte";
	import VisualProjectCard from "./cards/VisualProjectCard.svelte";
	import TestimonialCard from "./cards/TestimonialCard.svelte";
	import CtaCard from "./cards/CtaCard.svelte";
	import { testimonials } from "./projects-data";

	interface Props {
		projects: Project[];
	}

	let { projects }: Props = $props();

	const COLOR_CYCLE = ["primary", "secondary", "accent-1", "accent-2", "accent-3"] as const;
	type ColorVariant = (typeof COLOR_CYCLE)[number];

	function getColor(index: number): ColorVariant {
		return COLOR_CYCLE[index % COLOR_CYCLE.length];
	}

	function getFirstImage(project: Project): { url: string; alt: string } | null {
		if (project.thumbnail && typeof project.thumbnail === "object" && project.thumbnail.url) {
			return { url: project.thumbnail.url, alt: project.thumbnail.alt };
		}
		if (project.images && project.images.length > 0) {
			const first = project.images[0];
			if (typeof first === "object" && first.url) {
				return { url: first.url, alt: first.alt };
			}
		}
		return null;
	}

	function getHref(project: Project): string {
		return project.liveLink ?? project.snapshotLink ?? project.githubLink ?? "#";
	}

	function getTechnologies(project: Project): Technology[] {
		if (!project.metadata?.technologies) return [];
		return project.metadata.technologies.filter(
			(t): t is Technology => typeof t === "object"
		);
	}

	function excerpt(markdown: string | null | undefined, maxLength = 160): string {
		if (!markdown) return "";
		const text = markdown
			.replace(/^#{1,6}\s+.+$/gm, "")
			.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
			.replace(/<span[^>]*>([^<]*)<\/span>/g, "$1")
			.replace(/<[^>]+>/g, "")
			.replace(/`[^`]+`/g, "")
			.replace(/\*\*([^*]+)\*\*/g, "$1")
			.replace(/\*([^*]+)\*/g, "$1")
			.replace(/\r\n/g, "\n")
			.trim();
		const firstPara = text.split("\n\n").find((p) => p.trim().length > 20);
		if (!firstPara) return "";
		const trimmed = firstPara.trim();
		return trimmed.length > maxLength ? trimmed.slice(0, maxLength).trim() + "…" : trimmed;
	}

	type CardSize = "small" | "wide" | "tall";

	type GridItem =
		| { type: "terminal" }
		| { type: "project"; project: Project; colorIndex: number; showImage: boolean; size: CardSize }
		| { type: "testimonial"; testimonial: (typeof testimonials)[number] }
		| { type: "cta" };

	const gridItems = $derived.by((): GridItem[] => {
		const items: GridItem[] = [{ type: "terminal" }];
		let textCardIndex = 0;
		let testimonialIndex = 0;

		projects.forEach((project, i) => {
			const hasImg = getFirstImage(project) !== null;
			const showImage = hasImg && project.display?.card_type !== "text";

			// Use CMS card_size if set; otherwise default:
			// visual cards → wide, text cards alternate small/tall for visual rhythm
			const size: CardSize =
				project.display?.card_size ??
				(showImage ? "wide" : i % 2 === 0 ? "small" : "tall");

			items.push({
				type: "project",
				project,
				colorIndex: showImage ? 0 : textCardIndex++,
				showImage,
				size
			});

			// Interleave a testimonial after every 4th project
			if ((i + 1) % 4 === 0 && testimonialIndex < testimonials.length) {
				items.push({ type: "testimonial", testimonial: testimonials[testimonialIndex++] });
			}
		});

		items.push({ type: "cta" });
		return items;
	});
</script>

<section id="projects" class="page-section">
	<Title title="Projects" tag="h2" />
	<div class="bento-grid">
		{#each gridItems as item (item.type === "project" ? item.project.id : item.type === "testimonial" ? item.testimonial.author : item.type)}
			{#if item.type === "terminal"}
				<div class="cell cell--terminal">
					<TerminalPlaceholderCard />
				</div>
			{:else if item.type === "project"}
				<div
					class="cell"
					class:cell--wide={item.size === "wide"}
					class:cell--tall={item.size === "tall"}
				>
					{#if item.showImage}
						{@const image = getFirstImage(item.project)}
						{#if image}
							<VisualProjectCard
								title={item.project.title ?? ""}
								imageUrl={image.url}
								imageAlt={image.alt}
								href={getHref(item.project)}
							/>
						{/if}
					{:else}
						<ProjectCard
							title={item.project.title ?? ""}
							description={excerpt(item.project.description_markdown)}
							technologies={getTechnologies(item.project)}
							href={getHref(item.project)}
							color={getColor(item.colorIndex)}
						/>
					{/if}
				</div>
			{:else if item.type === "testimonial"}
				<div class="cell cell--wide">
					<TestimonialCard
						quote={item.testimonial.quote}
						author={item.testimonial.author}
						context={item.testimonial.context}
					/>
				</div>
			{:else if item.type === "cta"}
				<div class="cell">
					<CtaCard />
				</div>
			{/if}
		{/each}
	</div>
</section>

<style lang="scss">
	.bento-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-auto-rows: minmax(220px, auto);
		gap: var(--spacing-md);
		grid-auto-flow: dense;

		@media (max-width: $breakpoint-md) {
			grid-template-columns: repeat(2, 1fr);
		}

		@media (max-width: $breakpoint-sm) {
			grid-template-columns: 1fr;
			grid-auto-rows: minmax(180px, auto);
		}
	}

	.cell {
		&--terminal {
			grid-column: span 2;
			grid-row: span 2;
		}

		&--wide {
			grid-column: span 2;

			@media (max-width: $breakpoint-sm) {
				grid-column: span 1;
			}
		}

		&--tall {
			grid-row: span 2;
		}
	}
</style>
