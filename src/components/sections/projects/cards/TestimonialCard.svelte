<script lang="ts">
	interface Props {
		quote: string;
		author: string;
		context: string;
	}

	let { quote, author, context }: Props = $props();
</script>

<blockquote class="testimonial-card">
	<span class="quotemark" aria-hidden="true">"</span>
	<p class="quote">{quote}</p>
	<footer class="attribution">
		<span class="author">{author}</span>
		{#if context}
			<span class="context">{context}</span>
		{/if}
	</footer>
</blockquote>

<style lang="scss">
	.testimonial-card {
		display: flex;
		flex-direction: column;
		height: 100%;
		padding: var(--spacing-lg);
		margin: 0;
		border-radius: var(--border-radius-lg);
		background-color: var(--color-accent-3-surface);
		position: relative;
		overflow: hidden;
	}

	.quotemark {
		font-size: 6rem;
		line-height: 1;
		font-family: Georgia, serif;
		color: var(--color-accent-3);
		opacity: 0.4;
		position: absolute;
		top: var(--spacing-sm);
		left: var(--spacing-md);
		pointer-events: none;
	}

	.quote {
		margin: 0;
		padding-top: var(--spacing-xl);
		font-size: var(--font-size-md);
		line-height: 1.7;
		font-style: italic;
		flex: 1;
	}

	.attribution {
		display: flex;
		flex-direction: column;
		gap: 2px;
		margin-top: var(--spacing-md);
	}

	.author {
		font-weight: 700;
		font-size: var(--font-size-sm);
	}

	.context {
		font-size: var(--font-size-xs);
		opacity: 0.7;
	}
</style>
