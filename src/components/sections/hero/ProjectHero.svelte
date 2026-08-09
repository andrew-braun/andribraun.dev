<script lang="ts">
	import type { Media, Project } from "$lib/cms/payload";

	interface Props {
		project: Project;
	}

	let { project }: Props = $props();

	let { title, description, liveLink, snapshotLink, githubLink, images } = $derived(project);
	console.log(images);
	let heroImage = $derived(images?.[0]) as Media;
</script>

<section class="text-image-hero">
	<div class="column-grid">
		<div class="column-1">
			<h1 class="title">
				{title}
			</h1>
			{#if description}
				<p class="description">{description}</p>
			{/if}
			<!-- <p class="overview"></p> -->
			{#if liveLink}
				<a class="live-link" href={liveLink}>Visit live site</a>
			{/if}
			{#if snapshotLink}
				<a class="snapshot-link" href={snapshotLink}>View snapshot</a>
			{/if}
			{#if githubLink}
				<a class="github-link" href={githubLink}>View on GitHub</a>
			{/if}
		</div>
		<div class="column-2">
			{#if heroImage && heroImage.url}
				<div class="image-wrapper">
					<enhanced:img
						src={heroImage?.url}
						class="hero-image"
						alt={heroImage?.alt || `Hero image for ${title}`}
					/>
				</div>
			{/if}
		</div>
	</div>
</section>

<style lang="scss">
	.column-grid {
		display: grid;
		grid-template-columns: 2fr 3fr;
		gap: var(--space-lg);

		.column-1 {
			grid-column: 1;

			.title {
				line-height: var(--line-height-tight);
				text-align: center;
			}
		}

		.column-2 {
			display: flex;
			grid-column: 2;
			align-items: center;
			justify-content: center;

			.image-wrapper {
				position: relative;
				width: 100%;
				height: 100%;
				padding: var(--space-xl);
				overflow: hidden;

				// &::before {
				// 	position: absolute;
				// 	inset: 8% 5% -3%;
				// 	z-index: -1;
				// 	content: "";
				// 	background: linear-gradient(
				// 		300deg,
				// 		var(--color-primary) 50%,
				// 		var(--color-secondary),
				// 		transparent
				// 	);
				// 	opacity: 0.55;
				// 	filter: blur(90px);
				// }

				.hero-image {
					width: 90%;
					height: auto;
					object-fit: cover;
					border-radius: var(--border-radius-lg);
					transform: perspective(300px) rotateY(-5deg) rotateX(1deg) rotateZ(-1deg);
					transform-origin: center center;
				}
			}
		}
	}
</style>
