import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import {FlatList,  StatusBar, SafeAreaView, Text, View, ActivityIndicator, Alert, Button, ScrollView, TouchableOpacity} from 'react-native';

import AppContext from '../AppContext';

import {Animated} from 'react-native';

import SongListItem from '../components/SongListItem';
import AlbumHeader from '../components/AlbumHeader';
import AddedModal from '../components/AddedModal';
import LeaveModal from '../components/LeaveModal';
import InfoModal from '../components/InfoModal';

import Modal from "react-native-modal";
import { Modalize } from 'react-native-modalize';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AlbumScreen = ({route, navigation}) => {
  const { obj, coords, initName } = route.params;

  const { authToken } = React.useContext(AppContext);

  const API_ENDPOINT = `http://localhost:4000/theOne/${coords.lat},${coords.long}/${authToken}`;
  const REQUEST_OPTIONS = {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json'
    }
  };
  // dummy API endpoint and request, to be replaced with user-input theOne parameters
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);
  const [privatePlaylist, setIsPrivatePlaylist] = useState(false);

  // where we push current copy of songs to the API
  const updateSaved = () => {
    setSaved(true);
    setIsLoading(true);
    const NEW_ENDPOINT = `http://localhost:4000/spotify/createSpotifyPlaylist/${authToken}`
    const NEW_OPTIONS = {
      method: 'POST',
      body: JSON.stringify({
        "name": name,
        "public": !privatePlaylist, // opposite of private is public :)
        "trackIds": data.map(song => {return song.id})
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch(NEW_ENDPOINT, NEW_OPTIONS)
      .then(results => {
        setIsLoading(false);
        setAddModalVisible(true);
      })
      .catch(err => {
        setIsLoading(false);
        console.error(err);
        setError(err);
      });
  }

  // hooks for modal visibilities
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [isLeaveModalVisible, setLeaveModalVisible] = useState(false);
  const modalRef = useRef<Modalize>(null);

  const onOpen = () => {
    modalRef.current?.open();
  };

  const handleClose = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  const [toggle, setToggle] = useState(true);

  const toggleAddModal = () => {
    setAddModalVisible(false);
  };

  const [name, setName] = useState(initName);

  // above, constants are init

  // set Navigation Screen options leaving
  useLayoutEffect(() => {
    navigation.setOptions({
      title: name === '' ? 'No title' : name,
        headerStyle: {
          backgroundColor: 'hsla(0, 0%, 100%, 0.8)',
        },
      headerLeft: () => (
        <View style={{flexDirection: 'row', justifyContent: 'center', paddingBottom: 5}}> 
          <MaterialIcons
            name="arrow-back-ios"
            size={24}
            color={'hsl(0, 0%, 0%)'}
            onPress={() => navigation.goBack()}
            style={{paddingLeft:10}}
          />
        </View>
      ),
      headerRight: () => (
        <View style={{flexDirection: 'row', justifyContent: 'center', paddingBottom: 5}}> 
          <MaterialIcons
            name="refresh"
            size={24}
            color={'hsl(0, 0%, 0%)'}
            onPress={() => genPlaylist()}
            style={{paddingRight:20}}
          />
          <MaterialIcons
            name="info-outline"
            size={24}
            color={'hsl(0, 0%, 0%)'}
            onPress={onOpen}
            style={{paddingRight:10}}
          />
        </View>
      ),
    });
  }, [navigation, name]);

  // generate playlist with props from FilterScreen, fetch from API
  const genPlaylist = () => {
    setIsLoading(true);
    fetch(API_ENDPOINT, REQUEST_OPTIONS)
      .then(response => response.json())
      .then(results => {
        setData(results);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        console.error(err);
        setError(err);
      });
  }

  const deleteSong = (id) => {
    if (data.length != 1) setData(data.filter(song => song.id !== id));
    else Alert.alert("You can't remove all the songs in the playlist! To make a new playlist, use the regenerate button.")
  }

  // immediately call to generate playlist upon entering screen
  useEffect(() => {
    genPlaylist();
  }, []);

  const [i, setI] = useState(null);
  // storing e event from listener below

  const onLeave = (e) => {
    setLeaveModalVisible(false);
    navigation.dispatch(e.data.action)
  };

  const onCancel = () => {
    setLeaveModalVisible(false);
    // no other actions needed: modal goes away, stay on screen
  };

  // prevent going back
  React.useEffect(
    () => navigation.addListener('beforeRemove', (e) => {
        if (saved) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // define e in local scope as variable i. TODO: this is probably very inefficient
        setI(e);

        // Prompt the user before leaving the screen
        setLeaveModalVisible(true);

      }), [navigation, saved]
  );

  if (isLoading) {
    return (
      <View style={{ backgroundColor: 'white', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ backgroundColor: 'white', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18}}>
          Error fetching data... Check your network connection!
        </Text>
      </View>
    );
  }

  if (!isLoading) {
    if (data.name == "Error") {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18}}>
            Access token outdated!
          </Text>
        </View>
      );
    }
    else {
      return (
        <SafeAreaView style={{ backgroundColor: 'white' }}>
          <StatusBar barStyle="dark-content" backgroundColor="white" />
          
          <Modal isVisible={isAddModalVisible} backdropOpacity={0.4} animationInTiming={700}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <AddedModal toggle={isAddModalVisible} onPress={toggleAddModal} name={name}></AddedModal>
            </View>
          </Modal>

          <Modal isVisible={isLeaveModalVisible} backdropOpacity={0.4} animationInTiming={500}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <LeaveModal 
                toggle={isLeaveModalVisible} 
                onLeave={onLeave} 
                onCancel={onCancel}
                e={i} 
                name={name}>
              </LeaveModal>
            </View>
          </Modal>

          <Modalize ref={modalRef} adjustToContentHeight={toggle}>
            <InfoModal info={obj} toggle={toggle} handleClose={handleClose} title={name}/>
          </Modalize>

          <FlatList
            data={data}
            renderItem={({item}) => <SongListItem song={item} deleteSong={deleteSong} />}
            keyExtractor={item => item.id}
            ListHeaderComponent={() => 
              <AlbumHeader 
                album={data} 
                saved={saved} 
                updateSaved={updateSaved} 
                name={name} 
                setName={setName}
                privatePlaylist={privatePlaylist}
                setIsPrivatePlaylist={setIsPrivatePlaylist}
              />}
          />
        </SafeAreaView>
      );
    }
  };
};

export default AlbumScreen;
