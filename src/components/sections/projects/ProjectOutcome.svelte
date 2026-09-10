<script lang="ts">
	import Container from "$components/layout/containers/Container.svelte";
	import Markdown from "$components/text/Markdown.svelte";
	import Title from "$components/text/Title.svelte";
	import type { Project } from "$lib/cms/payload";
	import { assignColor } from "$styles/variables";
	import type { ColorVariant } from "$ts/style";

	type Outcome = NonNullable<Project["outcomes"]>[number];

	interface Props {
		outcomes?: Outcome[] | null | undefined;
		markdown?: string | null | undefined;
		/** Band tint. A tinted section bleeds to the viewport edges. */
		tone?: ColorVariant | undefined;
	}

	let { outcomes, markdown, tone }: Props = $props();

	const cards = $derived((outcomes ?? []).filter((outcome) => Boolean(outcome.statement?.trim())));
	const narrative = $derived(markdown?.trim());
</script>

{#if cards.length || narrative}
	<Container element="section" id="project-outcome" spacing="section" bleed={Boolean(tone)} {tone}>
		<Title title="Outcome" tag="h2" eyebrow="06" accent="accent-2" />
		<div class:no-cards={!cards.length} class="outcome-layout">
			{#if cards.length}
				<ul class="impact-cards">
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
		</div>
	</Container>
{/if}

<style lang="scss">
	.outcome-layout {
		display: grid;
		grid-template-columns: 2fr 3fr;
		gap: var(--space-xl);

		/* With no cards beside it, the narrative centres rather than leaving a dead column. */
		&.no-cards {
			grid-template-columns: minmax(0, 1fr);

			.narrative {
				grid-column: 1;
				justify-self: center;
			}
		}

		@media (max-width: $breakpoint-sm) {
			grid-template-rows: auto;
			grid-template-columns: 1fr;
		}

		.impact-cards {
			display: flex;
			flex-direction: column;
			grid-column: 1;
			gap: var(--space-lg);
			padding: 0;
			margin: 0;
			list-style: none;

			@media (max-width: $breakpoint-sm) {
				grid-row: 2;
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
			position: sticky;
			top: var(--header-max-height-scrolled);
			grid-column: 2;
			align-self: start;

			@media (max-width: $breakpoint-sm) {
				position: relative;
				top: unset;
				grid-row: 1;
				grid-column: 1;
			}
		}
	}
</style>
