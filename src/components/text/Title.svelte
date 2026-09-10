<script lang="ts">
	import SectionEyebrow from "$components/text/SectionEyebrow.svelte";
	import type { ColorVariant } from "$ts/style";

	export interface TitleProps {
		tag?: string;
		tagAttributes?: Record<string, string>;
		superTitle?: string;
		title: string;
		subtitle?: string;
		/** Section number for the eyebrow above the title, e.g. "02". */
		eyebrow?: string | undefined;
		/** Colours the eyebrow. Has no effect without one. */
		accent?: ColorVariant | undefined;
	}

	let {
		tag = "h1",
		tagAttributes = {},
		superTitle = "",
		title = "",
		subtitle = "",
		eyebrow,
		accent
	}: TitleProps = $props();
</script>

<div class="title-container">
	{#if eyebrow}
		<SectionEyebrow number={eyebrow} color={accent} />
	{/if}
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
		margin-bottom: var(--space-xl);

		.title {
			display: flex;
			flex-direction: column;
			margin: 0;
			font-weight: 600;

			// font-size: var(--font-size-h1);
			line-height: var(--line-height-tight);

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
