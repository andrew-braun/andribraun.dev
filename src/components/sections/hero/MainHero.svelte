<script>
	import ExcitingText from "$components/text/ExcitingText.svelte";
	import Title from "$components/text/Title.svelte";
	import Button from "$components/ui/buttons/Button.svelte";
	import AndriProfilePicture from "$lib/assets/img/profile/andri-in-milan-square.png?enhanced";
	import FeArrowDown from "~icons/fe/arrow-down";
	import OcticonRocket24 from "~icons/octicon/rocket-24";
</script>

<section class="page-section hero">
	<section class="hero-section left">
		<Title superTitle="Hi! I'm" title="Andri Braun" tagAttributes={{ id: "hero-title" }} />
		<div class="text">
			<p>
				<span>I write <ExcitingText size="large">code</ExcitingText> ,</span>
				<span>build <ExcitingText color="accent-2" size="large">websites</ExcitingText> , </span>
				<span
					>and do other
					<ExcitingText color="accent-3" size="large">nerd things</ExcitingText></span
				>
			</p>
		</div>
		<div class="cta-container">
			<Button variant="filled" size="large" icon={OcticonRocket24}>Get in touch</Button>
			<Button variant="outline" size="large" icon={FeArrowDown}>Go down the rabbit hole</Button>
		</div>
	</section>
	<section class="hero-section right">
		<enhanced:img
			src={AndriProfilePicture}
			class="hero-image"
			alt="Andri Braun in a black button-up shirt, glasses, and long, brown hair, smiling, sitting in front of a leafy green background."
		/>
	</section>
</section>

<style lang="scss">
	.hero {
		display: grid;
		grid-template-columns: 4fr 3fr;
		grid-template-areas: "left right";


		@media (max-width: $breakpoint-sm) {
			grid-template-columns: 1fr;
			grid-template-areas:
				"right"
				"left";
		}

		.hero-section {
			&.left {
				// padding-top: var(--spacing-lg);

				.text {
					display: flex;
					gap: var(--spacing-xs);
					align-items: center;
					margin: var(--spacing-md) 0 var(--spacing-vertical-section) 0;
					vertical-align: top;
					line-height: 3.8em;
					font-size: var(--font-size-md);

					p {
						margin: 0;

						@media screen and (max-width: $breakpoint-xs) {
							text-align: right;
						}
					}

					span {
						display: inline-block;
						vertical-align: bottom;
					}
				}

				.cta-container {
					display: flex;
					// justify-content: center;
					flex-wrap: wrap;
					gap: var(--spacing-md);
					margin-top: var(--spacing-xl);
					text-align: center;
				}
			}

			&.right {
				:global(picture) {
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.hero-image {
					display: block;
					width: clamp(200px, 80%, 420px);
					height: auto;
					aspect-ratio: 1 / 1;
					border-radius: 50%;
				}
			}
		}
	}
</style>
