<script lang="ts">
	import type { Media, Project } from "$lib/cms/payload";

	interface Props {
		project: Project;
	}

	const { project }: Props = $props();

	// A relationship is only a `Media` object when it was populated at this depth.
	const populated = (relation: number | Media | null | undefined): Media | null =>
		typeof relation === "object" && relation !== null && relation.url ? relation : null;

	// A gallery image wins over the thumbnail when both are present.
	const image = $derived(populated(project.images?.[0]) ?? populated(project.thumbnail));
</script>

<a class="card" href={project.liveLink} target="_blank" rel="noopener noreferrer">
	<div class="image-wrapper">
		{#if image}
			<img src={image.url} alt={image.alt} class="card-image" loading="lazy" />
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

		&:hover .card-image {
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
	}

	.card-image {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top center;
		transition: transform var(--transition-md);
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
