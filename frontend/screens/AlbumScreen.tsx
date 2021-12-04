import React from 'react';
import {FlatList,  StatusBar, SafeAreaView} from 'react-native';

import {Animated} from 'react-native';

import SongListItem from '../components/SongListItem';
import AlbumHeader from '../components/AlbumHeader';
import albumDetails from '../mockData/albumDetails';

const AlbumScreen = () => {
  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
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
