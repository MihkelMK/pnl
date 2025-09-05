import type { Track } from '$lib/types';
import { json } from '@sveltejs/kit';

function getTracks(lang: string, slug: string) {
	const tracks: Track[] = [];
	let paths;

	if (lang === 'et') {
		paths = import.meta.glob(`/src/tracks/music/${slug}/et/tracks/*.md`, { eager: true });
	} else {
		paths = import.meta.glob(`/src/tracks/music/${slug}/en/tracks/*.md`, { eager: true });
	}

	for (const path in paths) {
		const file = paths[path];
		console.log(file);
		console.log(path);

		if (file && typeof file === 'object' && 'metadata' in file) {
			const metadata = file.metadata as Omit<Track, 'path'>;
			const track = { ...metadata, path } satisfies Track;

			tracks.push(track);
		}
	}

	return tracks;
}

export function GET({ url, setHeaders }) {
	setHeaders({
		'cache-control': 'max-age=60'
	});

	const lang = url.searchParams.get('lang') || 'et';
	const slug = url.searchParams.get('slug');

	if (!slug) {
		return json({ tracks: [] });
	}

	const tracks = getTracks(lang, slug);

	return json({ tracks });
}
