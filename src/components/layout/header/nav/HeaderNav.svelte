<script lang="ts">
	import { page } from "$app/stores";
	import Link from "$components/ui/Link/Link.svelte";
	import type { NavItem } from "$ts/site-data";

	let { navItems }: { navItems: NavItem[] } = $props();
</script>

<nav>
	{#each navItems as item (item.href)}
		<Link href={item.href} active={$page.url.hash === item.href}>{item.label}</Link>
	{/each}
</nav>

<style lang="scss">
	nav {
		display: flex;
		gap: var(--space-md);
	}
</style>
