<script lang="ts">
	//@ts-ignore

	import { siteData } from '$data/site/site-data';
	import { setInitialTheme } from '$lib/utils/theme/toggle';
	import '$styles/fonts.css';
	import '$styles/global.css';
	import '$styles/variables.css';
	// import '$styles/scss-variables.scss';
	import Header from '$components/layout/Header.svelte';

	setInitialTheme();
</script>

<svelte:head>
	<title>{siteData.title}</title>
	<meta name="description" content={siteData.description} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />

	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link
		href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<Header />

<slot></slot>
<footer></footer>
