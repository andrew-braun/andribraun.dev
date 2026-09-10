<script lang="ts">
	import Container from "$components/layout/containers/Container.svelte";
	import Title from "$components/text/Title.svelte";
	import type { Project } from "$lib/cms/payload";
	import type { ColorVariant } from "$ts/style";
	import { marked } from "marked";

	type Highlight = NonNullable<Project["contribution_highlights"]>[number];

	interface Props {
		highlights?: Highlight[] | null | undefined;
		/** Band tint. A tinted section bleeds to the viewport edges. */
		tone?: ColorVariant | undefined;
	}

	let { highlights, tone }: Props = $props();

	const statements = $derived(
		(highlights ?? []).filter((highlight) => Boolean(highlight.statement?.trim()))
	);
</script>

{#if statements.length}
	<Container
		element="section"
		id="project-contribution"
		spacing="section"
		bleed={Boolean(tone)}
		{tone}
	>
		<Title title="What I Contributed" tag="h2" eyebrow="05" accent="primary" />
		<ul class="contribution-list">
			{#each statements as highlight, index (highlight.id ?? index)}
				<li class="statement">
					<!-- eslint-disable-next-line svelte/no-at-html-tags -- CMS content authored by site owner -->
					{@html marked.parseInline(highlight.statement.trim())}
				</li>
			{/each}
		</ul>
	</Container>
{/if}

<style lang="scss">
	.contribution-list {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: var(--space-2xl) var(--space-3xl);
		padding: 0;
		margin: 0;
		list-style: none;

		.statement {
			padding-left: var(--space-lg);
			line-height: var(--line-height-relaxed);
			border-left: var(--border-width-primary) solid
				color-mix(in srgb, var(--color-primary) 60%, transparent);
		}

		@media (max-width: $breakpoint-sm) {
			grid-template-columns: minmax(0, 1fr);
			gap: var(--space-lg);
		}
	}
</style>
