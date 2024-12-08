<script lang="ts">
	import { Tabs } from "bits-ui";

	export interface Tab {
		value: string;
		label: string;
		content: any;
	}

	interface TabbedProps {
		defaultValue?: string;
		tabs: Tab[];
	}

	let { defaultValue, tabs }: TabbedProps = $props();
</script>

<Tabs.Root value={defaultValue ?? tabs[0].value}>
	<Tabs.List>
		{#each tabs as tab}
			<Tabs.Trigger value={tab.value} asChild let:builder
				><button class="tab-trigger" use:builder.action {...builder}>{tab.label}</button
				></Tabs.Trigger
			>
		{/each}
	</Tabs.List>
	{#each tabs as tab}
		<Tabs.Content value={tab.value}>{tab.content}</Tabs.Content>
	{/each}
</Tabs.Root>

<style lang="scss">
	.tab-trigger {
		padding: var(--spacing-sm) var(--spacing-md);
		border: solid accent-1;
		border-width: 2px 2px 0 2px;
		border-radius: var(--border-radius-md) var(--border-radius-md) 0 0;
		background: transparent;
		cursor: pointer;
		color: var(--color-text);
	}
</style>
