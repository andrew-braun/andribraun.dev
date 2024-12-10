<script lang="ts">
	interface TitleProps {
		tag?: string;
		tagAttributes?: Record<string, string>;
		superTitle?: string;
		title: string;
		subtitle?: string;
	}

	let {
		tag = "h1",
		tagAttributes = {},
		superTitle = "",
		title = "",
		subtitle = ""
	}: TitleProps = $props();
</script>

<div class="title-container">
	{#if superTitle}
		<span class="title title-small">{superTitle}</span>
	{/if}
	<svelte:element this={tag} class="title" {...tagAttributes}>
		{title}
	</svelte:element>
	{#if subtitle}
		<span class="title subtitle">{subtitle}</span>
	{/if}
</div>

<style lang="scss">
	.title-container {
		margin-bottom: var(--spacing-lg);
		.title {
			display: flex;
			flex-direction: column;
			margin: 0;
			// font-size: var(--font-size-h1);
			line-height: 1.2em;
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
			font-size: var(--font-size-h4);
			font-weight: 400;
		}
	}
</style>
