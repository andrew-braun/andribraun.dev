<script lang="ts">
	import Title from "$components/text/Title.svelte";
	import type { Project } from "$lib/cms/payload";
	import { marked } from "marked";

	type Highlight = NonNullable<Project["contribution_highlights"]>[number];

	interface Props {
		highlights?: Highlight[] | null | undefined;
	}

	let { highlights }: Props = $props();

	const statements = $derived(
		(highlights ?? []).filter((highlight) => Boolean(highlight.statement?.trim()))
	);
</script>

{#if statements.length}
	<section id="project-contribution">
		<Title title="What I Contributed" tag="h2" />
		<ul class="contribution-list">
			{#each statements as highlight, index (highlight.id ?? index)}
				<li class="statement">
					<!-- eslint-disable-next-line svelte/no-at-html-tags -- CMS content authored by site owner -->
					{@html marked.parseInline(highlight.statement.trim())}
				</li>
			{/each}
		</ul>
	</section>
{/if}

<style lang="scss">
	.contribution-list {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: var(--space-xl) var(--space-2xl);
		padding: 0;
		margin: 0;
		list-style: none;

		.statement {
			position: relative;
			padding-left: var(--space-lg);
			line-height: var(--line-height-relaxed);

			&::before {
				position: absolute;
				top: 0.6em;
				left: 0;
				width: var(--space-md);
				height: 2px;
				content: "";
				background-color: var(--color-primary);
			}
		}

		@media (max-width: $breakpoint-sm) {
			grid-template-columns: minmax(0, 1fr);
			gap: var(--space-lg);
		}
	}
</style>
