const profileEndpoint = "http://localhost:4000/spotify/getMe"
const defaultProfileImage = require('../screens/images/profile.png');
const defaultPlaylists = ["Liked Songs", "On Repeat", "Time Capsule", "Playlist Name 1", "Playlist Name 2"];
const defaultSpotifyURL = "https://www.spotify.com";

type dataType = {
    name: string;
    profileImageURL: string;
    playlists: string[];
    spotifyRedirect: string;
}

class UserInfo {
    data: dataType;
    access_token: string;
    
    constructor(access_token: string) {
        // initialize empty before updating data
        this.access_token = access_token;
        this.data = {
            name: "",
            profileImageURL: "",
            playlists: [],
            spotifyRedirect: "",
        }
        this.updateData()
    }

    async updateData():Promise<any> {
        const REQUEST_OPTIONS = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'access_token': this.access_token,
              // 'refresh_token': refreshToken,
            }
        };
        await fetch(profileEndpoint, REQUEST_OPTIONS)
            .then(response => response.json())
            .then(results => {
                this.data.name = results.body.display_name == false ? results.body.id : results.body.display_name;
                // if the user does NOT have an image on Spotify, use the default. otherwise, grab the Spotify pfp
                this.data.profileImageURL = results.body.images.length == 0 ? "null_string" : results.body.images[0].url;
                // TODO: update with real playlist names
                this.data.playlists = ["Liked Songs", "On Repeat", "Time Capsule", "Playlist Name 1", "Playlist Name 2"];
                this.data.spotifyRedirect = results.body.external_urls.spotify;
            })
            .catch(err => {
                console.error(err);
            });
        
        return this;
        
    }

    getName(): string {
        if (this.checkAccessTokenValid()) {
            return this.data.name;
        }
        return "User Not Logged In";
    }

    static getName(): string {
        return "User Not Logged In";
    }

    getProfileImage(): object {
        if (this.checkAccessTokenValid()) {
            return {uri: this.data.profileImageURL};
        }
        return defaultProfileImage;
    }

    static getProfileImage(): object {
        return defaultProfileImage;
    }

    getPlaylists(): string[] {
        if (this.checkAccessTokenValid()) {
            return this.data.playlists;
        }
        return defaultPlaylists;
    }

    static getPlaylists(): string[] {
        return defaultPlaylists;
    }

    getSpotifyURL(): string {
        if (this.checkAccessTokenValid()) {
            return this.data.spotifyRedirect;
        }
        return defaultSpotifyURL;
    }

    static getSpotifyURL(): string {
        return defaultSpotifyURL;
    }

    checkAccessTokenValid(): boolean {
        if (this.access_token) return true;
        return false;
    }
}

export default UserInfo;
export type { dataType };