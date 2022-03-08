import { client } from '../index';
import { reverseWeatherDataUsingLatLon } from '../../routes/route-helpers/openweather-helpers';
const cron = require('node-cron');

type Latlon = string[];
interface CityWeather {
	cityName: string;
	latlon: Latlon;
}

const latlonOfBigCities: CityWeather[] = [
	{ cityName: 'Vancouver', latlon: ['49.316666', '-123.066666'] },
	{ cityName: 'Toronto', latlon: ['43.761539', '-79.411079'] },
	{ cityName: 'Burnaby', latlon: ['49.246445', '-122.994560'] },
	{ cityName: 'Richmond', latlon: ['49.166592', '-123.133568'] },
];

export const fetchWeatherData = async (hoursBetweenFetch: number) => {
	fetchWeatherDataForCities(latlonOfBigCities);

	// reverseWeatherDataUsingLatLon();
	cron.schedule(`0 0 */${hoursBetweenFetch} * * *`, () => {
		fetchWeatherDataForCities(latlonOfBigCities);
	});
};

const fetchWeatherDataForCities = async (latlonOfBigCities: CityWeather[]) => {
	latlonOfBigCities.forEach(async (cityWeather: CityWeather) => {
		const jsonData = await reverseWeatherDataUsingLatLon(cityWeather.latlon);
		await client.query(
			`
      INSERT INTO "cityWeather" ("cityName", "weatherData") VALUES ($1, $2)
      ON CONFLICT ("cityName")
      DO UPDATE SET
				"weatherData" = EXCLUDED."weatherData";
    `,
			[cityWeather.cityName, jsonData]
		);
	});
};
