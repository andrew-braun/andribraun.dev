<script lang="ts">
	import ImageText from "$components/layout/columns/ImageText.svelte";
	import Title from "$components/text/Title.svelte";
	import Tabbed from "$components/ui/Tabbed.svelte";
	import Tabs from "$components/ui/Tabs/Tabs.svelte";

	import { aboutData } from "./about-data";

	const imageTextProps = {
		widerSide: "right"
	};

	const aboutTabs = Object.values(aboutData?.descriptions)
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
</script>

<section id="about" class="page-section">
	<Title title="About Me" tag="h2" />
	<Tabs tabs={aboutTabs} />
	<!-- <Tabbed tabs={aboutTabs} /> -->
</section>
