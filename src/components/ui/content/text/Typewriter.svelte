<script lang="ts">
	import { onMount } from "svelte";
	import TypeWriter from "typewriter-effect/dist/core";

	interface Props {
		text: string;
		withCursor?: boolean;
		startDelay?: number;
	}

	let { text, withCursor = true, startDelay = 0 }: Props = $props();

	let textRef: HTMLElement;

	onMount(() => {
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

<span class={["text", !withCursor ? "no-cursor" : ""]} bind:this={textRef}></span>

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
</style>
