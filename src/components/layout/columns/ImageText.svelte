<script lang="ts">
	import type { TitleProps } from "$components/text/Title.svelte";
	import Title from "$components/text/Title.svelte";
	import type { Media } from "$lib/cms/payload";
	import type { ImageDataProps } from "$ts/general";
	import { marked } from "marked";
	import TwoColumn from "./TwoColumn.svelte";

	interface ImageTextProps {
		image?: ImageDataProps | Media | null;
		text: string;
		titleProps?: TitleProps;
		widerSide: "left" | "right";
		smallColumn: "25%" | "33%" | "50%" | "66%" | "75%";
		imageProps?: Record<string, unknown>;
		imageSide?: "left" | "right";
	}

	let {
		image,
		text,
		titleProps,
		widerSide = "left",
		smallColumn = "33%",
		imageProps = {},
		imageSide = "left"
	}: ImageTextProps = $props();

	const markdownText = $derived(marked.parse(text));

	// `ImageDataProps` carries `src`, a Payload `Media` carries `url`; neither has both.
	const src = $derived.by(() => {
		if (!image) return "";
		return ("src" in image ? image.src : image.url) ?? "";
	});
</script>

{#snippet imageSnippet()}
	{#if src}
		<div class="image-wrapper">
			<enhanced:img {src} alt={image?.alt ?? ""} class="image" {...imageProps} loading="lazy" />
		</div>
	{/if}
{/snippet}

{#snippet textSnippet()}
	{#if titleProps}
		<Title {...titleProps} />
	{/if}
	<div class="text-content">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -- CMS content authored by site owner -->
		{@html markdownText}
	</div>
{/snippet}

{#if !src}
	<!-- With no media column to balance against, the measure is centred rather than left-hugging. -->
	<div class="text-only">
		{@render textSnippet()}
	</div>
{:else if imageSide === "left"}
	<TwoColumn {smallColumn} {widerSide} leftContent={imageSnippet} rightContent={textSnippet} />
{:else}
	<TwoColumn {smallColumn} {widerSide} leftContent={textSnippet} rightContent={imageSnippet} />
{/if}

<style lang="scss">
	.image-wrapper {
		position: sticky;
		top: var(--space-md);
		align-self: start;
		padding-top: var(--header-max-height-scrolled);

		.image {
			width: 100%;
			height: fit-content;
			object-fit: contain;
			border-radius: var(--border-radius-lg);
		}
	}

	.text-content {
		max-width: var(--text-max-width);
	}

	.text-only {
		max-width: var(--text-max-width);
		margin-inline: auto;
	}
</style>
