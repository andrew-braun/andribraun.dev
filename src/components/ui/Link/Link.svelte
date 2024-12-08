<script lang="ts">
	import type { HTMLLinkAttributes } from "svelte/elements";

	interface LinkProps {
		className?: string;
		href: string;
		underlineColor?: string;
		active?: boolean;
		restProps?: any;
		children: any;
	}

	let {
		className,
		href,
		underlineColor = "var(--color-accent-1)",
		active,
		restProps,
		children
	}: LinkProps = $props();
</script>

<a
	{...restProps}
	{href}
	class="animated-link {className}"
	class:active-link={active}
	style="--underline-color: {underlineColor}"
>
	{@render children()}
</a>

<style lang="scss">
	.animated-link {
		$transition-duration: 0.3s;

		position: relative;
		display: inline-block;
		padding: 2px 0px;
		text-decoration: none;
		color: inherit;
		transition: transform $transition-duration ease;

		// Underline effect
		&::after {
			content: "";
			position: absolute;
			width: 100%;
			height: 2px;
			bottom: 0;
			left: 0;
			background-color: var(--underline-color);
			transform: scaleX(0);
			transform-origin: bottom right;
			transition: transform $transition-duration ease;
		}

		// Hover states
		&:hover {
			&::after {
				transform: scaleX(1);
				transform-origin: bottom left;
			}
		}

		// Focus states for accessibility
		&:focus-visible {
			outline: 2px solid var(--underline-color);
			outline-offset: 4px;
		}
	}
	.active-link {
		&::after {
			transform: scaleX(1);
			transform-origin: bottom left;
		}
	}
</style>
