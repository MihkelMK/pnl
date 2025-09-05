export type Project = {
	title: string;
	description: string;
	date: string;
	slug: string;
	type: 'music' | 'merch' | 'rants';
};

export type Track = {
	title: string;
	performers: string;
	path: string;
};

export type TrackList = {
	tracks: Track[];
};
