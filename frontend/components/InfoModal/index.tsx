import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Album} from '../../types';
import styles from './styles';

import IonIcons from 'react-native-vector-icons/Ionicons';

import Svg, {
  Circle,
  Ellipse,
} from 'react-native-svg';

export type AlbumHeaderProps = {
  album: Album;
};

const mood = ['Happy', 'Melancholic', 'Compassion', 'Loneliness', 'Anger'];
const activity = ['Workout', 'Study', 'Relax', 'Party', 'Chill', 'Bedtime'];

const PlaylistSettings = (props) => {
  const {info, toggle, handleClose} = props;

  // THIS IS A VERY POOR IMPLEMENTATION OF THE FILTER OPTIONS SCREEN
  // but it will be refactored after finals :)
  return (
    <View style={styles.container}>
      <View style={{position: 'absolute'}}>
          <Svg height="600" width="400">
              <Circle cx="380" cy="250" r="70" fill="transparent" stroke="hsla(252, 100%, 66%, 0.05)" strokeWidth="70" />
          </Svg>
      </View>
      <View style={{position: 'absolute'}}>
          <Svg height="600" width="400">
            <Circle cx="10" cy="500" r="100" fill="transparent" stroke="hsla(252, 100%, 66%, 0.05)" strokeWidth="120" />
          </Svg>
      </View>
      <View style={{position: 'absolute'}}>
          <Svg height="600" width="400">
            <Circle cx="-10" cy="100" r="100" fill="transparent" stroke="hsla(252, 100%, 66%, 0.05)" strokeWidth="60" />
          </Svg>
      </View>
      <View style={{position: 'absolute'}}>
        <Svg height="600" width="400">
              <Circle cx="-10" cy="100" r="50" fill="hsla(252, 100%, 66%, 0.05)"/>
          </Svg>
      </View>
      <View style={styles.header}>
        <Text style={styles.name}>My Playlist Filters</Text>
        <Text style={styles.p}>Please go back to the Filters page to modify the selected filters.</Text>
      </View>
      <View style={styles.divider}>
          <View style={styles.line} />
      </View>
      <View style={styles.row}>
        <Text style={styles.leftText}>🎵  Genre</Text>
        <Text style={styles.rightText}>Pop</Text>
      </View>
      <View style={styles.divider}>
          <View style={styles.line} />
      </View>
      <View style={styles.row}>
        <Text style={styles.leftText}>😌  Mood</Text>
        <Text style={styles.rightText}>{info.mood? mood[info.mood]:"N/A" }</Text>
      </View>
      <View style={styles.divider}>
          <View style={styles.line} />
      </View>
      <View style={styles.row}>
        <Text style={styles.leftText}>🎧  Activity</Text>
        <Text style={styles.rightText}>{info.activity? mood[info.activity]:"N/A" }</Text>
      </View>
      <View style={styles.divider}>
          <View style={styles.line} />
      </View>
      <View style={styles.row}>
        <Text style={styles.leftText}>✈  Location</Text>
        <Text style={styles.rightText}>Canada</Text>
      </View>
      <View style={styles.divider}>
          <View style={styles.line} />
      </View>
      <View style={styles.row}>
        <Text style={styles.leftText}>🌦  Weather</Text>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={styles.rightText}>Cloudy (3°)</Text>
          <Text style={styles.leftText}>(Current Weather)</Text>
        </View>
      </View>
    </View>
  );
};

export default PlaylistSettings;
