<script lang="ts">
	interface Props {
		label: string;
		name: string;
		error?: string;
		children: () => any;
	}

	let { label, name, error, children }: Props = $props();
</script>

<div class="input-wrapper">
	<label class="label" for={name}>{label}</label>
	{@render children()}
	{#if error}
		<span class="error">{error}</span>
	{/if}
</div>

<style lang="scss">
	.input-wrapper {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}
</style>
