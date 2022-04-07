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
	getEuphonyPlaylistsByUser,
	deleteEuphonyPlaylistsByIds,
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
router.get('/getMe', getMe);

router.get('/getInputForML', getInputForML);

router.post('/createSpotifyPlaylist', createSpotifyPlaylist);

router.get('/getEuphonyPlaylistsByUser', getEuphonyPlaylistsByUser);

router.delete('/deleteEuphonyPlaylistsByIds', deleteEuphonyPlaylistsByIds);

/**
 * UNUSED ENDPOINTS, ONLY HERE FOR REFERENCE
 */
router.get('/getPopularityForTracks', getPopularityForTracks);

router.get('/getMyTopTracks', getMyTopTracks);

router.get('/getAudioFeaturesForTrack', getAudioFeaturesForTrack);

router.get('/getAudioFeaturesForTracks', getAudioFeaturesForTracks);

module.exports = router;
