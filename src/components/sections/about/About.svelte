<script lang="ts">
	import ImageText from "$components/layout/columns/ImageText.svelte";
	import Markdown from "$components/text/Markdown.svelte";
	import Title from "$components/text/Title.svelte";
	import Tabs from "$components/ui/Tabs/Tabs.svelte";
	import type { Tab } from "$components/ui/Tabs/tabs";

	import { aboutData } from "./about-data";
	import NerdMode from "./tabs/NerdMode.svelte";

	const imageTextProps = {
		widerSide: "right"
	};

	const aboutTabs: Tab[] = [aboutData.descriptions.personal, aboutData.descriptions.professional]
		.filter((mode) => mode.id || mode.text)
		.map((mode): Tab => {
			return {
				value: mode.id,
				label: mode.title,
				content: ImageText,
				props: {
					...imageTextProps,
					image: mode.image,
					text: mode.text
				}
			};
		});

	const nerdModeData = aboutData.descriptions.nerd;
	const nerdModeTab: Tab = {
		value: nerdModeData.id,
		label: nerdModeData.title,
		content: NerdMode,
		props: {
			...imageTextProps,
			image: nerdModeData.image,
			text: nerdModeData.text
		}
	};

	aboutTabs.push(nerdModeTab);

	const factsData = aboutData.descriptions.facts;
	const factsTab: Tab = {
		value: factsData.id,
		label: factsData.title,
		content: Markdown,
		props: {
			text: factsData.text,
			maxWidth: "72ch"
		}
	};
	aboutTabs.push(factsTab);
</script>

<section id="about" class="page-section">
	<Title title="About Me" tag="h2" />
	<Tabs tabs={aboutTabs} />
</section>
