<script lang="ts">
	import { ctaData } from "../projects-data";
</script>

<div class="cta-card">
	<div class="content">
		<p class="heading">{ctaData.heading}</p>
		<p class="subheading">{ctaData.subheading}</p>
	</div>
	<a class="cta-button" href={ctaData.buttonHref}>
		{ctaData.buttonText}
	</a>
	<span class="available-indicator" aria-label="Currently available for projects">
		<span class="dot" aria-hidden="true"></span>
		Available
	</span>
</div>

<style lang="scss">
	.cta-card {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		padding: var(--spacing-lg);
		border-radius: var(--border-radius-lg);
		background-color: var(--color-primary-surface);
		overflow: hidden;
	}

	.content {
		flex: 1;
	}

	.heading {
		margin: 0;
		font-size: var(--font-size-h3);
		font-weight: 700;
		font-family: Raleway;
		line-height: 1.2;
	}

	.subheading {
		margin: var(--spacing-xs) 0 0;
		font-size: var(--font-size-h3);
		font-weight: 700;
		font-family: Raleway;
		line-height: 1.2;
		color: var(--color-primary);
	}

	.cta-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		margin-top: var(--spacing-lg);
		padding: var(--spacing-sm) var(--spacing-md);
		border-radius: var(--border-radius-md);
		background-color: var(--color-primary);
		color: var(--color-text-dark);
		text-decoration: none;
		font-weight: 600;
		font-size: var(--font-size-sm);
		transition: background-color var(--transition-fs);

		&:hover {
			background-color: var(--color-secondary);
			color: var(--color-text-light);
		}
	}

	.available-indicator {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
		margin-top: var(--spacing-md);
		font-size: var(--font-size-xs);
		opacity: 0.7;
	}

	.dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background-color: var(--color-secondary);
		animation: pulse 2.5s ease-in-out infinite;
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.4; }
	}
</style>
