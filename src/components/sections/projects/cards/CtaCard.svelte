<script>
	import Button from "$components/ui/buttons/Button.svelte";
</script>

<div class="cta-card">
	<div class="content">
		<p class="heading">Got a project?</p>
		<p class="subheading">Let's talk.</p>
	</div>
	<Button href="#contact">Get in touch</Button>
	<span class="available-indicator" aria-label="Currently available for projects">
		<span class="dot" aria-hidden="true"></span>
		Available
	</span>
</div>

<style lang="scss" scoped>
	.cta-card {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		padding: var(--space-xl);
		border-radius: var(--border-radius-lg);
		background-color: var(--color-primary-surface);
		overflow: hidden;

		.content {
			flex: 1;

			.heading {
				margin: 0;
				font-size: var(--font-size-h3);
				font-weight: 700;
				font-family: var(--font-family-heading);
				line-height: var(--line-height-tight);
			}

			.subheading {
				margin: var(--space-xs) 0 0;
				font-size: var(--font-size-h3);
				font-weight: 700;
				font-family: var(--font-family-heading);
				line-height: var(--line-height-tight);
				color: var(--color-primary);
			}
		}

		.available-indicator {
			display: flex;
			align-items: center;
			gap: var(--space-xs);
			margin-top: var(--space-md);
			font-size: var(--font-size-xs);
			opacity: 0.7;

			.dot {
				width: 8px;
				height: 8px;
				border-radius: 50%;
				background-color: var(--color-secondary);
				animation: pulse 2.5s ease-in-out infinite;
			}
		}
	}
	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.4;
		}
	}
</style>
