import express from 'express';
import { currentWeatherData } from './route-helpers/openweather-helpers';
import { isLatitude, isLongitude } from './route-helpers/mapbox-helpers';

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Open Weather API");
});

router.get('/reverseWeather/:latLon', async (req, res) => {
    const latLon = req.params.latLon.split(',');
    if (!isLatitude(latLon[0]) || !isLongitude(latLon[1])) {
        res.status(400).send("Invalid lat/lon value(s)");
    }
    const weatherData = await currentWeatherData(latLon[0], latLon[1]);

    const relevantData = [];
    relevantData.push(
        weatherData.main.temp,
        weatherData.main.feels_like,
        weatherData.main.humidity,
        weatherData.clouds.all,
    );

    res.send(relevantData ? relevantData : []);
});

module.exports = router;





