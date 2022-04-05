from model import get_placeholder_mood_model
import pandas as pd
import numpy as np
import torch

MOOD_ENUM = [ # From mood_process.py
	"HAPPY",
	"MELANCHOLY",
	"COMPASSION",
	"LONELINESS",
	"ANGER",
]

mood_model_weights_path = ""
feature_df_load_path = "final_dataset/features.csv"
target_df_load_path = "final_dataset/targets.csv"
feature_df_save_path = "mood_data/features_with_mood_test_gen.csv"

# TODO: instantiate class, load model weights
def load_mood_model():
    return get_placeholder_mood_model()

def classify_targets(model, target_df):
    targets = torch.FloatTensor(target_df.to_numpy())
    track_moods = model(targets).detach().numpy()
    index_of_mood = np.argmax(track_moods, axis = 1)
    print(index_of_mood)
    print(np.shape(index_of_mood))
    mood_indicies = np.zeros(track_moods.shape, dtype=int)
    mood_indicies[np.arange(len(mood_indicies)),index_of_mood] = 1
    print(mood_indicies[5,:])
    print(np.shape(mood_indicies))
    track_moods = pd.DataFrame(mood_indicies, columns=MOOD_ENUM)
    return track_moods

def append_moods_to_features(track_moods, track_features_df):
    track_features_df = pd.concat([track_features_df, track_moods], axis=1)
    return track_features_df

def add_mood_to_data():
    model = load_mood_model()
    feature_data = pd.read_csv(feature_df_load_path)
    target_df = pd.read_csv(target_df_load_path)
    track_moods_df = classify_targets(model, target_df)
    feature_data_with_mood = append_moods_to_features(track_moods_df, feature_data)
    feature_data_with_mood.reset_index(drop=True, inplace=True)
    feature_data_with_mood.to_csv(path_or_buf=feature_df_save_path, index=False)

if __name__ == "__main__":
    add_mood_to_data()