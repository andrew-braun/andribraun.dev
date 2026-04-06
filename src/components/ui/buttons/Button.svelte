<script lang="ts">
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";

	type SharedProps = {
		variant?: "filled" | "outline" | "gradient";
		size?: "small" | "medium" | "large" | "100";
		hoverEffect?: "flashy-background-slide";
		Icon?: any;
		loading?: boolean;
		children?: any;
	};

	type ButtonProps = SharedProps & {
		href?: never;
		type?: HTMLButtonAttributes["type"];
		disabled?: boolean;
		onclick?: () => void;
	};

	type LinkProps = SharedProps & {
		href: string;
		target?: HTMLAnchorAttributes["target"];
		type?: never;
		disabled?: never;
		onclick?: never;
	};

	let {
		href,
		type = "button",
		variant = "filled",
		size = "medium",
		disabled = false,
		hoverEffect = "flashy-background-slide",
		Icon = null,
		onclick,
		children,
		loading = false,
		...rest
	}: ButtonProps | LinkProps = $props();

	const target = $derived((rest as LinkProps).target);
	const classes = $derived(
		`btn btn-${variant} btn-${size} btn-${hoverEffect} ${loading ? "btn-loading" : ""}`
	);
</script>

{#if href}
	<a {href} {target} class={classes}>
		{@render children()}
		{#if Icon}
			<span class="icon-container">
				<Icon class="icon"></Icon>
			</span>
		{/if}
	</a>
{:else}
	<button {type} class={classes} {disabled} {onclick}>
		{@render children()}
		{#if Icon}
			<span class="icon-container">
				<Icon class="icon"></Icon>
			</span>
		{/if}
	</button>
{/if}

<style lang="scss">
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 2.5em;
		padding: var(--btn-padding, 0.5rem 1rem);
		font-size: var(--font-size-md);
		color: var(--color-background);
		text-align: center;
		text-decoration: none;
		cursor: pointer;
		background-color: var(--color-text);
		border: none;
		border-radius: var(--border-radius-md);
		transition: all var(--transition-md);

		&:active {
			transform: translate3d(2px, 2px, 0);
		}

		&[disabled],
		&[disabled]:hover {
			cursor: not-allowed;
			box-shadow: none;
			opacity: 0.6;
		}

		/* Variant modifiers */
		&.btn-filled {
			color: var(--color-primary-fg);
			background-color: var(--color-primary);

			&:hover:not([disabled]) {
				color: var(--color-secondary-fg);
				background-color: var(--color-secondary);
			}
		}

		&.btn-gradient {
			color: var(--neutral-0);
			background: linear-gradient(
				135deg,
				var(--color-text) 10%,
				var(--color-primary) 40%,
				var(--color-secondary)
			);
			background-position: 10% 0%;
			background-size: 200% 200%;
			transition: all var(--transition-md);

			&:hover:not([disabled]) {
				/* background: linear-gradient(90deg, var(--color-secondary), var(--color-primary)); */
				background-position: 100% 100%;
			}
		}

		&.btn-outline {
			color: var(--color-text);
			background-color: transparent;
			border: 2px solid var(--color-primary) !important;

			&:hover:not([disabled]) {
				background-color: var(--color-secondary);
			}
		}

		/* Size modifiers */
		&.btn-small {
			min-width: 160px;
			padding: var(--space-xs) var(--space-sm);
			font-size: var(--font-size-sm);
		}

		&.btn-medium {
			min-width: 180px;
			padding: var(--space-sm) var(--space-md);
			font-size: var(--font-size-md);
		}

		&.btn-large {
			width: 280px;
			padding: var(--space-sm) var(--space-md);
			font-size: var(--font-size-lg);
		}

		&.btn-100 {
			width: 100%;
			font-size: inherit;
		}

		/* Hover effects */
		&.btn-flashy-background-slide {
			position: relative;
			overflow: hidden;
			font-weight: 600;

			/* color: var(--neutral-0); */
			text-align: center;
			cursor: pointer;
			border: 2px solid transparent;
			box-shadow: rgb(51 51 51) 0 0 0;
			transition:
				box-shadow 0.4s cubic-bezier(0.55, 0, 0.1, 1),
				background 0.6s cubic-bezier(0.55, 0, 0.1, 1),
				transform 0.1s cubic-bezier(0.55, 0, 0.1, 1),
				color 0.2s cubic-bezier(0.55, 0, 0.1, 1);

			&:hover:not([disabled]) {
				/* background: transparent; */
				color: var(--neutral-0);
				border: var(--border-primary);
				box-shadow:
					var(--color-primary) 8px 8px 0,
					var(--color-secondary) -8px -8px 0;

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

		/* Children */
		.icon-container {
			position: relative;
			top: 2px;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			margin-left: var(--space-md);
		}
	}
</style>
