<script lang="ts">
	import MenuButton from "$components/ui/buttons/MenuButton.svelte";
	import Drawer from "$components/ui/Drawer.svelte";
	import type { NavItem } from "$ts/site-data";
	import Logo from "../Logo.svelte";
	import MobileNavLink from "./MobileNavLink.svelte";

	let { navItems }: { navItems: NavItem[] } = $props();

	let isOpen = $state(false);

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
	<MenuButton {isOpen} onClick={toggleMenu} />

	<Drawer {isOpen} position="right" onClose={handleClose} {header}>
		<div class="nav-links">
			{#each navItems as navItem}
				<MobileNavLink {navItem} onClick={handleClose} />
			{/each}
		</div>
	</Drawer>
</div>

<style lang="scss">
	.nav-links {
		display: flex;
		flex-direction: column;
	}
</style>
