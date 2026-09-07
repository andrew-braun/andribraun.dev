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
	<div class="box">
		<span class="label" style={`color: var(--color-${color})`}>{title}</span>
		{#if text}
			<p class="text">{text}</p>
		{/if}
	</div>
</div>

<style lang="scss">
	.icon-box {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		align-items: center;
		justify-content: center;
		max-width: 320px;

		&.horizontal {
			display: grid;
			grid-template-columns: 1fr 3fr;

			:global(.icon) {
				grid-column: 1;
			}

			.box {
				grid-column: 2;

				.label {
					font-weight: 600;
				}

				.text {
					width: fit-content;
					font-weight: 400;
				}
			}
		}
	}
</style>
