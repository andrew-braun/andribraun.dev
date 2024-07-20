<script>
	import Logo from '$components/layout/Logo.svelte';
	import Nav from '$components/layout/HeaderNav.svelte';
	import ThemeToggle from '$components/ui/theme/ThemeToggle.svelte';
</script>

<header>
	<Logo />
	<div class="actions">
		<Nav />
		<ThemeToggle />
	</div>
</header>

<style lang="scss">
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--spacing-md);
		background-color: var(--background-color);
		backdrop-filter: brightness(1.5);
		color: white;

		.actions {
			display: flex;
			gap: var(--spacing-md);
			align-items: center;
		}
	}
</style>
