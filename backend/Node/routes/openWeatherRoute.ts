import express from 'express';
import { currentWeatherData } from './route-helpers/openweather-helpers';
import { isLatitude, isLongitude } from './route-helpers/mapbox-helpers';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Open Weather API');
});

router.get('/reverseWeather/:latLon', async (req, res) => {
    const latLon = req.params.latLon.split(',');
    if (!isLatitude(latLon[0]) || !isLongitude(latLon[1])) {
        res.status(400).send('Invalid lat/lon value(s)');
    }
    const weatherData = await currentWeatherData(latLon[0], latLon[1]);

    const mainTempC = weatherData.main.temp - 273.15;
    const mainTempF = (weatherData.main.temp - 273.15) * (9 / 5) + 32;
    const mainFeelsLikeC = weatherData.main.feels_like - 273.15;
    const mainFeelsLikeF = (weatherData.main.feels_like - 273.15) * (9 / 5) + 32;
    const mainHumidity = weatherData.main.humidity / 100;
    const mainClouds = weatherData.clouds.all / 100;

    const relevantData = {
        temp_c: mainTempC,
        temp_f: mainTempF,
        feels_like_c: mainFeelsLikeC,
        feels_like_f: mainFeelsLikeF,
        humidity: mainHumidity,
        clouds: mainClouds
    };

    res.send(relevantData ? relevantData : {});
});

module.exports = router;





