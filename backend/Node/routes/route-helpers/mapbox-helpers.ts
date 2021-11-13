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
