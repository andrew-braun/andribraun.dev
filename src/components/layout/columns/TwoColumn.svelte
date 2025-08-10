<script lang="ts">
	import type { Snippet } from "svelte";

	interface TwoColumnProps {
		smallColumn?: "25%" | "33%" | "50%" | "66%" | "75%";
		widerSide?: "left" | "right";
		leftContent: Snippet | string;
		rightContent: Snippet | string;
	}

	let {
		smallColumn = "33%",
		widerSide = "left",
		leftContent,
		rightContent
	}: TwoColumnProps = $props();
</script>

<div
	class={`column-container small-width-${smallColumn.replace("%", "")} `}
	class:reverse={widerSide === "right"}
>
	<div class="column left">
		{#if typeof leftContent === "string"}
			<div>{leftContent}</div>
		{:else}
			{@render leftContent()}
		{/if}
	</div>
	<div class="column right">
		{#if typeof rightContent === "string"}
			<div>{rightContent}</div>
		{:else}
			{@render rightContent()}
		{/if}
	</div>
</div>

<style lang="scss">
	.column-container {
		--small-width: 50%;
		--large-width: 50%;

		display: grid;
		grid-template-columns: var(--large-width) var(--small-width);
		gap: var(--spacing-lg);
		container-type: block-size;

		@media (max-width: $breakpoint-sm) {
			grid-template-columns: 1fr !important;
		}

		&.small-width-25 {
			--small-width: 1fr;
			--large-width: 3fr;
		}

		&.small-width-33 {
			--small-width: 1fr;
			--large-width: 2fr;
		}

		&.small-width-50 {
			--small-width: 1fr;
			--large-width: 1fr;
		}

		&.reverse {
			grid-template-columns: var(--small-width) var(--large-width);

			@media (max-width: $breakpoint-sm) {
				grid-template-columns: 1fr !important;
			}
		}

		.column {
			display: flex;
			flex-direction: column;
		}
	}
</style>
