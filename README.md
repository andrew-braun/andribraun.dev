# andribraun.dev

The source for Andri Braun's portfolio website. It is a SvelteKit application
that loads projects from Payload CMS and sends contact-form email through
Resend.

## Requirements

- Node.js and pnpm
- Access to the Payload CMS instance
- A Resend API key for contact-form email

## Local setup

Install dependencies and create a local environment file:

```bash
pnpm install
cp .env.example .env
```

Set these values in `.env`:

| Variable         | Purpose                                  |
| ---------------- | ---------------------------------------- |
| `CMS_URL`        | Base URL of the Payload CMS instance.    |
| `CMS_KEY`        | API key used to read CMS project data.   |
| `RESEND_API_KEY` | API key used to send contact-form email. |

Do not commit `.env` or expose these values to the client.

Start the development server:

```bash
pnpm dev
```

## Quality checks

Run these before opening a pull request or deploying:

```bash
pnpm lint
pnpm check
pnpm test
pnpm build
```

- `lint` runs Prettier, ESLint, and Stylelint.
- `check` runs Svelte and TypeScript diagnostics.
- `test` runs the Vitest suite.
- `build` creates the Netlify deployment output.

## Deployment to Netlify

The site uses the explicit `@sveltejs/adapter-netlify` SvelteKit adapter. Netlify
reads its build configuration from `netlify.toml`:

```toml
[build]
  command = "pnpm build"
  publish = "build"
```

Create a Netlify site from the repository, then set `CMS_URL`, `CMS_KEY`, and
`RESEND_API_KEY` in the site's environment-variable settings. Configure them for
the build and Functions scopes so server-rendered project data and contact-form
email work in deployed environments. Keep production secrets out of
`netlify.toml` and the repository.
