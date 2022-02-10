import { Auth } from '../../../src/interfaces';
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
		res.send(`Error getting Tokens: ${error}`);
	}
}

export async function isAuth(req: any, spotifyApi: any): Promise<Auth> {
	const accessToken: string = req.headers['access_token'];
	const refreshToken: string = req.headers['refresh_token'];

	if (!accessToken && !refreshToken) {
		return { success: false, statusMessage: 'No auth tokens was specified' };
	}

	if (!refreshToken) {
		spotifyApi.setAccessToken(accessToken);
		return {
			success: true,
			access_token: accessToken,
		};
	}

	spotifyApi.setAccessToken(refreshToken);
	return refreshSpotifyAccessToken(refreshToken, spotifyApi);
}

export async function refreshSpotifyAccessToken(
	refreshToken: string,
	spotifyApi: any
): Promise<Auth> {
	spotifyApi.setRefreshToken(refreshToken);

	return spotifyApi.refreshAccessToken().then(
		function (data: any) {
			spotifyApi.setAccessToken(data.body['access_token']);
			return {
				success: true,
				access_token: data.body['access_token'],
			};
		},
		function (err: any) {
			return { success: false, statusMessage: err.message };
		}
	);
}

export async function getMe(req: any, res: any) {
	let spotifyApi = createSpotifyWebApi();
	const auth = await isAuth(req, spotifyApi);
	if (!(await auth).success) return res.status(401).send(auth.statusMessage);

	try {
		const me = await spotifyApi.getMe();

		if (!me) {
			return res.status(204).send('error while retrieving user info');
		}
		return res.status(200).json({
			body: me.body,
			access_token: auth.access_token,
		});
	} catch (error) {
		return res.status(404).send(error);
	}
}
