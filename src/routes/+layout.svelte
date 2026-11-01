<script lang="ts">
	import { page } from "$app/state";
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

	const seo = $derived({
		title: siteData.title,
		description: siteData.description,
		image: `${siteData.url}/og-image.png`,
		...page.data.seo
	});
	// The prerender host is a placeholder, so the origin is fixed rather than read from the URL.
	const canonical = $derived(`${siteData.url}${page.url.pathname}`);

	const person = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: "Andri Braun",
		url: siteData.url,
		jobTitle: "Web Developer",
		sameAs: ["https://github.com/andrew-braun", "https://www.linkedin.com/in/andribraun"]
	};
</script>

<svelte:head>
	<title>{seo.title}</title>
	<meta name="description" content={seo.description} />
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="AndriBraun.dev" />
	<meta property="og:title" content={seo.title} />
	<meta property="og:description" content={seo.description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={seo.image} />
	<meta name="twitter:card" content="summary_large_image" />
	<svelte:element this={"script"} type="application/ld+json"
		>{JSON.stringify(person)}</svelte:element
	>
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
