<script lang="ts">
	import { siteData } from "$lib/data/site/site-data";
	import { setInitialTheme } from "$lib/utils/theme/toggle";
	import type { Snippet } from "svelte";

	import "$styles/fonts.css";
	import "$styles/global.css";
	import "$styles/variables.css";
	// import '$styles/scss-variables.scss';
	import Footer from "$components/layout/footer/Footer.svelte";
	import Header from "$components/layout/header/Header.svelte";

	let { children }: { children: Snippet } = $props();

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

<a class="skip-link" href="#main-content">Skip to main content</a>

<Header />

<main id="main-content" class="main" tabindex="-1">
	{@render children()}
</main>

<Footer />

<style lang="scss">
	.main {
		max-width: var(--site-max-width);
		margin: auto;
	}

	.skip-link {
		position: absolute;
		top: var(--space-sm);
		left: var(--space-sm);
		z-index: 100;
		padding: var(--space-sm) var(--space-md);
		color: var(--color-primary-fg);
		background: var(--color-primary);
		border-radius: var(--border-radius-md);

		/* Off-screen until focused, rather than `display: none`, which would make it
		   unreachable by the keyboard users it exists for. */
		transform: translateY(-200%);

		&:focus-visible {
			transform: translateY(0);
		}
	}
</style>
