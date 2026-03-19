<script lang="ts">
	import TypeWriter from "typewriter-effect/dist/core";

	interface Props {
		text: string;
		withCursor?: boolean;
		startDelay?: number;
	}

	let { text, withCursor = true, startDelay = 0 }: Props = $props();

	function typewriter(node: HTMLElement) {
		const tw = new TypeWriter(node, {
			strings: [text],
			loop: false,
			cursor: withCursor ? "|" : "",
			delay: 60,
			changeDelay: "natural",
			cursorClassName: "cursor"
		});

		tw.pauseFor(startDelay).typeString(text).start();
	}
</script>

<span class={["text", !withCursor ? "no-cursor" : ""]} use:typewriter></span>

<style lang="scss">
	.text {
		position: relative;
		width: 100%;
		font-size: inherit;
		white-space: nowrap;
		overflow: hidden;
		max-width: fit-content;
		margin: 0;

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
