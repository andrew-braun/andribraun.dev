<div class="terminal-card">
	<div class="terminal-header">
		<div class="dots">
			<span class="dot dot--red"></span>
			<span class="dot dot--yellow"></span>
			<span class="dot dot--green"></span>
		</div>
		<span class="terminal-title">~/portfolio</span>
	</div>
	<div class="terminal-body">
		<p class="line"><span class="prompt">$</span> ls -la features/</p>
		<p class="line output">drwxr-xr-x&nbsp;&nbsp;terminal/</p>
		<p class="line output">drwxr-xr-x&nbsp;&nbsp;filesystem/</p>
		<p class="line"><span class="prompt">$</span> cat terminal/status</p>
		<p class="line output">Phase 2 — coming soon</p>
		<p class="line"><span class="prompt">$</span><span class="cursor">|</span></p>
	</div>
</div>

<style lang="scss">
	.terminal-card {
		height: 100%;
		background-color: var(--color-background-dark);
		border: 1px solid var(--color-background-dark-raised);
		border-radius: var(--border-radius-lg);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		font-family: "Fira Code", monospace;
	}

	.terminal-header {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-sm) var(--spacing-md);
		background-color: var(--color-background-dark-raised);
		border-bottom: 1px solid var(--color-background-dark-raised);
	}

	.dots {
		display: flex;
		gap: 6px;
	}

	.dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;

		&--red { background-color: var(--color-primary); }
		&--yellow { background-color: var(--color-accent-1); }
		&--green { background-color: var(--color-secondary); }
	}

	.terminal-title {
		font-size: var(--font-size-xs);
		color: var(--color-background-dark-mid);
		margin-left: auto;
		margin-right: auto;
	}

	.terminal-body {
		flex: 1;
		padding: var(--spacing-md);
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.line {
		margin: 0;
		font-size: var(--font-size-xs);
		line-height: 1.8;
		color: var(--color-text-dark);
		white-space: pre;
	}

	.prompt {
		color: var(--color-secondary);
		margin-right: var(--spacing-sm);
		font-weight: 600;
	}

	.output {
		color: var(--color-background-dark-mid);
		padding-left: calc(var(--font-size-xs) + var(--spacing-sm));
	}

	.cursor {
		display: inline-block;
		width: 2px;
		background-color: var(--color-secondary);
		color: transparent;
		animation: blink 1.2s step-end infinite;
		margin-left: var(--spacing-sm);
		vertical-align: middle;
	}

	@keyframes blink {
		0%, 100% { opacity: 1; }
		50% { opacity: 0; }
	}
</style>
