<script>
	import Title from '$components/text/Title.svelte';
	import Button from '$components/ui/buttons/Button.svelte';
	import AndriProfilePicture from '$lib/assets/img/profile/andri-in-milan-square.png?enhanced';
</script>

<section class="hero">
	<section class="hero-section left">
		<Title superTitle="Hi! I'm" title="Andri Braun" tagAttributes={{ id: 'hero-title' }} />
		<div class="text">
			<p>
				I write <span class="emocionante">code</span>, build
				<span class="emocionante">websites</span>,&nbsp and do other
				<span class="emocionante">nerd things</span>.
			</p>
		</div>
		<Button>Do Nerd Things for Me</Button>
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
		grid-template-areas: 'left right';
		padding: var(--spacing-vertical-section) var(--spacing-gutters);
		gap: var(--spacing-lg) var(--spacing-block);

		@media (max-width: $breakpoint-sm) {
			grid-template-columns: 1fr;
			grid-template-areas:
				'right'
				'left';
		}

		.hero-section {
			&.left {
				padding-top: var(--spacing-lg);

				@media (max-width: $breakpoint-xs) {
					text-align: center;
				}

				.text {
					display: flex;
					gap: var(--spacing-xs);
					align-items: center;
					margin-bottom: var(--spacing-vertical-section);
					vertical-align: top;
					line-height: 50px;
					font-size: var(--font-size-md);

					p {
						margin: 0;
					}

					.emocionante {
						@include emocionante-text;
					}
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
