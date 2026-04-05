<script lang="ts">
	import { onDestroy } from "svelte";

	import TabContent from "./TabContent.svelte";
	import TabList from "./TabList.svelte";

	// Public inputs from the parent component.
	const { tabs, initialTab = 0 } = $props();
	// Keep JavaScript cleanup timing aligned with CSS animation timing.
	const ANIMATION_DURATION_MS = 420;

	// Every mounted panel is either stable, entering, or exiting.
	type PanelPhase = "idle" | "enter" | "exit";
	// Forward = moving to a higher tab index, backward = lower tab index.
	type PanelDirection = 1 | -1;

	// Metadata describing one mounted panel in the render loop.
	interface VisiblePanel {
		// Unique key prevents Svelte from reusing DOM nodes across transition runs.
		key: string;
		// Index of the source tab definition.
		index: number;
		// Determines which animation class TabContent receives.
		phase: PanelPhase;
		// Determines whether movement is left-to-right or right-to-left.
		direction: PanelDirection;
	}

	// Logically active tab (used by tab triggers and ARIA state).
	let currentTab = $state(0);
	// Transition run token used to ignore stale async cleanup callbacks.
	let transitionRun = 0;
	// Panels currently mounted in the DOM. During animation there are two.
	let visiblePanels = $state<VisiblePanel[]>([]);
	// Cleanup timer handle for collapsing two panels back to one.
	let transitionTimer: ReturnType<typeof setTimeout> | undefined;

	// Centralized timer cleanup to avoid duplicate or stale timers.
	const clearTransitionTimer = () => {
		if (transitionTimer) {
			clearTimeout(transitionTimer);
			transitionTimer = undefined;
		}
	};

	// Defensive bounds checking for any incoming tab index.
	const clampIndex = (index: number) => {
		if (tabs.length === 0) {
			return 0;
		}

		return Math.min(Math.max(index, 0), tabs.length - 1);
	};

	// Small factory so panel objects are created consistently.
	const createPanel = (
		index: number,
		phase: PanelPhase,
		direction: PanelDirection,
		prefix: string,
		// Default run id comes from the current transition token.
		run = transitionRun
	): VisiblePanel => {
		return {
			key: `${prefix}-${index}-${run}`,
			index,
			phase,
			direction
		};
	};

	// Keep local state synchronized when parent changes initialTab.
	// We always reset to a single idle panel to avoid stale animation state.
	$effect(() => {
		const nextTab = clampIndex(initialTab);

		clearTransitionTimer();
		currentTab = nextTab;
		visiblePanels = [createPanel(nextTab, "idle", 1, "active", 0)];
	});

	// Prevent timer leaks if the component unmounts mid-transition.
	onDestroy(() => {
		clearTransitionTimer();
	});

	// Called by TabList for click and keyboard navigation events.
	const setActiveTab = (index: number) => {
		const nextTab = clampIndex(index);

		// Ignore no-op or invalid navigation requests.
		if (nextTab === currentTab || !tabs[nextTab]) {
			return;
		}

		const previousTab = currentTab;
		const direction: PanelDirection = nextTab > previousTab ? 1 : -1;

		// Start a new transition run.
		clearTransitionTimer();
		transitionRun += 1;
		currentTab = nextTab;

		// Mount both panels so old and new content are visible during the slide.
		visiblePanels = [
			createPanel(previousTab, "exit", direction, "from"),
			createPanel(nextTab, "enter", direction, "to")
		];

		// Capture run token so rapid user input cannot apply stale cleanup.
		const activeRun = transitionRun;
		transitionTimer = setTimeout(() => {
			if (activeRun !== transitionRun) {
				return;
			}

			// After animation, keep only one idle panel.
			// This restores natural dynamic height based on active content only.
			visiblePanels = [createPanel(currentTab, "idle", direction, "active")];
			transitionTimer = undefined;
		}, ANIMATION_DURATION_MS);
	};
</script>

<div class="tabs">
	<!-- TabList is stateless UI control that receives current state + callback. -->
	<TabList {tabs} {currentTab} {setActiveTab} />

	<!--
		Pass animation duration as CSS variable so TabContent keyframes
		and JS cleanup use the same timing value.
	-->
	<div class="tabs-container" style={`--tab-slide-duration: ${ANIMATION_DURATION_MS}ms;`}>
		<!--
			We key by panel.key so entering/exiting nodes remain distinct,
			which is required for two-panel overlap animation.
		-->
		{#each visiblePanels as panel (panel.key)}
			{@const panelTab = tabs[panel.index]}
			{#if panelTab}
				<!-- Resolve dynamic component constructor from tab definition. -->
				{@const PanelContent = panelTab.content}
				<TabContent
					index={panel.index}
					phase={panel.phase}
					direction={panel.direction}
					isActive={panel.index === currentTab}
				>
					<PanelContent {...panelTab.props ?? {}} />
				</TabContent>
			{/if}
		{/each}
	</div>
</div>

<style lang="scss">
	.tabs {
		display: flex;
		flex-direction: column;

		.tabs-container {
			/* Stack panels in one cell so enter/exit animations overlap. */
			display: grid;
			grid-template-rows: auto;
			grid-template-columns: minmax(0, 1fr);
			margin-top: var(--space-md);

			/* Clip off-screen translated panels while they slide in/out. */
			overflow: hidden;
		}
	}
</style>
