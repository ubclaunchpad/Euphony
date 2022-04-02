import pandas as pd
import numpy as np

MOOD_ENUM = [
	"HAPPY",
	"MELANCHOLY",
	"COMPASSION",
	"LONELINESS",
	"ANGER",
]

load_dir = "/home/h/hl2001/spotify-gen/backend/ML/mood_data"

def make_targets():
    
    feature_df = []
    target_df = []

    for index, mood in enumerate(MOOD_ENUM):
        
        print(f"working on mood {mood}")
        
        load_path = load_dir + f"/{mood.lower()}_playlist.csv"
        df = pd.read_csv(load_path)
        
        num_rows = df.shape[0]
        print(f"df shape: {df.shape}")
        
        targets = np.zeros((num_rows, len(MOOD_ENUM)))
        targets[:, index] = 1
        targets = pd.DataFrame(targets, columns=MOOD_ENUM)

        save_path = load_dir + f"/{mood.lower()}_targets.csv"
        targets.to_csv(path_or_buf = save_path, index=False)

        feature_df.append(df)
        target_df.append(targets)

    feature_df = pd.concat(feature_df, axis=0)
    feature_df.reset_index(drop=True, inplace=True)
    print(f"final feature df shape: {feature_df.shape}")
    feature_save_path = load_dir + "/mood_features.csv"
    feature_df.to_csv(path_or_buf=feature_save_path, index=False)

    target_df = pd.concat(target_df, axis=0)
    target_df.reset_index(drop=True, inplace=True)
    print(f"final target df shape: {target_df.shape}")
    target_save_path = load_dir + "/mood_targets.csv"
    target_df.to_csv(path_or_buf=target_save_path, index=False)

if __name__ == "__main__":
    make_targets()    
