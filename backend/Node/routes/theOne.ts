import express from 'express';
import { getLocation, updateLatLon } from './route-helpers/mapbox-helpers';
import { getWeather } from './route-helpers/openweather-helpers';
import { getInputForML, getRecommendations } from './route-helpers/spotify-helpers/spotify-helpers';
const router = express.Router();

router.post(
	'/:latLon',
	(_, res: any, next: any) => {
		res.locals.theOne = true;
		next();
	},
	updateLatLon,
	getLocation,
	getWeather,
	getInputForML,
	getRecommendations
);

module.exports = router;
