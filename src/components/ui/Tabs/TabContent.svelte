<script lang="ts">
	import { fly } from "svelte/transition";

	interface TabContentProps {
		currentTab: number;
		index: number;
		children: any;
	}

	const { currentTab, index, children }: TabContentProps = $props();

	let isActive = $derived(currentTab === index);
	let direction = $derived(currentTab < index ? "right" : "left");
</script>

<div
	class="tab-content"
	class:active={isActive}
	in:fly={{ x: direction === "left" ? -100 : 100 }}
	out:fly={{ x: direction === "left" ? 100 : -100 }}
>
	{@render children()}
</div>

<style lang="scss">
	.tab-content {
		grid-column: 1;
		grid-row: 1;
		z-index: -1;
		overflow: auto;
		visibility: hidden;
		opacity: 0;
		transition: all var(--transition-md);

		&.active {
			z-index: 10;
			opacity: 1;
			visibility: visible;
		}
	}
</style>
