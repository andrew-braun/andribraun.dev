<script lang="ts">
	import { onMount } from 'svelte';
	import Button from '$components/ui/buttons/Button.svelte';
	let currentTheme: Theme = 'dark';

	type Theme = 'dark' | 'light' | 'neon';

	const possibleThemes = ['dark', 'light'];

	onMount(() => {
		const storedTheme = localStorage.getItem('storedTheme');
		if (storedTheme) {
			currentTheme = storedTheme as Theme;
		}
	});

	const toggleTheme = () => {
		// Allow for more than 2 themes
		const currentThemeIndex = possibleThemes.indexOf(currentTheme);
		const nextThemeIndex = (currentThemeIndex + 1) % possibleThemes.length;
		currentTheme = possibleThemes[nextThemeIndex] as Theme;

		document.body.setAttribute('data-theme', currentTheme);
		localStorage.setItem('storedTheme', currentTheme);
	};
</script>

<Button on:click={toggleTheme}>Switch Theme</Button>
