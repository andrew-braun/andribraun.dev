<script lang="ts">
	import ImageText from "$components/layout/columns/ImageText.svelte";
	import Title from "$components/text/Title.svelte";
	import Tabs from "$components/ui/Tabs/Tabs.svelte";

	import { aboutData } from "./about-data";
	import NerdMode from "./tabs/NerdMode.svelte";

	const imageTextProps = {
		widerSide: "right"
	};

	const aboutTabs = [aboutData.descriptions.professional, aboutData.descriptions.personal]
		.filter((mode) => mode.id || mode.text)
		.map((mode) => {
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
	const nerdModeTab = {
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
</script>

<section id="about" class="page-section">
	<Title title="About Me" tag="h2" />
	<Tabs tabs={aboutTabs} />
	<!-- <Tabbed tabs={aboutTabs} /> -->
</section>
