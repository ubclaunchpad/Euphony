from pandas.core.arrays.sparse import dtype
import numpy as np
import pandas as pd

data_path = "data/rainy_workout.csv"
save_path = "processed_data/rainy_workout.csv"

ACTIVITY_ENUM = ["CHILL", "STUDY", "PARTY", "WORK_OUT", "BED"]

# clouds pop temp audio_features

def calculate_means_and_stdevs(arr):
    means = np.mean(arr, axis = 0).tolist()
    stdevs = np.std(arr, axis = 0).tolist()

    means_and_stdevs = []

    for i in range(len(means)):
        means_and_stdevs.append(means[i])
        means_and_stdevs.append(stdevs[i])

    return means_and_stdevs

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
    df = pd.read_csv(data_path)

    # print(calculate_means_and_stdevs(df.iloc[0:5]))

    num_samples, num_features = df.shape

    weather_df = generate_weather_df(num_samples)

    activity_df = generate_actifity_df("WORK_OUT", num_samples)

    df = pd.concat([weather_df, activity_df, df], axis = 1)
    print(df.head())

    df.to_csv(path_or_buf = save_path, index=False)

if __name__ == '__main__':
    main()

# Enums:

# export enum Activity {
#     CHILL,
#     STUDY,
#     PARTY,
#     WORK_OUT,
#     BED
# }

# export enum Mood {
#     HAPPY,
#     MELANCHOLY,
#     COMPASSION,
#     LONLINESS,
#     ANGER
# }