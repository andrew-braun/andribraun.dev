<script lang="ts">
	import type { Project } from "$lib/cms/payload";
	import type { ColorVariant } from "$ts/style";
	import BasicProjectCard from "./BasicProjectCard.svelte";
	import VisualProjectCard from "./VisualProjectCard.svelte";

	interface Props {
		project: Project;
		color: ColorVariant;
	}

	const { project, color }: Props = $props();
</script>

{#if project.display?.card_type === "visual"}
	<VisualProjectCard {project} />
{:else}
	<BasicProjectCard {project} {color} />
{/if}
