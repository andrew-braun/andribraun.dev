<script>
	import Logo from "$components/layout/header/Logo.svelte";
	import HeaderNav from "$components/layout/header/nav/HeaderNav.svelte";
	import MobileNav from "$components/layout/header/nav/MobileNav.svelte";
	import ThemeToggle from "$components/ui/theme/ThemeToggle.svelte";
	import { primaryNavItems } from "$lib/data/site/menus/primary-nav";
</script>

<header class="header">
	<div class="header-content">
		<Logo />
		<div class="nav-actions desktop">
			<HeaderNav navItems={primaryNavItems} />
			<ThemeToggle />
		</div>
		<div class="nav-actions mobile">
			<MobileNav navItems={primaryNavItems} />
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

				&.desktop {
					@media (max-width: $breakpoint-sm) {
						display: none;
					}
				}
				&.mobile {
					display: none;

					@media (max-width: $breakpoint-sm) {
						display: block;
					}
				}
			}
		}
	}
</style>
