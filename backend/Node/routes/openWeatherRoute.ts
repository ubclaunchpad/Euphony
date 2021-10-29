import express from 'express';
import { currentWeatherData } from './route-helpers/openweather-helpers';
import { isLatitude, isLongitude } from './route-helpers/mapbox-helpers';
//TODO: May need import helpers for verifying lat/lon

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Open Weather API");
});



