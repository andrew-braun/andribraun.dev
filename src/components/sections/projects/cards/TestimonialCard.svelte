<script lang="ts">
	interface Testimonial {
		quote: string;
		author: string;
		context: string;
	}

	interface Props {
		testimonial: Testimonial;
	}

	let { testimonial }: Props = $props();

	// svelte-ignore state_referenced_locally
	let { quote, author, context } = testimonial;
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
		padding: var(--space-xl);
		margin: 0;
		border-radius: var(--border-radius-lg);
		background-color: var(--color-accent-3-surface);
		position: relative;
		overflow: hidden;
	}

	.quotemark {
		font-size: 6rem;
		line-height: var(--line-height-none);
		font-family: Georgia, serif;
		color: var(--color-accent-3);
		opacity: 0.4;
		position: absolute;
		top: var(--space-sm);
		left: var(--space-md);
		pointer-events: none;
	}

	.quote {
		margin: 0;
		padding-top: var(--space-3xl);
		font-size: var(--font-size-md);
		line-height: var(--line-height-loose);
		font-style: italic;
		flex: 1;
	}

	.attribution {
		display: flex;
		flex-direction: column;
		gap: 2px;
		margin-top: var(--space-md);
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
