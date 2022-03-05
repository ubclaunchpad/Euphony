import express from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
const theOne = require('../routes/theOne');
const mapboxRoute = require('../routes/mapboxRoute');
const openWeatherRoute = require('../routes/openWeatherRoute');
const spotifyRoute = require('../routes/spotifyRoute');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { Client } = require('pg');
require('dotenv').config();

const port = process.env.PORTNUM;

// postgres db
export const client = new Client({
	connectionString: process.env.PG_CONNECTION_URL,
});

client.connect((err: any) => {
	if (err) {
		console.error('postgres connection error', err.stack);
	} else {
		console.log('connected to postgres server');
	}
});

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
				url: 'http://localhost:4000',
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
