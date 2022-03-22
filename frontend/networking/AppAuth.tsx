import { authorize, refresh } from 'react-native-app-auth';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '@env';
class AuthenticationHandler {
    spotifyAuthConfig: { clientId: string; clientSecret: string; redirectUrl: string; scopes: string[]; serviceConfiguration: { authorizationEndpoint: string; tokenEndpoint: string; }; };
    constructor() {
        this.spotifyAuthConfig = {
            clientId: SPOTIFY_CLIENT_ID,
            clientSecret: SPOTIFY_CLIENT_SECRET,
            redirectUrl: 'com.jamgang.spotifygen:/oauth',
            scopes: [
                'ugc-image-upload',
                'user-read-playback-state',
                'user-modify-playback-state',
                'user-read-currently-playing',
                'streaming',
                'app-remote-control',
                'user-read-email',
                'user-read-private',
                'playlist-read-collaborative',
                'playlist-modify-public',
                'playlist-read-private',
                'playlist-modify-private',
                'user-library-modify',
                'user-library-read',
                'user-top-read',
                'user-read-playback-position',
                'user-read-recently-played',
                'user-follow-read',
                'user-follow-modify',
            ],
            serviceConfiguration: {
                authorizationEndpoint: 'https://accounts.spotify.com/authorize',
                tokenEndpoint: 'https://accounts.spotify.com/api/token',
            },
        };
    }

    async onLogin() {
        try {
            const result: any = await authorize(this.spotifyAuthConfig);
            let endpoint = `http://localhost:4000/spotify/getMe`
            let options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'access_token': result.accessToken,
                }
            }
            let response = await fetch(endpoint, options)
            const user = await response.json();
            result.userID = user.body.id;
            console.log(JSON.stringify(result))
            return result;
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    }

    async refreshLogin(refreshToken: any) {
        try {
            const result = await refresh(this.spotifyAuthConfig, {
                refreshToken: refreshToken,
            });
            return result
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    }

}

const authHandler = new AuthenticationHandler();

export default authHandler;