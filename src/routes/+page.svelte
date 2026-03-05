<script lang="ts">
	import About from "$components/sections/about/About.svelte";
	import MainHero from "$components/sections/hero/MainHero.svelte";
	import Projects from "$components/sections/projects/Projects.svelte";
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();
</script>

<MainHero />
<About />
<Projects projects={data.projects} />
