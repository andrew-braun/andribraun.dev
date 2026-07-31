import { RESEND_API_KEY } from "$env/static/private"; // define in your .env file
import { Resend, type CreateEmailOptions } from "resend";
import type { SendEmailParams } from "./email";

const resend = new Resend(RESEND_API_KEY);

export async function resendEmail({
	toEmail,
	fromEmail,
	replyTo,
	subject,
	htmlContent,
	template,
	variables
}: SendEmailParams) {
	try {
		// @ts-expect-error -- CreateEmailOptions is a discriminated union; we populate the missing fields below
		const emailData: CreateEmailOptions = {
			from: fromEmail ?? "andri@andribraun.dev",
			to: [toEmail],
			subject: subject ?? "Hello from AndriBraun.dev"
		};

		if (replyTo) {
			emailData.replyTo = replyTo;
		}

		if (template) {
			emailData["template"] = {
				id: template,
				variables: variables as Record<string, string | number>
			};
		} else if (htmlContent) {
			emailData["html"] = htmlContent ?? "";
		} else {
			emailData["html"] =
				"<h2>AndriBraun.dev</h2><p>Thank you for contacting me! I'll be in touch soon.</p>";
		}

		const { data, error } = await resend.emails.send(emailData);

		if (error) {
			throw new Error("Failed to send email. Please try again later.", {
				cause: error
			});
		}

		return { success: true, data };
	} catch (error) {
		throw new Error("Failed to send email. Please try again later.", {
			cause: error
		});
	}
}
