<script lang="ts">
	import type { Width } from "$ts/style";
	import InputWrapper from "./InputWrapper.svelte";

	interface Props {
		label: string;
		value?: string;
		name: string;
		error?: string;
		placeholder?: string;
		rows?: number;
		width?: Width;
	}

	let { value, placeholder, name, label, error, width, rows = 8 }: Props = $props();
</script>

<InputWrapper {label} {name} {error} {width}>
	<textarea class="textarea" bind:value {placeholder} {name} {rows}></textarea>
</InputWrapper>

<style lang="scss">
	.textarea {
		@include basic-input;
	}
</style>
