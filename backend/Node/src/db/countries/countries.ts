import { client } from '../../index';

const fs = require('fs');
const csv = require('csv-parser');

export const initCountries = async () => {
	fs.createReadStream(__dirname + '/countriesData.csv')
		.pipe(csv())
		.on('data', async function (data: any) {
			try {
				const jsonData = {
					short_code: data.countryCode,
					text: data.countryName,
					lat: data.lat,
					lon: data.lon,
				};

				await client.query(
					`
					INSERT INTO "countries" ("countryName", "countryData") VALUES ($1, $2)
					ON CONFLICT ("countryName")
					DO UPDATE SET
						"countryData" = EXCLUDED."countryData";
				`,
					[data.countryName, jsonData]
				);
				//perform the operation
			} catch (err) {
				//error handler
				console.log(err);
			}
		})
		.on('end', function () {
			//some final operation
			console.log('done initializing countries table');
		});
};

export const getCountryCodeFromName = async (countryName: string): Promise<Number> => {
	const matchingUserData = await client.query(
		`
			SELECT "id" FROM countries WHERE "countryName" = '${countryName}' LIMIT 1;
		`
	);
	return matchingUserData.rows[0].id;
};

export const getCountryNameFromId = async (countryId: string): Promise<string> => {
	try {
		const matchingUserData = await client.query(
			`
				SELECT "countryName" FROM countries WHERE "id" = '${countryId}' LIMIT 1;
			`
		);
		return matchingUserData.rows[0].countryName;
	} catch (err) {
		console.log('error getting country name from id', err);
		return '';
	}
};