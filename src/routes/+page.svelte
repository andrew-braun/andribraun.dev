<script lang="ts">
	import About from "$components/sections/about/About.svelte";
	import MainHero from "$components/sections/hero/MainHero.svelte";
	import ProjectGrid from "$components/sections/projects/ProjectGrid.svelte";
	import Projects from "$components/sections/projects/Projects.svelte";
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();
</script>

<MainHero />
<About />
<ProjectGrid projects={data.projects} />
