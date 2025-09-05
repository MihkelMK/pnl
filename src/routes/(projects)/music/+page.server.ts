import { getLocale } from '$lib/paraglide/runtime.js';
import { error } from '@sveltejs/kit';

export async function load({ fetch, setHeaders }) {
	try {
		const response = await fetch(`/api/projects?end=10&lang=${getLocale()}&type=music`);
		const { projects, nextFrom } = await response.json();

		setHeaders({
			'cache-control': 'public, immutable, no-transform, max-age=3600'
		});

		return { projects, nextFrom };
	} catch {
		throw error(500, 'Error while fetching posts');
	}
}
