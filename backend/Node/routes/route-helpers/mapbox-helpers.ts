import axios from 'axios';
require('dotenv').config();

const token = process.env.MAPBOX_TOKEN;

export async function reverseGeocoding(latitude: string, longitude: string) {
	const url =
		'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
		longitude +
		', ' +
		latitude +
		'.json?types=poi&access_token=' +
		token;

	const res: any = await axios.get(url).catch(function (error: any) {
		if (error.response) {
			console.log(error.response.data);
			console.log(error.response.status);
			console.log(error.response.headers);
		} else if (error.request) {
			console.log(error.request);
		} else {
			console.log('Error', error.message);
		}
	});
	return res.data;
}

export function isLatitude(latStr: string) {
	const lat = Number(latStr);
	return !isNaN(lat) && isFinite(lat) && Math.abs(lat) <= 90;
}

export function isLongitude(lonStr: string) {
	const lon = Number(lonStr);
	return !isNaN(lon) && isFinite(lon) && Math.abs(lon) <= 180;
}

export async function reverseLocation(req: any, res: any) {
	const latLon = req.params.latLon.split(',');
	if (!isLatitude(latLon[0]) || !isLongitude(latLon[1])) {
		res.status(400).send('Invalid lat/lon value(s)');
	}
	const result: any = await reverseGeocoding(latLon[0], latLon[1]);
	res.send(result.features.length ? result.features[0].context : []);
}

export async function reverseCountry(req: any, res: any, next: any) {
	try {
		const latLon = req.params.latLon.split(',');
		if (!isLatitude(latLon[0]) || !isLongitude(latLon[1])) {
			res.status(400).send('Invalid lat/lon value(s)');
		}
		const result: any = await reverseGeocoding(latLon[0], latLon[1]);
		const features = result.features;

		const country =
			features.length && features[0].context.length
				? features[0].context[features[0].context.length - 1]
				: {};

		if (res.locals.theOne) {
			res.locals.location = country;
			next();
		} else {
			res.send(country);
		}
	} catch (err) {
		return res.status(404).send(err);
	}
}
