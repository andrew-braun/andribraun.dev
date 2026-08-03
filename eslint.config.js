import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import svelte from "eslint-plugin-svelte";
import globals from "globals";
import ts from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
	js.configs.recommended,
	...ts.configs.recommendedTypeChecked,
	...svelte.configs["flat/recommended"],
	prettier,
	...svelte.configs["flat/prettier"],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			},
			parserOptions: {
				// Enables type-aware rules (no-floating-promises, no-misused-promises, ...)
				projectService: true,
				extraFileExtensions: [".svelte"]
			}
		}
	},
	{
		files: ["**/*.svelte", "**/*.svelte.ts"],
		languageOptions: {
			parserOptions: {
				parser: ts.parser,
				projectService: true,
				extraFileExtensions: [".svelte"]
			}
		},
		rules: {
			// TypeScript handles undefined checks inside Svelte files; no-undef causes false
			// positives for generic type parameters (e.g. Snippet<[T, number]>).
			"no-undef": "off",
			// This rule requires resolve() for hrefs only when deploying to a subpath.
			// This site is deployed at root, so the rule fires as a false positive.
			"svelte/no-navigation-without-resolve": "off",
			// $bindable() props are only written-to within the child component; ESLint
			// cannot see the parent binding as a "read" and flags them as useless assignments.
			"no-useless-assignment": "off",

			// typescript-eslint's project service cannot resolve types across .svelte
			// module boundaries, so anything imported from another component reads as
			// `any`/unresolved and these rules fire en masse. svelte-check does resolve
			// them and enforces the same safety with real type information, so we let it
			// own this concern rather than litter the components with disable comments.
			"@typescript-eslint/no-unsafe-argument": "off",
			"@typescript-eslint/no-unsafe-assignment": "off",
			"@typescript-eslint/no-unsafe-call": "off",
			"@typescript-eslint/no-unsafe-member-access": "off",
			"@typescript-eslint/no-unsafe-return": "off"
		}
	},
	{
		// Config files live outside the tsconfig project, so type-aware rules can't run.
		files: ["*.js", "*.config.js", "*.config.ts"],
		...ts.configs.disableTypeChecked
	},
	{
		// Test doubles are legitimately async-without-await to satisfy a Promise-returning
		// interface.
		files: ["**/*.test.ts"],
		rules: {
			"@typescript-eslint/require-await": "off"
		}
	},
	{
		ignores: [".netlify/", "build/", ".svelte-kit/", "dist/"]
	},
	{
		// Generated from the Payload schema; not ours to lint.
		files: ["src/lib/cms/payload-types.ts"],
		rules: {
			"@typescript-eslint/no-explicit-any": "off"
		}
	},
	{
		rules: {
			// Warn rather than error: a deliberate, commented `any` is sometimes the
			// honest type (see src/components/ui/Tabs/tabs.ts).
			"@typescript-eslint/no-explicit-any": "warn",
			"svelte/prefer-class-directive": "warn",
			"svelte/shorthand-attribute": "warn",
			"svelte/no-unused-svelte-ignore": "error"
		}
	}
];
