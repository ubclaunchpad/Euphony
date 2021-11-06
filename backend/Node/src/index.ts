import express from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import bodyParser from 'body-parser';
const testRoute = require('../routes/testRoute');
const mapboxRoute = require('../routes/mapboxRoute');
const spotifyRoute = require('../routes/spotifyRoute');

require('dotenv').config();

const app = express();
const port = process.env.PORTNUM;

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// set up swagger UI
const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Library API',
			version: '1.0.0',
			descrition: 'A simple Express Library API',
		},
		servers: [
			{
				url: 'http://localhostL4000',
			},
		],
	},
	apis: ['.routes/*.js'],
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
app.use('/test', testRoute);
app.use('/mapbox', mapboxRoute);
app.use('/spotify', spotifyRoute);
