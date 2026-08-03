import adapter from "@sveltejs/adapter-netlify";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		experimental: {
			async: true
		}
	},
	kit: {
		adapter: adapter(),
		alias: {
			$components: "./src/components",
			$styles: "./src/styles",
			$stores: "./src/stores",
			$utils: "./src/lib/utils",
			$root: "./",
			$ts: "./src/ts"
		},
		experimental: {
			remoteFunctions: true
		}
	},
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess()
};

export default config;
