<script lang="ts">
	import Drawer from "$components/ui/Drawer.svelte";
	import type { NavItem } from "$ts/site-data";

	export const navItems: NavItem[] = [];

	let isOpen = false;

	const toggleMenu = () => {
		isOpen = !isOpen;
	};
</script>

<div>
	<button class="menu-button {isOpen ? 'open' : ''}" on:click={toggleMenu} aria-label="Toggle Menu">
		<span></span>
		<span></span>
		<span></span>
	</button>

	<Drawer {isOpen} position="right">
		<div class="nav-links">
			{#each navItems as { href, label }}
				<a {href} on:click={() => (isOpen = false)}>{label}</a>
			{/each}
		</div>
	</Drawer>
</div>

<style lang="scss">
	.menu-button {
		position: fixed;
		top: var(--spacing-md);
		right: var(--spacing-md);
		z-index: 100;
		display: flex;
		flex-direction: column;
		gap: 5px;
		padding: 10px;
		background: none;
		border: none;
		cursor: pointer;

		span {
			width: 30px;
			height: 3px;
			border-radius: 3px;
			background: var(--color-text);
			transition:
				transform 0.3s,
				opacity 0.3s;
		}

		&.open {
			span:nth-child(1) {
				transform: rotate(45deg) translateY(10px);
			}

			span:nth-child(2) {
				opacity: 0;
			}

			span:nth-child(3) {
				transform: rotate(-45deg) translateY(-10px);
			}
		}
	}

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
