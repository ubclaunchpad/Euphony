import { GlobalContent } from "../AppContext";
import Endpoints from "./Endpoints";

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

    constructor(access_token: string, context: GlobalContent) {
        // initialize empty before updating data
        this.access_token = access_token;
        this.data = {
            name: "",
            profileImageURL: "",
            playlists: [],
            spotifyRedirect: "",
        }
        this.updateData(context)
            .catch(e => {
                console.warn(e)
            })

    }

    async updateData(context: GlobalContent) {
        try {
            let user = await Endpoints.getMe(context);
            this.data.name = user.body.display_name == false ? user.body.id : user.body.display_name;
            // if the user does NOT have an image on Spotify, use the default. otherwise, grab the Spotify pfp
            this.data.profileImageURL = user.body.images.length === 0 ? null : user.body.images[0].url;
            this.data.playlists = ["Liked Songs", "On Repeat", "Time Capsule", "Playlist Name 1", "Playlist Name 2"];
            this.data.spotifyRedirect = user.body.external_urls.spotify;

            await Endpoints.getEuphonyPlaylistsByUser(context)
                .then(results => {
                    // TODO: update to the new profile screen
                    // console.log(results.body)
                    // this.data.playlists = results.body.map(playlist => playlist.name);
                    this.data.playlists = results.body;
                })
                .catch(err => {
                    this.data.playlists = [];
                    console.warn(err.message);
                });

                
        } catch (error) {
            console.warn(error)
            throw new Error("Could not update user data");
        }
        return this
    }

    async removeData() {
        this.data.name = "User Not Logged In";
        this.data.profileImageURL = "null_string";
        this.data.playlists = defaultPlaylists;
        this.data.spotifyRedirect = defaultSpotifyURL;
        this.access_token = "";
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
            if (this.data.profileImageURL == null) {
                return defaultProfileImage;
            }
            return { uri: this.data.profileImageURL };
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