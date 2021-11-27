import React, {useState} from 'react';
import {Text, View, Image, TouchableOpacity, Dimensions} from 'react-native';
import {Album} from '../../types';
import styles from './styles';

import IonIcons from 'react-native-vector-icons/Ionicons';

export type AlbumHeaderProps = {
  album: Album;
};

const width = Dimensions.get('window').width;

const PlaylistSettings = (props: AlbumHeaderProps) => {
  const {album} = props;

  {
    /* TODO: make page dynamic for varying dimensions*/
  }

  return (
    <View style={styles.container}>
      <Image source={{uri: album.imageUri}} style={styles.image} />
      <Text style={styles.name}>{album.name}</Text>

      <View style={styles.divider}>
        <View style={styles.line} />
      </View>

      <View style={{width: width * 0.8}}>
        <View style={styles.properties}>
          <Text style={styles.h2}>Filter Info</Text>
        </View>
        {/* TODO: could make scroll list*/}
        <View style={styles.properties}>
          <Text style={styles.h3}>Mood</Text>
          <View style={styles.description}>
            <IonIcons
              name="happy"
              size={25}
              color={'green'}
              style={styles.icon}
            />
            <Text style={styles.h4}>Happy</Text>
          </View>
        </View>
        <View style={styles.properties}>
          <Text style={styles.h3}>Activity</Text>
          <View style={styles.description}>
            <IonIcons
              name="book"
              size={25}
              color={'brown'}
              style={styles.icon}
            />
            <Text style={styles.h4}>Study</Text>
          </View>
        </View>
        <View style={styles.properties}>
          <Text style={styles.h3}>Location</Text>
          <View style={styles.description}>
            <IonIcons
              name="location-sharp"
              size={25}
              color={'orange'}
              style={styles.icon}
            />
            <Text style={styles.h4}>Canada</Text>
          </View>
        </View>
        <View style={styles.properties}>
          <Text style={styles.h3}>Weather</Text>
          <View style={styles.description}>
            <IonIcons
              name="rainy"
              size={25}
              color={'blue'}
              style={styles.icon}
            />
            <View>
                <Text style={styles.h4}>Rain</Text>
                <Text style={styles.h4}>Currently 9° | Feels like 7°</Text>
            </View>
            
          </View>
        </View>
      </View>
    </View>
  );
};

export default PlaylistSettings;
