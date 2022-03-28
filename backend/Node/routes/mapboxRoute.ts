import express from 'express';
import {
	reverseLocation,
	reverseCountry,
	getLocation,
} from './route-helpers/mapbox-helpers';

const router = express.Router();

router.get('/', (_, res) => {
	res.send('Mapbox API');
});

router.get('/location/:latLon', getLocation);
router.get('/reverseLocation/:latLon', reverseLocation);
router.get('/reverseCountry/:latLon', reverseCountry);
module.exports = router;
