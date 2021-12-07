import requests
import numpy as np
import pandas as pd

# Generate an access token using Node Server
access_token = "BQA2muCo1VKOmYUgCtDZoHDXeMgP8C7kh6f_tuIc_8P3-pBw-nI4xWLy2OezXvab-a7iSQxInXYbPf66bH7Cu7dW5fCz9cMUNp28n8M1s7VbDkXsVfN4wu-oNkwzmLoUIPBmOV2z2FkL-Er8opud9wvVVeLMPD9bhzuZOlXzljV--x61lRJPJQ9cld6OzWqJs_ZbMzvmFudNl86Q4uPyRpKpiAk6qF-IYsmLic0tEWPCRtpIF7Sd3h2CaJ3lK6mVJUN0xmUhn34B-t7yxcn1QwQb7NvNIWtRwSfjfUPi1VtdXOXbwjIa"

# sunny workout:
playlist_ids = [] # TODO: add the playlist ids to this list, see the commented playlist_ids list below :)

# rainy workout:
# playlist_ids = ["2zca0t4juMRKiAVQ9IGGK0", "1N70n72oCbu6H2hVWQVRSx", "3klQTAOE6j3Bw4H4hydsqj","3zjSPnkn0Z0J1nCOBZbkLm", "12va3pHH4SrAKBnyU98UaB", "0lkwbLqx4ILh7tZwjQTCfA"]

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

        track_id = response['items'][index]['track']['id'] # id of track at index 
        is_track = response['items'][index]['track']['track'] # boolean, true if it's a track
        popularity = response['items'][index]['track']['popularity']

        track_ids.append(track_id)
        popularities.append(popularity)


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

    df.to_csv(path_or_buf = "data/sunny_workout.csv",index=False) # TODO: change the name of the save path. You might need to make an empty folder called data first.

if __name__ == '__main__':
    main()