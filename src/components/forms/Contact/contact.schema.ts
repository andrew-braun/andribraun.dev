import * as z from "zod";

export const contactFormSchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, "Name is required")
		.max(100, "Name must be 100 characters or less"),
	email: z
		.string()
		.trim()
		.toLowerCase()
		.min(1, "Email is required")
		.max(254, "Email must be 254 characters or less")
		.pipe(z.email("Enter a valid email address")),
	message: z
		.string()
		.trim()
		.min(1, "Message is required")
		.max(5000, "Message must be 5,000 characters or less"),
	company: z.string().optional().default("")
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
