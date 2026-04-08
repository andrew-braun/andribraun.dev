<script lang="ts">
	import Button from "$components/ui/buttons/Button.svelte";
	import TextArea from "$components/forms/components/TextArea.svelte";
	import TextInput from "$components/forms/components/TextInput.svelte";
	import { contactForm } from "./contact.remote.ts";
	import { contactFormSchema } from "./contact.schema.ts";

	let { submitted = $bindable(false) }: { submitted?: boolean } = $props();

	let isSubmitting = $state(false);

	// async function handleSubmit(event: Event) {
	// 	event.preventDefault();
	// 	isSubmitting = true;

	// 	// Simulate form submission delay
	// 	await new Promise((resolve) => setTimeout(resolve, 1000));

	// 	isSubmitting = false;

	// 	submitted = true;

	// 	setTimeout(() => {
	// 		submitted = false;
	// 	}, 5000);
	// }

	async function enhancedSubmit({ form, submit }) {
		isSubmitting = true;
		await submit();
		isSubmitting = false;
		submitted = true;

		setTimeout(() => {
			form.reset();
		}, 3000);

		setTimeout(() => {
			submitted = false;
		}, 4000);
	}
</script>

<form
	class={["contact-form", submitted ? "submitted" : ""]}
	{...contactForm.preflight(contactFormSchema).enhance(enhancedSubmit)}
	onchange={() => contactForm.validate()}
>
	<TextInput
		label="Name"
		name="name"
		placeholder="What do I call you, stranger?"
		required={true}
		actionAttributes={contactForm.fields.name.as("text")}
		error={contactForm.fields.name
			.issues()
			?.map((issue) => issue.message)
			?.join(", ")}
	/>
	<TextInput
		label="Email"
		name="email"
		type="email"
		placeholder="I reply within 48 hours or your pizza is free"
		required={true}
		actionAttributes={contactForm.fields.email.as("email")}
		error={contactForm.fields.email
			.issues()
			?.map((issue) => issue.message)
			?.join(", ")}
	/>
	<TextArea
		label="Message"
		name="message"
		placeholder="This is where the magic happens. Your hopes. Your dreams. Your secret family recipes. Or, you know, work stuff about projects. That's probably why you're here, now that I think about it. Either way, let's get this train rolling! The train has a dining car, though, so that family recipe could come in handy."
		required={true}
		actionAttributes={contactForm.fields.message.as("textarea")}
		error={contactForm.fields.message
			.issues()
			?.map((issue) => issue.message)
			?.join(", ")}
	/>
	<div class="submit-button-wrapper">
		<Button
			type="submit"
			variant="outline"
			disabled={isSubmitting || !contactForm.fields.allIssues.length}
			loading={isSubmitting}>Launch Message</Button
		>
	</div>
</form>

<style lang="scss">
	.contact-form {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		min-width: 280px;
		transition: transform 2s ease;

		.submit-button-wrapper {
			display: flex;
			justify-content: center;
		}

		&.submitted {
			animation: launch 4s ease-in forwards;

			@include launch(0, 0);
		}
	}
</style>
