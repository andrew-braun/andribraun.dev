<script lang="ts">
	import Markdown from "$components/text/Markdown.svelte";
	import Title from "$components/text/Title.svelte";
	import type { Project } from "$lib/cms/payload";
	import { assignColor } from "$styles/variables";

	type Outcome = NonNullable<Project["outcomes"]>[number];

	interface Props {
		outcomes?: Outcome[] | null | undefined;
		markdown?: string | null | undefined;
	}

	let { outcomes, markdown }: Props = $props();

	const cards = $derived((outcomes ?? []).filter((outcome) => Boolean(outcome.statement?.trim())));
	const narrative = $derived(markdown?.trim());
</script>

{#if cards.length || narrative}
	<section id="project-outcome">
		<Title title="Outcome" tag="h2" />
		{#if cards.length}
			<ul class:single={cards.length === 1} class="impact-cards">
				{#each cards as outcome, index (outcome.id ?? index)}
					<li class={["card", assignColor(index)]}>
						{#if outcome.metric?.trim()}
							<p class="metric">{outcome.metric.trim()}</p>
						{/if}
						<p class="statement">{outcome.statement.trim()}</p>
					</li>
				{/each}
			</ul>
		{/if}
		{#if narrative}
			<div class="narrative">
				<Markdown text={narrative} maxWidth="var(--text-max-width)" />
			</div>
		{/if}
	</section>
{/if}

<style lang="scss">
	.impact-cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
		gap: var(--space-lg);
		padding: 0;
		margin: 0;
		list-style: none;

		/* A lone card stretched across the full page reads as a banner, not a result. */
		&.single {
			grid-template-columns: minmax(0, var(--text-max-width));
		}

		.card {
			display: flex;
			flex-direction: column;
			gap: var(--space-sm);
			padding: var(--space-lg);
			background-color: var(--color-surface-raised);
			border-top: var(--border-width-primary) solid var(--card-accent);
			border-radius: var(--border-radius-lg);

			&.primary {
				--card-accent: var(--color-primary);
			}

			&.secondary {
				--card-accent: var(--color-secondary);
			}

			&.accent-1 {
				--card-accent: var(--color-accent-1);
			}

			&.accent-2 {
				--card-accent: var(--color-accent-2);
			}

			&.accent-3 {
				--card-accent: var(--color-accent-3);
			}

			/* A metric is emphasised when present, but its absence must not leave a gap. */
			.metric {
				margin: 0;
				font-size: var(--font-size-xl);
				font-weight: var(--font-weight-bold);
				line-height: var(--line-height-tight);
				color: var(--card-accent);
			}

			.statement {
				margin: 0;
				line-height: var(--line-height-relaxed);
			}
		}

		@media (max-width: $breakpoint-sm) {
			gap: var(--space-md);
		}
	}

	.narrative {
		margin-top: var(--space-xl);
	}
</style>
