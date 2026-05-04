<script>
	import ExcitingText from "$components/text/ExcitingText.svelte";
	import Title from "$components/text/Title.svelte";
	import Button from "$components/ui/buttons/Button.svelte";
	import AndriProfilePicture from "$lib/assets/img/profile/andri-in-milan-square.png?enhanced";
	import { RocketIcon } from "$lib/data/icons";
	import StarBackground from "$root/src/lib/assets/images/svgs/StarBackground.svelte";
</script>

<section class="page-section hero">
	<div class="background">
		<StarBackground />
	</div>
	<section class="hero-section left">
		<Title superTitle="Hi! I'm" title="Andri Braun" tagAttributes={{ id: "hero-title" }} />
		<div class="text">
			<p class="description">
				<span
					>I write <ExcitingText size="large">code</ExcitingText> <span class="comma">,</span></span
				>
				<span
					>build <ExcitingText color="accent-2" size="large">websites</ExcitingText>
					<span class="comma">,</span>
				</span>
				<span
					>and do other
					<ExcitingText color="accent-3" size="large">nerd things</ExcitingText></span
				>
			</p>
		</div>
		<div class="cta-container">
			<Button variant="filled" size="100" Icon={RocketIcon} href="#contact"
				>Do nerd things for me</Button
			>
		</div>
	</section>
	<section class="hero-section right">
		<div class="image">
			<div class="image-pop"></div>
			<enhanced:img
				src={AndriProfilePicture}
				class="hero-image"
				alt="Andri Braun in a black button-up shirt, glasses, and long, brown hair, smiling, sitting in front of a leafy green background."
			/>
		</div>
	</section>
</section>

<style lang="scss">
	.hero {
		position: relative;
		display: grid;
		grid-template-areas: "left right";
		grid-template-columns: 4fr 3fr;

		.background {
			position: absolute;
			top: 0;
			left: 0;
			z-index: -1;
			width: 100%;
			height: 100%;
			overflow: hidden;

			:global(svg) {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}

		@media (max-width: $breakpoint-sm) {
			grid-template-areas:
				"right"
				"left";
			grid-template-columns: 1fr;
		}

		.hero-section {
			&.left {
				// padding-top: var(--space-xl);

				.text {
					display: flex;
					gap: var(--space-xs);
					align-items: center;
					margin: var(--space-md) 0 var(--spacing-vertical-section) 0;
					font-size: var(--font-size-md);
					line-height: 3.8em;
					vertical-align: top;

					.description {
						margin: 0;
						line-height: unset;

						@media screen and (max-width: $breakpoint-xs) {
							text-align: right;

							@media screen and (max-width: $breakpoint-sm) {
								display: flex;
								flex-direction: column;
								align-items: flex-end;
								margin-left: auto;
								text-align: right;
							}
						}
					}

					span {
						display: inline-block;
						vertical-align: bottom;

						&.comma {
							@media screen and (max-width: $breakpoint-xs) {
								display: none;
							}
						}
					}
				}

				.cta-container {
					width: clamp(280px, 100%, 480px);
					margin: var(--space-3xl) auto;
					font-size: var(--font-size-lg);
					text-align: center;
				}
			}

			&.right {
				:global(picture) {
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.image {
					position: relative;
					aspect-ratio: 1 / 1;

					.hero-image {
						z-index: 10;
						display: block;
						width: clamp(200px, 80%, 420px);
						height: auto;
						aspect-ratio: 1 / 1;
						border-radius: 50%;
					}

					.image-pop {
						position: absolute;
						top: 1%;
						left: 11.5%;
						z-index: 5;
						width: clamp(200px, 82%, 460px);
						aspect-ratio: 1 /1;
						background: linear-gradient(var(--color-primary) 50%, var(--color-secondary));
						border-radius: 100%;
					}
				}
			}
		}
	}
</style>
