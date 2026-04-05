import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import svelte from "eslint-plugin-svelte";
import globals from "globals";
import ts from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs["flat/recommended"],
	prettier,
	...svelte.configs["flat/prettier"],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		files: ["**/*.svelte"],
		languageOptions: {
			parserOptions: {
				parser: ts.parser
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
			"no-useless-assignment": "off"
		}
	},
	{
		ignores: ["build/", ".svelte-kit/", "dist/"]
	},
	{
		rules: {
			"@typescript-eslint/no-explicit-any": "off",
			"svelte/prefer-class-directive": "warn",
			"svelte/shorthand-attribute": "warn",
			"svelte/no-unused-svelte-ignore": "error"
		}
	}
];
