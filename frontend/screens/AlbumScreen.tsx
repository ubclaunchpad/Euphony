import React, { useState } from 'react';
import {FlatList,  StatusBar, SafeAreaView, Text, View, Button, Alert} from 'react-native';

import {Animated} from 'react-native';

import SongListItem from '../components/SongListItem';
import AlbumHeader from '../components/AlbumHeader';
import AddedModal from '../components/AddedModal';

import albumDetails from '../mockData/albumDetails';

import Modal from "react-native-modal";

const AlbumScreen = ({navigation}) => {
  const [saved, setSaved] = useState(false);

  const updateSaved = () => {
    setSaved(true);
    setModalVisible(true);
  }

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [name, setName] = useState(albumDetails.name);
  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      <Modal isVisible={isModalVisible} backdropOpacity={0.4} animationInTiming={1000}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <AddedModal toggle={isModalVisible} onPress={toggleModal} name={name}></AddedModal>
        </View>
      </Modal>

        <FlatList
          data={albumDetails.songs}
          renderItem={({item}) => <SongListItem song={item} />}
          keyExtractor={item => item.id}
          ListHeaderComponent={() => <AlbumHeader album={albumDetails} saved={saved} updateSaved={updateSaved} name={name} setName={setName}/>}
        />
    </SafeAreaView>
  );
};

export default AlbumScreen;
