
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
    Get = "GET",
    Post = "POST",
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
                // handle a status code error

                let errorMessage = ""
                try {
                    console.log("HELLO");
                    let json = JSON.parse(text);
                    if (json.message) {
                        errorMessage = json.message.substring(0, 50) + ` (${status})`;
                    } else {
                        errorMessage = `(${status})`;
                    }
                } catch (err) {
                    if (err instanceof Error) {
                        errorMessage = err.message;
                    } else {
                        errorMessage = text.substring(0, 50) + ` (${status})`;
                    }
                }
                throw new Error("Network Error: " + errorMessage);
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

        let weather = defaultHandler(fetch(weatherEndpoint, getHeader(APIReqType.Get)))
        let location = defaultHandler(fetch(locationEndpoint, getHeader(APIReqType.Get)))

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
        return defaultHandler(fetch(endpoint, getHeader(APIReqType.Get)))
    }

    static async theOne(body: any, latitude: number, longitude: number): Promise<any> {
        const endpoint = `${baseURL}theOne/${latitude},${longitude}`;
        console.log("the ONE")
        return defaultHandler(fetch(endpoint, {
            ...getHeader(APIReqType.Post),
            body: JSON.stringify(body),
        }))
    }

    static async createPlaylist(body: any): Promise<any> {
        const endpoint = `${baseURL}spotify/createSpotifyPlaylist`;
        return defaultHandler(fetch(endpoint, {
            ...getHeader(APIReqType.Post),
            body: JSON.stringify(body),
        }))
    }

}
