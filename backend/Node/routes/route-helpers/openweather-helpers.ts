import axios from 'axios';

const API_KEY = process.env.OPEN_WEATHER_KEY;

export async function currentWeatherData(lat: String, lon: String) {
    const url = `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    const result: any = await axios.get(url)
        .catch((error: any) => {
            if (error.response) {
                //Request was successfully made but server responded with non-successful (not 2xx) status
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                //Request was successfully made but received no response
                console.log(error.request);
            } else {
                //Request triggered error
                console.log('Error', error.message);
            }
        })

    return result.data;
}



