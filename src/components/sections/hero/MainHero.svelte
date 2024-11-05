<script>
	import Title from '$components/text/Title.svelte';
	import Button from '$components/ui/buttons/Button.svelte';
</script>

<section class="hero">
	<Title superTitle="Hi! I'm" title="Andri Braun" tagAttributes={{ id: 'hero-title' }} />
	<div class="text">
		<p class="impact">I&nbsp;</p>
		<p class="impact">write code,&nbsp;</p>
		<p class="impact">build websites,&nbsp;</p>
		<p class="impact">and do other nerd things.</p>
	</div>
	<Button>Do Nerd Things for Me</Button>
</section>

<style lang="scss">
	.hero {
		padding: var(--spacing-vertical-section) var(--spacing-gutters);
	}

	.text {
		display: flex;
	}
</style>
