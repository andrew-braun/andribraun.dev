<script lang="ts">
	import TabList from "./TabList.svelte";

	interface Tab {
		label: string;
		value: string;
		content: any;
	}

	interface TabsProps {
		tabs: Tab[];
		initialTab?: number;
	}

	const { tabs, initialTab = 0, children } = $props();

	let currentTab = $state(initialTab);

	const setActiveTab = (index: number) => {
		currentTab = index;
	};
</script>

<div class="tabs">
	<TabList {tabs} {currentTab} {setActiveTab} />
	{@render children()}
</div>

<style lang="scss">
	.tabs {
		display: flex;
		flex-direction: column;
	}
</style>
