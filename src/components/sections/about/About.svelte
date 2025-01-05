<script lang="ts">
	import ImageText from "$components/layout/columns/ImageText.svelte";
	import Title from "$components/text/Title.svelte";
	import Tabbed from "$components/ui/Tabbed.svelte";

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

	console.log(aboutTabs);

	// const tabs = [
	// 	{
	// 		value: "professional",
	// 		label: "Professional Mode",
	// 		content: ImageText, // Pass the component class
	// 		props: {
	// 			widerSide: "right",
	// 			image: {
	// 				src: AndriProfessionalModePicture,
	// 				alt: "Profile picture of Andri Braun in 'professional mode'. They are standing in front of a window with a large lit-up building directly behind them and a purple twilight city skyline visible behind it to the right."
	// 			},
	// 			text: "My name is Andri Braun, and I'm an American full-stack web developer. I build new websites from the ground up, overhaul old systems, and fix issues when they arise. I'm flexible, friendly, and, most importantly, I am excellent at Googling things."
	// 		}
	// 	},
	// 	{
	// 		value: "personal",
	// 		label: "Personal Mode",
	// 		content: ImageText,
	// 		props: {
	// 			widerSide: "right",
	// 			image: {
	// 				src: AndriPersonalModePicture,
	// 				alt: "Profile picture of Andri Braun in 'personal mode'. They are sitting on a chair on a rooftop in Bologna, Italy, with a background of the city's red roofs and a vibrant red and orange sunset behind them."
	// 			},
	// 			text: "My family's first computer ran Windows 95. The modem actually made those weird 90s noises and blocked the phone lines. That was the soundtrack to the awakening of my inner computer nerd."
	// 		}
	// 	},
	// 	{
	// 		value: "nerd",
	// 		label: "Nerd Mode",
	// 		content: ImageText,
	// 		props: {
	// 			widerSide: "right",
	// 			image: {
	// 				src: AndriNerdModePicture,
	// 				alt: "Profile picture of Andri Braun in 'nerd mode'. They are sipping on a vibrant green cocktail in a martini glass and wearing a cyberpunk-style visor with LED lights creating colors on its surface."
	// 			},
	// 			text: "If you went straight to this tab, congratulations--you're probably a developer and/or a nerd. If you don't identify as either of those things, you might not know exactly what all this means, but it could potentially sound impressive, so maybe give it a quick scan anyway and hopefully you'll end up thinking I'm brilliant."
	// 		}
	// 	}
	// ];
</script>

<section id="about" class="page-section">
	<Title title="About Me" tag="h2" />
	<Tabbed tabs={aboutTabs} />
</section>
