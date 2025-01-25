<script lang="ts">
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
	id={`tab-${index}`}
	class="tab-content"
	class:active={isActive}
	hidden={!isActive ? true : false}
	role="tabpanel"
	aria-labelledby={`tab-label-${index}`}
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

		&[hidden] {
			display: block;
			visibility: visible;
		}
	}
</style>
