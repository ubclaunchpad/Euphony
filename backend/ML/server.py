import os
import json
from flask import Flask, request, jsonify
import numpy as np
import statistics
import torch
from torch import nn

app = Flask(__name__)

device = "cuda" if torch.cuda.is_available() else "cpu"

# Define model
class NeuralNetwork(nn.Module):
    def __init__(self):
        super(NeuralNetwork, self).__init__()
        self.linear_relu_stack = nn.Sequential(
            nn.Linear(32, 512),
            nn.ReLU(),
            nn.Linear(512, 512),
            nn.ReLU(),
            nn.Linear(512, 13) # 4 categorical
        )

    def forward(self, x):
        logits = self.linear_relu_stack(x)
        return logits

model = NeuralNetwork().to(device)

@app.route("/")
def initialize_server():
    json_res = {
        "message": "YEET"
    }
    return json_res

def parse_audio_features(audio_features):

    mean_arr = []
    stdev_arr = []
    
    acousticness_arr = []
    danceability_arr = []
    energy_arr = []
    instrumentalness_arr = []
    liveness_arr = []
    loudness_arr = []
    speechiness_arr = []
    tempo_arr = []
    valence_arr = []

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

    mean_arr.append(statistics.mean(acousticness_arr))
    stdev_arr.append(statistics.stdev(acousticness_arr))

    mean_arr.append(statistics.mean(danceability_arr))
    stdev_arr.append(statistics.stdev(danceability_arr))

    mean_arr.append(statistics.mean(energy_arr))
    stdev_arr.append(statistics.stdev(energy_arr))

    mean_arr.append(statistics.mean(instrumentalness_arr))
    stdev_arr.append(statistics.stdev(instrumentalness_arr))

    mean_arr.append(statistics.mean(liveness_arr))
    stdev_arr.append(statistics.stdev(liveness_arr))

    mean_arr.append(statistics.mean(loudness_arr))
    stdev_arr.append(statistics.stdev(loudness_arr))

    mean_arr.append(statistics.mean(speechiness_arr))
    stdev_arr.append(statistics.stdev(speechiness_arr))

    mean_arr.append(statistics.mean(tempo_arr))
    stdev_arr.append(statistics.stdev(tempo_arr))

    mean_arr.append(statistics.mean(valence_arr))
    stdev_arr.append(statistics.stdev(valence_arr))

    feature_arr = []

    for i in range(len(mean_arr)):
        feature_arr.append(mean_arr[i])
        feature_arr.append(stdev_arr[i])

    return feature_arr



def parse_request(req):

    location = req['location']
    clouds = req['clouds']
    pop = req['pop']
    temp = req['temp']

    mood = [0,0,0,0,0]
    mood[req['mood']] = 1

    activity = [0,0,0,0,0]
    activity[req['activity']] = 1
    
    audio_features = req['audio_features']

    parsed_audio_features = parse_audio_features(audio_features)

    feature_arr = [location, clouds, pop, temp]

    feature_arr = feature_arr + mood + activity + parsed_audio_features

    print(feature_arr)
    print(len(feature_arr))

    res = torch.FloatTensor(feature_arr)
    return res

def constrain_0_1(num):
    if num < 0: num = 0
    elif num > 1: num = 1
    return num

def constrain_0_11(num):
    if num < 0: num = 0
    elif num > 11: num = 11
    return num

def constrain_0_100(num):
    if num < 0: num = 0
    elif num > 100: num = 100
    return num

@app.route("/recommend_playlist", methods=['POST'])
def get_recommended_playlist():
    req = request.json # pass this data to ML later on :)

    parsed_req = parse_request(req)
    # print(f"parsed request: {parsed_req}")
    # print(f"tensor shape: {parsed_req.shape}")

    predictions = model(parsed_req)
    # print(f"prediction shape: {predictions.shape}")
    predictions = predictions.tolist()
    # print(f"predictions: {predictions}")

    # numerical variables
    target_acousticness = constrain_0_1 (predictions[0])
    target_danceability = constrain_0_1 (predictions[1])
    target_energy = constrain_0_1 (predictions[2])
    target_instrumentalness = constrain_0_1 (predictions[3])
    target_liveness = constrain_0_1 (predictions[4])
    target_loudness = predictions[5]
    target_speechiness = constrain_0_1 (predictions[6])
    target_tempo = predictions[7]
    target_valence = constrain_0_1 (predictions[8])

    # categorical variables
    target_key = constrain_0_11 (predictions[9])
    target_mode = constrain_0_1 (predictions[10])
    target_popularity = constrain_0_100 (predictions[11])
    target_time_signature =  predictions[12]

    json_res = {
        # numerical variables
        'target_acousticness': target_acousticness,
        'target_danceability': target_danceability,
        'target_energy': target_energy,
        'target_instrumentalness': target_instrumentalness,
        'target_liveness': target_liveness,
        'target_loudness': target_loudness,
        'target_speechiness': target_speechiness,
        'target_tempo': target_tempo,
        'target_valence': target_valence,

        # categorical variables
        'target_key': int(target_key),
        'target_mode': int(target_mode),
        'target_popularity': int(target_popularity),
        'target_time_signature':  int(target_time_signature),
    }

    return jsonify(json_res)


def main():
    print("YEET")

main()