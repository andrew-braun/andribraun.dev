<script>
	import ProjectHero from "$components/sections/hero/ProjectHero.svelte";

	let { data } = $props();

	const { project } = $derived(data);
</script>

<ProjectHero {project} />
