import React, { useState, useEffect, useLayoutEffect } from 'react';
import {FlatList,  StatusBar, SafeAreaView, Text, View, ActivityIndicator, Alert, Button} from 'react-native';

import AppContext from '../AppContext';

import {Animated} from 'react-native';

import SongListItem from '../components/SongListItem';
import AlbumHeader from '../components/AlbumHeader';
import AddedModal from '../components/AddedModal';
import LeaveModal from '../components/LeaveModal';

import Modal from "react-native-modal";

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

  const updateSaved = () => {
    setSaved(true);
    setAddModalVisible(true);
  }

  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [isLeaveModalVisible, setLeaveModalVisible] = useState(false);

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
            style={{paddingRight:20}}
          />
          <MaterialIcons
            name="info-outline"
            size={24}
            color={'hsl(0, 0%, 0%)'}
            onPress={() => navigation.navigate("PlaylistInfo", albumDetails)}
            style={{paddingRight:10}}
          />
        </View>
      ),
    });
  }, [navigation, name]);

  // fetch from API
  useEffect(() => {
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


          <FlatList
            data={data}
            renderItem={({item}) => <SongListItem song={item} />}
            keyExtractor={item => item.id}
            ListHeaderComponent={() => <AlbumHeader album={data} saved={saved} updateSaved={updateSaved} name={name} setName={setName}/>}
          />
        </SafeAreaView>
      );
    }
  };
};

export default AlbumScreen;
