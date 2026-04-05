<script lang="ts">
	interface BlockRowProps {
		children: any;
		title?: string;
		titleTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
	}

	const { children, title, titleTag = "p" }: BlockRowProps = $props();
</script>

{#if title}
	<svelte:element this={titleTag} class="block-row-title">{title}</svelte:element>
{/if}
<div class="block-row">{@render children()}</div>

<style lang="scss">
	.block-row {
		display: flex;
		flex-flow: row wrap;
		gap: var(--space-md);
	}
</style>
