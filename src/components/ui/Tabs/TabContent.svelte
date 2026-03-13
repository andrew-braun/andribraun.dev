<script lang="ts">
	// Transition phase and direction must match the controller in Tabs.svelte.
	type PanelPhase = "idle" | "enter" | "exit";
	type PanelDirection = 1 | -1;

	interface TabContentProps {
		// Used for id/ARIA wiring with the matching tab trigger.
		index: number;
		// Animation state provided by Tabs.svelte.
		phase?: PanelPhase;
		// Direction of movement (forward/backward tab navigation).
		direction?: PanelDirection;
		// Whether this panel is logically active for accessibility state.
		isActive?: boolean;
		children: any;
	}

	const {
		index,
		phase = "idle",
		direction = 1,
		isActive = false,
		children
	}: TabContentProps = $props();

	// Convert the phase + direction pair into one CSS class.
	// Keeping this mapping in JS avoids repetitive class directives in markup.
	let animationClass = $derived.by(() => {
		if (phase === "enter") {
			return direction === 1 ? "enter-forward" : "enter-backward";
		}

		if (phase === "exit") {
			return direction === 1 ? "exit-forward" : "exit-backward";
		}

		return "idle";
	});
</script>

<!-- Keep non-active panel hidden from assistive tech while transition runs. -->
<div
	id={`tab-${index}`}
	class={`tab-content ${animationClass}`}
	role="tabpanel"
	aria-labelledby={`tab-label-${index}`}
	aria-hidden={!isActive}
>
	{@render children()}
</div>

<style lang="scss">
	.tab-content {
		/* Place all panels in the same grid cell to allow overlap during animation. */
		grid-column: 1;
		grid-row: 1;
		width: 100%;
		/* Hint browser for smoother transform animations. */
		will-change: transform;
		/* Duration comes from the parent component's CSS variable. */
		animation-duration: var(--tab-slide-duration, 320ms);
		/* Ease curve tuned to feel responsive at start and smooth at end. */
		animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
		/* Preserve end transform so panels do not snap back after animation. */
		animation-fill-mode: forwards;

		/* Stable resting state once transition cleanup has completed. */
		&.idle {
			transform: translateX(0%);
		}
		/* New panel entering during forward navigation. */
		&.enter-forward {
			animation-name: tab-enter-from-right;
			z-index: 2;
		}
		/* Old panel exiting during forward navigation. */
		&.exit-forward {
			animation-name: tab-exit-to-left;
			z-index: 1;
		}

		/* New panel entering during backward navigation. */
		&.enter-backward {
			animation-name: tab-enter-from-left;
			z-index: 2;
		}

		/* Old panel exiting during backward navigation. */
		&.exit-backward {
			animation-name: tab-exit-to-right;
			z-index: 1;
		}
	}

	/* Forward movement: incoming content starts to the right and slides into place. */
	@keyframes tab-enter-from-right {
		from {
			transform: translateX(100%);
		}

		to {
			transform: translateX(0%);
		}
	}

	/* Forward movement: outgoing content leaves toward the left. */
	@keyframes tab-exit-to-left {
		from {
			transform: translateX(0%);
		}

		to {
			transform: translateX(-100%);
		}
	}

	/* Backward movement: incoming content starts to the left and slides into place. */
	@keyframes tab-enter-from-left {
		from {
			transform: translateX(-100%);
		}

		to {
			transform: translateX(0%);
		}
	}

	/* Backward movement: outgoing content leaves toward the right. */
	@keyframes tab-exit-to-right {
		from {
			transform: translateX(0%);
		}

		to {
			transform: translateX(100%);
		}
	}
</style>
