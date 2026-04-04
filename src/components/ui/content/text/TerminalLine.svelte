<script lang="ts">
	import { onMount } from "svelte";
	import Typewriter from "./Typewriter.svelte";

	export interface Props {
		command: string;
		output?: string;
		outputDelay?: number;
		withCursor?: boolean;
		typeOutput?: boolean;
		startDelay?: number;
	}

	const {
		command,
		output,
		outputDelay,
		withCursor,
		typeOutput = false,
		startDelay
	}: Props = $props();

	let showLine = $state(false);
	let showOutput = $state(false);

	onMount(() => {
		setTimeout(() => {
			showLine = true;
			if (output) {
				const commandTypingTime = command.length * 60;
				setTimeout(
					() => {
						showOutput = true;
					},
					commandTypingTime + (outputDelay ?? 500)
				);
			}
		}, startDelay ?? 0);
	});
</script>

{#if showLine}
	<span class="line">
		<Typewriter text={command} {withCursor} />
	</span>

	{#if output && showOutput}
		{#if typeOutput}
			<span class="line">
				<Typewriter text={output} {withCursor} />
			</span>
		{:else}
			<span class="line output">{output}</span>
		{/if}
	{/if}
{/if}

<style lang="scss">
	.line {
		margin: 0;
		text-wrap: balance;
		line-height: var(--line-height-wide);
		color: var(--neutral-1000);
		white-space: pre;

		&.output {
			color: var(--neutral-300);
			padding-left: calc(var(--font-size-xs) + var(--space-sm));
		}

		:global(.cursor) {
			display: inline-block;
			width: 2px;
			background-color: var(--color-secondary);
			color: transparent;
			animation: blink 1.2s step-end infinite;
			margin-left: var(--space-sm);
			vertical-align: middle;
		}
	}
</style>
