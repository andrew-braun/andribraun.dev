import { form } from "$app/server";
import { createContactFormEntry } from "$root/src/lib/cms/payload";
import { sendEmail } from "$utils/email/email";
import { error } from "@sveltejs/kit";
import type * as z from "zod";
import { renderContactNotification } from "./contact-email.server";
import { processContactSubmission } from "./contact-submission.server";
import { contactFormSchema } from "./contact.schema";

async function handleSubmit(data: z.infer<typeof contactFormSchema>) {
	try {
		return await processContactSubmission(data, {
			archive: (submission) => createContactFormEntry({ formData: submission }),
			notifyOwner: async (submission, referenceId) => {
				await sendEmail({
					toEmail: "andri@andribraun.dev",
					replyTo: submission.email,
					subject: `[${referenceId.slice(0, 8)}] New contact from ${submission.name}`,
					htmlContent: renderContactNotification(submission)
				});
			},
			confirmVisitor: async (submission) => {
				await sendEmail({
					toEmail: submission.email,
					subject: "Thank you for contacting Andri Braun!",
					template: "contact-confirmation",
					variables: { name: submission.name }
				});
			},
			createReferenceId: () => crypto.randomUUID()
		});
	} catch {
		console.error("Contact form submission failed");
		throw error(500, "An error occurred while submitting the form. Please try again later.");
	}
}

export const contactForm = form(contactFormSchema, handleSubmit);
