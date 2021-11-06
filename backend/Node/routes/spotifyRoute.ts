const SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');
const router = express.Router();
import { scopes } from './route-helpers/spotify-helpers';
import axios from 'axios';

// credentials are optional
var spotifyApi = new SpotifyWebApi({
	clientId: process.env.SPOTIFY_CLIENT_ID,
	clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
	redirectUri: 'http://localhost:4000/spotify/callback',
});

// login
router.get('/login', (req: any, res: any) => {
	res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

// call back api with access token and refresh token
router.get('/callback', async (req: any, res: any) => {
	const error = req.query.error;
	const code = req.query.code;
	const state = req.query.state;

	if (error) {
		console.error('Callback Error:', error);
		res.send(`Callback Error: ${error}`);
		return;
	}

	try {
		const data = await spotifyApi.authorizationCodeGrant(code);

		if (data) {
			const access_token = data.body['access_token'];
			const refresh_token = data.body['refresh_token'];
			const expires_in = data.body['expires_in'];

			spotifyApi.setAccessToken(access_token);
			spotifyApi.setRefreshToken(refresh_token);

			console.log('access_token:', access_token);
			console.log('refresh_token:', refresh_token);

			console.log(
				`Sucessfully retreived access token. Expires in ${expires_in} s.`
			);
			res.send('Success! You can now close the window.');

			setInterval(async () => {
				const data = await spotifyApi.refreshAccessToken();
				const access_token = data.body['access_token'];

				console.log('The access token has been refreshed!');
				console.log('access_token:', access_token);
				spotifyApi.setAccessToken(access_token);
			}, (expires_in / 2) * 1000);
		} else {
			res.send('Authorization granted, but no tokens were returned');
		}
	} catch (error: any) {
		console.error('Error getting Tokens:', error);
		res.send(`Error getting Tokens: ${error}`);
	}
});

// get user basic information
router.get('/getMe/:access_token', async (req: any, res: any) => {
	try {
		if (!req.params.access_token)
			return res.status(400).send('failed to authenticate');

		spotifyApi.setAccessToken(req.params.access_token);
		const me = await spotifyApi.getMe();
		console.log(me);

		if (!me) {
			return res.status(204).send('error while retrieving user info');
		}
		return res.status(200).json(me.body);
	} catch (error) {
		return res.status(404).send(error);
	}
});

// get user top tracks
router.get(
	'/getMyTopTracksManual/:access_token',
	async (req: any, res: any) => {
		try {
			if (!req.params.access_token)
				return res.status(400).send('failed to authenticate');

			const url = 'https://api.spotify.com/v1/me/top/tracks';

			const topTracks: any = await axios.get(url, {
				headers: { Authorization: `Bearer ${req.params.access_token}` },
			});

			if (topTracks) {
				console.log(topTracks.data);
				return res.status(200).send(topTracks.data);
			}
		} catch (error) {
			console.log(error);
			return res.status(404).send(error);
		}
	}
);

// get audio features for a track
router.get(
	'/getAudioFeaturesForTrack/:access_token',
	async (req: any, res: any) => {
		try {
			if (!req.params.access_token)
				return res.status(400).send('failed to authenticate');
			if (!req.body.trackId) return res.status(400).send('trackId is missing');

			spotifyApi.setAccessToken(req.params.access_token);
			const data = await spotifyApi.getAudioFeaturesForTrack(req.body.trackId);
			if (data) {
				console.log(data);
				return res.status(200).send(data);
			} else {
				return res.status(204).send('error getting audio features');
			}
		} catch (error) {
			return res.status(404).send(error);
		}
	}
);

module.exports = router;
