<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	export let type: HTMLButtonAttributes['type'] = 'button';
	export let variant: 'filled' | 'outline' = 'filled';
	export let size = 'medium';
	export let disabled: boolean = false;
</script>

<button {type} class={`btn btn-${variant} btn-${size}`} {disabled} on:click>
	<slot></slot>
</button>

<style scoped>
	/* Base button styles */
	.btn {
		display: inline-block;
		padding: var(--btn-padding, 0.5rem 1rem);
		border-radius: var(--border-radius-md);
		cursor: pointer;
		border: none;
		text-align: center;
		transition: all var(--transition-md);
		background-color: var(--color-background);
		color: var(--color-text);
		font-size: var(--font-size-md);
	}

	.btn-filled {
		background-color: var(--color-primary);
		color: var(--color-text-dark);
	}

	.btn-outline {
		background-color: transparent;
		border: 1px solid var(--color-secondary);
	}

	/* Size variants */
	.btn-small {
		font-size: var(--font-size-sm);
		padding: var(--spacing-xs) var(--spacing-sm);
	}

	.btn-medium {
		font-size: var(--font-size-md);
		padding: var(--spacing-sm) var(--spacing-md);
	}

	.btn-large {
		font-size: var(--font-size-lg);
		padding: var(--spacing-md) var(--spacing-lg);
	}

	/* Disabled state */
	.btn[disabled] {
		cursor: not-allowed;
		opacity: 0.6;
	}
</style>
