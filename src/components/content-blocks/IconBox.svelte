<script lang="ts">
	import type { IconComponent } from "$ts/general";

	interface LabelledIconProps {
		Icon: IconComponent;
		label: string;
		text?: string;
		orientation?: "horizontal" | "vertical";
	}

	let { Icon, label, text, orientation }: LabelledIconProps = $props();
</script>

<div class="icon-box {orientation}">
	<Icon class="icon" width="3em" height="3em" />
	<span class="label">{label}</span>
	{#if text}
		<p class="text">{text}</p>
	{/if}
</div>

<style lang="scss">
	.icon-box {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
