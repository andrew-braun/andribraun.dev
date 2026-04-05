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
			margin-bottom: var(--space-md);
			container-type: inline-size;

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
				z-index: 10;
				padding: var(--space-sm) var(--space-md);
				margin: 0 var(--space-xs);
				font-size: var(--font-size-md);
				font-weight: 600;
				color: var(--color-text);
				cursor: pointer;
				background: transparent;
				border: none;
				border-radius: var(--border-radius-md) var(--border-radius-md) 0 0;

				&:nth-child(1) {
					margin-left: 0;
				}

				&::before {
					position: absolute;
					inset: 0;
					content: "";
					background: linear-gradient(90deg, var(--color-primary), var(--color-secondary))
						border-box;
					border: solid transparent;
					border-width: 4px 4px 0;
					border-radius: var(--border-radius-md) var(--border-radius-md) 0 0;
					/* stylelint-disable-next-line property-no-vendor-prefix */
					-webkit-mask:
						linear-gradient(#fff 0 0) padding-box,
						linear-gradient(#fff 0 0);
					mask:
						linear-gradient(#fff 0 0) padding-box,
						linear-gradient(#fff 0 0);
					/* stylelint-disable-next-line property-no-vendor-prefix */
					-webkit-mask-composite: destination-out;
					mask-composite: exclude;
				}

				&::after {
					position: absolute;
					bottom: 0;
					left: 0;
					z-index: -1;
					width: 0%;
					height: 100%;
					content: "";
					background-image: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
					border-radius: var(--border-radius-md) var(--border-radius-md) 0 0;
					opacity: 0;
					transition: var(--transition-md);
				}

				&[data-state="active"] {
					color: var(--color-secondary-fg);

					&::after {
						width: 100%;
						opacity: 1;
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
