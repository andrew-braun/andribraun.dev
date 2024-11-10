<script>
	import Title from '$components/text/Title.svelte';
	import Button from '$components/ui/buttons/Button.svelte';
	import AndriProfilePicture from '$lib/assets/img/profile/andri-in-milan-square.png?enhanced';
</script>

<section class="hero">
	<section class="left">
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
	<section class="right">
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
		grid-template-columns: 1fr 1fr;
		grid-template-areas: 'left right';
		padding: var(--spacing-vertical-section) var(--spacing-gutters);

		.left {
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

		.right {
			.hero-image {
				display: block;
				width: clamp(200px, 30vw, 300px);
				aspect-ratio: 1;
				border-radius: 50%;
			}
		}
	}
</style>
