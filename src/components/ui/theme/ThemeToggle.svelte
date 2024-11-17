<script lang="ts">
	import { Switch } from "bits-ui";
	import { onMount } from "svelte";
	let currentTheme: Theme = "dark";

	type Theme = "dark" | "light" | "neon";

	const possibleThemes = ["dark", "light"];

	onMount(() => {
		const storedTheme = localStorage.getItem("storedTheme");
		if (storedTheme) {
			currentTheme = storedTheme as Theme;
		}
	});

	const toggleTheme = () => {
		// Allow for more than 2 themes
		const currentThemeIndex = possibleThemes.indexOf(currentTheme);
		const nextThemeIndex = (currentThemeIndex + 1) % possibleThemes.length;
		currentTheme = possibleThemes[nextThemeIndex] as Theme;

		document.body.setAttribute("data-theme", currentTheme);
		localStorage.setItem("storedTheme", currentTheme);
	};
</script>

<div class="theme-switch-wrapper">
	<Switch.Root checked={currentTheme === "dark"} on:click={toggleTheme} class="theme-switch">
		<Switch.Thumb class="theme-switch-thumb" />
	</Switch.Root>
</div>

<style lang="scss">
	.theme-switch-wrapper {
		:global {
			.theme-switch {
				position: relative;
				width: 60px;
				aspect-ratio: 5/ 3;
				border: none;
				border-radius: var(--border-radius-xl);
				background: var(--color-primary);
				transition: var(--transition-md);

				&[data-state="checked"] {
					.theme-switch-thumb {
						transform: translateX(100%);
					}
				}

				.theme-switch-thumb {
					display: flex;
					width: 50%;
					aspect-ratio: 1;
					border-radius: 50%;
					background: var(--color-background);
					transition: var(--transition-md);
				}
			}
		}
	}
</style>
