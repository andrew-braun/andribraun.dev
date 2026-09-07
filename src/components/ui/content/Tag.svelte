<script lang="ts">
	import type { ColorVariant } from "$root/src/ts/style";
	import { colorVariants } from "$styles/variables";

	let { text, color }: { text: string; color?: ColorVariant | "random" } = $props();

	let tagColor = $derived.by(() => {
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
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-bold);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		white-space: nowrap;
		cursor: default;
		border-radius: var(--border-radius-sm);
		opacity: 0.85;
		transition: var(--transition-md);

		&:hover {
			opacity: 1;
		}

		&.primary {
			// color: var(--color-primary);
			border: 1px solid var(--color-primary);
		}

		&.secondary {
			// color: var(--color-secondary);
			border: 1px solid var(--color-secondary);
		}

		&.accent-1 {
			// color: var(--color-accent-1);
			border: 1px solid var(--color-accent-1);
		}

		&.accent-2 {
			// color: var(--color-accent-2);
			border: 1px solid var(--color-accent-2);
		}

		&.accent-3 {
			// color: var(--color-accent-3);
			border: 1px solid var(--color-accent-3);
		}
	}

	:global([data-theme="light"]) {
		.tag {
			&.primary {
				// color: var(--color-primary-text);
				background: var(--color-primary);
			}

			&.secondary {
				// color: var(--color-secondary-text);
				background: var(--color-secondary);
			}

			&.accent-1 {
				// color: var(--color-accent-1-text);
				background: var(--color-accent-1);
			}

			&.accent-2 {
				// color: var(--color-accent-2-text);
				background: var(--color-accent-2);
			}

			&.accent-3 {
				// color: var(--color-accent-3-text);
				background: var(--color-accent-3);
			}
		}
	}
</style>
