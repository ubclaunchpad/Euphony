import os
import json
from flask import Flask, request, jsonify
import numpy as np
import torch
from torch import nn

app = Flask(__name__)

device = "cuda" if torch.cuda.is_available() else "cpu"

# Define model
class NeuralNetwork(nn.Module):
    def __init__(self):
        super(NeuralNetwork, self).__init__()
        self.linear_relu_stack = nn.Sequential(
            nn.Linear(55, 512),
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

def parse_request(req):
    # parse the request here
    n = 55
    res = torch.randn(n)
    return res

@app.route("/recommend_playlist", methods=['POST'])
def get_recommended_playlist():
    req = request.json # pass this data to ML later on :)

    parsed_req = parse_request(req)
    print(f"parsed request: {parsed_req}")
    print(f"tensor shape: {parsed_req.shape}")

    predictions = model(parsed_req)
    print(f"prediction shape: {predictions.shape}")
    predictions = predictions.tolist()
    print(f"predictions: {predictions}")

    # numerical variables
    target_acousticness = predictions[0]
    target_danceability = predictions[1]
    target_energy = predictions[2]
    target_instrumentalness = predictions[3]
    target_liveness = predictions[4]
    target_loudness = predictions[5]
    target_speechiness = predictions[6]
    target_tempo = predictions[7]
    target_valence = predictions[8]

    # categorical variables
    target_key = predictions[9]
    target_mode = predictions[10]
    target_popularity = predictions[11]
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