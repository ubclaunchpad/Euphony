const SpotifyWebApi = require('spotify-web-api-node');
import { Activity, genres, Location, Mood } from '../../../src/interfaces';
import axios from 'axios';
import {
	getSeedArtistIdsFromTopTracks,
	parseTrack,
	Track,
} from './spotify-mapper';
import { isAuth } from './spotify-user-auth-helpers';

// scopes for spotify
export const scopes = [
	'ugc-image-upload',
	'user-read-playback-state',
	'user-modify-playback-state',
	'user-read-currently-playing',
	'streaming',
	'app-remote-control',
	'user-read-email',
	'user-read-private',
	'playlist-read-collaborative',
	'playlist-modify-public',
	'playlist-read-private',
	'playlist-modify-private',
	'user-library-modify',
	'user-library-read',
	'user-top-read',
	'user-read-playback-position',
	'user-read-recently-played',
	'user-follow-read',
	'user-follow-modify',
];

const port = process.env.PORT || 4000;
const mlServerPort = process.env.TZML_SERVER_PORT || 5000;
// TODO (later): change 'localhost' after : to whatever prod's using
const apiPrefix = `http://${process.env.NODE_ENV === 'development' ? 'localhost' : 'localhost'}:${port}/`;
const apiPrefixML = `http://${process.env.NODE_ENV === 'development' ? 'localhost' : 'localhost'}:${mlServerPort}/`;
const spotifyAPIPrefix = 'https://api.spotify.com/v1/';

const NodeServerAPIs = {
	spotifyCallback: `${apiPrefix}spotify/callback`
};
const MLServerAPIs = {
	recommendPlaylist: `${apiPrefixML}recommend_playlist`	
}
export const SpotifyAPIs = {
	tracks: `${spotifyAPIPrefix}tracks?ids=%trackIds%`,
	topTracks: `${spotifyAPIPrefix}me/top/tracks`,
	recommendations: `${spotifyAPIPrefix}recommendations?seed_artists=%seedArtistIds%&seed_genres=%seedGenreIds%&seed_tracks=%seedTracksIds%&limit=%limit%`,
}


export const createSpotifyWebApi = () => {
	return new SpotifyWebApi({
		clientId: process.env.SPOTIFY_CLIENT_ID,
		clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
		redirectUri: NodeServerAPIs.spotifyCallback
	});
};

export async function getInputForML(req: any, res: any, next: any) {
	let spotifyApi = createSpotifyWebApi();
	const auth = await isAuth(req, spotifyApi);
	if (!(await auth).success) return res.status(401).send(auth.statusMessage);

	try {
		const url = `${spotifyAPIPrefix}${SpotifyAPIs.topTracks}`;

		const topTracks: any = await axios.get(url, {
			headers: { Authorization: `Bearer ${auth.access_token}` },
		});

		let topTracksIds = [];
		let popularityArr: any[] = [];
		if (topTracks) {
			topTracksIds = topTracks.data.items;
			topTracksIds = topTracksIds.map((track: any) => track.id);
		} else {
			return res
				.status(204)
				.send('users need to use spotify more to get top tracks');
		}

		res.locals.trackIds = topTracksIds;

		const audioFeaturesData = await spotifyApi.getAudioFeaturesForTracks(
			req.body.trackIdArray ? req.body.trackIdArray : topTracksIds
		);

		const tracksData = await spotifyApi.getTracks(
			req.body.trackIdArray ? req.body.trackIdArray : topTracksIds
		);

		if (tracksData) {
			popularityArr = tracksData.body.tracks;
			popularityArr = popularityArr.map((track: any) => track.popularity);
		} else {
			return res.status(204).send('no popularity returned');
		}

		if (audioFeaturesData && tracksData) {
			let inputForML = audioFeaturesData.body.audio_features;
			inputForML.forEach((feature: any, index: number) => {
				feature.popularity = popularityArr[index];
			});

			if (res.locals.theOne) {
				res.locals.audio_features_w_popularity = inputForML;
				next();
			} else {
				res.send(inputForML);
			}
		} else {
			return res.status(204).send('no audio features returned');
		}
	} catch (error) {
		return res.status(404).send(error);
	}
}

export async function getRecommendations(req: any, res: any) {
	const spotifyApi = createSpotifyWebApi();
	const auth = await isAuth(req, spotifyApi);
	if (!(await auth).success) return res.status(401).send(auth.statusMessage);

	// default value location = CA, pop = 0.5, clouds = 0.5, temp = 10, mood = HAPPY, activity = CHILL, limit = 10
	// data from location and weather
	const location =
		res.locals.location.short_code == 'us' ? Location.USA : Location.CA;
	const pop = res.locals.weather?.pop ? res.locals.weather?.pop : 0.5;
	const clouds = res.locals.weather?.clouds ? res.locals.weather?.clouds : 0.4;
	const temp = res.locals.weather?.temp_c ? res.locals.weather?.temp_c : 10;

	// custom fields from frontend
	const mood = req.body.mood ? req.body.mood : Mood.HAPPY;
	const activity = req.body.activity ? req.body.activity : Activity.CHILL;
	const limit = req.body.limit ? req.body.limit : 10;

	// data from spotify API
	const audio_features = res.locals.audio_features_w_popularity;
	const trackIds = res.locals.trackIds;

	try {
		// TODO: move these endpoints somewhere nice, ML server port num should be set and loaded
		const MLServerRes = await axios.post(MLServerAPIs.recommendPlaylist,
			{
				location,
				pop,
				clouds,
				temp,
				mood,
				activity,
				audio_features,
			}
		);
		// Get the first 2 track ids to pass as seed_tracks into the recommendation API
		const seedTracksIds = trackIds.slice(0, 2).join(',');
		// Get the seed genre from the user
		const seedGenre = genres[activity];
		// Get the top 2 artist ids (by # of occurences in the supplied tracks) to pass as seed_artists into the recommendation API
		const seedArtistIds = await getSeedArtistIdsFromTopTracks(
			trackIds,
			auth.access_token!
		);

		/**
		 * Construct the recommendations by starting out with the base (required) filters (seed artist(s), genre(s), track(s))
		 * Append optional fields supplied from the ML server to the recommendations API params to refine this search
		 **/
		let recommendationsUrl = `https://api.spotify.com/v1/recommendations?seed_artists=${seedArtistIds}&seed_genres=${seedGenre}&seed_tracks=${seedTracksIds}&limit=${limit}`;
		// let recommendationsUrl = SpotifyAPIs.recommendations.replace('%seedArtistIds%', seedArtistIds);
		Object.keys(MLServerRes.data).forEach(
			(property: string) =>
				(recommendationsUrl += `&${property}=${MLServerRes.data[property]}`)
		);
		// TODO: consolidate calls to Spotify API
		const spotifyRecommendationsRes: any = await axios.get(recommendationsUrl, {
			headers: { Authorization: `Bearer ${auth.access_token!}` },
		});

		// Format data returned from the API, only send what the front-end needs
		const formattedTracks: Track[] = spotifyRecommendationsRes.data.tracks.map(
			(t: { [key: string]: any }) => parseTrack(t)
		);
		res
			.status(200)
			.send({ body: formattedTracks, access_token: auth.access_token });
	} catch (err) {
		res.status(404).send(err);
	}
}

export async function createSpotifyPlaylist(req: any, res: any) {
	let spotifyApi = createSpotifyWebApi();
	const auth = await isAuth(req, spotifyApi);
	if (!(await auth).success) return res.status(401).send(auth.statusMessage);

	try {
		if (!req.body.name)
			return res.status(400).send("playlist's name is missing");
		if (!req.body.trackIds)
			return res.status(400).send('Please specify tracks to add to the playlist');

		// Create a private playlist by default
		const playlist = await spotifyApi.createPlaylist(req.body.name, {
			description: 'Playlist generated from super developers ;)',
			public: req.body.public || false,
		});

		// Adding tracks to the newly created playlist
		if (playlist) {
			const trackUris = req.body.trackIds.map(
				(trackId: string) => `spotify:track:${trackId}`
			);

			try {
				const addTracks = await spotifyApi.addTracksToPlaylist(
					playlist.body.id,
					trackUris
				);

				if (addTracks) {
					return res.status(200).send({
						body: 'playlist created successfully. Enjoy!',
						access_token: auth.access_token,
					});
				} else {
					return res.status(204).send('No tracks were added to the playlist');
				}
			} catch (error) {
				return res.status(404).send({
					errorResponse: {
						developerNotes: 'error adding tracks to playlist',
						error,
					},
				});
			}
		} else {
			return res.status(204).send('error creating playlist');
		}
	} catch (error) {
		return res.status(404).send({ error: error });
	}
}