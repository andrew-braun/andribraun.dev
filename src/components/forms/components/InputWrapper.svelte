<script lang="ts">
	import type { Width } from "$root/src/ts/style";

	interface Props {
		label: string;
		name: string;
		error?: string;
		width?: Width;
		required?: boolean;
		children: () => any;
	}

	let { label, name, error, width, required, children }: Props = $props();
</script>

<div class={["input-wrapper", width ? `width-${width}` : ""]}>
	<label class="label" for={name}>{label}{required ? " *" : ""}</label>
	{@render children()}
	{#if error}
		<span class="error">{error}</span>
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
