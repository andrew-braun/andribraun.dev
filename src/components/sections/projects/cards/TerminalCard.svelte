<script lang="ts">
	import TerminalLine, {
		type Props as TerminalLineProps
	} from "$components/ui/content/text/TerminalLine.svelte";
	import { intersection } from "$root/src/lib/hooks/intersection";

	let isIntersecting: boolean = $state(false);

	function generateLines() {
		const randomCommands = [
			{
				command: "$  help",
				output:
					"If I could help, I would, but I'm just a fake terminal.\nTry contacting Andri instead!"
			},
			{
				command: "$  secretLevel",
				output:
					"Congratulations! You've found the secret level! But there's nothing here...\nexcept your newfound sense of accomplishment, maybe?"
			},
			{
				command: "$  cat cat_pics",
				output:
					"Here are some cat pictures, but since this is a terminal, you'll have to imagine them:\n\n(=^.^=) (o^.^o) (^-^=) (=^-^=) (o^.^o)"
			},
			{
				command: "$  games",
				output:
					"  Quick, think of a number between 1 and 100 and I'll guess it!\n  It's okay, I'll wait... come on... pick a real good number.\n  No, not that one, that's too obvious. You can do better than that!\n  Okay, are you ready? Here I go...\n  ... ... ... ... ... ...\n  Is it... " +
					Math.round(Math.random() * 100 + 1) +
					"? \n  If I was right, you should be amazed.\n  If I was wrong, well... maybe next time!",
				typeOutput: true
			}
		];

		const randomComand = randomCommands[Math.floor(Math.random() * randomCommands.length)];

		const lines: TerminalLineProps[] = [
			{
				command: "$  ls home",
				output: "projects games cat_pics",
				startDelay: 500,
				outputDelay: "projects games cat_pics".length * 30,
				withCursor: false
			},
			// {
			// 	command: "$  help",
			// 	output: "Available commands: home, about, projects, contact, help, secretLevel",
			// 	startDelay: 500,
			// 	withCursor: false
			// },
			{
				...randomComand,
				withCursor: false
			}
			// {
			// 	command: "$  ",
			// 	output: "",
			// 	withCursor: true
			// }
		];

		for (let i = 1; i < lines.length; i++) {
			if (!lines[i].outputDelay) {
				lines[i].outputDelay = 500;
			}

			const prev = lines[i - 1];
			const prevStart = prev.startDelay ?? 0;
			const prevCommandTime = prev.command.length * 60;
			const prevOutputDelay = prev.outputDelay ?? 500;
			const prevOutputTime = prev.typeOutput ? (prev.output?.length ?? 0) * 60 : 0;

			lines[i].startDelay = prevStart + prevCommandTime + prevOutputDelay + prevOutputTime + 250;
		}

		return lines;
	}

	let lines = $state(generateLines());
</script>

<div
	class="terminal-card"
	use:intersection={{ threshold: 0.2, unobserveAfterIntersect: true }}
	onintersection={(e) => {
		isIntersecting = e.detail.isIntersecting;
	}}
>
	<div class="terminal-header">
		<div class="dots">
			<span class="dot dot--red"></span>
			<span class="dot dot--yellow"></span>
			<span class="dot dot--green"></span>
		</div>
		<span class="terminal-title">~/portfolio</span>
	</div>
	<div class="terminal-body">
		{#if isIntersecting}
			{#each lines as line (line.command)}
				<TerminalLine {...line} />
			{/each}
		{/if}
	</div>
</div>

<style lang="scss">
	.terminal-card {
		height: 100%;
		max-width: 90vw;
		background-color: var(--color-background-dark);
		border: 1px solid var(--color-background-dark-raised);
		border-radius: var(--border-radius-lg);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		font-family: "Fira Code", monospace;

		.terminal-header {
			display: flex;
			align-items: center;
			gap: var(--spacing-sm);
			padding: var(--spacing-sm) var(--spacing-md);
			background-color: var(--color-background-dark-raised);
			border-bottom: 1px solid var(--color-background-dark-raised);

			.dots {
				display: flex;
				gap: 6px;

				.dot {
					width: 12px;
					height: 12px;
					border-radius: 50%;

					&--red {
						background-color: var(--color-primary);
					}
					&--yellow {
						background-color: var(--color-accent-1);
					}
					&--green {
						background-color: var(--color-secondary);
					}
				}
			}

			.terminal-title {
				font-size: var(--font-size-xs);
				color: var(--color-background-dark-mid);
				margin-left: auto;
				margin-right: auto;
			}
		}

		.terminal-body {
			flex: 1;
			padding: var(--spacing-md);
			display: flex;
			flex-direction: column;
			gap: 4px;
			font-size: var(--font-size-xs);
		}
	}

	@keyframes blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
	}
</style>
