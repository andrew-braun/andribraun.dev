import { form } from "$app/server";
import { createContactFormEntry } from "$root/src/lib/cms/payload";
import { sendEmail } from "$utils/email/email";
import { error } from "@sveltejs/kit";
import * as z from "zod";
import { renderContactNotification } from "./contact-email.server";
import { contactFormSchema } from "./contact.schema";

async function handleSubmit(data: z.infer<typeof contactFormSchema>) {
	try {
		try {
			await createContactFormEntry({ formData: data });
		} catch {
			console.error("Contact form persistence failed");
		}

		const { name, email } = data;

		const { success: confirmationSuccess } = await sendEmail({
			toEmail: email,
			subject: "Thank you for contacting Andri Braun!",
			template: "contact-confirmation",
			variables: {
				RECEIVER_NAME: name,
				REF_ID: Math.floor(Math.random() * 1000000).toString() || "N/A",
				PERSONALIZED_MESSAGE: "",
				USER_MESSAGE: JSON.stringify(data.message, null, 2),
				SUBMITTED_DATE: new Date().toLocaleString()
			}
		});

		const { success: notificationSuccess } = await sendEmail({
			toEmail: "andri@andribraun.dev",
			replyTo: email,
			subject: `New contact form submission from ${name}`,
			htmlContent: renderContactNotification(data)
		});

		if (!confirmationSuccess || !notificationSuccess) {
			console.error("Contact email delivery failed");
			throw new Error("Failed to send contact form emails. Please try again later.");
		}

		// Redirect to a thank you page or show a success message
		return { success: true, data };
	} catch {
		console.error("Contact form submission failed");
		throw error(500, "An error occurred while submitting the form. Please try again later.");
	}
}

export const contactForm = form(contactFormSchema, handleSubmit);
