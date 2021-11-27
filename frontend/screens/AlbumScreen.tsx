import React from 'react';
import {View, FlatList,  StatusBar, SafeAreaView, TextInput } from 'react-native';

import {Animated} from 'react-native';

import SongListItem from '../components/SongListItem';
import AlbumHeader from '../components/AlbumHeader';
import albumDetails from '../mockData/albumDetails';

const {Value} = Animated;
const AlbumScreen = () => {
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
    <SafeAreaView style={{ backgroundColor: 'transparent' }}>
        <StatusBar barStyle="dark-content" backgroundColor="#1c1c1c" />
      
      <FlatList
        data={albumDetails.songs}
        renderItem={({item}) => <SongListItem song={item} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => <AlbumHeader album={albumDetails}/>}
      />
    </SafeAreaView>
  );
};

export default AlbumScreen;
