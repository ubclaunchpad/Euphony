const express = require('express');
const router = express.Router();
import axios from 'axios';
import { Activity, genres, Location, Mood } from '../src/interfaces';
import {
	createSpotifyWebApi,
	getInputForML,
	getPopularityForTracks,
	scopes,
} from './route-helpers/spotify-helpers';
import { getSeedArtistIdsFromTopTracks, parseTrack, Track } from './route-helpers/spotify-mapper';

router.get('/', (req: any, res: any) => {
	res.send('Spotify API')
});

// login
router.get('/login', (req: any, res: any) => {
	let spotifyApi = createSpotifyWebApi();
	res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

// call back api with access token and refresh token
router.get('/callback', async (req: any, res: any) => {
	let spotifyApi = createSpotifyWebApi();
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

			// development purposes
			console.log('access_token:', access_token);
			console.log('refresh_token:', refresh_token);

			console.log(
				`Successfully retrieved access token. Expires in ${expires_in} s.`
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
});

// get user top tracks
router.get('/getMyTopTracks/:access_token', async (req: any, res: any) => {
	try {
		if (!req.params.access_token)
			return res.status(400).send('failed to authenticate');

		const url = 'https://api.spotify.com/v1/me/top/tracks';

		const topTracks: any = await axios.get(url, {
			headers: { Authorization: `Bearer ${req.params.access_token}` },
		});

		if (topTracks) {
			let topTracksIds = topTracks.data.items.map((track: any) => track.id);
			return res.status(200).send(topTracksIds);
		}
	} catch (error) {
		return res.status(404).send(error);
	}
});

// get audio features for a track
router.get(
	'/getAudioFeaturesForTrack/:access_token',
	async (req: any, res: any) => {
		let spotifyApi = createSpotifyWebApi();
		try {
			if (!req.params.access_token || !req.body.trackId)
				return res.status(400).send('failed to authenticate');

			spotifyApi.setAccessToken(req.params.access_token);

			const data = await spotifyApi.getAudioFeaturesForTrack(req.body.trackId);
			if (data) {
				return res.status(200).send(data);
			} else {
				return res.status(204).send('no audio features returned');
			}
		} catch (error) {
			return res.status(404).send(error);
		}
	}
);

// get audio features for many tracks
router.get(
	'/getAudioFeaturesForTracks/:access_token',
	async (req: any, res: any) => {
		let spotifyApi = createSpotifyWebApi();
		try {
			if (!req.params.access_token)
				return res.status(400).send('failed to authenticate');
			if (!req.body.trackIdArray)
				return res.status(400).send('trackIdArray is missing');

			spotifyApi.setAccessToken(req.params.access_token);

			const data = await spotifyApi.getAudioFeaturesForTracks(
				req.body.trackIdArray
			);
			if (data) {
				return res.status(200).send(data.body.audio_features);
			} else {
				return res.status(204).send('no audio features returned');
			}
		} catch (error) {
			return res.status(404).send(error);
		}
	}
);

router.get('/getPopularityForTracks/:access_token', getPopularityForTracks);

router.get('/getInputForML/:access_token', getInputForML);

/**
 * TODO: this doesn't have to be its own API endpoint, could just go into
 * 			a function call for after we finish steps 1-4
 */
router.get('/recs/:access_token', async(req: any, res: any) => {
	/**
	 * TODO: hi Hung! I just hardcoded these fields below to isolate this part
	 * 			you can populate these with values from the work in steps 1-4 that we have
	 */
	const location = Location.CA;
	const mood = Mood.HAPPY;
	const activity = Activity.CHILL;
	const temp = 17.730000000000018;
	const pop = 0.65;
	const clouds = 0.4;
	const audio_features = [{"danceability":0.646,"energy":0.466,"key":6,"loudness":-8.785,"mode":1,"speechiness":0.0365,"acousticness":0.694,"instrumentalness":0.000356,"liveness":0.101,"valence":0.265,"tempo":94.966,"type":"audio_features","id":"1ZEYuf4A7V3ikAQ8hQNS1O","uri":"spotify:track:1ZEYuf4A7V3ikAQ8hQNS1O","track_href":"https://api.spotify.com/v1/tracks/1ZEYuf4A7V3ikAQ8hQNS1O","analysis_url":"https://api.spotify.com/v1/audio-analysis/1ZEYuf4A7V3ikAQ8hQNS1O","duration_ms":231158,"time_signature":4,"popularity":39},{"danceability":0.366,"energy":0.364,"key":0,"loudness":-7.814,"mode":1,"speechiness":0.0433,"acousticness":0.858,"instrumentalness":0.0000115,"liveness":0.165,"valence":0.459,"tempo":165.902,"type":"audio_features","id":"6bGMSP3H9YqkmaLnaJTIoF","uri":"spotify:track:6bGMSP3H9YqkmaLnaJTIoF","track_href":"https://api.spotify.com/v1/tracks/6bGMSP3H9YqkmaLnaJTIoF","analysis_url":"https://api.spotify.com/v1/audio-analysis/6bGMSP3H9YqkmaLnaJTIoF","duration_ms":366004,"time_signature":4,"popularity":84},{"danceability":0.654,"energy":0.434,"key":8,"loudness":-11.163,"mode":1,"speechiness":0.0665,"acousticness":0.837,"instrumentalness":0,"liveness":0.216,"valence":0.223,"tempo":109.069,"type":"audio_features","id":"2CVChktEKBsM6v4IfdFU5k","uri":"spotify:track:2CVChktEKBsM6v4IfdFU5k","track_href":"https://api.spotify.com/v1/tracks/2CVChktEKBsM6v4IfdFU5k","analysis_url":"https://api.spotify.com/v1/audio-analysis/2CVChktEKBsM6v4IfdFU5k","duration_ms":171743,"time_signature":4,"popularity":78},{"danceability":0.633,"energy":0.476,"key":2,"loudness":-9.341,"mode":0,"speechiness":0.0386,"acousticness":0.481,"instrumentalness":0.0000776,"liveness":0.661,"valence":0.456,"tempo":113.97,"type":"audio_features","id":"7hZtfayYQukFySbj746HJL","uri":"spotify:track:7hZtfayYQukFySbj746HJL","track_href":"https://api.spotify.com/v1/tracks/7hZtfayYQukFySbj746HJL","analysis_url":"https://api.spotify.com/v1/audio-analysis/7hZtfayYQukFySbj746HJL","duration_ms":170406,"time_signature":4,"popularity":49},{"danceability":0.527,"energy":0.746,"key":2,"loudness":-7.717,"mode":1,"speechiness":0.0536,"acousticness":0.0379,"instrumentalness":0.000058,"liveness":0.0628,"valence":0.445,"tempo":166.919,"type":"audio_features","id":"4lKg94fHZZ3pozsNFTew2x","uri":"spotify:track:4lKg94fHZZ3pozsNFTew2x","track_href":"https://api.spotify.com/v1/tracks/4lKg94fHZZ3pozsNFTew2x","analysis_url":"https://api.spotify.com/v1/audio-analysis/4lKg94fHZZ3pozsNFTew2x","duration_ms":240200,"time_signature":4,"popularity":54},{"danceability":0.593,"energy":0.749,"key":5,"loudness":-5.67,"mode":1,"speechiness":0.0475,"acousticness":0.0113,"instrumentalness":0.106,"liveness":0.314,"valence":0.649,"tempo":164.959,"type":"audio_features","id":"5ruzrDWcT0vuJIOMW7gMnW","uri":"spotify:track:5ruzrDWcT0vuJIOMW7gMnW","track_href":"https://api.spotify.com/v1/tracks/5ruzrDWcT0vuJIOMW7gMnW","analysis_url":"https://api.spotify.com/v1/audio-analysis/5ruzrDWcT0vuJIOMW7gMnW","duration_ms":309053,"time_signature":4,"popularity":79},{"danceability":0.903,"energy":0.593,"key":10,"loudness":-6.531,"mode":0,"speechiness":0.0408,"acousticness":0.488,"instrumentalness":0.0243,"liveness":0.11,"valence":0.788,"tempo":109.983,"type":"audio_features","id":"5SAK4pJLz2Lu8RDerM5qiU","uri":"spotify:track:5SAK4pJLz2Lu8RDerM5qiU","track_href":"https://api.spotify.com/v1/tracks/5SAK4pJLz2Lu8RDerM5qiU","analysis_url":"https://api.spotify.com/v1/audio-analysis/5SAK4pJLz2Lu8RDerM5qiU","duration_ms":213467,"time_signature":4,"popularity":51},{"danceability":0.629,"energy":0.448,"key":2,"loudness":-9.534,"mode":1,"speechiness":0.102,"acousticness":0.579,"instrumentalness":0,"liveness":0.131,"valence":0.515,"tempo":79.993,"type":"audio_features","id":"1K13OsIMc0HLgEJHZoWH78","uri":"spotify:track:1K13OsIMc0HLgEJHZoWH78","track_href":"https://api.spotify.com/v1/tracks/1K13OsIMc0HLgEJHZoWH78","analysis_url":"https://api.spotify.com/v1/audio-analysis/1K13OsIMc0HLgEJHZoWH78","duration_ms":193413,"time_signature":4,"popularity":55},{"danceability":0.631,"energy":0.325,"key":7,"loudness":-11.404,"mode":1,"speechiness":0.0423,"acousticness":0.74,"instrumentalness":0.0000163,"liveness":0.155,"valence":0.468,"tempo":78.063,"type":"audio_features","id":"5GQQ3qp1BgqCdI50n0GzNP","uri":"spotify:track:5GQQ3qp1BgqCdI50n0GzNP","track_href":"https://api.spotify.com/v1/tracks/5GQQ3qp1BgqCdI50n0GzNP","analysis_url":"https://api.spotify.com/v1/audio-analysis/5GQQ3qp1BgqCdI50n0GzNP","duration_ms":199367,"time_signature":4,"popularity":35},{"danceability":0.611,"energy":0.407,"key":1,"loudness":-8.056,"mode":0,"speechiness":0.082,"acousticness":0.0803,"instrumentalness":0.0212,"liveness":0.28,"valence":0.252,"tempo":77.994,"type":"audio_features","id":"0h1YzxN6QTjEkJGU6fxsyt","uri":"spotify:track:0h1YzxN6QTjEkJGU6fxsyt","track_href":"https://api.spotify.com/v1/tracks/0h1YzxN6QTjEkJGU6fxsyt","analysis_url":"https://api.spotify.com/v1/audio-analysis/0h1YzxN6QTjEkJGU6fxsyt","duration_ms":263840,"time_signature":4,"popularity":39},{"danceability":0.803,"energy":0.558,"key":8,"loudness":-6.643,"mode":1,"speechiness":0.144,"acousticness":0.631,"instrumentalness":0.00000313,"liveness":0.116,"valence":0.402,"tempo":90.043,"type":"audio_features","id":"2WyjObUjqZVqVxAX9PvO8t","uri":"spotify:track:2WyjObUjqZVqVxAX9PvO8t","track_href":"https://api.spotify.com/v1/tracks/2WyjObUjqZVqVxAX9PvO8t","analysis_url":"https://api.spotify.com/v1/audio-analysis/2WyjObUjqZVqVxAX9PvO8t","duration_ms":214000,"time_signature":4,"popularity":5},{"danceability":0.53,"energy":0.712,"key":0,"loudness":-8.135,"mode":1,"speechiness":0.0461,"acousticness":0.44,"instrumentalness":0.0233,"liveness":0.0931,"valence":0.577,"tempo":167.964,"type":"audio_features","id":"73W5aXorr5vxrySFcoZqIN","uri":"spotify:track:73W5aXorr5vxrySFcoZqIN","track_href":"https://api.spotify.com/v1/tracks/73W5aXorr5vxrySFcoZqIN","analysis_url":"https://api.spotify.com/v1/audio-analysis/73W5aXorr5vxrySFcoZqIN","duration_ms":254467,"time_signature":4,"popularity":58},{"danceability":0.776,"energy":0.56,"key":7,"loudness":-7.182,"mode":1,"speechiness":0.136,"acousticness":0.0264,"instrumentalness":0,"liveness":0.0496,"valence":0.554,"tempo":109.463,"type":"audio_features","id":"7FqScuVJysPgwVFcepFJks","uri":"spotify:track:7FqScuVJysPgwVFcepFJks","track_href":"https://api.spotify.com/v1/tracks/7FqScuVJysPgwVFcepFJks","analysis_url":"https://api.spotify.com/v1/audio-analysis/7FqScuVJysPgwVFcepFJks","duration_ms":185853,"time_signature":4,"popularity":48},{"danceability":0.677,"energy":0.576,"key":6,"loudness":-5.43,"mode":1,"speechiness":0.0416,"acousticness":0.631,"instrumentalness":0,"liveness":0.125,"valence":0.562,"tempo":87.934,"type":"audio_features","id":"5IWlLl3xT95o8TSv3O8tRH","uri":"spotify:track:5IWlLl3xT95o8TSv3O8tRH","track_href":"https://api.spotify.com/v1/tracks/5IWlLl3xT95o8TSv3O8tRH","analysis_url":"https://api.spotify.com/v1/audio-analysis/5IWlLl3xT95o8TSv3O8tRH","duration_ms":243785,"time_signature":4,"popularity":61},{"danceability":0.436,"energy":0.196,"key":9,"loudness":-14.566,"mode":1,"speechiness":0.0284,"acousticness":0.904,"instrumentalness":0.0023,"liveness":0.107,"valence":0.281,"tempo":83.768,"type":"audio_features","id":"6wQXjA6KWbwPT3ydQCsJ4P","uri":"spotify:track:6wQXjA6KWbwPT3ydQCsJ4P","track_href":"https://api.spotify.com/v1/tracks/6wQXjA6KWbwPT3ydQCsJ4P","analysis_url":"https://api.spotify.com/v1/audio-analysis/6wQXjA6KWbwPT3ydQCsJ4P","duration_ms":277400,"time_signature":4,"popularity":59},{"danceability":0.333,"energy":0.188,"key":2,"loudness":-11.48,"mode":1,"speechiness":0.0414,"acousticness":0.948,"instrumentalness":0.000693,"liveness":0.0912,"valence":0.63,"tempo":207.884,"type":"audio_features","id":"6v3wihX7hSonQaBVSYTBgW","uri":"spotify:track:6v3wihX7hSonQaBVSYTBgW","track_href":"https://api.spotify.com/v1/tracks/6v3wihX7hSonQaBVSYTBgW","analysis_url":"https://api.spotify.com/v1/audio-analysis/6v3wihX7hSonQaBVSYTBgW","duration_ms":179747,"time_signature":4,"popularity":51},{"danceability":0.714,"energy":0.56,"key":10,"loudness":-4.742,"mode":1,"speechiness":0.0662,"acousticness":0.479,"instrumentalness":0,"liveness":0.157,"valence":0.945,"tempo":109.934,"type":"audio_features","id":"7kpe2K0hdSssLj4G4YjxdU","uri":"spotify:track:7kpe2K0hdSssLj4G4YjxdU","track_href":"https://api.spotify.com/v1/tracks/7kpe2K0hdSssLj4G4YjxdU","analysis_url":"https://api.spotify.com/v1/audio-analysis/7kpe2K0hdSssLj4G4YjxdU","duration_ms":151212,"time_signature":4,"popularity":61},{"danceability":0.354,"energy":0.277,"key":7,"loudness":-10.62,"mode":1,"speechiness":0.0271,"acousticness":0.782,"instrumentalness":0.0585,"liveness":0.218,"valence":0.163,"tempo":60.037,"type":"audio_features","id":"6JqwuALkOqCYXMDO3llZUm","uri":"spotify:track:6JqwuALkOqCYXMDO3llZUm","track_href":"https://api.spotify.com/v1/tracks/6JqwuALkOqCYXMDO3llZUm","analysis_url":"https://api.spotify.com/v1/audio-analysis/6JqwuALkOqCYXMDO3llZUm","duration_ms":256000,"time_signature":4,"popularity":52},{"danceability":0.436,"energy":0.714,"key":4,"loudness":-5.229,"mode":1,"speechiness":0.0257,"acousticness":0.00474,"instrumentalness":0,"liveness":0.162,"valence":0.212,"tempo":88.955,"type":"audio_features","id":"1AA3ZjLo9tD2iSZAs2svyj","uri":"spotify:track:1AA3ZjLo9tD2iSZAs2svyj","track_href":"https://api.spotify.com/v1/tracks/1AA3ZjLo9tD2iSZAs2svyj","analysis_url":"https://api.spotify.com/v1/audio-analysis/1AA3ZjLo9tD2iSZAs2svyj","duration_ms":244187,"time_signature":4,"popularity":56},{"danceability":0.534,"energy":0.666,"key":0,"loudness":-8.724,"mode":1,"speechiness":0.245,"acousticness":0.022,"instrumentalness":0.00155,"liveness":0.0958,"valence":0.254,"tempo":183.737,"type":"audio_features","id":"4JkOsslKrWDYYb5dcft9AH","uri":"spotify:track:4JkOsslKrWDYYb5dcft9AH","track_href":"https://api.spotify.com/v1/tracks/4JkOsslKrWDYYb5dcft9AH","analysis_url":"https://api.spotify.com/v1/audio-analysis/4JkOsslKrWDYYb5dcft9AH","duration_ms":235253,"time_signature":4,"popularity":50}]; 
	const trackIds = ['1ZEYuf4A7V3ikAQ8hQNS1O',
	'2CVChktEKBsM6v4IfdFU5k',
	'6bGMSP3H9YqkmaLnaJTIoF',
	'7hZtfayYQukFySbj746HJL',
	'4lKg94fHZZ3pozsNFTew2x',
	'5ruzrDWcT0vuJIOMW7gMnW',
	'5SAK4pJLz2Lu8RDerM5qiU',
	'1K13OsIMc0HLgEJHZoWH78',
	'5GQQ3qp1BgqCdI50n0GzNP',
	'0h1YzxN6QTjEkJGU6fxsyt',
	'2WyjObUjqZVqVxAX9PvO8t',
	'73W5aXorr5vxrySFcoZqIN',
	'7FqScuVJysPgwVFcepFJks',
	'5IWlLl3xT95o8TSv3O8tRH',
	'6wQXjA6KWbwPT3ydQCsJ4P',
	'6v3wihX7hSonQaBVSYTBgW',
	'7kpe2K0hdSssLj4G4YjxdU',
	'6JqwuALkOqCYXMDO3llZUm',
	'1AA3ZjLo9tD2iSZAs2svyj',
	'4JkOsslKrWDYYb5dcft9AH'
  ];
  const popularity = [
    39,
    78,
    84,
    49,
    54,
    79,
    51,
    55,
    35,
    39,
    5,
    58,
    48,
    61,
    59,
    51,
    61,
    52,
    56,
    50
  ];
  // TODO: validate limit (Spotify's range: 1 to 100 inclusive)
  const limit = 20;
  /* END OF HARDCODED VALUES */

  // TODO: move thiese endpoints somewhere nice, ML server port num should be set and loaded
  const MLServerRes = await axios.post(`http://localhost:5000/recommend_playlist`, {
	location,
	pop,
	clouds,
	temp,
	mood,
	activity,
	audio_features,
	popularity
	});

	// Get the first 2 track ids to pass as seed_tracks into the recommendation API
	const seedTracksIds = trackIds.slice(0, 2).join(',');
	// Get the seed genre from the user
	const seedGenre = genres[activity];
	// Get the top 2 artist ids (by # of occurences in the supplied tracks) to pass as seed_artists into the recommendation API
	const seedArtistIds = await getSeedArtistIdsFromTopTracks(trackIds, req.params.access_token);

	/**
	 * Construct the recommendations by starting out with the base (required) filters (seed artist(s), genre(s), track(s))
	 * Append optional fields supplied from the ML server to the recommendations API params to refine this search
	**/ 
	let recommendationsUrl = `https://api.spotify.com/v1/recommendations?seed_artists=${seedArtistIds}&seed_genres=${seedGenre}&seed_tracks=${seedTracksIds}&limit=${limit}`;
	Object.keys(MLServerRes.data).forEach((property: string) => recommendationsUrl += `&${property}=${MLServerRes.data[property]}`);
	// TODO: consolidate calls to Spotify API
	const spotifyRecommendationsRes: any = await axios.get(recommendationsUrl, {
		headers: { Authorization: `Bearer ${req.params.access_token}` },
	});

	// Format data returned from the API, only send what the front-end needs
	const formattedTracks: Track[] = spotifyRecommendationsRes.data.tracks.map((t: {[key: string]: any }) => parseTrack(t));
	res.send(formattedTracks);
});

module.exports = router;
