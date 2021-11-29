import React, {useState} from 'react';
import {
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import {Album} from '../../types';
import styles from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

import { Shadow } from 'react-native-shadow-2';

export type AlbumHeaderProps = {
  album: Album;
};

const AlbumHeader = (props: AlbumHeaderProps, navigation: navigation, route: route) => {
  const {album} = props;

  const [toggle, setToggle] = useState(false);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [title, setTitle] = useState(album.name);
  const [isEditing, setIsEditing] = useState(false);
  const toggleEditing = () => setIsEditing(previousState => !previousState);

  const createThreeButtonAlert = () => Alert.alert('Added to Spotify!');

  const notSaved = () =>
    Alert.alert(
      'Go Back?',
      'You have not saved this playlist yet. Are you sure you want to abandon it?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Leave', onPress: () => console.log('OK Pressed')},
      ],
    );

  return (
    <View>
      <View style={styles.container}>
        {/* cover image */}
        <View style={styles.center}>
          <Shadow distance={10} containerViewStyle={{marginVertical: 10}} startColor={'hsla(252,56.5%,24.3%, 0.2)'} radius={3}>
            <TouchableOpacity onPress={notSaved}>
              <View style={styles.image}>
                <View style={{flexDirection: 'row'}}>
                  <Image source={{uri: album.songs[0].imageUri}} style={styles.miniImage}/>
                  <Image source={{uri: album.songs[1].imageUri}} style={styles.miniImage}/>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Image source={{uri: album.songs[2].imageUri}} style={styles.miniImage}/>
                  <Image source={{uri: album.songs[3].imageUri}} style={styles.miniImage}/>
                </View>
              </View>
            </TouchableOpacity>
          </Shadow>
        </View>

        {/* Header text */}

      <View style={styles.title}>
        <TouchableOpacity style={[styles.title]}>
          <View style={styles.leftContainer}>
          <TextInput
            placeholder={title}
            onChangeText={title => setTitle(title)}
            onFocus={toggleEditing}
            onEndEditing={toggleEditing}
            defaultValue={title}
            style={[styles.name]}
          />
          </View>

          <View style={styles.rightContainer}>
              {isEditing?
            <MaterialIcons
              name="mode-edit"
              size={25}
              color={'dodgerblue'}
              style={styles.edit}
            />: 
            <MaterialIcons
              name="mode-edit"
              size={25}
              color={'#3700AB'}
              style={styles.edit}
            />}
          </View>
          
          
          
        </TouchableOpacity>

        
      </View>
      <View style={styles.divider}>
        {isEditing? <View style={styles.line} />:<View style={styles.lineOff} />}
      </View>

        {/* public or private toggle*/}
        <View style={styles.headerInfo}>
          <View style={styles.headerText}>
            {/* Name */}
            <View>
              <View>
                
                <View style={styles.creatorContainer}>
                  {/* TODO: need to rename style names*/}
                  <Text style={styles.middleText}>{album.songs.length} songs</Text>
                  <Entypo
                    name="dot-single"
                    size={25}
                    color={'#867CC0'}
                  />
                  <Text style={styles.middleText}>{album.duration}</Text>
                </View>
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
                trackColor={{false: 'white', true: '#7432FF'}}
                thumbColor={isEnabled ? 'hsl(0, 0%, 95%)' : 'hsl(0, 0%, 95%)'}
                ios_backgroundColor="#C4C4C4"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>
        </View>

        {/* play button */}
        <TouchableOpacity onPress={createThreeButtonAlert} style={{flexDirection: 'row', marginTop: 10}}>
          <View style={styles.button}>
            <MaterialCommunityIcons name="spotify" size={30} color={'white'} />
            <Text style={styles.buttonText}>ADD TO SPOTIFY</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.findInPlaylist}>
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.findContents}>
            <Feather name="search" size={25} color={'#3700AB'} />
            <Text style={[styles.promptText, styles.gapAfterIcon]}>
              Find in playlist
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AlbumHeader;
