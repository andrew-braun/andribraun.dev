<script lang="ts">
	import { portal } from "$root/src/lib/hooks/portal";
	import type { Snippet } from "svelte";
	import MenuButton from "./buttons/MenuButton.svelte";

	interface DrawerProps {
		isOpen: boolean;
		position: "right" | "left";
		onClose: () => void;
		header?: Snippet;
		children: Snippet;
		styles?: {
			background?: "default" | "blur";
			width?: "default" | "full";
		};
	}

	let { isOpen, position, onClose, header, children, styles }: DrawerProps = $props();

	const closeDrawer = () => {
		isOpen = false;
		onClose();
	};

	function handleCloseKeyDown(event: KeyboardEvent) {
		if (event.key === "Enter" || event.key === "Space") {
			closeDrawer();
		}
	}
</script>

<div class="drawer-container" use:portal={{ portalId: "mobile-nav-portal" }}>
	<div
		class="overlay"
		class:active={isOpen}
		onclick={closeDrawer}
		onkeydown={handleCloseKeyDown}
		role="button"
		tabindex="0"
	></div>

	<div
		class={[
			"drawer",
			position === "right" ? "right" : "left",
			isOpen ? "open" : "",
			styles?.background ?? "",
			styles?.width ?? ""
		]}
		aria-hidden={!isOpen}
	>
		{#if header}
			<header class="drawer-header">
				{@render header()}
			</header>
		{/if}
		<MenuButton {isOpen} onClick={closeDrawer} />
		{@render children()}
	</div>
</div>

<style lang="scss">
	.drawer-container {
		.drawer {
			--drawer-width: clamp(220px, 85vw, 320px);
			--transition-duration: 0.3s;

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
			box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
			// clip-path: inset(0 0 0 100%);
			// transition: clip-path 0.3s ease-in-out;
			transform: translateX(calc(var(--drawer-width) * 1.4));
			transition:
				transform var(--transition-duration),
				backdrop-filter var(--transition-duration);

			&.right {
				right: 0;

				&.open {
					// clip-path: inset(0 0 0 0);
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
		background: hsla(0, 0%, 0%, 0.5);
		opacity: 0;
		pointer-events: none;
		transition: opacity var(--transition-duration);

		&.active {
			opacity: 1;
			pointer-events: all;
		}
	}
</style>
