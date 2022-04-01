import express from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { createTables } from './db/initDb';
import { fetchWeatherData } from './db/cityWeather/cityWeather';
import { initCountries } from './db/countries/countries';
const theOne = require('../routes/theOne');
const mapboxRoute = require('../routes/mapboxRoute');
const openWeatherRoute = require('../routes/openWeatherRoute');
const spotifyRoute = require('../routes/spotifyRoute');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { Client } = require('pg');
require('dotenv').config();

// postgres db
export const client = new Client({
	connectionString: process.env.PG_CONNECTION_URL,
});

const port = process.env.PORT;
const app = express();
const apiPrefix = `http://${process.env.NODE_ENV === 'development' ? 'localhost' : 'localhost'
	}:${port}/`;
app.use(cookieParser());

(async () => {
	// database setup
	try {
		await client.connect()
		console.log('connected to postgres server');

		await createTables();
		await initCountries();

		// cron job to fetch weather for big cities every x hours
		const hoursBetweenFetch = 1;
		fetchWeatherData(hoursBetweenFetch);

	} catch (e) {
		console.error("postgres connection error " + e);

	}

	const app = express();

	app.use(cookieParser());

	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: false }));

	// parse application/json
	app.use(bodyParser.json());

	// set up swagger UI
	const options = {
		definition: {
			openapi: '3.0.0',
			info: {
				title: 'Spotify Gen API Documentation',
				version: '1.0.0',
				description: 'Spotify Gen Library API',
			},
			servers: [
				{
					url: apiPrefix,
				},
			],
		},
		apis: ['./routes/docs/*.yaml'],
	};

	const specs = swaggerJsDoc(options);

	app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

	app.get('/', (_, res) => {
		res.send("Welcome to Spotify Gen's Node server!");
	});

	app.listen(port, () => {
		console.log(`running on port ${port}`);
	});

	// routes
	app.use('/theOne', theOne);
	app.use('/mapbox', mapboxRoute);
	app.use('/openWeather', openWeatherRoute);
	app.use('/spotify', spotifyRoute);
})();
