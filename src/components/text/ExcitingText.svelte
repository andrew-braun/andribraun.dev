<script lang="ts">
	export let color: "accent-1" | "accent-2" | "accent-3" = "accent-1";
	export let size: "normal" | "large" = "normal";
</script>

<span class={`emocionante ${color} font-size-${size}`}><slot /></span>

<style lang="scss">
	.emocionante {
		box-sizing: content-box;
		display: inline-block;
		max-height: 1.6em;
		padding: var(--space-xs) var(--space-sm);
		font-family: var(--font-family-heading);
		font-weight: 700;
		border-radius: var(--border-radius-md);

		&.accent-1 {
			color: var(--color-accent-1-fg);
			background: var(--color-accent-1);
		}

		&.accent-2 {
			color: var(--color-accent-2-fg);
			background: var(--color-accent-2);
		}

		&.accent-3 {
			color: var(--color-accent-3-fg);
			background: var(--color-accent-3);
		}

		&.font-size-normal {
			font-size: inherit;
		}

		&.font-size-large {
			font-size: var(--font-size-xl);
		}
	}
</style>
