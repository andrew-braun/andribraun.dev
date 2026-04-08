<script lang="ts">
	import type { Width } from "$root/src/ts/style";
	import type { HTMLInputTypeAttribute } from "svelte/elements";
	import InputWrapper from "./InputWrapper.svelte";

	interface Props {
		label: string;
		value?: string;
		name: string;
		type?: HTMLInputTypeAttribute;
		error?: string;
		placeholder?: string;
		width?: Width;
		required?: boolean;
		disabled?: boolean;
		actionAttributes?: any;
	}

	let {
		value,
		placeholder,
		name,
		label,
		error,
		width,
		type = "text",
		actionAttributes,
		required = false,
		disabled = false
	}: Props = $props();

	console.log("actionAttributes", actionAttributes);
</script>

<InputWrapper {label} {name} {error} {width} {required}>
	<input
		{type}
		class="input"
		bind:value
		{placeholder}
		{name}
		{required}
		{disabled}
		{...actionAttributes}
	/>
</InputWrapper>

<style lang="scss">
	.input {
		@include basic-input;
	}
</style>
