import os
import json
from flask import Flask, request

app = Flask(__name__)


@app.route("/")
def initialize_server():
    json_res = {
        "message": "YEET"
    }
    return json_res

@app.route("/recommend_playlist", methods=['POST'])
def get_recommended_playlist():
    req = request.json # pass this data to ML later on :)

    json_res = {
        "message": "YEET"
    }
    return json_res


def main():
    print("YEET")

main()