const SpotifyWebApi = require('spotify-web-api-node');
import axios from 'axios';

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
	var spotifyApi = createSpotifyWebApi();
	try {
		if (!req.params.access_token)
			return res.status(400).send('failed to authenticate');
		if (!req.body.trackIdArray)
			return res.status(400).send('trackIdArray is missing');

		spotifyApi.setAccessToken(req.params.access_token);
		console.log(req.body.trackIdArray);

		const data = await spotifyApi.getTracks(req.body.trackIdArray);

		if (data) {
			var popularityArr = data.body.tracks;
			popularityArr = popularityArr.map((track: any) => track.popularity);

			return res.status(200).send(popularityArr);
		} else {
			return res.status(204).send('no audio features returned');
		}
	} catch (error) {
		return res.status(404).json({ error: error });
	}
}

export async function getInputForML(req: any, res: any) {
	var spotifyApi = createSpotifyWebApi();
	try {
		if (!req.params.access_token)
			return res.status(400).send('failed to authenticate');

		const url = 'https://api.spotify.com/v1/me/top/tracks';

		const topTracks: any = await axios.get(url, {
			headers: { Authorization: `Bearer ${req.params.access_token}` },
		});

		let topTracksIds = [];
		if (topTracks) {
			topTracksIds = topTracks.data.items;
			topTracksIds = topTracksIds.map((track: any) => track.id);
		} else {
			return res
				.status(204)
				.send('users need to use spotify more to get top tracks');
		}

		spotifyApi.setAccessToken(req.params.access_token);

		const data1 = await spotifyApi.getAudioFeaturesForTracks(
			req.body.trackIdArray ? req.body.trackIdArray : topTracksIds
		);

		const data2 = await spotifyApi.getTracks(
			req.body.trackIdArray ? req.body.trackIdArray : topTracksIds
		);

		if (data2) {
			var popularityArr = data2.body.tracks;
			popularityArr = popularityArr.map((track: any) => track.popularity);
		} else {
			return res.status(204).send('no popularity returned');
		}

		if (data1) {
			var inputForMl = data1.body.audio_features;
			inputForMl.forEach((feature: any, index: number) => {
				feature.popularity = popularityArr[index];
			});

			console.log(topTracksIds);
			return res.status(200).send(inputForMl);
		} else {
			return res.status(204).send('no audio features returned');
		}
	} catch (error) {
		return res.status(404).send(error);
	}
}
