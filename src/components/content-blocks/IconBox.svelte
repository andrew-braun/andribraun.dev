<script lang="ts">
	import type { IconComponent } from "$ts/general";
	import type { ColorVariant } from "$ts/style";

	interface LabelledIconProps {
		Icon: IconComponent;
		title: string;
		text?: string;
		orientation?: "horizontal" | "vertical";
		color?: ColorVariant;
	}

	let { Icon, title, text, orientation, color = "primary" }: LabelledIconProps = $props();
</script>

<div class="icon-box {orientation}">
	<Icon class="icon" width="3em" height="3em" color={`var(--color-${color})`} />
	<span class="label" style={`color: var(--color-${color})`}>{title}</span>
	{#if text}
		<p class="text">{text}</p>
	{/if}
</div>

<style lang="scss">
	.icon-box {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		align-items: center;
		max-width: 320px;

		&.horizontal {
			display: grid;
			grid-template-columns: 1fr 3fr;

			.icon {
				grid-column: 1;
				place-self: center center;
			}

			.label {
				grid-row: 1;
				grid-column: 2;
				align-self: start;
				font-weight: 600;
			}

			.text {
				grid-row: 2;
				grid-column: 2;
			}
		}
	}
</style>
