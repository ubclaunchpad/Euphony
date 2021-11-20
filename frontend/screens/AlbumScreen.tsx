import React, { useEffect} from 'react';
import {View, FlatList,  StatusBar, SafeAreaView } from 'react-native';
import {useRoute} from '@react-navigation/native';

import {Animated} from 'react-native';

import SongListItem from '../components/SongListItem';
import AlbumHeader from '../components/AlbumHeader';
import albumDetails from '../mockData/albumDetails';

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
    <SafeAreaView style={{ backgroundColor: 'transparent' }}>
        <StatusBar barStyle="light-content" backgroundColor="#1c1c1c" />
      
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
