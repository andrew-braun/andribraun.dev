<script lang="ts">
	import { marked } from "marked";

	interface MarkdownProps {
		text: string;
		maxWidth?: string;
	}

	let { text, maxWidth }: MarkdownProps = $props();

	const markdownText = $derived(marked.parse(text));
</script>

{#if maxWidth}
	<div style={`max-width: ${maxWidth};`}>
		<!-- eslint-disable-next-line svelte/no-at-html-tags -- CMS content authored by site owner -->
		{@html markdownText}
	</div>
{:else}
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- CMS content authored by site owner -->
	{@html markdownText}
{/if}
