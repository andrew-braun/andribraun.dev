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
		required?: boolean;
		disabled?: boolean;
	}

	let {
		value,
		placeholder,
		name,
		label,
		error,
		width,
		rows = 8,
		required = false,
		disabled = false
	}: Props = $props();
</script>

<InputWrapper {label} {name} {error} {width} {required}>
	<textarea class="textarea" bind:value {placeholder} {name} {rows} {required} {disabled}
	></textarea>
</InputWrapper>

<style lang="scss">
	.textarea {
		@include basic-input;
	}
</style>
