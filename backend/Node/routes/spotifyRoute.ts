const express = require('express');
const router = express.Router();
import {
	callback,
	getMe,
	login,
} from './route-helpers/spotify-helpers/spotify-user-auth-helpers';
import {
	getInputForML,
	createSpotifyPlaylist,
} from './route-helpers/spotify-helpers/spotify-helpers';
import {
	getAudioFeaturesForTrack,
	getAudioFeaturesForTracks,
	getMyTopTracks,
	getPopularityForTracks,
} from './route-helpers/spotify-helpers/spotify-unused-helpers';

router.get('/', (_: any, res: any) => {
	res.send('Spotify API');
});

// login
router.get('/login', login);

// call back api with access token and refresh token
router.get('/callback', callback);

// get user basic information
router.get('/getMe/:access_token', getMe);

router.get('/getInputForML/:access_token', getInputForML);

router.post('/createSpotifyPlaylist/:access_token', createSpotifyPlaylist);

/**
 * UNUSED ENDPOINTS, ONLY HERE FOR REFERENCE
 */
router.get('/getPopularityForTracks/:access_token', getPopularityForTracks);

router.get('/getMyTopTracks/:access_token', getMyTopTracks);

router.get('/getAudioFeaturesForTrack/:access_token', getAudioFeaturesForTrack);

router.get(
	'/getAudioFeaturesForTracks/:access_token',
	getAudioFeaturesForTracks
);

module.exports = router;
