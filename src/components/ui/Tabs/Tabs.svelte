<script lang="ts">
	import TabContent from "./TabContent.svelte";
	import TabList from "./TabList.svelte";

	const { tabs, initialTab = 0 } = $props();

	let currentTab = $state(initialTab);

	const setActiveTab = (index: number) => {
		currentTab = index;
	};

	const handleKeydown = (event: KeyboardEvent) => {
		if (event.key === "Tab") {
			console.log(event.target);
		}
	};
</script>

<div class="tabs" onkeydown={handleKeydown}>
	<TabList {tabs} {currentTab} {setActiveTab} />
	<div class="tabs-container">
		{#each tabs as tab, index}
			<TabContent {currentTab} {index}>
				<tab.content {...tab.props} />
			</TabContent>
		{/each}
	</div>
</div>

<style lang="scss">
	.tabs {
		display: flex;
		flex-direction: column;

		.tabs-container {
			position: relative;
			display: grid;
			grid-template-columns: 100%;
			grid-template-rows: 1fr;
			margin-top: var(--spacing-md);
		}
	}
</style>
