<script lang="ts">
	import { fly } from "svelte/transition";

	interface TabContentProps {
		currentTab: number;
		index: number;
		children: any;
	}

	const { currentTab, index, children }: TabContentProps = $props();

	let isActive = $state(currentTab === index);
	let direction = $state(currentTab < index ? "right" : "left");
</script>

{#if isActive}
	<div
		class="tab-content"
		in:fly={{ x: direction === "left" ? -100 : 100 }}
		out:fly={{ x: direction === "left" ? 100 : -100 }}
	>
		{@render children()}
	</div>
{/if}

<style>
	.tab-content {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}
</style>
