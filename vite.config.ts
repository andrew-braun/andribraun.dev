import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [enhancedImages(), sveltekit()],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@use '$styles/scss-variables' as *; 
				@use '$styles/mixins.scss' as *;`
			}
		}
	}
});
