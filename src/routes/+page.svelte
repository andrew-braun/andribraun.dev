<script lang="ts">
	import About from "$components/sections/about/About.svelte";
	import ContactSection from "$components/sections/contact/ContactSection.svelte";
	import MainHero from "$components/sections/hero/MainHero.svelte";
	import ProjectGrid from "$components/sections/projects/ProjectGrid.svelte";
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();
</script>

<MainHero />
<About />
<ProjectGrid projects={data.projects} />
<ContactSection />
