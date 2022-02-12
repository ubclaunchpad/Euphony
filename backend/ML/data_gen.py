import requests
import numpy as np
import pandas as pd

# Generate an access token using Node Server
access_token = "BQBWljKN6EPt16w1IQKQFSOHE_GUTG2SH8PqpJPZWIJCxCtc40_7jAXV9v0NoWyy6a78j3PdfxfulZPh8-49fRVaXf6w0leOkXS13InEAtz3Fzmr-qH06ZDy3tStKGiThzMZ-G7wLva2jSVsCGbmcrsKaqRE4WPBLeUJ_g6sQI1Gim-ocugiOtTJQNw1L8ksq6WGBib51l-Siw7jb5GKAcS-ZMW2s8vTVd2alJ0kOnohaP5fywnna0UEtWm-z7otF6GEcYs_F9fLxos4V7Ojc8IEtGnuHy-GhdI6bqkrQm17iqLCoQNp"

# sunny workout:
playlist_ids = [] # TODO: add the playlist ids to this list, see the commented playlist_ids list below :) aim for ~200 tracks after saving
# playlist_ids = ["6Pq4KKsCzmrdeSbzjaMaya", "6e93DXjExFD8n4RnTV5dDy", "51R6DzUWrnVKXtcuCTqYSB", "78iG5en085n5FeXGAxxjb2", "3Htufw4S2po19T6DguyEam"]

headers = {"Accept": "application/json", "Content-Type": "application/json", "Authorization": f"Bearer {access_token}"}

get_tracks_audio_features_url = f"https://api.spotify.com/v1/audio-features"

track_ids = []
popularities = []
features_arr = []

def get_track_ids_and_popularity(get_playlist_items_url):

    response = requests.get(get_playlist_items_url, headers=headers)
    response = response.json()
    
    global track_ids
    global popularities
    global features_arr
    # print(response)

    for index in range(len(response['items'])):

        try:
            track_id = response['items'][index]['track']['id'] # id of track at index 
            is_track = response['items'][index]['track']['track'] # boolean, true if it's a track
            popularity = response['items'][index]['track']['popularity']

            track_ids.append(track_id)
            popularities.append(popularity)
        except:
            pass


def generate_df_dictionary(audio_features):

    acousticness_arr = []
    danceability_arr = []
    energy_arr = []
    instrumentalness_arr = []
    liveness_arr = []
    loudness_arr = []
    speechiness_arr = []
    tempo_arr = []
    valence_arr = []

    key_arr = []
    mode_arr = []
    popularity_arr = []
    time_signature_arr = []


    for audio_feature in audio_features:
        acousticness_arr.append(audio_feature['acousticness'])
        danceability_arr.append(audio_feature['danceability'])
        energy_arr.append(audio_feature['energy'])
        instrumentalness_arr.append(audio_feature['instrumentalness'])
        liveness_arr.append(audio_feature['liveness'])
        loudness_arr.append(audio_feature['loudness'])
        speechiness_arr.append(audio_feature['speechiness'])
        tempo_arr.append(audio_feature['tempo'])
        valence_arr.append(audio_feature['valence'])

        key_arr.append(audio_feature['key'])
        mode_arr.append(audio_feature['mode'])
        popularity_arr.append(audio_feature['popularity'])
        time_signature_arr.append(audio_feature['time_signature'])

    df_dict = {
        # numerical variables
        'acousticness': acousticness_arr,
        'danceability': danceability_arr,
        'energy': energy_arr,
        'instrumentalness': instrumentalness_arr,
        'liveness': liveness_arr,
        'loudness': loudness_arr,
        'speechiness': speechiness_arr,
        'tempo': tempo_arr,
        'valence': valence_arr,

        # categorical variables
        'key': key_arr,
        'mode': mode_arr,
        'popularity': popularity_arr,
        'time_signature':  time_signature_arr,
    }

    return df_dict

def main():

    global track_ids
    global popularities
    global features_arr

    for playlist_id in playlist_ids:
        
        get_playlist_items_url = f"https://api.spotify.com/v1/playlists/{playlist_id}/tracks"

        get_track_ids_and_popularity(get_playlist_items_url)

    print(f"length of track ids: {len(track_ids)}")

    while len(track_ids) > 50:

        temp_ids = track_ids[:50]
        track_ids = track_ids[50:]

        temp_popularities = popularities[:50]
        popularities = popularities[50:]

        params = {
            "ids": ",".join(temp_ids)
        }
        
        track_audio_features = requests.get(get_tracks_audio_features_url, headers=headers, params=params)
        track_audio_features = track_audio_features.json()

        for i,audio_feature in enumerate(track_audio_features['audio_features']):
            audio_feature['popularity'] = temp_popularities[i]

        features_arr = features_arr + track_audio_features['audio_features']

    params = {
            "ids": ",".join(track_ids)
        }
        
    track_audio_features = requests.get(get_tracks_audio_features_url, headers=headers, params=params)
    track_audio_features = track_audio_features.json()

    for i,audio_feature in enumerate(track_audio_features['audio_features']):
        audio_feature['popularity'] = popularities[i]

    features_arr = features_arr + track_audio_features['audio_features']

    print(f"length of features_arr: {len(features_arr)}")

    df_dict = generate_df_dictionary(features_arr)

    df = pd.DataFrame(data = df_dict)

    df.to_csv(path_or_buf = "data/weather_activity.csv",index=False) # TODO: change the name of the save path. You might need to make an empty folder called data first.

if __name__ == '__main__':
    main()