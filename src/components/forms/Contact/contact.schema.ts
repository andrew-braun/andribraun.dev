import * as z from "zod";

export const contactFormSchema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.email().min(1, ""),
	message: z.string().min(1, "Message is required")
});
