import express from 'express';
import { isLatitude, isLongitude, reverseGeocoding } from './route-helpers/mapbox-helpers';

const router = express.Router();

router.get('/', (_, res) => {
	res.send('Mapbox API');
});

router.get('/reverseLocation/:latLon', async (req, res) => {
	const latLon = req.params.latLon.split(',');
	const result: any = await reverseGeocoding(latLon[0], latLon[1]);
	res.send(result.features.length ? result.features[0].context : []);
});

router.get('/reverseCountry/:latLon', async (req, res) => {
	const latLon = req.params.latLon.split(',');
	if (!isLatitude(latLon[0]) || !isLongitude(latLon[1])) {
		res.status(400).send('Invalid lat/lon value(s)');
	}
	const result: any = await reverseGeocoding(latLon[0], latLon[1]);
	const features = result.features;
	res.send((features.length && features[0].context.length) ? features[0].context[features[0].context.length - 1] : {});
});

module.exports = router;
