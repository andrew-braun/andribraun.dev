<script lang="ts">
	import MenuButton from "$components/ui/buttons/MenuButton.svelte";
	import Drawer from "$components/ui/Drawer.svelte";
	import type { NavItem } from "$ts/site-data";
	import Logo from "../Logo.svelte";
	import MobileNavLink from "./MobileNavLink.svelte";

	let { navItems }: { navItems: NavItem[] } = $props();

	let isOpen = $state(false);

	const drawerId = "mobile-nav-drawer";

	const toggleMenu = () => {
		isOpen = !isOpen;
	};

	const handleClose = () => {
		isOpen = false;
	};
</script>

{#snippet header()}
	<Logo />
{/snippet}

<div>
	<MenuButton {isOpen} onClick={toggleMenu} controls={drawerId} />

	<Drawer
		id={drawerId}
		{isOpen}
		position="right"
		onClose={handleClose}
		{header}
		label="Main navigation"
		styles={{ background: "blur", width: "full" }}
	>
		<nav class="nav-links">
			{#each navItems as navItem (navItem.href)}
				<MobileNavLink {navItem} onClick={handleClose} />
			{/each}
		</nav>
	</Drawer>
</div>

<style lang="scss">
	.nav-links {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		padding: var(--space-md);
	}
</style>
