<script lang="ts">
	import type { Snippet } from "svelte";
	import type { ClassValue } from "svelte/elements";
	interface Props {
		children: Snippet;
		element?: "div" | "section" | "article" | "main";
		class?: ClassValue;
	}

	let { children, element = "div", class: className }: Props = $props();
</script>

<svelte:element this={element} class={["container", className]}>
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
