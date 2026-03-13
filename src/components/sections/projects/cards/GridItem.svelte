<script lang="ts">
	import type { Project } from "$root/src/lib/cms/payload-types";
	import type { ColorVariant } from "$root/src/ts/style";
	import CtaCard from "./CtaCard.svelte";
	import ProjectCard from "./ProjectCard.svelte";
	import TerminalCard from "./TerminalCard.svelte";
	import TestimonialCard from "./TestimonialCard.svelte";

	interface Props {
		type: "project" | "testimonial" | "cta" | "terminal";
		project?: Project;
		testimonial?: any;
		color?: ColorVariant;
	}

	const { type, project, testimonial, color }: Props = $props();
</script>

{#if type === "project" && project}
	<ProjectCard {project} color={color ?? "primary"} />
{:else if type === "testimonial" && testimonial}
	<TestimonialCard {testimonial} />
{:else if type === "terminal"}
	<TerminalCard />
{:else if type === "cta"}
	<CtaCard />
{/if}
