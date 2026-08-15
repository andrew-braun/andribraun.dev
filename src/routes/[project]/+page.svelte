<script lang="ts">
	import ImageText from "$components/layout/columns/ImageText.svelte";
	import TwoColumn from "$components/layout/columns/TwoColumn.svelte";
	import Container from "$components/layout/containers/Container.svelte";
	import ProjectHero from "$components/sections/hero/ProjectHero.svelte";
	import Markdown from "$components/text/Markdown.svelte";
	import Title from "$components/text/Title.svelte";
	import Tag from "$components/ui/content/Tag.svelte";
	import type { Technology } from "$lib/cms/payload-types";

	let { data } = $props();
	console.log(data);
	const { project } = $derived(data);
	const { intro_markdown, tech_stack_markdown } = $derived(project);
	const { metadata } = $derived(project);
	const technologies: Technology[] = $derived.by(() => {
		return (
			metadata?.technologies?.filter(
				(tech): tech is Technology => !!tech && typeof tech !== "number"
			) ?? []
		);
	});
</script>

{#snippet techStackTechnologies()}
	{#if technologies?.length}
		<div id="project-technologies" class="technology-tags">
			{#each technologies as technology (technology?.id)}
				{#if technology?.name}
					<Tag text={technology?.name} color="random" />
				{/if}
			{/each}
		</div>
	{/if}
{/snippet}

{#snippet techStackMarkdown()}
	{#if tech_stack_markdown}
		<Title title="Tech Stack" tag="h2" />
		<Markdown text={tech_stack_markdown} />
	{/if}
{/snippet}

<ProjectHero {project} />

<Container>
	<div class="project-overview">
		{#if intro_markdown}
			<section id="project-introduction">
				<ImageText
					image={project?.images?.[1]}
					text={intro_markdown}
					widerSide="right"
					smallColumn="50%"
					imageSide="right"
					titleProps={{ title: "Introduction", tag: "h2" }}
				/>
			</section>
		{/if}

		{#if technologies?.length || tech_stack_markdown}
			<section id="project-technologies">
				<TwoColumn
					smallColumn="33%"
					widerSide="right"
					leftContent={techStackTechnologies}
					rightContent={techStackMarkdown}
				/>
			</section>
		{/if}
	</div>
</Container>

<style lang="scss">
	.project-overview {
		display: flex;
		flex-direction: column;
		gap: calc(var(--spacing-vertical-section) * 2);
	}

	.technology-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-md);
	}
</style>
