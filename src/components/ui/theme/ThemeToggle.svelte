<script lang="ts">
	import { applyTheme, readStoredTheme, themes, type Theme } from "$utils/theme/toggle";
	import { Switch } from "bits-ui";
	import { onMount } from "svelte";

	let currentTheme: Theme = $state("dark");
	let checked = $state(true);

	onMount(() => {
		const storedTheme = readStoredTheme();
		if (storedTheme) {
			currentTheme = storedTheme;
			checked = currentTheme === "dark";
		}
	});

	const toggleTheme = () => {
		// Indexed so adding a third theme needs no change here.
		const nextIndex = (themes.indexOf(currentTheme) + 1) % themes.length;
		currentTheme = themes[nextIndex] ?? themes[0];

		applyTheme(currentTheme);
	};
</script>

<div class="theme-switch-wrapper">
	<Switch.Root bind:checked onclick={toggleTheme} class="theme-switch">
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
				background: var(--color-primary);
				border: none;
				border-radius: var(--border-radius-xl);
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
					background: var(--color-background);
					border-radius: 50%;
					transition: var(--transition-md);
				}
			}
		}
	}
</style>
