const express = require('express');
const router = express.Router();
import axios from 'axios';
import { createSpotifyWebApi } from '../spotify-helpers/spotify-helpers';
import { isAuth } from './spotify-user-auth-helpers';

export async function getMyTopTracks(req: any, res: any) {
	let spotifyApi = createSpotifyWebApi();
	const auth = await isAuth(req, spotifyApi);
	if (!(await auth).success) return res.status(401).send(auth.statusMessage);

	try {
		if (!auth.access_token)
			return res.status(400).send('failed to authenticate');

		const url = 'https://api.spotify.com/v1/me/top/tracks';

		const topTracks: any = await axios.get(url, {
			headers: { Authorization: `Bearer ${auth.access_token}` },
		});

		if (topTracks) {
			topTracks.data.items.map((track: any) => track.id);

			return res
				.status(200)
				.send({ body: topTracks.data.items, access_token: auth.access_token });
		}
	} catch (error) {
		return res.status(404).send(error);
	}
}

export async function getAudioFeaturesForTrack(req: any, res: any) {
	let spotifyApi = createSpotifyWebApi();
	const auth = await isAuth(req, spotifyApi);
	if (!(await auth).success) return res.status(401).send(auth.statusMessage);

	try {
		if (!auth.access_token || !req.body.trackId)
			return res.status(400).send('failed to authenticate');

		spotifyApi.setAccessToken(auth.access_token);

		const data = await spotifyApi.getAudioFeaturesForTrack(req.body.trackId);
		if (data) {
			return res
				.status(200)
				.send({ body: data, access_token: auth.access_token });
		} else {
			return res.status(204).send('no audio features returned');
		}
	} catch (error) {
		return res.status(404).send(error);
	}
}

export async function getAudioFeaturesForTracks(req: any, res: any) {
	let spotifyApi = createSpotifyWebApi();
	const auth = await isAuth(req, spotifyApi);
	if (!(await auth).success) return res.status(401).send(auth.statusMessage);

	try {
		if (!auth.access_token)
			return res.status(400).send('failed to authenticate');
		if (!req.body.trackIdArray)
			return res.status(400).send('trackIdArray is missing');

		spotifyApi.setAccessToken(auth.access_token);

		const data = await spotifyApi.getAudioFeaturesForTracks(
			req.body.trackIdArray
		);
		if (data) {
			return res.status(200).send({
				body: data.body.audio_features,
				access_token: auth.access_token,
			});
		} else {
			return res.status(204).send('no audio features returned');
		}
	} catch (error) {
		return res.status(404).send(error);
	}
}

export async function getPopularityForTracks(req: any, res: any) {
	let spotifyApi = createSpotifyWebApi();
	const auth = await isAuth(req, spotifyApi);
	if (!(await auth).success) return res.status(401).send(auth.statusMessage);

	try {
		if (!auth.access_token)
			return res.status(400).send('failed to authenticate');
		if (!req.body.trackIdArray)
			return res.status(400).send('trackIdArray is missing');

		spotifyApi.setAccessToken(auth.access_token);

		const data = await spotifyApi.getTracks(req.body.trackIdArray);

		if (data) {
			const popularityArr = data.body.tracks.map(
				(track: any) => track.popularity
			);

			return res
				.status(200)
				.send({ body: popularityArr, access_token: auth.access_token });
		} else {
			return res.status(204).send('no audio features returned');
		}
	} catch (error) {
		return res.status(404).json({ error: error });
	}
}
