import { enhancedImages } from "@sveltejs/enhanced-img";
import { sveltekit } from "@sveltejs/kit/vite";
import Icons from "unplugin-icons/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		enhancedImages(),
		sveltekit(),
		Icons({
			compiler: "svelte"
		})
	],
	css: {
		preprocessorOptions: {
			scss: {
				api: "modern",
				additionalData: `@use '$styles/scss-variables' as *; 
				@use '$styles/mixins.scss' as *;`
			}
		}
	}
});
