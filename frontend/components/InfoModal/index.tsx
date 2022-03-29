import React from 'react';
import { Text, View } from 'react-native';
import { Album } from '../../types';
import styles from './styles';


import Svg, {
  Circle,
} from 'react-native-svg';
import { FilterWeatherInfo } from '../../screens/FilterScreen';

export type AlbumHeaderProps = {
  weatherInfo?: FilterWeatherInfo
  album: Album;
};

const mood = ['Happy', 'Melancholic', 'Lonely', 'Angry', 'Compassionate'];
const activity = ['Shower', 'Gym', 'Study', 'Party', 'Bed'];
const genres = ['Pop', 'R&B', 'Indie', 'Hip-Hop'];

const PlaylistSettings = (props: AlbumHeaderProps) => {
  const { info, toggle, handleClose, title, weatherInfo } = props;
  console.log(info)
  let addedGenres: String[] = [];
  for (let i = 0; i < genres.length; i++) {
    if ((info['genres'] & (1 << i)) != 0) {
      addedGenres.push(genres[i]);
    }
  }
  let genresString = addedGenres.join(', ').replace(/, ([^,]*)$/, ' and $1')

  let weatherFilterView;



  if (weatherInfo) {
    weatherFilterView = <>
      <View style={styles.divider}>
        <View style={styles.line} />
      </View>
      <View style={styles.row}>
        <Text style={styles.leftText}>✈  Location</Text>
        <Text style={styles.rightText}>{weatherInfo.locationName}</Text>
      </View>
      <View style={styles.divider}>
        <View style={styles.line} />
      </View>
      <View style={styles.row}>
        <Text style={styles.leftText}>🌦  Weather</Text>
        <Text style={styles.rightText}>{weatherInfo.weatherString}</Text>
      </View>
    </>
  }
  // THIS IS A VERY POOR IMPLEMENTATION OF THE FILTER OPTIONS SCREEN
  // but it will be refactored after finals :)
  return (
    <View style={styles.container}>
      <View style={{ position: 'absolute' }}>
        <Svg height="600" width="400">
          <Circle cx="380" cy="250" r="70" fill="transparent" stroke="hsla(252, 100%, 66%, 0.05)" strokeWidth="70" />
        </Svg>
      </View>
      <View style={{ position: 'absolute' }}>
        <Svg height="600" width="400">
          <Circle cx="10" cy="500" r="100" fill="transparent" stroke="hsla(252, 100%, 66%, 0.05)" strokeWidth="120" />
        </Svg>
      </View>
      <View style={{ position: 'absolute' }}>
        <Svg height="600" width="400">
          <Circle cx="-10" cy="100" r="100" fill="transparent" stroke="hsla(252, 100%, 66%, 0.05)" strokeWidth="60" />
        </Svg>
      </View>
      <View style={{ position: 'absolute' }}>
        <Svg height="600" width="400">
          <Circle cx="-10" cy="100" r="50" fill="hsla(252, 100%, 66%, 0.05)" />
        </Svg>
      </View>
      <View style={styles.header}>
        <Text style={styles.name}>{title} Filters</Text>
        <Text style={{ ...styles.p, marginTop: 8 }}>Please go back to the Filters page to modify the selected filters.</Text>
      </View>
      <View style={styles.divider}>
        <View style={styles.line} />
      </View>
      <View style={styles.row}>
        <Text style={styles.leftText}>🎵  Genre</Text>
        <Text style={styles.rightText}>{genresString}</Text>
      </View>
      <View style={styles.divider}>
        <View style={styles.line} />
      </View>
      <View style={styles.row}>
        <Text style={styles.leftText}>😌  Mood</Text>
        <Text style={styles.rightText}>{info['mood'] >= 0 ? mood[info['mood']] : "N/A"}</Text>
      </View>
      <View style={styles.divider}>
        <View style={styles.line} />
      </View>
      <View style={styles.row}>
        <Text style={styles.leftText}>🎧  Activity</Text>
        <Text style={styles.rightText}>{info['activity'] >= 0 ? activity[info['activity']] : "N/A"}</Text>
      </View>
      {weatherFilterView}
    </View>
  );
};

export default PlaylistSettings;
