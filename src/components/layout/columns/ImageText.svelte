<script lang="ts">
	import type { ImageDataProps } from "$root/src/ts/general";
	import TwoColumn from "./TwoColumn.svelte";

	interface ImageTextProps {
		image: ImageDataProps;
		text: string;
		widerSide: "left" | "right";
		smallColumn: "25%" | "33%" | "50%" | "66%" | "75%";
		imageProps?: Record<string, unknown>;
	}

	let {
		image,
		text,
		widerSide = "left",
		smallColumn = "33%",
		imageProps = {}
	}: ImageTextProps = $props();
</script>

{#snippet imageSnippet()}
	<div class="image-wrapper">
		<enhanced:img src={image.src} alt={image.alt} class="image" {...imageProps} loading="lazy" />
	</div>
{/snippet}

<!-- {#snippet textSnippet()}
	<p>{text}</p>
{/snippet} -->

<TwoColumn {smallColumn} {widerSide} leftContent={imageSnippet} rightContent={text} />

<style lang="scss">
	.image-wrapper {
		align-self: start;
		.image {
			width: 100%;
			height: fit-content;
			border-radius: var(--border-radius-lg);
			object-fit: contain;
		}
	}
</style>
