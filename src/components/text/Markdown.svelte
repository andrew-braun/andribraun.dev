<script lang="ts">
	import { marked } from "marked";

	interface MarkdownProps {
		text: string;
	}

	let { text }: MarkdownProps = $props();

	const markdownText = marked.parse(text);
</script>

{@html markdownText}
