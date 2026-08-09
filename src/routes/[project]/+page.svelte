<script lang="ts">
	import Container from "$components/layout/containers/Container.svelte";
	import ProjectHero from "$components/sections/hero/ProjectHero.svelte";
	import Markdown from "$components/text/Markdown.svelte";
	import Tag from "$components/ui/content/Tag.svelte";
	import type { Technology } from "$lib/cms/payload-types";

	let { data } = $props();
	console.log(data);
	const { project } = $derived(data);
	const { description_markdown } = $derived(project);
	const { metadata } = $derived(project);
	const technologies: Technology[] = $derived.by(() => {
		return (
			metadata?.technologies?.filter(
				(tech): tech is Technology => !!tech && typeof tech !== "number"
			) ?? []
		);
	});
</script>

<ProjectHero {project} />

<Container>
	{#if technologies?.length}
		<div class="technology-tags">
			{#each technologies as technology (technology?.id)}
				{#if technology?.name}
					<Tag text={technology?.name} color="random" />
				{/if}
			{/each}
		</div>
	{/if}

	{#if description_markdown}
		<Markdown text={description_markdown} />
	{/if}
</Container>

<style lang="scss">
	.technology-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
	}
</style>
