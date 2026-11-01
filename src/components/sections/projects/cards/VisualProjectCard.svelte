<script lang="ts">
	import Image from "$components/ui/Image.svelte";
	import { populatedMedia } from "$lib/cms/media";
	import type { Project } from "$lib/cms/payload";

	interface Props {
		project: Project;
	}

	const { project }: Props = $props();

	// A gallery image wins over the thumbnail when both are present.
	const image = $derived(populatedMedia(project.images?.[0]) ?? populatedMedia(project.thumbnail));
</script>

<a class="card" href="/{project.slug}">
	<div class="image-wrapper">
		{#if image}
			<!-- `cover` scales wide screenshots to the card's height, so phones need about 500px. -->
			<Image
				{image}
				sizes="(max-width: 1200px) 500px, 40vw"
				widths={[480, 640, 800, 1200]}
				loading="lazy"
				class="card-image"
			/>
		{/if}
	</div>
	<div class="overlay">
		<span class="title">{project.title}</span>
		<span class="arrow" aria-hidden="true">→</span>
	</div>
</a>

<style lang="scss">
	.card {
		position: relative;
		display: block;
		height: 100%;
		overflow: hidden;
		color: var(--neutral-1000);
		text-decoration: none;
		border-radius: var(--border-radius-lg);

		&:hover :global(.card-image) {
			transform: scale(1.04);
		}

		&:hover .overlay {
			background: linear-gradient(
				to top,
				color-mix(in srgb, var(--neutral-50) 80%, transparent),
				color-mix(in srgb, var(--neutral-50) 10%, transparent)
			);
		}
	}

	.image-wrapper {
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: var(--neutral-100);

		/* Rendered inside Image, out of reach of this component's scoped styles. */
		:global(.card-image) {
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: top center;
			transition: transform var(--transition-md);
		}
	}

	.overlay {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		padding: var(--space-xl);
		background: linear-gradient(
			to top,
			color-mix(in srgb, var(--neutral-50) 70%, transparent),
			transparent
		);
		transition: background var(--transition-md);
	}

	.title {
		font-size: var(--font-size-h4);
		font-weight: 700;
		line-height: var(--line-height-tight);
	}

	.arrow {
		flex-shrink: 0;
		font-size: var(--font-size-lg);
	}
</style>
