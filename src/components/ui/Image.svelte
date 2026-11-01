<script lang="ts">
	import { cmsImageSrcset, cmsImageUrl } from "$lib/cms/media";
	import type { Media } from "$lib/cms/payload";
	import type { ImageDataProps } from "$ts/general";
	import type { Attachment } from "svelte/attachments";
	import type { ClassValue } from "svelte/elements";

	interface Props {
		image: ImageDataProps | Media;
		sizes: string;
		/** CDN widths for CMS images. Local images set theirs in their import query. */
		widths?: number[];
		loading?: "lazy" | "eager";
		fetchpriority?: "high" | "low" | "auto";
		class?: ClassValue;
	}

	const {
		image,
		sizes,
		widths = [480, 960, 1440],
		loading,
		fetchpriority,
		class: className
	}: Props = $props();

	// A prerendered image can finish before hydration, when `onload` would never fire, so check
	// first. Hiding it from here rather than in CSS means images still show if JS never runs.
	const reveal: Attachment<HTMLImageElement> = (img) => {
		const settle = () => {
			img.style.removeProperty("opacity");
			// A failed image has no natural size, and its alt text is all that's left to show.
			if (!img.naturalWidth) img.style.color = "inherit";
		};

		if (img.complete) {
			settle();
			return;
		}

		img.style.opacity = "0";
		img.addEventListener("load", settle, { once: true });
		img.addEventListener("error", settle, { once: true });
	};
</script>

<div class={["frame", className]}>
	<!-- `loading` comes first so it's set before `src` can start an eager fetch. -->
	{#if "src" in image}
		<enhanced:img
			{loading}
			{fetchpriority}
			src={image.src}
			{sizes}
			alt={image.alt}
			class="frame-image"
			{@attach reveal}
		/>
	{:else if image.url}
		<img
			{loading}
			{fetchpriority}
			src={cmsImageUrl(image.url, Math.max(...widths))}
			srcset={cmsImageSrcset(image.url, widths)}
			{sizes}
			width={image.width}
			height={image.height}
			alt={image.alt}
			class="frame-image"
			{@attach reveal}
		/>
	{/if}
</div>

<style lang="scss">
	.frame {
		background-color: var(--color-surface-raised);
	}

	.frame-image {
		display: block;
		width: 100%;
		height: 100%;
		color: transparent; /* The browser paints alt text in this colour while loading. */
		object-fit: inherit;
		object-position: inherit;
		border-radius: inherit;
		transition: opacity var(--transition-md);
	}
</style>
