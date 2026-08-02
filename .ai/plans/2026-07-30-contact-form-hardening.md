# Contact Form Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use $superpowers-executing-plans to implement this plan sequentially in the active session. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the contact form deterministic, accessible, privacy-safe, resilient to partial service failures, and resistant to basic automated abuse.

**Architecture:** Keep SvelteKit remote forms and the current visual design, but make UI state depend on the submission result rather than CSS animation events. Separate safe email rendering and submission orchestration into focused server modules. Treat the owner notification as required, Payload as a best-effort archive, and visitor confirmations as non-blocking after owner delivery succeeds.

**Tech Stack:** Svelte 5, SvelteKit remote forms, TypeScript, Zod 4, Resend, Payload CMS

## Global Constraints

- Execute tasks in order and pause for manual verification after each task.
- Add only Vitest and one focused pure-module test file for the delivery policy; do not add browser-test tooling.
- Preserve entered values after validation and every failure surfaced to the visitor, including owner-notification failure.
- Do not log names, email addresses, message bodies, or complete provider payloads.
- Do not return submitted personal data to the browser.
- Do not add an in-memory rate limiter; it would be ineffective across serverless instances.
- Retain visitor confirmation emails. A confirmation failure is non-blocking only after the owner notification succeeds.
- Keep the rocket animation as progressive enhancement; it must never control correctness or reset form state.
- Do not select or change the production adapter in this plan.
- Do not stage or commit changes. Each task ends with a commit-message suggestion for the user.

---

## File Map

- `src/components/forms/Contact/Contact.svelte` — deterministic submission state, honeypot, result messages, and focus management.
- `src/components/forms/Contact/contact.schema.ts` — normalization, length limits, and honeypot validation.
- `src/components/forms/components/InputWrapper.svelte` — connected labels and accessible errors.
- `src/components/forms/components/TextInput.svelte` — input IDs, limits, and ARIA attributes.
- `src/components/forms/components/TextArea.svelte` — textarea ID, limit, and ARIA attributes.
- `src/components/forms/Contact/contact-email.server.ts` — HTML escaping and safe notification rendering.
- `src/components/forms/Contact/contact-submission.server.ts` — delivery policy and public result type.
- `src/components/forms/Contact/contact.remote.ts` — thin SvelteKit adapter.
- `src/lib/utils/email/email.ts` — reply-to support.
- `src/lib/utils/email/resend.ts` — Resend reply-to and privacy-safe logging.
- `src/lib/cms/payload.ts` — typed, normalized archive result.
- `src/components/forms/Contact/contact-submission.server.test.ts` — delivery-policy unit tests.
- `package.json` and `pnpm-lock.yaml` — Vitest development dependency and test command.
- `.env.example` — required Resend configuration.
- `.ai/2026-07-30-launch-readiness-todo.md` — evidence-based progress tracking.

---

### Task 1: Make Client State Deterministic

**Files:**

- Modify: `src/components/forms/Contact/Contact.svelte`

**Produces:**

- A visible retryable error state
- A success state shown only after confirmed server success
- Form values preserved on every failure
- No global animation event listeners

- [x] **Step 1: Add an explicit submission error**

Add:

```ts
let submissionError = $state<string | null>(null);
```

Clear it at the start of `enhancedSubmit`.

- [x] **Step 2: Handle `submit()` results directly**

Use this state policy:

```ts
const succeeded = await submit();

if (!succeeded) {
	formPhase = "error";
	return;
}

formElement?.reset();
displaySuccessDialog = true;
formPhase = "launching";
```

When `submit()` throws:

```ts
submissionError =
	"Your message could not be sent. Please try again, or email andri@andribraun.dev.";
formPhase = "error";
```

Do not reset the form in the failure path.

- [x] **Step 3: Remove animation-controlled behavior**

Delete:

- `handleAnimationStart`
- `handleAnimationEnd`
- `<svelte:window onanimationend={...} onanimationstart={...} />`
- Animation-related `console.log` calls

The rocket/form animation may still respond to `formPhase === "launching"`, but animation events must not modify form data or success state.

- [x] **Step 4: Render a persistent server error**

Render `submissionError` independently of validation errors:

```svelte
{#if submissionError}
	<div class="form-error" role="alert" tabindex="-1">
		<p>{submissionError}</p>
		<a href="mailto:andri@andribraun.dev">Email Andri directly</a>
	</div>
{/if}
```

Do not use `{@html}` for this message.

- [x] **Step 5: Make success independent of animation completion**

Render the success state whenever `displaySuccessDialog` is true. Keep it visible until the visitor explicitly selects “Send another message.”

- [x] **Step 6: Manually verify Task 1**

Run:

```bash
pnpm dev
```

Check:

1. Type content into every field and wait at least ten seconds while the page animates; nothing clears.
2. Trigger a server failure; the error is visible and all three field values remain.
3. Retry after a failure; the button becomes available and the existing values remain editable.
4. Trigger a successful response; the success state appears even if animations are disabled.
5. Select “Send another message”; the empty form returns.

- [x] **Step 7: Suggest a conventional commit message**

```text
fix: make contact submission state deterministic
```

---

### Task 2: Normalize and Bound Submitted Data

**Files:**

- Modify: `src/components/forms/Contact/contact.schema.ts`
- Modify: `src/components/forms/Contact/Contact.svelte`
- Modify: `src/components/forms/components/TextInput.svelte`
- Modify: `src/components/forms/components/TextArea.svelte`

**Produces:**

```ts
export type ContactFormData = {
	name: string;
	email: string;
	message: string;
	company: string;
};
```

- [x] **Step 1: Replace the permissive schema**

Use:

```ts
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
	company: z.string().max(0, "Submission rejected").optional().default("")
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
```

- [x] **Step 2: Mirror server limits in native controls**

Add `maxlength` support to `TextInput.svelte` and `TextArea.svelte`, then use:

- Name: `maxlength={100}`
- Email: `maxlength={254}`
- Message: `maxlength={5000}`

Server validation remains authoritative; native limits provide immediate feedback.

- [x] **Step 3: Add the hidden honeypot**

Inside the form:

```svelte
<div class="honeypot" aria-hidden="true">
	<label for="contact-company">Company</label>
	<input
		id="contact-company"
		tabindex="-1"
		autocomplete="off"
		{...contactForm.fields.company.as("text")}
	/>
</div>
```

Hide it offscreen rather than with `display: none`:

```scss
.honeypot {
	position: absolute;
	left: -10000px;
	width: 1px;
	height: 1px;
	overflow: hidden;
}
```

- [x] **Step 4: Manually verify Task 2**

Check:

1. Empty fields are rejected.
2. A malformed email is rejected with “Enter a valid email address.”
3. Spaces around values are removed server-side.
4. Email addresses are normalized to lowercase.
5. The controls stop accepting input at 100, 254, and 5,000 characters respectively.
6. The honeypot is invisible and unreachable with Tab.
7. Submitting `company=bot` through browser developer tools is rejected or silently discarded.

- [x] **Step 5: Suggest a conventional commit message**

```text
fix: bound and normalize contact submissions
```

---

### Task 3: Connect Labels, Errors, and Result Focus

**Files:**

- Modify: `src/components/forms/components/InputWrapper.svelte`
- Modify: `src/components/forms/components/TextInput.svelte`
- Modify: `src/components/forms/components/TextArea.svelte`
- Modify: `src/components/forms/Contact/Contact.svelte`

**Produces:**

- Field IDs: `contact-name`, `contact-email`, `contact-message`
- Error IDs: `contact-name-error`, `contact-email-error`, `contact-message-error`
- Focused and announced server error/success results

- [x] **Step 1: Give every control a stable ID**

Accept an optional ID in `TextInput.svelte` and `TextArea.svelte`, falling back to the field name:

```ts
let fieldId = $derived(id ?? name);
let errorId = $derived(`${fieldId}-error`);
```

Pass `fieldId` into `InputWrapper` and apply it to the native input or textarea. The contact
form owns its namespace and passes `contact-name`, `contact-email`, and `contact-message`.

- [x] **Step 2: Connect each label**

Change `InputWrapper.svelte` to accept `id` and use:

```svelte
<label class="label" for={id}>{label}{required ? " *" : ""}</label>
```

- [x] **Step 3: Connect field errors**

Render:

```svelte
{#if error}
	<span class="error" id={`${id}-error`}>{error}</span>
{/if}
```

Apply to the native control:

```svelte
aria-invalid={error ? "true" : undefined}
aria-describedby={error ? errorId : undefined}
```

- [x] **Step 4: Announce and focus submission results**

- Error summary: `role="alert"`, `tabindex="-1"`
- Success state: `role="status"`, `aria-live="polite"`, `tabindex="-1"`
- Bind each result container.
- After it renders, `await tick()` and call `.focus()`.
- Do not move focus while someone is merely editing a field.

- [x] **Step 5: Manually verify Task 3**

Check:

1. Clicking each label focuses its control.
2. Tab order is Name → Email → Message → submit.
3. Invalid fields expose `aria-invalid="true"`.
4. Each invalid field’s `aria-describedby` points to a real error element.
5. After a server failure, focus moves to the error summary.
6. After success, focus moves to the success message.
7. A screen reader announces both outcomes once without repeating endlessly.

- [x] **Step 6: Suggest a conventional commit message**

```text
fix: make contact form feedback accessible
```

---

### Task 4: Make Email Rendering and Logging Privacy-Safe

**Files:**

- Create: `src/components/forms/Contact/contact-email.server.ts`
- Modify: `src/components/forms/Contact/contact.remote.ts`
- Modify: `src/lib/utils/email/email.ts`
- Modify: `src/lib/utils/email/resend.ts`

**Produces:**

- `renderContactNotification(data: ContactFormData): string`
- `SendEmailParams.replyTo?: string`

- [x] **Step 1: Add a safe email renderer**

Create:

```ts
import type { ContactFormData } from "./contact.schema";

function escapeHtml(value: string): string {
	return value.replace(
		/[&<>"']/g,
		(character) =>
			({
				"&": "&amp;",
				"<": "&lt;",
				">": "&gt;",
				'"': "&quot;",
				"'": "&#039;"
			})[character]!
	);
}

export function renderContactNotification(data: ContactFormData): string {
	return [
		"<h1>New portfolio contact</h1>",
		`<p><strong>Name:</strong> ${escapeHtml(data.name)}</p>`,
		`<p><strong>Email:</strong> ${escapeHtml(data.email)}</p>`,
		`<p><strong>Message:</strong><br>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>`
	].join("");
}
```

- [x] **Step 2: Support Reply-To**

Add `replyTo?: string` to `SendEmailParams`, pass it through `sendEmail`, and apply it to Resend:

```ts
if (replyTo) {
	emailData.replyTo = replyTo;
}
```

- [x] **Step 3: Remove PII logging**

Delete logs containing:

- Complete submitted form data
- `emailData`
- Names, email addresses, or message bodies
- Complete Resend responses
- Complete Payload records

Failure logs may contain a generated reference ID, operation name, and provider error code only.

- [x] **Step 4: Manually verify Task 4**

Submit:

```text
<img src=x onerror=alert(1)>
Second line & "quotes"
```

Confirm:

1. The email displays the markup as harmless text.
2. The second line remains a second line.
3. Reply in the email client addresses the visitor.
4. Server logs contain no name, email, message, or email payload.

- [ ] **Step 5: Suggest a conventional commit message**

```text
fix: protect contact email content and visitor privacy
```

---

### Task 5: Make Contact Delivery Explicit and Testable

**Files:**

- Create: `src/components/forms/Contact/contact-submission.server.ts`
- Create: `src/components/forms/Contact/contact-submission.server.test.ts`
- Modify: `src/components/forms/Contact/contact.remote.ts`
- Modify: `src/lib/cms/payload.ts`
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`

**Produces:**

```ts
export type ContactSubmissionResult = { success: true; referenceId: string };

export type ContactSubmissionDependencies = {
	archive(data: ContactFormData): Promise<{ success: boolean }>;
	notifyOwner(data: ContactFormData, referenceId: string): Promise<void>;
	confirmVisitor(data: ContactFormData): Promise<void>;
	createReferenceId(): string;
};
```

Delivery policy:

- Every submission is archived with its full normalized data, including `company`.
- Honeypot submissions are archived, return generic success, and never call Resend.
- Archive failures are non-blocking and log only the operation name and reference ID.
- Owner notification is required. Its failure is retryable and prevents visitor confirmation.
- Visitor confirmation is attempted only after owner delivery succeeds. Its failure logs only the operation name and reference ID, then returns success.

- [x] **Step 1: Add the smallest test command and failing delivery-policy tests**

Add this script to `package.json` and install `vitest` as a development dependency with `pnpm add -D vitest`:

```json
"test": "vitest run"
```

Create `src/components/forms/Contact/contact-submission.server.test.ts`. Use plain async dependency functions and a `calls: string[]` array rather than provider mocks. Cover these exact outcomes:

```ts
it("archives a honeypot submission without sending either email", async () => {
	const calls: string[] = [];
	const result = await processContactSubmission(honeypotData, {
		archive: async () => {
			calls.push("archive");
			return { success: true };
		},
		notifyOwner: async () => calls.push("owner"),
		confirmVisitor: async () => calls.push("confirmation"),
		createReferenceId: () => "ref-honeypot"
	});

	expect(result).toEqual({ success: true, referenceId: "ref-honeypot" });
	expect(calls).toEqual(["archive"]);
});
```

Add equivalent focused tests for: archive failure followed by both emails; owner failure with no confirmation; confirmation failure returning success; and complete success. Capture `console.error` only to assert that it receives no submitted values, then restore it after each test.

- [x] **Step 2: Run the new tests and confirm they fail for the missing module**

Run:

```bash
pnpm test src/components/forms/Contact/contact-submission.server.test.ts
```

Expected: FAIL because `contact-submission.server.ts` and `processContactSubmission` do not exist yet.

- [x] **Step 3: Implement the minimal orchestration module**

Create `contact-submission.server.ts` with the interfaces above. Keep `processContactSubmission` linear:

```ts
const referenceId = dependencies.createReferenceId();
const archive = async () => {
	try {
		const result = await dependencies.archive(data);
		if (!result.success) console.error("Contact archive failed", { referenceId });
	} catch {
		console.error("Contact archive failed", { referenceId });
	}
};

await archive();
if (data.company) return { success: true, referenceId };

await dependencies.notifyOwner(data, referenceId);
try {
	await dependencies.confirmVisitor(data);
} catch {
	console.error("Contact confirmation failed", { referenceId });
}
return { success: true, referenceId };
```

Do not catch `notifyOwner`; its generic failure must reach the remote action so the existing form keeps its values and displays its retryable error.

- [x] **Step 4: Run the delivery-policy tests and confirm they pass**

Run:

```bash
pnpm test src/components/forms/Contact/contact-submission.server.test.ts
```

Expected: PASS with all five policy cases green.

- [x] **Step 5: Make Payload archive the complete normalized submission**

Replace the two generic archive helpers with one `createContactFormEntry({ formData }: { formData: ContactFormData })`. It returns only `{ success: true }` or `{ success: false }`; it does not log or return provider errors, because the orchestration module owns reference-ID logging. Build the current Payload schema's record as:

```ts
{
	form_name: "contact",
	form_subject: `New contact form submission from ${formData.name}`,
	form_body: JSON.stringify(formData, null, 2),
	sender_data: { name: formData.name, email: formData.email }
}
```

This preserves all submitted fields, including the honeypot value, without altering the Payload schema.

- [x] **Step 6: Make the remote action a thin adapter**

Replace the inline archive-and-email sequence in `contact.remote.ts` with `processContactSubmission(data, dependencies)`. Supply:

```ts
{
	archive: (submission) => createContactFormEntry({ formData: submission }),
	notifyOwner: async (submission, referenceId) => {
		const { success } = await sendEmail({
			toEmail: "andri@andribraun.dev",
			replyTo: submission.email,
			subject: `[${referenceId}] New contact from ${submission.name}`,
			htmlContent: renderContactNotification(submission)
		});
		if (!success) throw new Error("Owner notification failed");
	},
	confirmVisitor: async (submission) => {
		const { success } = await sendEmail({
			toEmail: submission.email,
			subject: "Thank you for contacting Andri Braun!",
			template: "contact-confirmation",
			variables: { name: submission.name }
		});
		if (!success) throw new Error("Visitor confirmation failed");
	},
	createReferenceId: crypto.randomUUID
}
```

Keep the outer remote-action catch generic: log no submitted values and throw the existing HTTP 500 message. Return only the `ContactSubmissionResult`, never the submitted form data.

- [x] **Step 7: Re-run delivery tests after wiring production dependencies**

Run:

```bash
pnpm test src/components/forms/Contact/contact-submission.server.test.ts
```

Expected: PASS. The policy module remains independently testable and no test contacts Turso or Resend.

- [ ] **Step 8: Manually verify the delivery matrix**

Check each case separately:

| Payload | Owner email | Visitor confirmation | Expected visitor result | Expected side effect |
| --- | --- | --- | --- | --- |
| Works | Works | Works | Success | One archive, one owner email, one confirmation |
| Fails | Works | Works | Success | Owner email and confirmation; reference-only archive log |
| Works | Fails | Not called | Visible retryable error | Archive exists; form values remain |
| Works | Works | Fails | Success | Archive and owner email; reference-only confirmation log |
| Honeypot filled | Not called | Not called | Generic success | One full archive, no emails |

Confirm the Turso record for a honeypot includes `name`, `email`, `message`, and non-empty `company`; do not expose those values in application logs.

- [ ] **Step 9: Suggest a conventional commit message**

```text
fix: make contact delivery resilient to partial failures
```

---

### Task 6: Document and Run the Final Manual Gate

**Files:**

- Modify: `.env.example`
- Modify: `.ai/2026-07-30-launch-readiness-todo.md`

- [ ] **Step 1: Document the Resend secret**

Add:

```dotenv
RESEND_API_KEY=your-resend-api-key-here
```

Never copy the real value from `.env`.

- [ ] **Step 2: Run targeted formatting and static checks**

Run:

```bash
pnpm exec prettier --check \
  src/components/forms/Contact \
  src/components/forms/components/InputWrapper.svelte \
  src/components/forms/components/TextInput.svelte \
  src/components/forms/components/TextArea.svelte \
  src/lib/utils/email \
  src/lib/cms/payload.ts \
  .env.example
```

Run:

```bash
pnpm exec eslint \
  src/components/forms/Contact \
  src/components/forms/components/InputWrapper.svelte \
  src/components/forms/components/TextInput.svelte \
  src/components/forms/components/TextArea.svelte \
  src/lib/utils/email \
  src/lib/cms/payload.ts
```

Expected: both targeted checks pass.

- [ ] **Step 3: Run project checks**

Run:

```bash
pnpm test
pnpm check
pnpm build
```

Expected for this work: delivery-policy tests pass, no errors in contact, email, or Payload files, and a successful build. Record previously identified Typewriter or Sass errors separately rather than expanding this form plan.

- [ ] **Step 4: Run the final browser checklist**

Confirm:

1. Decorative animations never clear drafts.
2. Server failures are visible and preserve values.
3. Success appears without relying on animation completion.
4. Validation trims and bounds all submitted data.
5. Labels, errors, focus, and result announcements are accessible.
6. Submitted markup is escaped in email.
7. Logs contain no submitted personal data.
8. Payload failure does not block a successful owner notification.
9. Owner-email failure produces a visible retry path.
10. A visitor confirmation is attempted only after owner delivery succeeds.
11. Honeypot submissions archive the full payload in Payload and never call Resend.
12. A genuine submission with healthy services sends exactly one owner notification and one visitor confirmation.

- [ ] **Step 5: Update the master checklist using evidence only**

In `.ai/2026-07-30-launch-readiness-todo.md`:

- Check only items verified during the manual gate.
- Keep durable rate limiting open.
- Keep CAPTCHA/Turnstile open unless separately deployed.
- Keep production form verification open until checked on the final host.

- [ ] **Step 6: Record the deployment-dependent follow-up**

Once the production adapter is selected, create a separate plan for a durable host-backed rate limiter or portable verified-human challenge. Do not use a process-local `Map`.

- [ ] **Step 7: Suggest a conventional commit message**

```text
docs: record contact form configuration and verification
```

---

## Manual Checkpoint Order

1. Client state and draft preservation
2. Validation limits and honeypot
3. Labels, errors, announcements, and focus
4. HTML escaping, Reply-To, and private logs
5. Partial delivery failures, retained confirmations, and honeypot archiving
6. Static checks and full browser gate

## Deliberate Remaining Item

Durable rate limiting remains a launch blocker because the production host and adapter have not been selected. This plan adds a honeypot and keeps visitor confirmations because they are a deliberate product requirement, without pretending that process-local state is production-grade protection.
