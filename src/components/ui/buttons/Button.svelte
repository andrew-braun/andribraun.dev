<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";

	export let type: HTMLButtonAttributes["type"] = "button";
	export let variant: "filled" | "outline" | "gradient" = "filled";
	export let size = "medium";
	export let disabled: boolean = false;
	export let hoverEffect: "flashyBackgroundSlide" = "flashyBackgroundSlide";
	export let icon: any = null;
</script>

<button {type} class={`btn btn-${variant} btn-${size} btn-${hoverEffect}`} {disabled} on:click>
	<slot></slot>
	<!-- {#if ["flashyBackgroundSlide"].includes(hoverEffect)}
		<div class="btn-background-slide-bg"></div>
	{/if} -->
	{#if icon}
		<span class="icon-container">
			<svelte:component this={icon} class="icon" />
		</span>
	{/if}
</button>

<style scoped>
	/* Base button styles */
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: var(--btn-padding, 0.5rem 1rem);
		border-radius: var(--border-radius-md);
		cursor: pointer;
		border: none;
		text-align: center;
		transition: all var(--transition-md);
		background-color: var(--color-text);
		color: var(--color-background);
		font-size: var(--font-size-md);

		&:active {
			transform: translate3d(2px, 2px, 0);
		}
	}

	.btn-filled {
		background-color: var(--color-primary);
		color: var(--color-text-light);

		&:hover {
			background-color: var(--color-secondary);
			color: var(--color-text-light);
		}
	}

	.btn-gradient {
		background: linear-gradient(
			135deg,
			var(--color-text) 10%,
			var(--color-primary) 40%,
			var(--color-secondary)
		);
		background-size: 200% 200%;
		background-position: 10% 0%;
		transition: all var(--transition-md);
		color: var(--color-text-light);

		&:hover {
			/* background: linear-gradient(90deg, var(--color-secondary), var(--color-primary)); */
			background-position: 100% 100%;
		}
	}

	.btn-outline {
		background-color: transparent;
		color: var(--color-text);
		border: 2px solid var(--color-primary) !important;

		&:hover {
			background-color: var(--color-secondary);
		}
	}

	/* Size variants */
	.btn-small {
		font-size: var(--font-size-sm);
		padding: var(--spacing-xs) var(--spacing-sm);
		min-width: 180px;
	}

	.btn-medium {
		font-size: var(--font-size-md);
		padding: var(--spacing-sm) var(--spacing-md);
		min-width: 220px;
	}

	.btn-large {
		font-size: var(--font-size-lg);
		padding: var(--spacing-sm) var(--spacing-lg);
		width: clamp(220px, 100%, 300px);
	}

	/* Disabled state */
	.btn[disabled] {
		cursor: not-allowed;
		opacity: 0.6;
	}

	/* Icon */
	.icon-container {
		position: relative;
		top: 2px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		margin-left: var(--spacing-md);
	}

	/* Hover effects */
	.btn {
		&.btn-flashyBackgroundSlide {
			position: relative;
			/* color: var(--color-text-light); */
			text-align: center;
			overflow: hidden;
			border: 2px solid transparent;
			transition:
				box-shadow 0.4s cubic-bezier(0.55, 0, 0.1, 1),
				background 0.6s cubic-bezier(0.55, 0, 0.1, 1),
				transform 0.1s cubic-bezier(0.55, 0, 0.1, 1),
				color 0.2s cubic-bezier(0.55, 0, 0.1, 1);
			cursor: pointer;
			box-shadow: rgb(51, 51, 51) 0px 0px 0px;
			font-weight: 600;

			&:hover {
				/* background: transparent; */
				color: var(--color-text-light);
				border: var(--border-md);
				box-shadow:
					var(--color-primary) 8px 8px 0px,
					var(--color-secondary) -8px -8px 0px;

				/* .btn-background-slide-bg {
					opacity: 1;
					transform: translateZ(0);
				} */
			}

			/* .btn-background-slide-bg {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				transform: translate3d(0, 90px, 0);
				background: var(--color-secondary);
				transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
				z-index: -1;
			} */

			&:active {
				transform: scale3d(0.95, 0.95, 1);
			}
		}
	}
</style>
