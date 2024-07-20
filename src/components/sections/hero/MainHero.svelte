<section class="hero">
	<div class="text">
		<p class="impact">Code.</p>
		<p class="impact">Websites.</p>
		<p class="impact">Nerd things.</p>
		<p class="subtitle">That's pretty much what I do!</p>
		<p class="subtitle">Got something cool you want you want to build? Let's talk!</p>
	</div>
	<div class="other"></div>
</section>

<style lang="scss">
	.hero {
		display: grid;
		grid-template-columns: 1fr 2fr;
		grid-template-areas: 'text other';

		.text {
			grid-area: text;

			p {
				margin: 0;
			}

			.impact {
				font-size: var(--font-size-xl);
				font-weight: 600;
			}
		}

		.other {
			grid-area: other;
		}
	}
</style>
