<script lang="ts">
	export let tag = "h1";
	export let tagAttributes = {};
	export let superTitle = "";
	export let title = "";
	export let subtitle = "";
</script>

<svelte:element this={tag} class="title" {...tagAttributes}>
	{#if superTitle}
		<span class="title title-small">{superTitle}</span>
	{/if}
	<span class="title">{title}</span>
	{#if subtitle}
		<span class="title subtitle">{subtitle}</span>
	{/if}
</svelte:element>

<style lang="scss">
	.title {
		display: flex;
		flex-direction: column;
		margin: 0;
		font-size: var(--font-size-h1);
		font-weight: 600;

		@media (max-width: $breakpoint-xs) {
			text-align: center;
		}
	}

	.title-small {
		font-size: var(--font-size-lg);
		font-weight: 400;
	}

	.subtitle {
		font-size: var(--font-size-h3);
		font-weight: 400;
	}
</style>
