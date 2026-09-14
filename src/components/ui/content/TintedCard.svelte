<script lang="ts">
	import type { ColorVariant } from "$ts/style";
	import type { Snippet } from "svelte";
	import type { ClassValue } from "svelte/elements";

	interface Props {
		children: Snippet;
		color?: ColorVariant | undefined;
		class?: ClassValue;
	}

	let { children, color = "primary", class: className }: Props = $props();
</script>

<div class={["tinted-card", color, className]}>
	<span class="bar" aria-hidden="true"></span>
	{@render children()}
</div>

<style lang="scss">
	/* Block, not flex: children are often bare inline text, and a flex container would turn
	   every text run and inline element into its own stacked item. */
	.tinted-card {
		padding: var(--space-lg);
		line-height: var(--line-height-relaxed);
		background-color: var(--card-surface);
		border-radius: var(--border-radius-lg);

		&.primary {
			--card-accent: var(--color-primary);
			--card-surface: var(--color-primary-surface);
		}

		&.secondary {
			--card-accent: var(--color-secondary);
			--card-surface: var(--color-secondary-surface);
		}

		&.accent-1 {
			--card-accent: var(--color-accent-1);
			--card-surface: var(--color-accent-1-surface);
		}

		&.accent-2 {
			--card-accent: var(--color-accent-2);
			--card-surface: var(--color-accent-2-surface);
		}

		&.accent-3 {
			--card-accent: var(--color-accent-3);
			--card-surface: var(--color-accent-3-surface);
		}

		/* The section eyebrow's bar, so a card reads as part of the same system. */
		.bar {
			display: block;
			width: var(--space-2xl);
			height: var(--border-width-primary);
			margin-bottom: var(--space-md);
			background-color: var(--card-accent);
			border-radius: var(--border-radius-sm);
		}
	}
</style>
