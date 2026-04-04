<script lang="ts">
	import { Tabs } from "bits-ui";

	interface Tab {
		value: string;
		label: string;
		content: any;
		props?: Record<string, any>;
	}

	interface TabbedProps {
		defaultValue?: string;
		tabs: Tab[];
	}

	let { defaultValue, tabs }: TabbedProps = $props();
</script>

<Tabs.Root value={defaultValue ?? tabs[0].value}>
	{#snippet child({ props })}
		<div class="tabs-root" {...props}>
			<div class="tabs-list">
				<Tabs.List>
					{#each tabs as tab (tab.value)}
						<Tabs.Trigger value={tab.value}>
							{#snippet child({ props: triggerProps })}
								<button class="tab-trigger" {...triggerProps}>{tab.label}</button>
							{/snippet}
						</Tabs.Trigger>
					{/each}
				</Tabs.List>
			</div>
			{#each tabs as tab (tab.value)}
				<Tabs.Content value={tab.value}>
					{#snippet child({ props: contentProps })}
						<div class="tab-content" {...contentProps}>
							{#if typeof tab.content === "function"}
								<tab.content {...tab.props} />
							{:else}
								{tab.content}
							{/if}
						</div>
					{/snippet}
				</Tabs.Content>
			{/each}
		</div>
	{/snippet}
</Tabs.Root>

<style lang="scss">
	.tabs-root {
		position: relative;

		.tabs-list {
			container-type: inline-size;
			margin-bottom: var(--space-md);

			:global {
				div[role="tablist"] {
					@container (width < 530px) {
						display: flex;
						flex-direction: column;
					}
				}
			}

			.tab-trigger {
				position: relative;
				margin: 0 var(--space-xs);
				padding: var(--space-sm) var(--space-md);
				border: none;
				border-radius: var(--border-radius-md) var(--border-radius-md) 0 0;
				background: transparent;
				cursor: pointer;
				font-size: var(--font-size-md);
				font-weight: 600;
				color: var(--color-text);
				z-index: 10;

				&:nth-child(1) {
					margin-left: 0;
				}

				&::before {
					content: "";
					position: absolute;
					inset: 0;
					border-radius: var(--border-radius-md) var(--border-radius-md) 0 0;
					border: solid transparent;
					border-width: 4px 4px 0 4px;
					background: linear-gradient(90deg, var(--color-primary), var(--color-secondary))
						border-box;
					-webkit-mask:
						linear-gradient(#fff 0 0) padding-box,
						linear-gradient(#fff 0 0);
					mask:
						linear-gradient(#fff 0 0) padding-box,
						linear-gradient(#fff 0 0);
					-webkit-mask-composite: destination-out;
					mask-composite: exclude;
				}

				&::after {
					position: absolute;
					bottom: 0;
					left: 0;
					width: 0%;
					height: 100%;
					content: "";
					border-radius: var(--border-radius-md) var(--border-radius-md) 0 0;
					background-image: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
					opacity: 0;
					transition: var(--transition-md);
					z-index: -1;
				}

				&[data-state="active"] {
					color: var(--color-secondary-fg);

					&::after {
						opacity: 1;
						width: 100%;
					}
				}
			}
		}

		.tab-content {
			position: absolute;
			top: 0;
			left: 0;
			padding-top: var(--space-3xl);
			opacity: 1;
			transition:
				top 0.3s ease,
				opacity 0.5s ease;

			&[hidden] {
				top: -100%;
				// left: -25%;
				display: block;
				opacity: 0;
			}
		}
	}
</style>
