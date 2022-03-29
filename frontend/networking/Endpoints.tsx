
export type WeatherInfo = {
    city: string | null,
    country: string,
    weatherC: number,
    weatherF: number,
    feelsLikeC: number,
    feelsLikeF: number,
    weatherDesc: string,
}

//TODO: Change the URL for prod
let baseURL = __DEV__ ? "http://localhost:4000/" : "http://localhost:4000/"

enum APIReqType {
    get = "GET",
    post = "POST",
}

function defaultHandler(req: Promise<Response>, validStatusHundreds: number[] = [2]) {
    return req.then(res => {
        if (validStatusHundreds.includes(Math.floor(res.status / 100))) {
            return res.json();
        } else {
            throw new Error(`Network Error With Code: ${res.status}`);
        }
    })
}

function getHeader(type: APIReqType) {
    return {
        method: type,
        headers: {
            'Content-Type': 'application/json',
            'userid': `${Endpoints.userID}`,
            'authtoken': `${Endpoints.authToken}`,
        }
    };
}

export default class Endpoints {
    static userID: string;
    static authToken: string;


    static async getWeatherInfo(latitude: number, longitude: number): Promise<WeatherInfo> {
        const weatherEndpoint = `${baseURL}openWeather/weather/${latitude},${longitude}/`;
        const locationEndpoint = `${baseURL}mapbox/location/${latitude},${longitude}/`;

        let weather = defaultHandler(fetch(weatherEndpoint, getHeader(APIReqType.get)))
        let location = defaultHandler(fetch(locationEndpoint, getHeader(APIReqType.get)))

        return Promise.all([weather, location])
            .then(([weatherData, locationData]) => {
                console.log(locationData)
                return {
                    city: locationData.city,
                    country: locationData.country,
                    weatherC: Math.round(weatherData.temp_c),
                    weatherF: Math.round(weatherData.temp_f),
                    feelsLikeC: Math.round(weatherData.feels_like_c),
                    feelsLikeF: Math.round(weatherData.feels_like_f),
                    weatherDesc: weatherData.mainWeather,
                }

            })
    }
}