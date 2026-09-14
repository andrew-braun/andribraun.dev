<script lang="ts">
	import { colorVariants } from "$styles/variables";
	import type { ColorVariant } from "$ts/style";

	interface Props {
		text: string;
		color?: ColorVariant | "random" | undefined;
	}

	let { text, color }: Props = $props();

	const tagColor = $derived.by(() => {
		if (color !== "random") {
			return color;
		}

		const colors = colorVariants;

		return colors[Math.floor(Math.random() * colors.length)];
	});
</script>

<span class={["tag", tagColor]}>
	{text}
</span>

<style lang="scss">
	.tag {
		display: inline-block;
		padding: var(--space-xs) var(--space-sm);
		font-size: var(--font-size-xs-plus);
		font-weight: var(--font-weight-bold);
		letter-spacing: 0.05em;
		white-space: nowrap;
		cursor: default;
		background-color: var(--tag-surface);
		border: 1px solid var(--tag-accent);
		border-radius: var(--border-radius-sm);
		transition: all var(--transition-fs);

		&:hover {
			filter: brightness(1.1);
			transform: scale(1.05);
		}

		&.primary {
			--tag-accent: var(--color-primary);
			--tag-surface: var(--color-primary-surface);
		}

		&.secondary {
			--tag-accent: var(--color-secondary);
			--tag-surface: var(--color-secondary-surface);
		}

		&.accent-1 {
			--tag-accent: var(--color-accent-1);
			--tag-surface: var(--color-accent-1-surface);
		}

		&.accent-2 {
			--tag-accent: var(--color-accent-2);
			--tag-surface: var(--color-accent-2-surface);
		}

		&.accent-3 {
			--tag-accent: var(--color-accent-3);
			--tag-surface: var(--color-accent-3-surface);
		}
	}

	/* Light-theme surfaces are too pale to set a tag apart, so it takes the full accent. */
	:global([data-theme="light"]) .tag {
		background-color: var(--tag-accent);
	}
</style>
