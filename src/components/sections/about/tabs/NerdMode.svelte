<script lang="ts">
	import LabelledIcon from "$components/content-blocks/LabelledIcon.svelte";
	import TwoColumn from "$components/layout/columns/TwoColumn.svelte";
	import BlockRow from "$components/layout/rows/BlockRow.svelte";
	import Markdown from "$components/text/Markdown.svelte";
	import Image from "$components/ui/Image.svelte";
	import { codeIcons } from "$root/src/lib/data/icons";
	import type { ImageDataProps } from "$ts/general";

	interface NerdModeProps {
		image: ImageDataProps;
		text: string;
	}

	let { image, text }: NerdModeProps = $props();
</script>

{#snippet leftColumn()}
	<div class="image-wrapper">
		<Image {image} sizes="(max-width: 768px) 100vw, 33vw" class="image" />
	</div>
{/snippet}

{#snippet rightColumn()}
	<div class="text">
		<Markdown {text} maxWidth="72ch" />
		{#each Object.entries(codeIcons) as [key, icons] (key)}
			<BlockRow title={key} titleTag="h3">
				{#each Object.entries(icons) as [key, icon] (key)}
					<LabelledIcon Icon={icon} label={key} />
				{/each}
			</BlockRow>
		{/each}
	</div>
{/snippet}

<TwoColumn leftContent={leftColumn} rightContent={rightColumn} widerSide="right" />

<style lang="scss">
	.image-wrapper {
		position: sticky;
		top: var(--space-md);
		align-self: start;

		/* Rendered inside Image, out of reach of this component's scoped styles. */
		:global(.image) {
			border-radius: var(--border-radius-lg);
		}
	}
</style>
