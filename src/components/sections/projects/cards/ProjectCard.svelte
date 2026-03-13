<script lang="ts">
	import type { Project } from "$lib/cms/payload";
	import type { ColorVariant } from "$root/src/ts/style";
	import BasicProjectCard from "./BasicProjectCard.svelte";
	import VisualProjectCard from "./VisualProjectCard.svelte";

	interface Props {
		project: Project;
		color: ColorVariant;
	}

	const { project, color }: Props = $props();

	// Detect project card type
	// svelte-ignore state_referenced_locally
	const { display } = project || {};
	const cardType = display?.card_type;
</script>

{#if cardType === "visual"}
	<VisualProjectCard {project} />
{:else}
	<BasicProjectCard {project} {color} />
{/if}
