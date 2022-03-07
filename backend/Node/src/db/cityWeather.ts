const cron = require('node-cron');

export const fetchWeatherData = (hoursBetweenFetch: number) => {
	console.log(new Date().toISOString());
	cron.schedule(`0 0 */${hoursBetweenFetch} * * *`, () => {
		console.log(new Date().toISOString());
	});
};
