import express from 'express';
import { updateLatLon } from './route-helpers/mapbox-helpers';
import { reverseWeather } from './route-helpers/openweather-helpers';
import {
	getInputForML,
	getRecommendations,
} from './route-helpers/spotify-helpers/spotify-helpers';
const router = express.Router();

router.post(
	'/:latLon',
	(_, res: any, next: any) => {
		res.locals.theOne = true;
		next();
	},
	updateLatLon,
	reverseWeather,
	getInputForML,
	getRecommendations
);

module.exports = router;
