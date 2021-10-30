const SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');
const router = express.Router();
import { scopes } from './route-helpers/spotify-helpers';

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
router.get('/callback', (req: any, res: any) => {
	const error = req.query.error;
	const code = req.query.code;
	const state = req.query.state;

	if (error) {
		console.error('Callback Error:', error);
		res.send(`Callback Error: ${error}`);
		return;
	}

	spotifyApi
		.authorizationCodeGrant(code)
		.then((data: any) => {
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
		})
		.catch((error: any) => {
			console.error('Error getting Tokens:', error);
			res.send(`Error getting Tokens: ${error}`);
		});
});

router.get('/getMe/:access_token', async (req: any, res: any) => {
	try {
		if (!req.params.access_token)
			return res.status(400).send('failed to authenticate');

		spotifyApi.setAccessToken(req.params.access_token);
		const me = await spotifyApi.getMe();
		console.log(me);

		if (me) {
			console.log(me);
			return res.status(200).json(me.body);
		} else {
			return res.status(204).send('error while retrieving user info');
		}
	} catch (error) {
		return res.status(404).send(error);
	}
});
module.exports = router;
