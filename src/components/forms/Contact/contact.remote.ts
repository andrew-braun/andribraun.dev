import { form } from "$app/server";
import { sendEmail } from "$utils/email/email";
import { error } from "@sveltejs/kit";
import * as z from "zod";
import { contactFormSchema } from "./contact.schema";

async function handleSubmit(data: z.infer<typeof contactFormSchema>) {
	try {
		console.log("Form submitted:", data);

		const { name, email } = data;

		const confirmationResponse = await sendEmail({
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

		const { success, data: confirmationData } = confirmationResponse;

		const notificationResponse = await sendEmail({
			toEmail: "andri@andribraun.dev",
			subject: `New contact form submission from ${name}`,
			htmlContent: JSON.stringify(data, null, 2).replace(/\n/g, "<br>").replace(/ /g, "&nbsp;")
		});

		const { success: notificationSuccess, data: notificationData } = notificationResponse;

		if (!success || !notificationSuccess) {
			console.error("Error sending emails:", {
				confirmationResponse,
				confirmationData,
				notificationResponse,
				notificationData
			});
			throw new Error("Failed to send contact form emails. Please try again later.");
		}

		// Redirect to a thank you page or show a success message
		return { success: true, data };
	} catch (err) {
		console.error("Error submitting form:", err);
		throw error(500, "An error occurred while submitting the form. Please try again later.");
	}
}

export const contactForm = form(contactFormSchema, handleSubmit);
