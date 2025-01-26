<script lang="ts">
	import LabelledIcon from "$components/content-blocks/LabelledIcon.svelte";
	import TwoColumn from "$components/layout/columns/TwoColumn.svelte";
	import BlockRow from "$components/layout/rows/BlockRow.svelte";
	import Markdown from "$components/text/Markdown.svelte";
	import { CodeIconJavaScript } from "$root/src/lib/data/icons";
	import type { ImageDataProps } from "$root/src/ts/general";

	interface NerdModeProps {
		image: ImageDataProps;
		text: string;
	}

	let { image, text }: NerdModeProps = $props();
</script>

{#snippet leftColumn()}
	<div class="image-wrapper">
		<enhanced:img src={image.src} alt={image.alt} class="image" />
	</div>
{/snippet}

{#snippet rightColumn()}
	<div class="text">
		<Markdown {text} />
		<BlockRow title="Languages" titleTag="h3">
			<LabelledIcon Icon={CodeIconJavaScript} label="JavaScript" />
		</BlockRow>
	</div>
{/snippet}

<TwoColumn leftContent={leftColumn} rightContent={rightColumn} widerSide="right" />

<style lang="scss">
	.image-wrapper {
		position: sticky;
		top: var(--spacing-md);
		align-self: start;
		.image {
			width: 100%;
			height: fit-content;
			border-radius: var(--border-radius-lg);
			object-fit: contain;
		}
	}
</style>
