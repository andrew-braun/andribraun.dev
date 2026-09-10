<script lang="ts">
	import type { ColorVariant } from "$ts/style";

	interface Props {
		/** The section's position in the case study, e.g. "02". */
		number: string;
		color?: ColorVariant | undefined;
	}

	let { number, color = "primary" }: Props = $props();
</script>

<div class={["eyebrow", color]} aria-hidden="true">
	<span class="bar"></span>
	<span class="number">{number}</span>
</div>

<style lang="scss">
	.eyebrow {
		display: flex;
		gap: var(--space-md);
		align-items: center;
		margin-bottom: var(--space-md);

		/* Only the bar takes the accent: several brand colours are near-white in light
		   theme, so a coloured number would be unreadable there. */
		&.primary {
			color: var(--color-primary);
		}

		&.secondary {
			color: var(--color-secondary);
		}

		&.accent-1 {
			color: var(--color-accent-1);
		}

		&.accent-2 {
			color: var(--color-accent-2);
		}

		&.accent-3 {
			color: var(--color-accent-3);
		}

		.bar {
			width: var(--space-2xl);
			height: var(--border-width-primary);
			background-color: currentcolor;
			border-radius: var(--border-radius-sm);
		}

		.number {
			font-family: var(--font-family-mono);
			font-size: var(--font-size-xs);
			font-weight: var(--font-weight-medium);
			color: var(--color-text);
			letter-spacing: 0.2em;
		}
	}
</style>
