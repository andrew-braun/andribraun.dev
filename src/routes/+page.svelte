<script lang="ts">
	import About from "$components/sections/about/About.svelte";
	import MainHero from "$components/sections/hero/MainHero.svelte";
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();

	// TODO: remove — temporary verification
	$effect(() => console.log(`[projects] loaded ${data.projects.length} project(s)`, data.projects));
</script>

<MainHero />
<About />
