<script>
	// You can define your navigation items here or fetch them dynamically if needed
	let navItems = [
		{ name: "About", href: "#about" },
		{ name: "Contact", href: "#contact" }
	];
</script>

<nav>
	{#each navItems as item}
		<a href={item.href} class="nav-link">{item.name}</a>
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
