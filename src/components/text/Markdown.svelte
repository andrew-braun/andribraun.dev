<script lang="ts">
	import { marked } from "marked";

	interface MarkdownProps {
		text: string;
	}

	let { text }: MarkdownProps = $props();

	const markdownText = $derived(marked.parse(text));
</script>

<!-- eslint-disable-next-line svelte/no-at-html-tags -- CMS content authored by site owner -->
{@html markdownText}
