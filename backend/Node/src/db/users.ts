import { client } from '../index';
import {
	getCountryCodeFromName,
	getCountryNameFromId,
} from './countries/countries';
import { getCityIdFromName } from './cityWeather/cityWeather';

/**
 * determine whether the lat/lon is different by more than 2 degrees
 * @param userId if of user to compare this change to
 * @param lat new lat passed from the front end
 * @param lon new lon passed from the front end
 * @returns
 */
export const shouldUpdateLatLon = async (
	userId: string,
	lat: string,
	lon: string
): Promise<boolean> => {
	const matchingUserData = await client.query(
		`
			SELECT "lat", "lon" FROM users WHERE "userId" = '${userId}' LIMIT 1;
		`
	);

	const latDb = parseFloat(matchingUserData.rows[0].lat);
	const lonDb = parseFloat(matchingUserData.rows[0].lon);

	const latDiff = findAbsoluteDiff(latDb, parseFloat(lat));
	const lonDiff = findAbsoluteDiff(lonDb, parseFloat(lon));

	// 0.1 ~ 11 km
	// 0.2 ~ 22 km
	// distance between Vancouver and Richmond is 15 km
	return latDiff > 0.2 || lonDiff > 0.2;
};

/**
 * update countryId, lat, lon for the specified user
 */
export const updateUserLocation = async (
	userId: string,
	countryName: string,
	cityName: string,
	lat: string,
	lon: string
): Promise<void> => {
	try {
		// first, get the corresponding countryId from the countryName
		const countryId = await getCountryCodeFromName(countryName);
		// do the same with city
		let cityId = await getCityIdFromName(cityName);
		if (!cityId) cityId = 1; // default to Vancouver

		await client.query(
			`
				UPDATE users
				SET "countryId" = '${countryId}', "cityId" = '${cityId}', "lat" = '${lat}', "lon" = '${lon}'
				WHERE "userId" = '${userId}';
			`
		);
	} catch (err) {
		console.log('error updating user country code' + ' (' + +') ', err);
	}
};

export const getUserCountryName = async (userId: string): Promise<string> => {
	try {
		const matchingUserData = await client.query(
			`
				SELECT "countryId" FROM users WHERE "userId" = '${userId}' LIMIT 1;
			`
		);
		return getCountryNameFromId(matchingUserData.rows[0].countryId);
	} catch (err) {
		console.log('error getting user country', err);
		return '';
	}
};

const findAbsoluteDiff = (a: number, b: number): number => {
	return Math.abs(a - b);
};

/**
 * get weather data of specified a user
 */
export const getUserWeather = async (
	userId: string
): Promise<JSON | undefined> => {
	try {
		const weatherData = await client.query(
			`
				SELECT "weatherData" 
				FROM "cityWeather"
				RIGHT JOIN users
				ON users."cityId" = "cityWeather".id
				WHERE users."userId" = '${userId}';
			`
		);

		return weatherData.rows[0].weatherData;
	} catch (err) {
		console.log('error getting user country', err);
		return undefined;
	}
};
