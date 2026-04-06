<script lang="ts">
	import Button from "$components/ui/buttons/Button.svelte";
	import TextArea from "./components/TextArea.svelte";
	import TextInput from "./components/TextInput.svelte";

	let { submitted = $bindable(false) }: { submitted?: boolean } = $props();

	let isSubmitting = $state(false);

	async function handleSubmit(event: Event) {
		event.preventDefault();
		isSubmitting = true;

		// Simulate form submission delay
		await new Promise((resolve) => setTimeout(resolve, 1000));

		isSubmitting = false;

		submitted = true;

		setTimeout(() => {
			submitted = false;
		}, 5000);
	}
</script>

<form class="contact-form" onsubmit={handleSubmit}>
	<TextInput label="Name" name="name" placeholder="What do I call you, stranger?" />
	<TextInput
		label="Email"
		name="email"
		type="email"
		placeholder="I reply within 48 hours or your pizza is free"
	/>
	<TextArea
		label="Message"
		name="message"
		placeholder="This is where the magic happens. Your hopes. Your dreams. Your secret family recipes. Or, you know, work stuff about projects. That's probably why you're here, now that I think about it. Either way, let's get this train rolling! The train has a dining car, though, so that family recipe could come in handy."
	/>
	<div class="submit-button-wrapper">
		<Button type="submit" variant="outline" disabled={isSubmitting} loading={isSubmitting}
			>Launch Message</Button
		>
	</div>
</form>

<style lang="scss">
	.contact-form {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		min-width: 280px;

		.submit-button-wrapper {
			display: flex;
			justify-content: center;
		}
	}
</style>
