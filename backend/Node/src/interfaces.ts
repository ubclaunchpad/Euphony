export enum Location {
	CA,
	USA,
}

export enum Activity {
	WORK_OUT,
	STUDY,
	RELAX,
	PARTY,
	CHILL,
	BED,
}

export enum Mood {
	HAPPY,
	MELANCHOLY,
	COMPASSION,
	LONELINESS,
	ANGER,
}

export const Genres = ['pop', 'r-n-b', 'indie', 'hip-hop'];

export interface Metrics {
	location: Location;
	activity: Activity;
	temp: Number;
	mood: Mood;
	pop: Number;
}

export interface LatLon {
	lat: Number;
	lon: Number;
}

export interface Auth {
	success: boolean;
	statusMessage?: string;
	access_token?: string;
}
