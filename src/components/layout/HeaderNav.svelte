<script lang="ts">
	import Link from "$components/ui/Link/Link.svelte";
	import type { NavItem } from "$ts/site-data";

	export let navItems: NavItem[] = [];
</script>

<nav>
	{#each navItems as item}
		<Link href={item.href} class="nav-link">{item.label}</Link>
	{/each}
</nav>

<style lang="scss">
	nav {
		display: flex;
		gap: var(--spacing-md);
	}

	.nav-link {
		color: var(--color-text);
		text-decoration: none;
		font-size: var(--font-size-md);
		font-weight: 500;
		transition: all var(--transition-instant);
		border-top: 4px solid transparent;
		border-bottom: 4px solid transparent;

		&:hover {
			border-bottom: 4px solid var(--color-secondary);
			color: var(--color-secondary);
		}
	}
</style>
