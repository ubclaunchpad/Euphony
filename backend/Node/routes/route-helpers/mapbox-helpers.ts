import axios from 'axios';
require('dotenv').config();
import { shouldUpdateLatLon, updateUserLocation, getUserCountryName, getUserCityName } from '../../src/db/users';

const token = process.env.MAPBOX_TOKEN;

// TODO: replace all the console.log() with logic to handle errors
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

export async function updateLatLon(req: any, res: any, next: any) {
	try {
		const latLon = req.params.latLon.split(',');
		const userId = req.headers['userid'];
		if (!isLatitude(latLon[0]) || !isLongitude(latLon[1])) {
			return res.status(400).send('Invalid lat/lon value(s)');
		}
		if (!userId) {
			return res.status(400).send('Invalid User');
		}

		// determine if the new lat lon is different from the one in the db
		const updateLatLon = await shouldUpdateLatLon(userId, latLon[0], latLon[1]);
		// if lat, lon should be updated, then call the reverseGeocoding API, then
		// save the results (lat, lon, country) in the database
		if (updateLatLon) {
			const result: any = await reverseGeocoding(latLon[0], latLon[1]);
			const features = result.features;
			const countryObj =
				features.length && features[0].context.length
					? features[0].context[features[0].context.length - 1]
					: {};

			const cityObj =
				features.length && features[0].context.length
					? features[0].context[features[0].context.length - 3]
					: {};

			const country = countryObj.text || 'Canada';
			let city = cityObj.text || 'Vancouver';

			// TODO: hacky solution for now:
			if (city === 'Metro Vancouver') city = 'Vancouver';

			// update lat lon and country in the db
			await updateUserLocation(userId, country, city, latLon[0], latLon[1]);
		}

		next();
	} catch (err) {
		return res.status(404).send(err);
	}
}

export async function getLocation(req: any, res: any, next: any) {
	// TODO: send country text (United States) or code (id in our db)?
	try {
		if (res.locals.theOne) {
			res.locals.location = await getUserCountryName(req.headers['userid']);
			next();
		} else {
			let country = await getUserCountryName(req.headers['userid']);
			res.send(country);
		}
	} catch (err) {
		return res.status(404).send(err);
	}
}



export async function getCityCountry(req: any, res: any, next: any) {
	try {
		let country = await getUserCountryName(req.headers['userid']);
		let city = await getUserCityName(req.headers['userid']);

		//Just need country to show something on UI, city is not necessary but nice to have
		if (country !== "") {
			res.send({ country: country, city: city });
		} else {
			res.status(404).send('Location not found');
		}
	} catch (err) {
		return res.status(404).send(err);
	}
}