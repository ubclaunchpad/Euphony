import React, { useState, useRef } from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
} from 'react-native';
import { Album } from '../../types';
import styles from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

import { Shadow } from 'react-native-shadow-2';

import FastImage from 'react-native-fast-image';

import filter from 'lodash.filter';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

export type AlbumHeaderProps = {
  isLoading: boolean
  album: Album;
};

import moment from 'moment';
import "moment-duration-format";

const AlbumHeader = (props: AlbumHeaderProps) => {

  const { album, isLoading } = props;

  const [toggle, setToggle] = useState(false);

  const toggleSwitch = () => {
    ReactNativeHapticFeedback.trigger("soft");
    props.setIsPrivatePlaylist(previousState => !previousState);
  }

  const [title, setTitle] = useState(props.name ? props.name : "My Playlist");

  const [textLength, setTextLength] = React.useState(MAX_LENGTH);
  const [isEditing, setIsEditing] = useState(false);
  const toggleEditing = () => {
    setIsEditing(previousState => !previousState);
    setTextLength(MAX_LENGTH - title.length);
    props.setName(title);
  }

  const focusTitleInput = useRef(null);
  const focusFindInput = useRef(null);

  const addToSpotify = () => {
    props.updateSaved();
    ReactNativeHapticFeedback.trigger("impactLight");
  }

  let duration = moment.duration(props.album.reduce((a, b) => a + b.duration, 0), "milliseconds").format("d[d] h[h] m[m] s[s]", {
    largest: 2
  });

  const MAX_LENGTH = 100;

  // functions for find in playlist 
  const [query, setQuery] = useState(props.query);

  const handleSearch = () => {
    console.log(query);
    const formattedQuery = query.toLowerCase();
    const filteredData = filter(props.album, song => {
      return contains(song, formattedQuery);
    });
    props.setSearchData(filteredData);
    props.setQuery(query);
  };

  const contains = ({ name, artists }, query) => {
    if (name.toLowerCase().includes(query) || artists[0].name.toLowerCase().includes(query)) {
      return true
    }
    return false
  }

  let loadingView;

  if (isLoading) {
    loadingView = <ActivityIndicator size='small' color='white' style={{ marginLeft: 12 }}></ActivityIndicator>
  }

  return (
    <View>
      <View style={styles.container}>
        {/* cover image */}
        <View style={styles.center}>
          <Shadow distance={10} containerViewStyle={{ marginVertical: 10 }} startColor={'hsla(252,56.5%,24.3%, 0.1)'} radius={3}>
            {props.album.length >= 4 ?
              <View style={styles.image}>
                <View style={{ flexDirection: 'row' }}>
                  <FastImage source={{ uri: props.album[0].imageUrl }} style={styles.miniImage} />
                  <FastImage source={{ uri: props.album[1].imageUrl }} style={styles.miniImage} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <FastImage source={{ uri: props.album[2].imageUrl }} style={styles.miniImage} />
                  <FastImage source={{ uri: props.album[3].imageUrl }} style={styles.miniImage} />
                </View>
              </View> : <View style={styles.image}>
                <FastImage source={{ uri: props.album[0].imageUrl }} style={styles.largeImage} />
              </View>}

          </Shadow>
        </View>

        {/* Header text */}

        <View style={styles.title}>
          <TouchableOpacity style={[styles.title]} onPress={() => { focusTitleInput.current.focus() }}>
            <View style={styles.leftContainer}>
              <TextInput
                autoCorrect={false}
                onChangeText={t => { setTextLength(MAX_LENGTH - t.length); setTitle(t) }}
                onFocus={toggleEditing}
                onEndEditing={toggleEditing}
                defaultValue={title}
                style={[styles.name]}
                maxLength={MAX_LENGTH}
                returnKeyType='done'
                ref={focusTitleInput}
              />
            </View>

            <View style={styles.rightContainer}>
              {isEditing ?
                <Text style={styles.counter}>{textLength}</Text> :
                <MaterialIcons
                  name="mode-edit"
                  size={25}
                  color={'#3700AB'}
                  style={styles.edit}
                />
              }
            </View>
          </TouchableOpacity>


        </View>
        <View style={styles.divider}>
          {isEditing ? <View style={styles.line} /> : <View style={styles.lineOff} />}
        </View>

        {/* public or private toggle*/}
        <View style={styles.headerInfo}>
          <View style={styles.headerText}>
            {/* Name */}
            <View>
              <View style={styles.creatorContainer}>
                {/* TODO: need to rename style names*/}
                {props.album.length == 1 ?
                  <Text style={styles.middleText}>{props.album.length} song</Text>
                  : <Text style={styles.middleText}>{props.album.length} songs</Text>
                }
                <Entypo
                  name="dot-single"
                  size={25}
                  color={'#867CC0'}
                />
                <Text style={styles.middleText}>{duration}</Text>
              </View>
            </View>
            {/* creator... number of likes */}
            <View style={styles.rightContainer}></View>
          </View>
          <View style={styles.visibility}>
            <View style={styles.leftContainer}>
              <Text style={styles.promptText}>Make playlist private</Text>
            </View>
            <View style={styles.rightContainer}>
              <Switch
                trackColor={{ false: 'white', true: '#7432FF' }}
                thumbColor={props.privatePlaylist ? 'hsl(0, 0%, 95%)' : 'hsl(0, 0%, 95%)'}
                ios_backgroundColor="#C4C4C4"
                onValueChange={toggleSwitch}
                value={props.privatePlaylist}
              />
            </View>
          </View>
        </View>

        {/* play button */}
        <TouchableOpacity onPress={addToSpotify} style={{ flexDirection: 'row', marginTop: 10 }}>
          <Shadow startColor={'hsla(252,56.5%,24.3%, 0.1)'} viewStyle={{ alignSelf: 'stretch' }}>
            <View style={styles.button}>
              <MaterialCommunityIcons name="spotify" size={30} color={'white'} />
              <Text style={styles.buttonText}>ADD TO SPOTIFY</Text>

              {loadingView}
            </View>
          </Shadow>
        </TouchableOpacity>
      </View>

      {/* <TouchableOpacity style={styles.findInPlaylist} onPress={() => { focusFindInput.current.focus() }}>
        <View style={styles.findContents}>
          <Feather name="search" size={25} color={'#3700AB'} />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            value={query}
            onChangeText={text => setQuery(text)}
            onEndEditing={handleSearch}
            placeholder="Find in playlist"
            clearButtonMode="unless-editing"
            returnKeyType='done'
            ref={focusFindInput}
            style={[styles.promptText, styles.gapAfterIcon]} />
        </View>
      </TouchableOpacity> */}
    </View>
  );
};

export default AlbumHeader;
