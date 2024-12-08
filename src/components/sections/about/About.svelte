<script lang="ts">
	import Tabbed from "$components/ui/Tabbed.svelte";

	const tabs = [
		{
			value: "professional",
			label: "Professional Mode",
			content:
				"My name is Andrew Braun, and I'm an American full-stack web developer. I build new websites from the ground up, overhaul old systems, and fix issues when they arise. I'm flexible, friendly, and, most importantly, I am excellent at Googling things."
		},
		{
			value: "personal",
			label: "Personal Mode",
			content:
				"My family's first computer ran Windows 95. The modem actually made those weird 90s noises and blocked the phone lines. That was the soundtrack to the awakening of my inner computer nerd."
		},
		{
			value: "nerd",
			label: "Nerd Mode",
			content:
				"If you went straight to this tab, congratulations--you're probably a developer and/or a nerd. If you don't identify as either of those things, you might not know exactly what all this means, but it could potentially sound impressive, so maybe give it a quick scan anyway and hopefully you'll end up thinking I'm brilliant."
		}
	];
</script>

<section id="about" class="page-section">
	<Tabbed {tabs} />
</section>
