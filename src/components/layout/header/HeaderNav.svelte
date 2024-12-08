<script lang="ts">
	import Link from "$components/ui/Link/Link.svelte";
	import type { NavItem } from "$ts/site-data";

	let { navItems }: { navItems: NavItem[] } = $props();
</script>

<nav>
	{#each navItems as item}
		<Link href={item.href}>{item.label}</Link>
	{/each}
</nav>

<style lang="scss">
	nav {
		display: flex;
		gap: var(--spacing-md);
	}
</style>
