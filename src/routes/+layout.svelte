<script lang="ts">
	import ThemeToggle from '$components/ui/theme/ThemeToggle.svelte';
	import { setInitialTheme } from '$lib/utils/theme/toggle';
	import { siteData } from '$data/site/site-data';
	import '$styles/global.css';
	import '$styles/variables.css';

	setInitialTheme();
</script>

<svelte:head>
	<title>{siteData.title}</title>
	<meta name="description" content={siteData.description} />
</svelte:head>

<header>
	<ThemeToggle />
</header>
<slot></slot>
<footer></footer>
