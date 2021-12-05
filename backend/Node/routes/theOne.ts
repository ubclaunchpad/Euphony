import express from 'express';
import { reverseCountry } from './route-helpers/mapbox-helpers';
import { reverseWeather } from './route-helpers/openweather-helpers';
import {
	getInputForML,
	getRecommendations,
} from './route-helpers/spotify-helpers';
const router = express.Router();

router.post(
	'/:latLon/:access_token/',
	(_, res: any, next: any) => {
		res.locals.theOne = true;
		next();
	},
	reverseCountry,
	reverseWeather,
	getInputForML,
	getRecommendations
);

module.exports = router;
