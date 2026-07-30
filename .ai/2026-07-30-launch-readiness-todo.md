# AndriBraun.dev — Launch Readiness To-Do List

**Created:** 2026-07-30  
**Status:** Active

## P0 — Complete Before Launch

### Portfolio content and trust

- [ ] Remove the placeholder “Jane Doe” testimonial from the projects grid.
- [ ] Replace it with a verified client testimonial and attribution, or hide testimonial cards until real content is available.
- [ ] Respect the CMS `display.hide` field so hidden projects never appear publicly.
- [ ] Confirm every visible project has a valid title, destination URL, screenshot, and useful alt text.

**Done when:** No placeholder or unpublished content appears on the rendered homepage.

### Contact form reliability

**Implementation plan:** [Contact Form Hardening Implementation Plan](plans/2026-07-30-contact-form-hardening.md)

- [ ] Scope animation event handling to the contact form’s launch animations.
- [ ] Prevent unrelated page animations from resetting contact form fields.
- [ ] Display a clear, persistent error message when server submission or email delivery fails.
- [ ] Preserve entered form values after a failed submission.
- [ ] Announce errors and success messages with appropriate accessible live-region semantics.
- [ ] Move focus to the error summary or success message after submission.
- [ ] Associate every label with its input using matching `for` and `id` values.
- [ ] Connect field errors with their inputs using `aria-describedby` and `aria-invalid`.
- [ ] Remove production logging of names, email addresses, messages, and complete email payloads.
- [ ] Add server-side abuse protection:
  - [ ] Rate limiting
  - [ ] Honeypot field
  - [ ] CAPTCHA or Turnstile if spam remains a problem
  - [ ] Sensible field-length limits
- [ ] Prevent the confirmation-email feature from becoming an email abuse vector.
- [ ] Test the success, validation-error, CMS-failure, Resend-failure, and retry paths.

**Done when:** The form is accessible, preserves user input on failure, cannot be trivially abused, and never logs message contents.

### Build and deployment

- [ ] Fix the invalid Sass `api` option reported in `vite.config.ts`.
- [ ] Add a TypeScript declaration for `typewriter-effect/dist/core`, or replace the import with a typed alternative.
- [ ] Run `pnpm check` successfully with zero errors.
- [ ] Fix Prettier failures in `pnpm-workspace.yaml` and `src/lib/cms/payload-types.ts`.
- [ ] Run the complete `pnpm lint` command successfully.
- [ ] Select and configure the explicit SvelteKit adapter for the production host.
- [ ] Add `RESEND_API_KEY` to `.env.example`.
- [ ] Replace the create-svelte README with project-specific setup, environment, testing, and deployment instructions.
- [ ] Verify a production build and server start in the actual hosting environment.

**Done when:** Check, lint, and build all pass in a clean environment and the documented deployment process works.

## P1 — High-Impact Improvements

### Project case studies

- [ ] Decide whether project details should use dedicated routes, dialogs/drawers, or expanded cards.
- [ ] Create a project-detail presentation using the content already available in Payload.
- [ ] Include, where available:
  - [ ] Project summary and client/context
  - [ ] Andri’s role and responsibilities
  - [ ] Problem or business goal
  - [ ] Technical approach and architecture
  - [ ] Key challenges and decisions
  - [ ] Outcome and measurable impact
  - [ ] Technology stack
  - [ ] Additional screenshots
  - [ ] Live site, snapshot, and GitHub links
- [ ] Keep external-site links available without making them the only way to understand the work.
- [ ] Add clear calls to action from case studies to the contact section.

**Done when:** A visitor can understand what Andri contributed and why the work mattered without leaving the portfolio.

### CMS payload and resilience

- [ ] Request only the CMS fields needed for homepage project cards.
- [ ] Avoid serializing full descriptions, unused images, and complete technology records into homepage data.
- [ ] Filter hidden projects server-side before returning page data.
- [ ] Add deterministic sorting and validation for missing display order values.
- [ ] Add caching and a documented content-refresh strategy.
- [ ] Add a graceful CMS failure state so the rest of the homepage remains available during an outage.
- [ ] Decide whether to use cached project data, a fallback list, or a temporarily hidden projects section when the CMS fails.

**Done when:** A CMS outage does not produce a full-page failure and homepage data contains only fields that are rendered.

### Image performance

- [ ] Serve appropriately sized project-card images instead of original 2200–2560 px screenshots.
- [ ] Generate AVIF/WebP variants and responsive `srcset`/`sizes`.
- [ ] Define image width and height to prevent layout shifts.
- [ ] Confirm lazy loading works below the fold.
- [ ] Optimize CMS source assets and establish upload-size guidance.
- [ ] Measure the total transferred image weight on desktop and mobile.

**Done when:** Project cards use responsive derivatives and no multi-megabyte original is downloaded for a small card.

### SEO and sharing

- [ ] Add a canonical URL.
- [ ] Add Open Graph title, description, image, URL, and type metadata.
- [ ] Add Twitter/X card metadata.
- [ ] Create a dedicated social-sharing image.
- [ ] Add `robots.txt`.
- [ ] Add a sitemap.
- [ ] Add Person and/or ProfessionalService JSON-LD structured data.
- [ ] Remove the literal `<title>{siteData.title}</title>` from `src/app.html`.
- [ ] Fix the initial `data-theme="darkut"` typo.
- [ ] Confirm the final title and description in rendered production HTML.

**Done when:** Search engines and social platforms receive valid canonical, crawl, structured-data, and preview information.

### Accessibility and motion

- [ ] Add `aria-expanded` and `aria-controls` to the mobile menu button.
- [ ] Give the mobile drawer dialog/navigation semantics.
- [ ] Close the drawer with Escape.
- [ ] Trap focus while the drawer is open and return focus to the trigger when it closes.
- [ ] Prevent closed drawer content from remaining keyboard-focusable.
- [ ] Label the theme switch with its purpose and current state.
- [ ] Complete tab keyboard behavior, including focus movement and roving `tabindex`.
- [ ] Add consistent visible focus styles to all interactive elements.
- [ ] Add a `prefers-reduced-motion` mode for decorative and interface animations.
- [ ] Verify color contrast in both themes.
- [ ] Run keyboard-only and screen-reader smoke tests.

**Done when:** Navigation, tabs, forms, and theme controls work without a pointer and remain understandable with motion reduced.

## P2 — Operational and Conversion Polish

### Testing and quality controls

- [ ] Add unit tests for project transformation/filtering and contact validation.
- [ ] Add integration tests for contact form success and failure handling.
- [ ] Add end-to-end smoke tests for navigation, theme switching, tabs, project links, and contact submission.
- [ ] Add automated accessibility checks.
- [ ] Add CI that runs check, lint, test, and build for pull requests.
- [ ] Add a broken-link check for project and navigation URLs.

### Analytics and monitoring

- [ ] Choose a privacy-conscious analytics solution.
- [ ] Track project-card engagement and contact-form conversion without collecting form contents.
- [ ] Add server-side error monitoring for CMS and email failures.
- [ ] Add uptime monitoring for the portfolio and CMS.
- [ ] Define an alert destination and basic incident-response notes.

### Content and conversion

- [ ] Add clear availability details rather than a permanently hard-coded “Available” claim.
- [ ] Consider adding engagement types, typical project fit, or a concise “How I can help” section.
- [ ] Add prominent GitHub and LinkedIn links if they support the intended hiring funnel.
- [ ] Decide whether a downloadable résumé/CV would help the target audience.
- [ ] Proofread final copy and correct small wording issues such as “Railroad” versus “Railway.”
- [ ] Confirm contact expectations, timezone, and stated response time are accurate.

### Security and privacy

- [ ] Configure appropriate production security headers, including a Content Security Policy.
- [ ] Review external font loading and decide whether to self-host Fira Code.
- [ ] Add a short privacy notice near the contact form explaining how submitted information is used.
- [ ] Confirm retention and deletion behavior for contact entries stored in Payload.
- [ ] Verify secrets are configured only in the hosting environment and never exposed to client bundles or logs.

## Final Launch Gate

- [ ] No placeholder content is visible.
- [ ] Contact form success and failure paths are verified in production.
- [ ] CMS failure does not take down the whole homepage.
- [ ] Homepage images and serialized data meet agreed performance budgets.
- [ ] Metadata, robots, sitemap, and structured data validate.
- [ ] Keyboard, reduced-motion, and mobile navigation checks pass.
- [ ] `pnpm check`, `pnpm lint`, tests, and `pnpm build` all pass.
- [ ] Production adapter, environment variables, monitoring, and deployment documentation are complete.
