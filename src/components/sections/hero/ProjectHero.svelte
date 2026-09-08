<script lang="ts">
	import Container from "$components/layout/containers/Container.svelte";
	import Button from "$components/ui/buttons/Button.svelte";
	import { populatedMedia } from "$lib/cms/media";
	import type { Project } from "$lib/cms/payload";
	import { CodeIconGitHub, RocketIcon } from "$lib/data/icons";
	import StarBackground from "$root/src/lib/assets/images/svgs/StarBackground.svelte";
	import { UiIconCamera as CameraIcon } from "$root/src/lib/data/icons";

	interface Props {
		project: Project;
	}

	let { project }: Props = $props();

	let { title, summary, live_link, snapshot_link, github_link, images } = $derived(project);

	const heroImage = $derived(populatedMedia(images?.[0]));
</script>

<Container element="section" class={["text-image-hero"]}>
	<div class="background">
		<StarBackground />
	</div>
	<div class="column-grid">
		<div class="column-1">
			<h1 class="title">
				{title}
			</h1>
			{#if summary}
				<p class="summary">{summary}</p>
			{/if}
			<!-- <p class="overview"></p> -->
			<div class="links">
				{#if live_link}
					<Button variant="filled" Icon={RocketIcon} href={live_link} target="_blank"
						>Visit live site</Button
					>
				{/if}
				{#if snapshot_link}
					<Button variant="gradient" Icon={CameraIcon} href={snapshot_link}>View snapshot</Button>
				{/if}
				{#if github_link}
					<Button variant="outline" Icon={CodeIconGitHub} href={github_link} target="_blank"
						>View on GitHub</Button
					>
				{/if}
			</div>
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
</Container>

<style lang="scss">
	:global(.text-image-hero) {
		.background {
			@include background-animation;
		}

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

				.summary {
					max-width: 48ch;
					margin-block: var(--space-lg);
					margin-inline: auto;
					font-size: var(--font-size-md);
					line-height: var(--line-height-relaxed);
					text-align: center;
				}

				.links {
					display: flex;
					justify-content: center;
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
						transform: perspective(320px) rotateY(-5deg) rotateX(1deg) rotateZ(1deg);
						transform-origin: center center;
					}
				}
			}

			@media (max-width: $breakpoint-md) {
				grid-template-columns: 1fr;

				.column-2 {
					grid-row: 1;
					grid-column: 1;
				}
			}
		}
	}
</style>
