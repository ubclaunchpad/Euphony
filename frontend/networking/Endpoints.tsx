
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

function defaultHandler(req: Promise<Response>, validStatusHundreds: number[] = [2], isJSON = true) {
    return req
        .then(res => {
            return Promise.all([res.text(), res.status])
        })
        .then(([text, status]) => {
            if (validStatusHundreds.includes(Math.floor(status / 100))) {
                return text;
            } else {
                try {
                    let json = JSON.parse(text);
                    if (json.message) {
                        throw new Error(`Network Error: ${json.message.substring(0, 50)} (${status})`);
                    } else {
                        throw new Error(`Network Error:  ${status}`);
                    }
                } catch {
                    throw new Error(`Network Error: ${text.substring(0, 50)} (${status})`);
                }
            }
        })
        .then(data => {
            if (isJSON) {
                try {
                    return JSON.parse(data);
                } catch {
                    throw new Error("There was a networking error")
                }
            } else {
                return data;
            }
        })
}

function getHeader(type: APIReqType) {
    return {
        method: type,
        headers: {
            'Content-Type': 'application/json',
            'userid': `${Endpoints.userID}`,
            'access_token': `${Endpoints.authToken}`,
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

    static async getMe(accessToken?: string): Promise<any> {
        if (accessToken) {
            this.authToken = accessToken;
        }
        console.log(this.authToken)
        const endpoint = `${baseURL}spotify/getMe`;
        return defaultHandler(fetch(endpoint, getHeader(APIReqType.get)))
    }

    static async theOne(body: any, latitude: number, longitude: number): Promise<any> {
        const endpoint = `${baseURL}theOne/${latitude},${longitude}`;
        console.log("the ONE")
        return defaultHandler(fetch(endpoint, {
            ...getHeader(APIReqType.post),
            body: JSON.stringify(body),
        }))
    }

    static async createPlaylist(body: any): Promise<any> {
        const endpoint = `${baseURL}spotify/createSpotifyPlaylist`;
        return defaultHandler(fetch(endpoint, {
            ...getHeader(APIReqType.post),
            body: JSON.stringify(body),
        }))
    }

}
