<script lang="ts">
	export let color: "accent-1" | "accent-2" | "accent-3" = "accent-1";
	export let size: "normal" | "large" = "normal";

	console.log("size: ", size);
</script>

<span class={`emocionante ${color} font-size-${size}`}><slot /></span>

<style lang="scss">
	.emocionante {
		display: inline-block;
		max-height: 1.6em;
		padding: var(--spacing-xs) var(--spacing-sm);
		border-radius: var(--border-radius-md);
		font-family: "Raleway";
		font-weight: 700;

		&.accent-1 {
			background: var(--color-accent-1);
			color: var(--color-accent-1-text);
		}
		&.accent-2 {
			background: var(--color-accent-2);
			color: var(--color-accent-2-text);
		}
		&.accent-3 {
			background: var(--color-accent-3);
			color: var(--color-accent-3-text);
		}

		&.font-size-normal {
			font-size: inherit;
		}

		&.font-size-large {
			font-size: var(--font-size-xl);
		}
	}
</style>
