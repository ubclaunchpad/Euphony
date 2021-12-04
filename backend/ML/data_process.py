from pandas.core.arrays.sparse import dtype
import numpy as np
import pandas as pd

data_path = "data/rainy_workout.csv"
train_save_path = "processed_data/feature_rainy_workout.csv"
test_save_path = "processed_data/target_rainy_workout.csv"

ACTIVITY_ENUM = ["CHILL", "STUDY", "PARTY", "WORK_OUT", "BED"]

TRAIN_MEANS_NAMES = ['mean_acousticness', 'mean_danceability', 'mean_energy', 'mean_instrumentalness',
    'mean_liveness', 'mean_loudness', 'mean_speechiness', 'mean_tempo', 'mean_valence', 'mean_key',
    'mean_mode', 'mean_popularity', 'mean_time_signature']

TRAIN_STDEVS_NAMES = ['stdev_acousticness', 'stdev_danceability', 'stdev_energy', 'stdev_instrumentalness',
    'stdev_liveness', 'stdev_loudness', 'stdev_speechiness', 'stdev_tempo', 'stdev_valence', 'stdev_key',
    'stdev_mode', 'stdev_popularity', 'stdev_time_signature']

TRAIN_COL_NAMES = []

for i in range(len(TRAIN_MEANS_NAMES)):
    TRAIN_COL_NAMES.append(TRAIN_MEANS_NAMES[i])
    TRAIN_COL_NAMES.append(TRAIN_STDEVS_NAMES[i])

# clouds pop temp audio_features

def calculate_means_and_stdevs(arr):
    means = np.mean(arr, axis = 0).tolist()
    stdevs = np.std(arr, axis = 0).tolist()

    means_and_stdevs = []

    for i in range(len(means)):
        means_and_stdevs.append(means[i])
        means_and_stdevs.append(stdevs[i])

    return means_and_stdevs

def generate_train_test_df(df, num_samples):
    
    num_random_tracks = 5

    train_arr = []
    test_arr = []
    # audio_features_arr = df.to_numpy()

    rng = np.random.default_rng(seed = 42)

    for i in range(num_samples):
        # randomly select 5 tracks

        random_tracks_indicies = rng.random(num_random_tracks) * num_samples
        random_tracks_indicies = random_tracks_indicies.astype(int)
        means_and_stdevs = calculate_means_and_stdevs(df.iloc[random_tracks_indicies])

        train_arr.append(means_and_stdevs)

        random_test_indicies = rng.random(1) * num_samples
        random_test_indicies = random_test_indicies.astype(int)
        test_track = df.iloc[random_test_indicies]

        test_arr.append(test_track)
        
    train_df = pd.DataFrame(train_arr, columns=TRAIN_COL_NAMES)
    test_df = pd.concat(test_arr)

    return train_df, test_df

def generate_weather_df(num_samples):
    # clouds: 0 : 1
    # pop = 0 : 1
    # temp: in celcius
    rng = np.random.default_rng(seed = 42)
    clouds_and_pop = rng.random((num_samples, 2)) / 2 + 0.45
    temp = rng.random((num_samples,1)) * 45 - 15
    weather_data = np.concatenate((clouds_and_pop, temp), axis = 1)
    weather_df = pd.DataFrame(weather_data, columns=["clouds", "pop", "temp"])
    return weather_df

def generate_actifity_df(activity: str, num_samples: int):
    
    activity_arr = np.zeros((num_samples, len(ACTIVITY_ENUM)))

    activity_arr[:, ACTIVITY_ENUM.index(activity)] = 1

    activity_df = pd.DataFrame(activity_arr, columns=ACTIVITY_ENUM, dtype=int)

    return activity_df


def main():

    # TODO: Make a separate script for merging all the dfs generated from this script

    df = pd.read_csv(data_path)

    NUM_SAMPLES, num_features = df.shape

    train_df, test_df = generate_train_test_df(df, NUM_SAMPLES)

    weather_df = generate_weather_df(NUM_SAMPLES)

    activity_df = generate_actifity_df("WORK_OUT", NUM_SAMPLES)

    train_df = pd.concat([weather_df, activity_df, train_df], axis = 1)

    train_df.to_csv(path_or_buf = train_save_path, index=False)
    test_df.to_csv(path_or_buf = test_save_path, index=False)

    print(train_df.shape)

if __name__ == '__main__':
    main()