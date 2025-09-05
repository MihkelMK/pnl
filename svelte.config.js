import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [
		mdsvex({
			extensions: ['.md'],
			smartypants: { quotes: true, ellipses: true, backticks: true, dashes: true },
			layout: {
				lyrics: path.join(__dirname, 'src/lib/layouts/lyrics.svelte')
			}
		}),
		vitePreprocess()
	],
	kit: { adapter: adapter() },
	extensions: ['.svelte', '.md']
};

export default config;
