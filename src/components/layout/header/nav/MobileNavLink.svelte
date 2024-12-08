<script lang="ts">
	import { page } from "$app/stores";
	import type { NavItem } from "$root/src/ts/site-data";

	interface MobileNavLinkProps {
		navItem: NavItem;
		onClick?: () => void;
	}

	let { navItem, onClick }: MobileNavLinkProps = $props();

	let { href, label } = navItem;
</script>

<a {href} class="mobile-nav-link" class:active-link={$page.url.hash === href} onclick={onClick}
	>{label}</a
>

<style lang="scss">
	.mobile-nav-link {
		padding: var(--spacing-md);
		font-size: var(--font-size-md);
		text-decoration: none;

		&.active-link {
			background-color: var(--color-accent-2);
			color: var(-color-accent-2-text);
		}
	}
</style>
