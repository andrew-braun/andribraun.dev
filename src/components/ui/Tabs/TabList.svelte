<script lang="ts">
	interface TabListProps {
		tabs: string[];
		currentTab: number;
		setActiveTab: (index: number) => void;
	}

	const { tabs, currentTab, setActiveTab }: TabListProps = $props();

	const selectTab = (index: number) => {
		setActiveTab(index);
	};
</script>

<div class="tab-list">
	{#each tabs as tab, index}
		<button class:active={currentTab === index} onclick={() => selectTab(index)}>
			{tab}
		</button>
	{/each}
</div>

<style lang="scss">
	.tab-list {
		display: flex;
		border-bottom: 1px solid #ccc;

		button {
			padding: 10px 20px;
			background: none;
			border: none;
			cursor: pointer;
		}

		button.active {
			font-weight: bold;
			border-bottom: 2px solid #0070f3;
		}
	}
</style>
