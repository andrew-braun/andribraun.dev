<script lang="ts">
	import type { Testimonial } from "$components/sections/projects/projects-data";
	import type { Project } from "$lib/cms/payload";
	import type { ColorVariant } from "$ts/style";
	import CtaCard from "./CtaCard.svelte";
	import ProjectCard from "./ProjectCard.svelte";
	import TerminalCard from "./TerminalCard.svelte";
	import TestimonialCard from "./TestimonialCard.svelte";

	// A discriminated union so each cell type carries exactly the data it needs.
	// `{ type: "cta", project }` is now a type error rather than a silent no-op,
	// and the runtime `&& project` guards below are no longer necessary.
	type GridItemContent =
		| { type: "project"; project: Project }
		| { type: "testimonial"; testimonial: Testimonial }
		| { type: "cta" }
		| { type: "terminal" };

	type Props = GridItemContent & { color?: ColorVariant };

	// Left undestructured on purpose: destructuring discards the union narrowing.
	const props: Props = $props();
</script>

{#if props.type === "project"}
	<ProjectCard project={props.project} color={props.color ?? "primary"} />
{:else if props.type === "testimonial"}
	<TestimonialCard testimonial={props.testimonial} />
{:else if props.type === "terminal"}
	<TerminalCard />
{:else}
	<CtaCard />
{/if}
