<script>
	import Title from '$components/text/Title.svelte';
	import Button from '$components/ui/buttons/Button.svelte';
</script>

<section class="hero">
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

<style lang="scss">
	.hero {
		padding: var(--spacing-vertical-section) var(--spacing-gutters);
	}

	.text {
		display: flex;
		gap: var(--spacing-xs);
		align-items: center;
		margin-bottom: var(--spacing-vertical-section);
		vertical-align: top;
		line-height: 50px;

		p {
			margin: 0;
		}

		.emocionante {
			@include emocionante-text;
		}
	}
</style>
