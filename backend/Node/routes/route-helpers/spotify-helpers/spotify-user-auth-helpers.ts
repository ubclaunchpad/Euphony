import { createSpotifyWebApi, scopes } from './spotify-helpers';

export function login(_: any, res: any) {
	let spotifyApi = createSpotifyWebApi();
	res.redirect(spotifyApi.createAuthorizeURL(scopes));
}

export async function callback(req: any, res: any) {
	let spotifyApi = createSpotifyWebApi();
	const error = req.query.error;
	const code = req.query.code;

	if (error) {
		res.send(`Callback Error: ${error}`);
		return;
	}

	try {
		const data = await spotifyApi.authorizationCodeGrant(code);

		if (data) {
			const access_token = data.body['access_token'];
			const refresh_token = data.body['refresh_token'];

			const tokens = {
				field: 'successfully login',
				access_token: access_token,
				refresh_token: refresh_token,
			};

			res.status(200).send(tokens);
		} else {
			res.send('Authorization granted, but no tokens were returned');
		}
	} catch (error: any) {
		console.error('Error getting Tokens:', error);
		res.send(`Error getting Tokens: ${error}`);
	}
}

export async function getMe(req: any, res: any) {
	let spotifyApi = createSpotifyWebApi();
	try {
		if (!req.params.access_token)
			return res.status(400).send('failed to authenticate');

		spotifyApi.setAccessToken(req.params.access_token);
		const me = await spotifyApi.getMe();

		if (!me) {
			return res.status(204).send('error while retrieving user info');
		}
		return res.status(200).json(me.body);
	} catch (error) {
		return res.status(404).send(error);
	}
}
