# Contact Form Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use $superpowers-executing-plans to implement this plan sequentially in the active session. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the contact form deterministic, accessible, privacy-safe, resilient to partial service failures, and resistant to basic automated abuse.

**Architecture:** Keep SvelteKit remote forms and the current visual design, but make UI state depend on the submission result rather than CSS animation events. Separate safe email rendering and submission orchestration into focused server modules. Treat the owner notification as the required delivery channel, Payload as a best-effort archive, and remove the visitor auto-reply until durable abuse protection is available.

**Tech Stack:** Svelte 5, SvelteKit remote forms, TypeScript, Zod 4, Resend, Payload CMS

## Global Constraints

- Execute tasks in order and pause for manual verification after each task.
- Do not add a test harness or automated-test dependencies; the user will test manually.
- Preserve entered values after validation, network, CMS, and email failures.
- Do not log names, email addresses, message bodies, or complete provider payloads.
- Do not return submitted personal data to the browser.
- Do not add an in-memory rate limiter; it would be ineffective across serverless instances.
- Do not restore visitor confirmation emails until a durable rate limiter or verified-human challenge is deployed.
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

- [ ] **Step 6: Manually verify Task 1**

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

- [ ] **Step 7: Suggest a conventional commit message**

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

- [ ] **Step 1: Replace the permissive schema**

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

- [ ] **Step 2: Mirror server limits in native controls**

Add `maxlength` support to `TextInput.svelte` and `TextArea.svelte`, then use:

- Name: `maxlength={100}`
- Email: `maxlength={254}`
- Message: `maxlength={5000}`

Server validation remains authoritative; native limits provide immediate feedback.

- [ ] **Step 3: Add the hidden honeypot**

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

- [ ] **Step 4: Manually verify Task 2**

Check:

1. Empty fields are rejected.
2. A malformed email is rejected with “Enter a valid email address.”
3. Spaces around values are removed server-side.
4. Email addresses are normalized to lowercase.
5. The controls stop accepting input at 100, 254, and 5,000 characters respectively.
6. The honeypot is invisible and unreachable with Tab.
7. Submitting `company=bot` through browser developer tools is rejected or silently discarded.

- [ ] **Step 5: Suggest a conventional commit message**

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

- [ ] **Step 1: Give every control a stable ID**

Derive the ID in `TextInput.svelte` and `TextArea.svelte`:

```ts
let id = $derived(`contact-${name}`);
let errorId = $derived(`${id}-error`);
```

Pass `id` into `InputWrapper` and apply `{id}` to the native input or textarea.

- [ ] **Step 2: Connect each label**

Change `InputWrapper.svelte` to accept `id` and use:

```svelte
<label class="label" for={id}>{label}{required ? " *" : ""}</label>
```

- [ ] **Step 3: Connect field errors**

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

- [ ] **Step 4: Announce and focus submission results**

- Error summary: `role="alert"`, `tabindex="-1"`
- Success state: `role="status"`, `aria-live="polite"`, `tabindex="-1"`
- Bind each result container.
- After it renders, `await tick()` and call `.focus()`.
- Do not move focus while someone is merely editing a field.

- [ ] **Step 5: Manually verify Task 3**

Check:

1. Clicking each label focuses its control.
2. Tab order is Name → Email → Message → submit.
3. Invalid fields expose `aria-invalid="true"`.
4. Each invalid field’s `aria-describedby` points to a real error element.
5. After a server failure, focus moves to the error summary.
6. After success, focus moves to the success message.
7. A screen reader announces both outcomes once without repeating endlessly.

- [ ] **Step 6: Suggest a conventional commit message**

```text
fix: make contact form feedback accessible
```

---

### Task 4: Make Email Rendering and Logging Privacy-Safe

**Files:**

- Create: `src/components/forms/Contact/contact-email.server.ts`
- Modify: `src/lib/utils/email/email.ts`
- Modify: `src/lib/utils/email/resend.ts`

**Produces:**

- `renderContactNotification(data: ContactFormData): string`
- `SendEmailParams.replyTo?: string`

- [ ] **Step 1: Add a safe email renderer**

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

- [ ] **Step 2: Support Reply-To**

Add `replyTo?: string` to `SendEmailParams`, pass it through `sendEmail`, and apply it to Resend:

```ts
if (replyTo) {
	emailData.replyTo = replyTo;
}
```

- [ ] **Step 3: Remove PII logging**

Delete logs containing:

- Complete submitted form data
- `emailData`
- Names, email addresses, or message bodies
- Complete Resend responses
- Complete Payload records

Failure logs may contain a generated reference ID, operation name, and provider error code only.

- [ ] **Step 4: Manually verify Task 4**

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

### Task 5: Define Reliable Delivery Semantics

**Files:**

- Create: `src/components/forms/Contact/contact-submission.server.ts`
- Modify: `src/components/forms/Contact/contact.remote.ts`
- Modify: `src/lib/cms/payload.ts`

**Produces:**

```ts
export type ContactSubmissionResult = {
	success: true;
	referenceId: string;
};
```

Delivery policy:

- Owner notification: required
- Payload archive: best effort
- Visitor confirmation email: removed

- [ ] **Step 1: Create the orchestration service**

Define:

```ts
export type ContactSubmissionDependencies = {
	archive(data: ContactFormData): Promise<{ success: boolean }>;
	notify(data: ContactFormData, referenceId: string): Promise<void>;
	createReferenceId(): string;
};
```

Implement `processContactSubmission(data, dependencies)` so it:

1. Creates the reference ID.
2. Silently returns success without contacting services if the honeypot is populated.
3. Attempts the Payload archive.
4. Logs only `{ referenceId }` if the archive fails.
5. Sends the required owner notification.
6. Throws a generic error if the notification fails.
7. Returns only `{ success: true, referenceId }`.

- [ ] **Step 2: Make `contact.remote.ts` a thin adapter**

Use:

- `crypto.randomUUID()` for reference IDs.
- `createContactFormEntry` for the archive dependency.
- `renderContactNotification` for owner-email HTML.
- `replyTo: data.email`.
- Subject: `[${referenceId}] New contact from ${data.name}`.

Remove:

- Visitor confirmation email
- Six-digit `Math.random()` reference
- Full submitted data from the returned result
- Full-submission and provider-response logging

- [ ] **Step 3: Normalize Payload results**

Use `ContactFormData` rather than `Record<string, any>` where applicable. Return a small discriminated result:

```ts
{
	success: true;
}
```

or:

```ts
{
	success: false;
}
```

Do not include provider error messages that could contain submitted data.

- [ ] **Step 4: Manually verify the delivery matrix**

Check each case separately:

| Payload         | Owner email | Expected visitor result | Expected side effect                              |
| --------------- | ----------- | ----------------------- | ------------------------------------------------- |
| Works           | Works       | Success                 | One archive and one owner email                   |
| Fails           | Works       | Success                 | One owner email; reference-only archive error log |
| Works           | Fails       | Visible retryable error | Archive exists; form values remain                |
| Fails           | Fails       | Visible retryable error | Reference-only error logs                         |
| Honeypot filled | Not called  | Generic success         | No archive and no email                           |

Also confirm that no visitor confirmation email is sent in any case.

- [ ] **Step 5: Suggest a conventional commit message**

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
pnpm check
pnpm build
```

Expected for this work: no errors in contact, email, or Payload files and a successful build. Record previously identified Typewriter or Sass errors separately rather than expanding this form plan.

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
10. The visitor receives no automatic email.
11. Honeypot submissions call neither Payload nor Resend.
12. A genuine submission sends exactly one owner notification.

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
5. Partial delivery failures and removal of auto-replies
6. Static checks and full browser gate

## Deliberate Remaining Item

Durable rate limiting remains a launch blocker because the production host and adapter have not been selected. This plan removes the visitor auto-reply abuse vector immediately and adds a honeypot, without pretending that process-local state is production-grade protection.
