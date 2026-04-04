<script lang="ts">
	import type { Tab } from "./tabs";

	interface TabListProps {
		// Full set of tabs to render as clickable triggers.
		tabs: Tab[];
		// Index of currently active tab.
		currentTab: number;
		// Callback supplied by Tabs.svelte to start transitions.
		setActiveTab: (index: number) => void;
	}

	const { tabs, currentTab, setActiveTab }: TabListProps = $props();

	// Simple click handler wrapper for template readability.
	const selectTab = (index: number) => {
		setActiveTab(index);
	};

	// Horizontal arrow navigation with wrap-around behavior.
	// This keeps keyboard interaction fast and predictable.
	const handleKeydown = ({ event, currentTab }: { event: KeyboardEvent; currentTab: number }) => {
		const direction = event.key === "ArrowLeft" ? -1 : event.key === "ArrowRight" ? 1 : 0;
		if (direction !== 0) {
			// Modular arithmetic wraps index at boundaries (first/last tab).
			setActiveTab((currentTab + direction + tabs.length) % tabs.length);
		}
	};
</script>

<div class="tab-list" role="tablist" aria-label="About Me Tabs">
	{#each tabs as tab, index (tab.value)}
		<!-- Active class is visual only; semantic active state uses aria-selected. -->
		<!-- Bidirectional ARIA links connect trigger to its tabpanel by id. -->
		<button
			class="tab-trigger"
			class:active={currentTab === index}
			onclick={() => selectTab(index)}
			onkeydown={(event) => handleKeydown({ event, currentTab })}
			role="tab"
			aria-selected={currentTab === index}
			aria-controls={`tab-${index}`}
			id={`tab-label-${index}`}
		>
			{tab.label}
		</button>
	{/each}
</div>

<style lang="scss">
	.tab-list {
		display: flex;

		@media (max-width: $breakpoint-xs) {
			// Stack triggers vertically for narrow screens.
			flex-direction: column;
			gap: var(--space-sm);

			.tab-trigger {
				flex: 0;
				min-width: fit-content;
				border-radius: 0;
			}

			@for $index from 1 through 5 {
				// Slightly stagger trigger widths to maintain visual rhythm on mobile.
				button:nth-of-type(#{$index}) {
					width: calc(90% / 3 * $index);

					@media (max-width: 378px) {
						min-width: 0;
						width: 100%;
					}
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

			@media (max-width: $breakpoint-xs) {
				margin-left: 0;
			}

			&::before {
				// Gradient border effect drawn via mask compositing.
				content: "";
				position: absolute;
				inset: 0;
				border-radius: var(--border-radius-md) var(--border-radius-md) 0 0;
				border: solid transparent;
				border-width: 2px 1px 0 1px;
				background: linear-gradient(90deg, var(--color-primary), var(--color-secondary)) border-box;
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
				// Active background fill that animates from left to right.
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

			&.active {
				// Active trigger text color needs high contrast over gradient fill.
				color: var(--color-secondary-fg);

				&::after {
					opacity: 1;
					width: 100%;
				}
			}
		}

		button.active {
			border-bottom: 2px solid #0070f3;
		}
	}
</style>
