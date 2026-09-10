<script lang="ts">
	import { applyTheme, isTheme, readStoredTheme, type Theme } from "$utils/theme/toggle";
	import { Switch } from "bits-ui";
	import { onMount } from "svelte";

	let currentTheme: Theme = $state("dark");

	onMount(() => {
		const storedTheme = readStoredTheme();
		const appliedTheme = document.body.getAttribute("data-theme");
		currentTheme = storedTheme ?? (isTheme(appliedTheme) ? appliedTheme : "dark");
	});

	const checked = $derived(currentTheme === "dark");
	// Purpose + current state in the accessible name; bits-ui already exposes on/off via aria-checked.
	const label = $derived(`Color theme: ${currentTheme}`);

	function handleCheckedChange(isChecked: boolean) {
		currentTheme = isChecked ? "dark" : "light";
		applyTheme(currentTheme);
	}
</script>

<div class="theme-switch-wrapper">
	<Switch.Root
		{checked}
		onCheckedChange={handleCheckedChange}
		class="theme-switch"
		aria-label={label}
	>
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

				&:focus-visible {
					outline: 2px solid var(--color-accent-1);
					outline-offset: 4px;
				}

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
