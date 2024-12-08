<script lang="ts">
	import MenuButton from "$components/ui/buttons/MenuButton.svelte";
	import Drawer from "$components/ui/Drawer.svelte";
	import type { NavItem } from "$ts/site-data";

	let { navItems }: { navItems: NavItem[] } = $props();

	let isOpen = $state(false);

	const toggleMenu = () => {
		isOpen = !isOpen;
	};

	const handleClose = () => {
		isOpen = false;
	};
</script>

<div>
	<MenuButton {isOpen} onClick={toggleMenu} />

	<Drawer {isOpen} position="right" onClose={handleClose}>
		<div class="nav-links">
			{#each navItems as { href, label }}
				<a {href} onclick={() => (isOpen = false)}>{label}</a>
			{/each}
		</div>
	</Drawer>
</div>

<style lang="scss">
	.nav-links {
		display: flex;
		flex-direction: column;
		gap: 15px;

		a {
			text-decoration: none;
			color: var(--color-text);
			font-size: 18px;
			transition: color 0.2s;

			&:hover {
				color: #0077cc;
			}
		}
	}
</style>
