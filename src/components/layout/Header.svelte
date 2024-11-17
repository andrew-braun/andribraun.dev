<script>
	import Nav from "$components/layout/HeaderNav.svelte";
	import Logo from "$components/layout/Logo.svelte";
	import ThemeToggle from "$components/ui/theme/ThemeToggle.svelte";
</script>

<header class="header">
	<div class="header-content">
		<Logo />
		<div class="nav-actions">
			<Nav />
			<ThemeToggle />
		</div>
	</div>
</header>

<style lang="scss">
	.header {
		padding: var(--spacing-md) var(--spacing-gutters);
		background-color: var(--color-background);
		backdrop-filter: brightness(1.5);
		color: var(--color-text);

		.header-content {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			max-width: var(--site-max-width);
			margin: auto;
			padding: 0 var(--spacing-xs) var(--spacing-xs) 0;

			.nav-actions {
				display: flex;
				gap: var(--spacing-md);
				align-items: center;
			}
		}
	}
</style>
