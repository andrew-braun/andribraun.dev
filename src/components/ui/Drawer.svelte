<script lang="ts">
	import { portal } from "$root/src/lib/hooks/portal";

	export let isOpen: boolean = false;
	export let position: "right" | "left" = "right"; // Can be 'left' or 'right'

	const closeDrawer = () => {
		isOpen = false;
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
		on:click={closeDrawer}
		on:keydown={handleCloseKeyDown}
		role="button"
		tabindex="0"
	></div>

	<div
		class="drawer"
		class:right={position === "right"}
		class:left={position === "left"}
		class:open={isOpen}
		aria-hidden={!isOpen}
	>
		<slot></slot>
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
			padding: var(--spacing-sm);
			background: var(--color-background-mid);
			box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
			// clip-path: inset(0 0 0 100%);
			// transition: clip-path 0.3s ease-in-out;
			transform: translateX(calc(var(--drawer-width) * 1.4));
			transition: transform var(--transition-duration);

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
