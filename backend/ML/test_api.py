import requests
import json
import numpy as np

GET_URL = 'http://127.0.0.1:5000/'
POST_URL = 'http://127.0.0.1:5000/recommend_playlist'

def main():
    print("sending get request")
    r = requests.get(GET_URL)
    r = r.json()
    print(f"received response: {r}")

    print("sending post request")
    # request = {
    #     "temp": "temp"
    # }

    request = {
        'location': 1, # categorical variable, binary for now
        'clouds': 0.5,
        'pop': 0.5,
        'temp': 20,
        'mood': 0, # 5 final categories
        'activity': 3, # 5 categories
        "audio_features": [
        {
            "danceability": 0.808,
            "energy": 0.626,
            "key": 7,
            "loudness": -12.733,
            "mode": 1,
            "speechiness": 0.168,
            "acousticness": 0.00187,
            "instrumentalness": 0.159,
            "liveness": 0.376,
            "valence": 0.369,
            "tempo": 123.99,
            "type": "audio_features",
            "id": "4JpKVNYnVcJ8tuMKjAj50A",
            "uri": "spotify:track:4JpKVNYnVcJ8tuMKjAj50A",
            "track_href": "https://api.spotify.com/v1/tracks/4JpKVNYnVcJ8tuMKjAj50A",
            "analysis_url": "http://echonest-analysis.s3.amazonaws.com/TR/WhpYUARk1kNJ_qP0AdKGcDDFKOQTTgsOoINrqyPQjkUnbteuuBiyj_u94iFCSGzdxGiwqQ6d77f4QLL_8=/3/full.json?AWSAccessKeyId=AKIAJRDFEY23UEVW42BQ&Expires=1458063189&Signature=JRE8SDZStpNOdUsPN/PoS49FMtQ%3D",
            "duration_ms": 535223,
            "time_signature": 4,
            "popularity": 50,
        },
        {
            "danceability": 0.457,
            "energy": 0.815,
            "key": 1,
            "loudness": -7.199,
            "mode": 1,
            "speechiness": 0.034,
            "acousticness": 0.102,
            "instrumentalness": 0.0319,
            "liveness": 0.103,
            "valence": 0.382,
            "tempo": 96.083,
            "type": "audio_features",
            "id": "2NRANZE9UCmPAS5XVbXL40",
            "uri": "spotify:track:2NRANZE9UCmPAS5XVbXL40",
            "track_href": "https://api.spotify.com/v1/tracks/2NRANZE9UCmPAS5XVbXL40",
            "analysis_url": "http://echonest-analysis.s3.amazonaws.com/TR/WhuQhwPDhmEg5TO4JjbJu0my-awIhk3eaXkRd1ofoJ7tXogPnMtbxkTyLOeHXu5Jke0FCIt52saKJyfPM=/3/full.json?AWSAccessKeyId=AKIAJRDFEY23UEVW42BQ&Expires=1458063189&Signature=qfclum7FwTaR/7aQbnBNO0daCsM%3D",
            "duration_ms": 187800,
            "time_signature": 4,
            "popularity": 50,
        },
        {
            "danceability": 0.281,
            "energy": 0.402,
            "key": 4,
            "loudness": -17.921,
            "mode": 1,
            "speechiness": 0.0291,
            "acousticness": 0.0734,
            "instrumentalness": 0.83,
            "liveness": 0.0593,
            "valence": 0.0748,
            "tempo": 115.7,
            "type": "audio_features",
            "id": "24JygzOLM0EmRQeGtFcIcG",
            "uri": "spotify:track:24JygzOLM0EmRQeGtFcIcG",
            "track_href": "https://api.spotify.com/v1/tracks/24JygzOLM0EmRQeGtFcIcG",
            "analysis_url": "http://echonest-analysis.s3.amazonaws.com/TR/ehbkMg05Ck-FN7p3lV7vd8TUdBCvM6z5mgDiZRv6iSlw8P_b8GYBZ4PRAlOgTl3e5rS34_l3dZGDeYzH4=/3/full.json?AWSAccessKeyId=AKIAJRDFEY23UEVW42BQ&Expires=1458063189&Signature=bnTm0Hcb%2Bxo8ZCmuxm1mY0JY4Hs%3D",
            "duration_ms": 497493,
            "time_signature": 3,
            "popularity": 50,
        }
    ]}

    r = requests.post(POST_URL, json=request)
    r = r.json()

    print(f"received response: {r}")

if __name__ == '__main__':
    main()