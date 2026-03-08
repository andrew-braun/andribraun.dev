<script lang="ts">
	import type { Project } from "$lib/cms/payload";

	interface Props {
		project: Project;
	}

	const { project }: Props = $props();

	// svelte-ignore state_referenced_locally
	let { title, images, thumbnail, liveLink } = project;

	let image = $state({
		url: "",
		alt: ""
	});

	if (thumbnail && typeof thumbnail === "object" && thumbnail.url) {
		image = { url: thumbnail.url, alt: thumbnail.alt };
	}
	if (images && images.length > 0) {
		const first = images[0];
		if (typeof first === "object" && first.url) {
			image = { url: first.url, alt: first.alt };
		}
	}
</script>

<a class="card" href={liveLink} target="_blank" rel={"noopener noreferrer"}>
	<div class="image-wrapper">
		<img src={image.url} alt={image.alt} class="card-image" loading="lazy" />
	</div>
	<div class="overlay">
		<span class="title">{title}</span>
		<span class="arrow" aria-hidden="true">→</span>
	</div>
</a>

<style lang="scss">
	.card {
		display: block;
		position: relative;
		height: 100%;
		border-radius: var(--border-radius-lg);
		overflow: hidden;
		text-decoration: none;
		color: var(--color-text-dark);

		&:hover .card-image {
			transform: scale(1.04);
		}

		&:hover .overlay {
			background: linear-gradient(
				to top,
				color-mix(in srgb, var(--color-background-dark) 80%, transparent),
				color-mix(in srgb, var(--color-background-dark) 10%, transparent)
			);
		}
	}

	.image-wrapper {
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: var(--color-background-dark-raised);
	}

	.card-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top center;
		display: block;
		transition: transform var(--transition-md);
	}

	.overlay {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		padding: var(--spacing-lg);
		background: linear-gradient(
			to top,
			color-mix(in srgb, var(--color-background-dark) 70%, transparent),
			transparent
		);
		transition: background var(--transition-md);
	}

	.title {
		font-size: var(--font-size-h4);
		font-weight: 700;
		line-height: 1.2;
	}

	.arrow {
		font-size: var(--font-size-lg);
		flex-shrink: 0;
	}
</style>
