import { client } from '../../../src';
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
			spotifyApi.setAccessToken(data.body['access_token']);
			const access_token = data.body['access_token'];
			const refresh_token = data.body['refresh_token'];

			const me = await spotifyApi.getMe();
			upsertUserDataUponLogin(me.body.id, me);

			const tokens = {
				field: 'successfully login',
				access_token: access_token,
				refresh_token: refresh_token,
				userId: me.body.id,
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

// TODO: return error message on false
async function upsertUserDataUponLogin(userId: string, userSpotifyData: any): Promise<boolean> {
	try {
		const defaultCountryData = await client.query(
			`
					SELECT * FROM countries WHERE countries."countryName" = 'Canada';
				`
		);
		const defaultCityData = await client.query(
			`
					SELECT * FROM "cityWeather" WHERE "cityWeather"."cityName" = 'Vancouver';
				`
		);

		const upsertUserData = await client.query(
			`
      INSERT INTO users ("userId", lat, lon, "cityId", "countryId", "userSpotifyData")
			VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT ("userId")
      DO UPDATE SET
			"userSpotifyData" = EXCLUDED."userSpotifyData";
    `,
			[
				userId,
				defaultCountryData.rows[0].countryData.lat,
				defaultCountryData.rows[0].countryData.lon,
				defaultCityData.rows[0].id,
				defaultCountryData.rows[0].id,
				userSpotifyData,
			]
		);

		if (upsertUserData) return true;
		return false;
	} catch (err) {
		console.log('error upsert userData', err);
		return false;
	}
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
		upsertUserDataUponLogin(me.body.id, me);

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
