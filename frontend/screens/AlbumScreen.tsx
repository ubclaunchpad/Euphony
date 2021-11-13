import React, {useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import {useRoute} from '@react-navigation/native';

import {Animated} from 'react-native';

import SongListItem from '../components/SongListItem';
import AlbumHeader from '../components/AlbumHeader';
import albumDetails from '../data/albumDetails';
import {SafeAreaView} from 'react-native-safe-area-context';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';

const {Value} = Animated;
const AlbumScreen = ({navigation}) => {
  const route = useRoute();
  const y = new Value(0);

  useEffect(() => {
    console.log(route);
  }, []);

  const shuffleSongs = (array) => {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#1c1c1c' }}>
        <StatusBar barStyle="light-content" backgroundColor="#ecf0f1" />
      <View style={styles.subHeader}>
        <View style={{flex: 1}}>
          <Ionicons
            name="chevron-back"
            size={18}
            color={'hsl(0, 0%, 85%)'}
            style={styles.edit}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={styles.conversation}>{albumDetails.name}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
            <TouchableOpacity onPress={() => {}}>
          <AntDesign
            name="reload1"
            size={18}
            color={'hsl(0, 0%, 85%)'}
            style={styles.headerIcon}
            onPress = {() => shuffleSongs(albumDetails.songs)}
          />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
          <Feather
            name="settings"
            size={18}
            color={'hsl(0, 0%, 85%)'}
            style={styles.headerIcon}
            onPress={() => navigation.navigate("PlaylistInfo", albumDetails)}
          />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{backgroundColor: '#ecf0f1'}}>
      <FlatList
        data={albumDetails.songs}
        renderItem={({item}) => <SongListItem song={item} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => <AlbumHeader album={albumDetails} />}
      />
      </View>
    </SafeAreaView>
  );
};

export default AlbumScreen;
