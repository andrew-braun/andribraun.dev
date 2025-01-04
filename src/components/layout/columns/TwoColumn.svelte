<script lang="ts">
	import type { Snippet } from "svelte";

	interface TwoColumnProps {
		smallColumn: "25%" | "33%" | "50%" | "66%" | "75%";
		widerSide: "left" | "right";
		leftContent: Snippet | string;
		rightContent: Snippet | string;
	}

	let { smallColumn = "33%", widerSide, leftContent, rightContent }: TwoColumnProps = $props();
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
		gap: var(--spacing-md);
		container-type: block-size;

		@container (width < $breakpoint-sm) {
			grid-template-columns: 1fr;
		}

		&.small-width-25 {
			--small-width: 25%;
			--large-width: 75%;
		}

		&.small-width-33 {
			--small-width: 33%;
			--large-width: 67%;
		}

		&.small-width-50 {
			--small-width: 50%;
			--large-width: 50%;
		}

		&.small-width-66 {
			--small-width: 66%;
			--large-width: 34%;
		}

		&.small-width-75 {
			--small-width: 75%;
			--large-width: 25%;
		}

		&.reverse {
			grid-template-columns: var(--small-width) var(--large-width);
		}

		.column {
			display: flex;
			flex-direction: column;
		}
	}
</style>
