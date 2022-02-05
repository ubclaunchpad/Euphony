import axios from 'axios';
import moment from 'moment';

export interface Album {
    id: string;
    imageUrl: string | null;
    name: string;
    release_date: string;
    spotify_url: string;
}

export interface Artist {
    name: string;
    id: string;
    spotify_url: string;
}

export interface Track {
    id: string;
    imageUrl: string | null;
    name: string;
    artists: Artist[] | null;
    duration: string;
}

export function parseAlbum(spotifyTrackResp: {[key: string]: any }): Album {
    return {
        id: spotifyTrackResp.album.id,
        imageUrl: spotifyTrackResp.album.images.length ? spotifyTrackResp.album.images[0].url : null,
        name: spotifyTrackResp.album.name,
        release_date: spotifyTrackResp.album.release_date,
        spotify_url: spotifyTrackResp.album.external_urls.spotify
    }
}

export function parseTrack(spotifyTrackResp: {[key: string]: any }): Track {
    /**
     * TODO: it's a bit much to use moment.js just to convert ms to mins and seconds format,
     *          might wanna consider using a vanilla approach
     */
    var duration = moment.duration(spotifyTrackResp.duration_ms);
    return {
        id: spotifyTrackResp.id,
        imageUrl: spotifyTrackResp.album.images.length ? spotifyTrackResp.album.images[0].url : null,
        name: spotifyTrackResp.name,
        artists: spotifyTrackResp.artists.map((a: any) => ({ 
            name: a.name,
            id: a.id,
            spotify_url: a.external_urls.spotify

        })),
        duration: `${duration.minutes()}m ${duration.seconds()}s`
    }
}

export async function getSeedArtistIdsFromTopTracks(trackIds: string[], access_token: string, topXArtist: number = 2): Promise<string[]> {
    /**
     * TODOs:
     *  - consolidate spotify API endpoints and call them from somewhere intead of hardcoding it here
     *  - create a function to encapsulate these requests to spotify (removes the axios.gets in every function)
     *      (something like callSpotifyAPI(endpoint: SpotifyEndpoint.tracks, accessToken: string))
     * */ 
	const tracksUrl = `https://api.spotify.com/v1/tracks?ids=${trackIds.join(',')}`;
	const spotifyTracksRes: any = await axios.get(tracksUrl, {
		headers: { Authorization: `Bearer ${access_token}` },
	});

    // Get all artists from every track supplied
	const tracksArtists: any = [];
	spotifyTracksRes.data.tracks.forEach((t: any) => {
		t.artists.forEach((a: any) => {
			tracksArtists.push(a.id);
		});
	});
    // Create an object to count the occurence of each artist
	const tracksArtistsByOccurence: { [key: string]: number} = {};
	tracksArtists.forEach((a: string) => {
		if (!tracksArtistsByOccurence[a]) {
			tracksArtistsByOccurence[a] = 1;
		} else {
			tracksArtistsByOccurence[a] = tracksArtistsByOccurence[a] + 1;
		}
	});
    // Sort artists by occurence in the trackIds array
	const sortedArtistIds = Object.keys(tracksArtistsByOccurence).sort((a, b) => 
		tracksArtistsByOccurence[b] - tracksArtistsByOccurence[a]
	);
    // Return the top x (defaults to x=2) artit by occurence
    return sortedArtistIds.slice(0, topXArtist);
}