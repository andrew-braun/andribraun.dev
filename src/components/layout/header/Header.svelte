<script>
	import Logo from "$components/layout/header/Logo.svelte";
	import HeaderNav from "$components/layout/header/nav/HeaderNav.svelte";
	import MobileNav from "$components/layout/header/nav/MobileNav.svelte";
	import ThemeToggle from "$components/ui/theme/ThemeToggle.svelte";
	import { primaryNavItems } from "$lib/data/site/menus/primary-nav";

	let scrolled = $state(false);
</script>

<svelte:window onscroll={() => (scrolled = window.scrollY > 10)} />

<header class="header" class:scrolled>
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
		position: sticky;
		top: 0;
		z-index: 90;
		padding: var(--space-md) var(--spacing-gutters);
		color: var(--color-text);
		background-color: var(--color-background);
		backdrop-filter: brightness(1.5);
		transition:
			background-color var(--transition-md),
			color var(--transition-md),
			padding var(--transition-md);

		&.scrolled {
			padding-top: var(--space-sm);
			padding-bottom: var(--space-xs);
			background-color: transparent;
			backdrop-filter: blur(10px);

			:global(.logo) {
				width: 90px;
			}
		}

		.header-content {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			max-width: var(--site-max-width);
			padding: 0 var(--space-xs) var(--space-xs) 0;
			margin: auto;

			.nav-actions {
				display: flex;
				gap: var(--space-md);
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
