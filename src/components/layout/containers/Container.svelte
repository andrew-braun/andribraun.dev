<script lang="ts">
	import type { Snippet } from "svelte";
	interface Props {
		children: Snippet;
		element?: "div" | "section" | "article" | "main";
		class?: string;
	}

	let { children, element = "div", class: className }: Props = $props();
</script>

<svelte:element this={element} class={["container", className].join(" ")}>
	{@render children()}
</svelte:element>

<style lang="scss">
	.container {
		max-width: var(--site-max-width);
		padding: var(--space-lg);

		@media (max-width: $breakpoint-sm) {
			padding: var(--space-md);
		}
	}
</style>
