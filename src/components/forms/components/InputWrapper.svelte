<script lang="ts">
	import type { Width } from "$ts/style";
	import type { Snippet } from "svelte";

	// Optionals are spelled `?: T | undefined` because callers forward their own
	// optional props straight through, which is an explicit `undefined` pass.
	interface Props {
		label: string;
		id: string;
		error?: string | undefined;
		width?: Width | undefined;
		required?: boolean | undefined;
		children: Snippet;
	}

	let { label, id, error, width, required, children }: Props = $props();
</script>

<div class={["input-wrapper", width ? `width-${width}` : ""]}>
	<label class="label" for={id}>{label}{required ? " *" : ""}</label>
	{@render children()}
	{#if error}
		<span class="error" id={`${id}-error`}>{error}</span>
	{/if}
</div>

<style lang="scss">
	.input-wrapper {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		padding: var(--space-sm);
		border-radius: var(--border-radius-md);

		&.width-25 {
			width: 25%;
		}

		&.width-33 {
			width: 33.3333%;
		}

		&.width-50 {
			width: 50%;
		}

		&.width-66 {
			width: 66.6667%;
		}

		&.width-75 {
			width: 75%;
		}

		&.width-100 {
			width: 100%;
		}

		.label {
			width: fit-content;
			padding: var(--space-xs);
			border-radius: var(--border-radius-sm);
			transition:
				background-color var(--transition-md),
				color var(--transition-md);
		}

		&:focus-within {
			.label {
				color: var(--color-accent-2-text);
				background: var(--color-accent-2);
			}
		}
	}
</style>
