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
            this.data.profileImageURL = user.body.images.length === 0 ? "null_string" : user.body.images[0].url;
            // TODO: update with real playlist names
            this.data.playlists = ["Liked Songs", "On Repeat", "Time Capsule", "Playlist Name 1", "Playlist Name 2"];
            this.data.spotifyRedirect = user.body.external_urls.spotify;
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