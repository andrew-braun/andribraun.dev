<script lang="ts">
	import type { Snippet } from "svelte";
	import MenuButton from "./buttons/MenuButton.svelte";

	interface DrawerProps {
		isOpen: boolean;
		position: "right" | "left";
		onClose: () => void;
		header?: Snippet;
		children: Snippet;
		label?: string;
		id?: string;
		styles?: {
			background?: "default" | "blur";
			width?: "default" | "full";
		};
	}

	let {
		isOpen,
		position,
		onClose,
		header,
		children,
		styles,
		label = "Menu",
		id
	}: DrawerProps = $props();

	// Keep in sync with `--transition-duration` below. Used as a fallback if
	// `transitionend` does not fire (for example with `prefers-reduced-motion`).
	const CLOSE_TRANSITION_MS = 300;

	let dialogEl = $state<HTMLDialogElement | null>(null);
	let isVisible = $state(false);
	let previousBodyOverflow = "";

	function requestClose() {
		onClose();
	}

	function handleCancel(event: Event) {
		// Prevent the UA from closing instantly on Escape so the slide-out can play.
		event.preventDefault();
		requestClose();
	}

	function handleDialogClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			requestClose();
		}
	}

	function handleDialogClose() {
		isVisible = false;
		document.body.style.overflow = previousBodyOverflow;
	}

	function closeDialogIfHidden() {
		if (!isOpen) {
			dialogEl?.close();
		}
	}

	function handleDrawerTransitionEnd(event: TransitionEvent) {
		if (event.propertyName !== "transform") return;
		closeDialogIfHidden();
	}

	$effect(() => {
		const dialog = dialogEl;
		if (!dialog) return;

		if (isOpen) {
			if (!dialog.open) {
				previousBodyOverflow = document.body.style.overflow;
				document.body.style.overflow = "hidden";
				dialog.showModal();
			}

			// Wait a frame so the off-canvas styles apply before `.open` transitions in.
			const frame = requestAnimationFrame(() => {
				isVisible = true;
			});

			return () => {
				cancelAnimationFrame(frame);
			};
		}

		isVisible = false;

		if (!dialog.open) return;

		const timeout = window.setTimeout(closeDialogIfHidden, CLOSE_TRANSITION_MS);

		return () => {
			clearTimeout(timeout);
		};
	});
</script>

<dialog
	{id}
	class="drawer-container"
	aria-label={label}
	bind:this={dialogEl}
	oncancel={handleCancel}
	onclose={handleDialogClose}
	onclick={handleDialogClick}
>
	<div class="overlay" class:active={isVisible}></div>

	<div
		class={[
			"drawer",
			position === "right" ? "right" : "left",
			isVisible ? "open" : "",
			styles?.background ?? "",
			styles?.width ?? ""
		]}
		ontransitionend={handleDrawerTransitionEnd}
	>
		<MenuButton {isOpen} onClick={requestClose} />
		{#if header}
			<header class="drawer-header">
				{@render header()}
			</header>
		{/if}
		{@render children()}
	</div>
</dialog>

<style lang="scss">
	.drawer-container {
		--drawer-width: clamp(220px, 85vw, 320px);
		--transition-duration: 0.3s;

		position: fixed;
		inset: 0;
		z-index: 90;
		width: 100%;
		max-width: none;
		height: 100%;
		max-height: none;
		padding: 0;
		margin: 0;
		overflow: hidden;
		color: inherit;
		background: transparent;
		border: none;

		&::backdrop {
			background: transparent;
		}

		.drawer {
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			z-index: 90;
			display: flex;
			flex-direction: column;
			gap: 10px;
			width: var(--drawer-width);
			height: 100vh;
			background: var(--color-background-mid);
			box-shadow: -2px 0 5px rgb(0 0 0 / 10%);
			transform: translateX(calc(var(--drawer-width) * 1.4));
			transition:
				transform var(--transition-duration),
				backdrop-filter var(--transition-duration);

			&.right {
				right: 0;

				&.open {
					transform: translateX(0);
				}
			}

			&.left {
				left: var(--drawer-width);
				transform: translateX(0);

				&.open {
					transform: translateX(var(--drawer-width));
				}
			}

			&.blur {
				background: transparent;
				backdrop-filter: blur(10px);
			}

			&.full {
				--drawer-width: 100%;
			}

			.drawer-header {
				padding: var(--space-md);
			}
		}
	}

	.overlay {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		z-index: 9;
		width: 100%;
		height: 100%;
		pointer-events: none;
		background: hsl(0deg 0% 0% / 50%);
		opacity: 0;
		transition: opacity var(--transition-duration);

		&.active {
			opacity: 1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.drawer-container {
			--transition-duration: 0.01ms;
		}
	}
</style>
