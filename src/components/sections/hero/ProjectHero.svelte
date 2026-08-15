<script lang="ts">
	import IconBox from "$components/content-blocks/IconBox.svelte";
	import Container from "$components/layout/containers/Container.svelte";
	import Button from "$components/ui/buttons/Button.svelte";
	import type { Media, Project } from "$lib/cms/payload";
	import { CodeIconGitHub, RocketIcon } from "$lib/data/icons";
	import { capitalizeFirstLetter } from "$lib/utils/text";
	import StarBackground from "$root/src/lib/assets/images/svgs/StarBackground.svelte";
	import {
		UiIconCamera as CameraIcon,
		UiIconArchive,
		UiIconCircleCheck,
		UiIconCircleQuestionMark,
		UiIconEqualApproximately,
		UiIconUser
	} from "$root/src/lib/data/icons";

	interface Props {
		project: Project;
	}

	let { project }: Props = $props();

	let { title, description, live_link, snapshot_link, github_link, images, client_name, status } =
		$derived(project);

	let heroImage = $derived(images?.[0]) as Media;

	const statusIcon = $derived.by(() => {
		switch (status) {
			case "ongoing":
				return UiIconEqualApproximately;

			case "completed":
				return UiIconCircleCheck;
			case "live":
				return UiIconCircleCheck;
			case "archived":
				return UiIconArchive;
			default:
				return UiIconCircleQuestionMark;
		}
	});
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
			{#if description}
				<p class="description">{description}</p>
			{/if}
			<!-- <p class="overview"></p> -->
			<div class="links">
				{#if live_link}
					<Button variant="filled" Icon={RocketIcon} href={live_link}>Visit live site</Button>
				{/if}
				{#if snapshot_link}
					<Button variant="gradient" Icon={CameraIcon} href={snapshot_link}>View snapshot</Button>
				{/if}
				{#if github_link}
					<Button variant="outline" Icon={CodeIconGitHub} href={github_link}>View on GitHub</Button>
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
	<div class="info-bar">
		{#if client_name}
			<IconBox Icon={UiIconUser} title="Client" text={client_name} orientation="horizontal" />
		{/if}
		{#if status}
			<IconBox
				Icon={statusIcon}
				title="Status"
				text={capitalizeFirstLetter(status)}
				orientation="horizontal"
			/>
		{/if}
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

	.info-bar {
		display: flex;
		gap: var(--space-lg);
		align-items: center;
		justify-content: center;
		margin-inline: auto;
		margin-top: var(--space-xl);
	}
</style>
