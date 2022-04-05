import pandas as pd
from data_process import ACTIVITY_ENUM

WEATHER = ["rainy", "sunny", "cloudy"]

def generate_df_list(feature=True):

    df_list = []
    prefix = "feature" if feature else "target"
    for weather in WEATHER:
        df_list += [pd.read_csv(f"processed_data/{prefix}_{weather}_{activity.lower()}.csv") for activity in ACTIVITY_ENUM]

    return df_list


def main():
    feature_save_path = "final_dataset/features.csv"
    target_save_path = "final_dataset/targets.csv"

    feature_df = generate_df_list(feature=True)
    feature_df = pd.concat(feature_df)

    target_df = generate_df_list(feature=False)
    target_df = pd.concat(target_df)

    print(feature_df.shape)
    print(target_df.shape)

    feature_df.to_csv(path_or_buf = feature_save_path, index=False)
    target_df.to_csv(path_or_buf = target_save_path, index=False)

if __name__ == '__main__':
    main()