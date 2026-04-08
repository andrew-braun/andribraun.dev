import { form } from "$app/server";
import { error } from "@sveltejs/kit";
import * as z from "zod";
import { contactFormSchema } from "./contact.schema";

async function handleSubmit(data: z.infer<typeof contactFormSchema>) {
	try {
		// Here you would typically send the data to your backend or an email service
		console.log("Form submitted:", data);
		// Simulate a successful submission with a delay
		await new Promise((resolve) => setTimeout(resolve, 1000));
		// Redirect to a thank you page or show a success message
		return { success: true, data };
	} catch (err) {
		console.error("Error submitting form:", err);
		throw error(500, "An error occurred while submitting the form. Please try again later.");
	}
}

export const contactForm = form(contactFormSchema, handleSubmit);
