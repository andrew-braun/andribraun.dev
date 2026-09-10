<script lang="ts">
	import Container from "$components/layout/containers/Container.svelte";
	import SectionEyebrow from "$components/text/SectionEyebrow.svelte";
	import type { Project } from "$lib/cms/payload";
	import { UiIconArrowRight } from "$lib/data/icons";
	import type { ColorVariant } from "$ts/style";

	type Outcome = NonNullable<Project["outcomes"]>[number];

	interface Props {
		challenge?: string | null | undefined;
		outcome?: Outcome | null | undefined;
		/** Band tint. A tinted section bleeds to the viewport edges. */
		tone?: ColorVariant | undefined;
	}

	let { challenge, outcome, tone }: Props = $props();

	const challengeText = $derived(challenge?.trim());
	const outcomeText = $derived(outcome?.statement?.trim());
	const outcomeMetric = $derived(outcome?.metric?.trim());

	// The connector only makes sense with something on both ends of it.
	const hasBothEnds = $derived(Boolean(challengeText) && Boolean(outcomeText));
</script>

{#if challengeText || outcomeText}
	<Container
		element="section"
		id="project-challenge-outcome"
		spacing="section"
		bleed={Boolean(tone)}
		{tone}
	>
		<SectionEyebrow number="02" color="secondary" />
		<div class:connected={hasBothEnds} class="progress">
			{#if challengeText}
				<div class="endpoint">
					<div class="marker">
						<span class="dot challenge"></span>
						<span class="rail"></span>
					</div>
					<h2 class="label">The Challenge</h2>
					<p class="body">{challengeText}</p>
				</div>
			{/if}

			{#if hasBothEnds}
				<div class="connector" aria-hidden="true">
					<UiIconArrowRight class="arrow" width="1.75em" height="1.75em" />
				</div>
			{/if}

			{#if outcomeText}
				<div class="endpoint">
					<div class="marker">
						<span class="rail"></span>
						<span class="dot outcome"></span>
					</div>
					<h2 class="label">The Outcome</h2>
					{#if outcomeMetric}
						<p class="metric">{outcomeMetric}</p>
					{/if}
					<p class="body">{outcomeText}</p>
				</div>
			{/if}
		</div>
	</Container>
{/if}

<style lang="scss">
	.progress {
		--marker-height: 2rem;
		--dot-size: 0.875rem;

		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: var(--space-lg);
		justify-items: center;

		&.connected {
			grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
			justify-items: stretch;
		}

		&:not(.connected) .marker .rail {
			display: none;
		}

		.endpoint {
			display: flex;
			flex-direction: column;
			gap: var(--space-sm);
			max-width: var(--text-max-width);

			.marker {
				display: flex;
				gap: var(--space-sm);
				align-items: center;
				height: var(--marker-height);

				.dot {
					flex: 0 0 auto;
					width: var(--dot-size);
					height: var(--dot-size);
					border-radius: 50%;

					&.challenge {
						background-color: var(--color-primary);
					}

					&.outcome {
						background-color: var(--color-secondary);
					}
				}

				.rail {
					flex: 1 1 auto;
					height: 2px;
					background: linear-gradient(
						to right,
						color-mix(in srgb, var(--color-text) 30%, transparent),
						color-mix(in srgb, var(--color-text) 12%, transparent)
					);
				}
			}

			.label {
				margin: 0;
				font-size: var(--font-size-h4);
				font-weight: var(--font-weight-semibold);
				line-height: var(--line-height-tight);
			}

			.metric {
				margin: 0;
				font-size: var(--font-size-xl);
				font-weight: var(--font-weight-bold);
				line-height: var(--line-height-tight);
				color: var(--color-secondary);
			}

			.body {
				margin: 0;
				line-height: var(--line-height-relaxed);
			}
		}

		.connector {
			display: flex;
			align-items: center;
			height: var(--marker-height);
			color: var(--color-secondary);
		}

		/* The outcome rail leads into its dot, so it mirrors the challenge side. */
		.endpoint:last-child .marker .rail {
			background: linear-gradient(
				to right,
				color-mix(in srgb, var(--color-text) 12%, transparent),
				color-mix(in srgb, var(--color-text) 30%, transparent)
			);
		}

		@media (max-width: $breakpoint-sm) {
			&.connected {
				grid-template-columns: minmax(0, 1fr);
				justify-items: stretch;
			}

			.endpoint .marker .rail {
				display: none;
			}

			.connector {
				justify-content: center;
				height: auto;
				transform: rotate(90deg);
			}
		}
	}
</style>
