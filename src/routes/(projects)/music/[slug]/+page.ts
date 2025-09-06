import { error } from '@sveltejs/kit';
import { getLocale } from '$lib/paraglide/runtime';

export async function load({ params }) {
	try {
		let project;
		let translated_lyrics;

		if (getLocale() === 'en') {
			try {
				project = await import(`../../../../projects/music/${params.slug}/en/intro.md`);
				translated_lyrics = await import(`../../../../projects/music/${params.slug}/en/lyrics.md`);
			} catch {
				console.log('no english .md for ' + params.slug + '. defaulting to estonian.');
				project = await import(`../../../../projects/music/${params.slug}/et/intro.md`);
				translated_lyrics = await import(`../../../../projects/music/${params.slug}/et/lyrics.md`);
			}
		} else {
			project = await import(`../../../../projects/music/${params.slug}/et/intro.md`);
			translated_lyrics = await import(`../../../../projects/music/${params.slug}/et/lyrics.md`);
		}

		const original_lyrics = await import(
			`../../../../projects/music/${params.slug}/original_lyrics.md`
		);

		return {
			content: project.default,
			meta: project.metadata,
			lyrics: {
				original: original_lyrics.default,
				translated: translated_lyrics.default
			}
		};
	} catch (e) {
		console.log(e);
		throw error(404, `could not find ${params.slug}_${getLocale()}`);
	}
}
