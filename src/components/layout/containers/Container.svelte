<script lang="ts">
	import type { ColorVariant } from "$ts/style";
	import type { Snippet } from "svelte";
	import type { ClassValue } from "svelte/elements";

	interface Props {
		children: Snippet;
		element?: "div" | "section" | "article" | "main";
		class?: ClassValue;
		/** Anchor target, so a section keeps its in-page link. */
		id?: string | undefined;
		/** Background reaches the viewport; content stays at --site-max-width. */
		bleed?: boolean;
		/** Surface tint behind the content. */
		tone?: ColorVariant | undefined;
		/** Vertical rhythm. `section` is the case-study section rhythm. */
		spacing?: "default" | "section";
	}

	let {
		children,
		element = "div",
		class: className,
		id,
		bleed = false,
		tone,
		spacing = "default"
	}: Props = $props();
</script>

<svelte:element
	this={element}
	{id}
	class={["container", { bleed }, tone, `spacing-${spacing}`, className]}
>
	<div class="content">
		{@render children()}
	</div>
</svelte:element>

<style lang="scss">
	.container {
		max-width: var(--site-max-width);
		margin-inline: auto;

		/* Only the background escapes; .content re-constrains the text. */
		&.bleed {
			max-width: none;
		}

		&.primary {
			background-color: var(--color-primary-surface);
		}

		&.secondary {
			background-color: var(--color-secondary-surface);
		}

		&.accent-1 {
			background-color: var(--color-accent-1-surface);
		}

		&.accent-2 {
			background-color: var(--color-accent-2-surface);
		}

		&.accent-3 {
			background-color: var(--color-accent-3-surface);
		}

		.content {
			max-width: var(--site-max-width);
			padding: var(--space-lg);
			margin-inline: auto;

			@media (max-width: $breakpoint-sm) {
				padding: var(--space-md);
			}
		}

		&.spacing-section .content {
			padding-block: var(--space-3xl);

			@media (max-width: $breakpoint-sm) {
				padding-block: var(--space-2xl);
			}
		}
	}
</style>
