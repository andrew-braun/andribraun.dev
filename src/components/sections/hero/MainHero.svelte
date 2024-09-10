<script>
	import Button from '$components/ui/buttons/Button.svelte';
</script>

<section class="hero">
	<div class="text">
		<p class="impact">I</p>
		<p class="impact">write code,</p>
		<p class="impact">build websites,</p>
		<p class="impact">and do other nerd things.</p>
		<Button>Do Nerd Things for Me</Button>
	</div>
	<div class="other"></div>
</section>

<style lang="scss">
	.hero {
		display: grid;
		grid-template-columns: 1fr 2fr;
		grid-template-areas: 'text other';
		padding: var(--gutters) var(--spacing-lg);

		// @media (max-width: $breakpoint-sm) {
		// 	grid-template-columns: 1fr;
		// 	grid-template-areas: 'text' 'other';
		// }

		.text {
			grid-area: text;

			p {
				margin: 0;
			}

			.impact {
				font-size: var(--font-size-h1);
				font-weight: 600;
			}
		}

		.other {
			grid-area: other;
		}
	}
</style>
