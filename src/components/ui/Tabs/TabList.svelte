<script lang="ts">
	import type { Tab } from "./tabs";

	interface TabListProps {
		tabs: Tab[];
		currentTab: number;
		setActiveTab: (index: number) => void;
	}

	const { tabs, currentTab, setActiveTab }: TabListProps = $props();

	const selectTab = (index: number) => {
		setActiveTab(index);
	};

	const handleKeydown = ({ event, currentTab }: { event: KeyboardEvent; currentTab: number }) => {
		const direction = event.key === "ArrowLeft" ? -1 : event.key === "ArrowRight" ? 1 : 0;
		if (direction !== 0) {
			setActiveTab((currentTab + direction + tabs.length) % tabs.length);
		}
	};
</script>

<div class="tab-list" role="tablist">
	{#each tabs as tab, index}
		<button
			class="tab-trigger"
			class:active={currentTab === index}
			onclick={() => selectTab(index)}
			onkeydown={(event) => handleKeydown({ event, currentTab })}
			role="tab"
			aria-selected={currentTab === index}
			aria-controls={`tab-${index}`}
		>
			{tab.label}
		</button>
	{/each}
</div>

<style lang="scss">
	.tab-list {
		display: flex;

		.tab-trigger {
			position: relative;
			margin: 0 var(--spacing-xs);
			padding: var(--spacing-sm) var(--spacing-md);
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
				color: var(--color-secondary-text);

				&::after {
					opacity: 1;
					width: 100%;
				}
			}
		}

		button.active {
			font-weight: bold;
			border-bottom: 2px solid #0070f3;
		}
	}
</style>
