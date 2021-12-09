const SpotifyWebApi = require('spotify-web-api-node');
import { Activity, genres, Location, Mood } from '../../src/interfaces';
import axios from 'axios';
import {
	getSeedArtistIdsFromTopTracks,
	parseTrack,
	Track,
} from './spotify-mapper';

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

export const createSpotifyWebApi = () => {
	return new SpotifyWebApi({
		clientId: process.env.SPOTIFY_CLIENT_ID,
		clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
		redirectUri: 'http://localhost:4000/spotify/callback',
	});
};

export async function getPopularityForTracks(req: any, res: any) {
	let spotifyApi = createSpotifyWebApi();
	try {
		if (!req.params.access_token)
			return res.status(400).send('failed to authenticate');
		if (!req.body.trackIdArray)
			return res.status(400).send('trackIdArray is missing');

		spotifyApi.setAccessToken(req.params.access_token);

		const data = await spotifyApi.getTracks(req.body.trackIdArray);

		if (data) {
			const popularityArr = data.body.tracks.map(
				(track: any) => track.popularity
			);

			return res.status(200).send(popularityArr);
		} else {
			return res.status(204).send('no audio features returned');
		}
	} catch (error) {
		return res.status(404).json({ error: error });
	}
}

export async function getInputForML(req: any, res: any, next: any) {
	let spotifyApi = createSpotifyWebApi();
	try {
		if (!req.params.access_token)
			return res.status(400).send('failed to authenticate');

		const url = 'https://api.spotify.com/v1/me/top/tracks';

		const topTracks: any = await axios.get(url, {
			headers: { Authorization: `Bearer ${req.params.access_token}` },
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

		spotifyApi.setAccessToken(req.params.access_token);

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

	console.log(location, pop, clouds, temp, mood, activity, audio_features);
	try {
		// TODO: move these endpoints somewhere nice, ML server port num should be set and loaded
		const MLServerRes = await axios.post(
			`http://localhost:5000/recommend_playlist`,
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
			req.params.access_token
		);

		/**
		 * Construct the recommendations by starting out with the base (required) filters (seed artist(s), genre(s), track(s))
		 * Append optional fields supplied from the ML server to the recommendations API params to refine this search
		 **/
		let recommendationsUrl = `https://api.spotify.com/v1/recommendations?seed_artists=${seedArtistIds}&seed_genres=${seedGenre}&seed_tracks=${seedTracksIds}&limit=${limit}`;
		Object.keys(MLServerRes.data).forEach(
			(property: string) =>
				(recommendationsUrl += `&${property}=${MLServerRes.data[property]}`)
		);
		// TODO: consolidate calls to Spotify API
		const spotifyRecommendationsRes: any = await axios.get(recommendationsUrl, {
			headers: { Authorization: `Bearer ${req.params.access_token}` },
		});

		// Format data returned from the API, only send what the front-end needs
		const formattedTracks: Track[] = spotifyRecommendationsRes.data.tracks.map(
			(t: { [key: string]: any }) => parseTrack(t)
		);
		res.status(200).send(formattedTracks);
	} catch (err) {
		res.status(404).send(err);
	}
}

export async function createSpotifyPlaylist(req: any, res: any) {
	let spotifyApi = createSpotifyWebApi();
	try {
		if (!req.params.access_token)
			return res.status(400).send('failed to authenticate');
		if (!req.body.name)
			return res.status(400).send("playlist's name is missing");
		if (!req.body.trackIds)
			return res
				.status(400)
				.send('Please specify tracks to add to the playlist');

		spotifyApi.setAccessToken(req.params.access_token);

		// Create a private playlist by default
		const playlist = await spotifyApi.createPlaylist(req.body.name, {
			description: 'Playlist generated from super developers ;)',
			public: req.body.public != undefined ? req.body.public : false,
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
					return res.status(200).send('playlist created successfully. Enjoy!');
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
