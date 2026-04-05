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
		position: relative;
		display: flex;
		flex-direction: column;
		height: 100%;
		padding: var(--space-xl);
		margin: 0;
		overflow: hidden;
		background-color: var(--color-accent-3-surface);
		border-radius: var(--border-radius-lg);
	}

	.quotemark {
		position: absolute;
		top: var(--space-sm);
		left: var(--space-md);
		font-family: Georgia, serif;
		font-size: 6rem;
		line-height: var(--line-height-none);
		color: var(--color-accent-3);
		pointer-events: none;
		opacity: 0.4;
	}

	.quote {
		flex: 1;
		padding-top: var(--space-3xl);
		margin: 0;
		font-size: var(--font-size-md);
		font-style: italic;
		line-height: var(--line-height-loose);
	}

	.attribution {
		display: flex;
		flex-direction: column;
		gap: 2px;
		margin-top: var(--space-md);
	}

	.author {
		font-size: var(--font-size-sm);
		font-weight: 700;
	}

	.context {
		font-size: var(--font-size-xs);
		opacity: 0.7;
	}
</style>
