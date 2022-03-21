import { client } from '../../index';
import { reverseWeatherDataUsingLatLon } from '../../../routes/route-helpers/openweather-helpers';
const fs = require('fs');
const csv = require('csv-parser');
const cron = require('node-cron');

function sleep(ms: number) {
	return new Promise(resolve => {
		setTimeout(resolve, ms);
	});
}

export const fetchWeatherData = async (hoursBetweenFetch: number) => {
	const totalNumberOfCities = 300;
	const callsPerFetch = 50;

	const lastMigrationData = await client.query(
		`SELECT "lastMigration" FROM public."migrations" WHERE "migrations".id = 1`
	);

	// migrate initial data upon db initialization
	for (
		let fetchNum = 1;
		fetchNum * callsPerFetch <= totalNumberOfCities;
		fetchNum++
	) {
		fetchWeatherDataForCities((fetchNum - 1) * 50 + 1, fetchNum * 50);
		await sleep(120000); // 2 mins between 50 fetches(API limit)
	}

	// fetch every x hour
	// 50 locations get updated every 2 minutes (API limit: 60 calls/min)
	// Eg. 1-50 gets updated at 1:02 AM, 51-100 gets updated at 1:04 AM
	for (
		let fetchNum = 1;
		fetchNum * callsPerFetch <= totalNumberOfCities;
		fetchNum++
	) {
		cron.schedule(
			`0 ${fetchNum * 2} */${hoursBetweenFetch} * * *`,
			async () => {
				const lastMigration = lastMigrationData?.rows[0].lastMigration;
				var timeDiff = new Date().getTime() - new Date(lastMigration).getTime();
				var diffMins = Math.round(timeDiff / (1000 * 60));
				console.log(diffMins);
				if (diffMins >= 20) {
					await fetchWeatherDataForCities(
						(fetchNum - 1) * 50 + 1,
						fetchNum * 50
					);
				}
			}
		);
	}
};

const fetchWeatherDataForCities = async (startRow: number, endRow: number) => {
	let index = 0;
	fs.createReadStream(__dirname + '/cityWeather.csv')
		.pipe(csv())
		.on('data', async function (data: any) {
			try {
				index += 1;
				if (index >= startRow && index <= endRow) {
					const latLon = [data.lat, data.lon];
					const jsonData = await reverseWeatherDataUsingLatLon(latLon);

					await client.query(
						`
					INSERT INTO "cityWeather" ("cityName", "weatherData") VALUES ($1, $2)
					ON CONFLICT ("cityName")
					DO UPDATE SET
						"weatherData" = EXCLUDED."weatherData";
				`,
						[data.cityName, jsonData]
					);
				}
			} catch (err) {
				//error handler
				console.log(err);
			}
		})
		.on('end', async function () {
			//some final operation
			console.log(
				`cron job: done updating cityWeather table rows #${startRow} - #${endRow}`
			);
		});
};

export const getCityIdFromName = async (cityName: string): Promise<number> => {
	try {
		const matchingUserData = await client.query(
			`
				SELECT "id" FROM "cityWeather" WHERE "cityName" = '${cityName}' LIMIT 1;
			`
		);
		return !matchingUserData.rows[0] ? 0 : matchingUserData.rows[0].id;
	} catch (err) {
		console.log('error getting city id from city name', err);
		return 0;
	}
};
