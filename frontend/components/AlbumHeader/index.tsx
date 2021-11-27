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
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

export type AlbumHeaderProps = {
  album: Album;
};

const AlbumHeader = (props: AlbumHeaderProps, y) => {
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
        <TouchableOpacity onPress={notSaved}>
          <Image source={{uri: album.imageUri}} style={styles.image} />
        </TouchableOpacity>

        {/* Header text */}

        {/* public or private toggle*/}
        <View style={styles.headerInfo}>
          <View style={styles.headerText}>
            {/* Name */}
            <View>
              <View style={styles.columnStack}>
                <TouchableOpacity style={styles.title}>
                  <TextInput
                    placeholder={title}
                    onChangeText={title => setTitle(title)}
                    onFocus={toggleEditing}
                    onEndEditing={toggleEditing}
                    defaultValue={title}
                    style={[styles.name]}
                  />

                    {isEditing?
                  <AntDesign
                    name="edit"
                    size={18}
                    color={'dodgerblue'}
                    style={styles.edit}
                  />: 
                  <AntDesign
                    name="edit"
                    size={18}
                    color={'hsl(0, 0%, 15%)'}
                    style={styles.edit}
                  />}
                  
                  
                  
                </TouchableOpacity>

                <View style={styles.divider}>
                  {isEditing? <View style={styles.line} />:<View style={styles.lineOff} />}
                  </View>
                <View style={styles.creatorContainer}>
                  {/* TODO: need to rename style names*/}
                  <Text style={styles.likes}>{album.songs.length} songs</Text>
                  <Entypo
                    name="dot-single"
                    size={15}
                    color={'hsl(0, 0%, 46%)'}
                  />
                  <Text style={styles.creator}>{album.duration}</Text>
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
                trackColor={{false: '#767577', true: '#1CD05D'}}
                thumbColor={isEnabled ? 'hsl(0, 0%, 85%)' : 'hsl(0, 0%, 85%)'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>
        </View>

        {/* play button */}
        <TouchableOpacity onPress={createThreeButtonAlert}>
          <View style={styles.button}>
            <MaterialCommunityIcons name="spotify" size={30} color={'white'} />
            <Text style={styles.buttonText}>ADD TO SPOTIFY</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.findInPlaylist}>
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.findContents}>
            <Feather name="search" size={25} color={'black'} />
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
