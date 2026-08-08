<script>
	import ProjectHero from "$components/sections/hero/ProjectHero.svelte";
	import Markdown from "$components/text/Markdown.svelte";

	let { data } = $props();

	const { project } = $derived(data);
	const { description_markdown } = $derived(project);
	console.log(project);
</script>

<ProjectHero {project} />
{#if description_markdown}
	<Markdown text={description_markdown} />
{/if}
