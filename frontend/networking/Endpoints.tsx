import { GlobalContent } from "../AppContext";
import authHandler from "./AppAuth";

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

function defaultHandler(context: GlobalContent, endpoint: string, type: APIReqType, validStatusHundreds: number[] = [2], isJSON = true, body: any = null) {
    return fetch(baseURL + endpoint, {
        ...getHeader(context, type),
        body: body ? JSON.stringify(body) : null,
    })
        .then(res => {
            if (res.status === 401) {
                return getNewCredentials(context)
                    .then(() => {
                        return fetch(baseURL + endpoint, {
                            ...getHeader(context, type),
                            body: body,
                        })
                    })
                    .then((secondRes) => {
                        console.log(secondRes)
                        return Promise.all([secondRes.text(), secondRes.status])
                    })
            }
            return Promise.all([res.text(), res.status])
        })
        .then(([text, status]) => {
            if (validStatusHundreds.includes(Math.floor(status / 100))) {
                return text;
            } else {
                // handle a status code error

                let errorMessage = ""
                try {
                    let json = JSON.parse(text);
                    if (json.message) {
                        errorMessage = json.message.substring(0, 50) + ` (${status})`;
                    } else {
                        errorMessage = `(${status})`;
                    }
                } catch (err) {
                    errorMessage = text.substring(0, 50) + ` (${status})`;
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

function getHeader(context: GlobalContent, type: APIReqType) {
    let obj = {
        method: type,
        headers: {
            'Content-Type': 'application/json',
            'userid': `${context.userID}`,
            'access_token': `${context.authToken}`,
        }
    };
    console.log("HEADERS" + JSON.stringify(obj))
    return obj;
}

async function getNewCredentials(context: GlobalContent): Promise<string> {
    if (context.refreshToken) {
        let user = await authHandler.refreshLogin(context.refreshToken)
        if (user) {
            console.log("GET NEW CREDENTIALS " + JSON.stringify(user))
            context.authToken = user.accessToken
            context.refreshToken = user.refreshToken
            context.setRefreshToken(user.refreshToken);
            context.setAuthToken(user.accessToken);
            console.log("SET NEW CONTEXT TO" + JSON.stringify(context))
            return Promise.resolve("Success");
        } else {
            return Promise.reject("Could not obtain credentials, try again later!");
        }
    } else {
        return Promise.reject("Not Logged In!");
    }
}
async function obtainCredentials(context: GlobalContent): Promise<string> {
    if (context.refreshToken) {
        if (context.userID && context.authToken == null) {
            let user = await authHandler.refreshLogin(context.refreshToken)
            if (user) {
                context.authToken = user.accessToken
                context.refreshToken = user.refreshToken
                context.setRefreshToken(user.refreshToken);
                context.setAuthToken(user.accessToken);
                return Promise.resolve("Success");
            } else {
                return Promise.reject("Could not obtain credentials, try again later!");
            }
        }
        return Promise.resolve("Success");
    } else {
        return Promise.reject("Not Logged In!");
    }
}

export default class Endpoints {
    static async getWeatherInfo(context: GlobalContent, latitude: number, longitude: number): Promise<WeatherInfo> {
        const weatherEndpoint = `openWeather/weather/${latitude},${longitude}/`;
        const locationEndpoint = `mapbox/location/${latitude},${longitude}/`;

        let weather = defaultHandler(context, weatherEndpoint, APIReqType.Get)
        let location = defaultHandler(context, locationEndpoint, APIReqType.Get)

        return obtainCredentials(context).then(
            () => {
                return Promise.all([weather, location])
            }
        )
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

    static async getMe(context: GlobalContent): Promise<any> {
        const endpoint = `spotify/getMe`;
        return obtainCredentials(context).then(() => defaultHandler(context, endpoint, APIReqType.Get))
    }
    static async getUserID(auth_token: string): Promise<any> {
        const endpoint = `spotify/getMe`;

        let context: GlobalContent = { authToken: auth_token }
        return defaultHandler(context, endpoint, APIReqType.Get)
    }

    static async theOne(context: GlobalContent, body: any, latitude: number, longitude: number): Promise<any> {
        const endpoint = `theOne/${latitude},${longitude}`;
        return obtainCredentials(context).then(() => defaultHandler(context, endpoint, APIReqType.Post, [2], true, body))
    }

    static async createPlaylist(context: GlobalContent, body: any): Promise<any> {
        const endpoint = `spotify/createSpotifyPlaylist`;
        return obtainCredentials(context).then(() => defaultHandler(context, endpoint, APIReqType.Post, [2], true, body))

    }

}
