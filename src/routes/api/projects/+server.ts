import type { Project } from '$lib/types';
import { json } from '@sveltejs/kit';

function getProjects(lang: string, type: string) {
	const projectType = type as 'music' | 'merch' | 'rants';
	let projects: Project[] = [];
	let paths;

	if (lang === 'et') {
		paths = import.meta.glob(`/src/projects/*/*/et/intro.md`, { eager: true });
	} else {
		paths = import.meta.glob(`/src/projects/*/*/en/intro.md`, { eager: true });
	}

	for (const path in paths) {
		if (path.includes(type)) {
			const file = paths[path];

			if (file && typeof file === 'object' && 'metadata' in file) {
				const metadata = file.metadata as Omit<Project, 'type'>;
				const slug = path.split(`${type}/`)[1].split('/')[0].toLowerCase().replace(' ', '_');

				const project = { ...metadata, type: projectType, slug } satisfies Project;
				projects.push(project);
			}
		}
	}

	projects = projects.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	);

	return projects;
}

export function GET({ url, setHeaders }) {
	setHeaders({
		'cache-control': 'max-age=60'
	});

	const lang = url.searchParams.get('lang') || 'et';
	const start = Number(url.searchParams.get('start')) || 0;
	const end = Number(url.searchParams.get('end')) || 0;
	const type = url.searchParams.get('type');

	if (!type) {
		return json({ projects: [] });
	}

	const allProjects = getProjects(lang, type);
	const projects = allProjects.slice(start, end > 0 ? end : undefined);

	const nextIdx = start + projects.length;
	const nextFrom = nextIdx < allProjects.length ? nextIdx : null;

	return json({ projects, nextFrom });
}
