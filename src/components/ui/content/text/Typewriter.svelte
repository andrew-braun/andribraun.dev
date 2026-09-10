<script lang="ts">
	import { prefersReducedMotion } from "$utils/ui/motion";
	import { onMount } from "svelte";
	import TypeWriter from "typewriter-effect/dist/core";

	interface Props {
		text: string;
		withCursor?: boolean | undefined;
		startDelay?: number | undefined;
	}

	let { text, withCursor = true, startDelay = 0 }: Props = $props();

	let textRef: HTMLElement | undefined = $state();
	// The media query needs the browser, so this starts false and is resolved on mount.
	let reduced = $state(false);

	onMount(() => {
		if (prefersReducedMotion()) {
			reduced = true;
			return;
		}

		if (!textRef) return;

		const tw = new TypeWriter(textRef, {
			loop: false,
			cursor: withCursor ? "|" : "",
			delay: 60,
			changeDelay: "natural",
			cursorClassName: "cursor",
			autoStart: false
		});

		tw.pauseFor(startDelay).typeString(text).start();
	});
</script>

{#if reduced}
	<span class="text">{text}</span>
{:else}
	<!--
		Render the text visually as a typewriter but as a single, complete string for screen readers.
	-->
	<span class={["text", !withCursor ? "no-cursor" : ""]} aria-hidden="true" bind:this={textRef}
	></span>
	<span class="visually-hidden">{text}</span>
{/if}

<style lang="scss">
	.text {
		position: relative;
		width: 100%;
		max-width: fit-content;
		margin: 0;
		overflow: hidden;
		font-size: inherit;
		white-space: pre;

		:global(.cursor) {
			animation: blink 1s step-start infinite;

			@keyframes blink {
				0%,
				50% {
					opacity: 1;
				}

				50.01%,
				100% {
					opacity: 0;
				}
			}
		}

		&.no-cursor {
			:global(.cursor) {
				display: none;
				visibility: hidden;
				opacity: 0;
			}
		}
	}

	/* Available to a screen reader, takes no space, and stays in the accessibility tree —
	   which `display: none` and `visibility: hidden` would not. */
	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		white-space: nowrap;
		clip-path: inset(50%);
	}
</style>
