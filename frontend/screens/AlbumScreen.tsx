import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { StatusBar, SafeAreaView, Text, View, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';

import AppContext from '../AppContext';

import SongListItem from '../components/SongListItem';
import AlbumHeader from '../components/AlbumHeader';
import AddedModal from '../components/AddedModal';
import LeaveModal from '../components/LeaveModal';
import PlaylistSettings from '../components/InfoModal';

import Modal from "react-native-modal";
import { Modalize } from 'react-native-modalize';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'
import Endpoints from '../networking/Endpoints';

const AlbumScreen = ({ route, navigation }) => {
  const { filters, coords, initName } = route.params;

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [privatePlaylist, setIsPrivatePlaylist] = useState(true);
  const [searchData, setSearchData] = useState([]);
  const [query, setQuery] = useState('');



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
        backgroundColor: 'white',
      },
      headerTitleStyle: {
        fontSize: 22,
        fontFamily: 'Raleway-ExtraBold',
      },
      headerLeft: () => (
        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingRight: 20 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              color={'hsl(0, 0%, 0%)'}
              style={{ paddingLeft: 10 }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
          <TouchableOpacity onPress={() => genPlaylist()}>
            <MaterialIcons
              name="refresh"
              size={24}
              color={'hsl(0, 0%, 0%)'}
              style={{ paddingRight: 20 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onOpen}>
            <MaterialIcons
              name="info-outline"
              size={24}
              color={'hsl(0, 0%, 0%)'}
              style={{ paddingRight: 10 }}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, name]);

  // where we push current copy of songs to the API
  const updateSaved = () => {
    setSaved(true);
    setIsLoading(true);

    Endpoints.createPlaylist({
      "name": name,
      "public": !privatePlaylist, // opposite of private is public :)
      "trackIds": data.map(song => { return song.id })
    })
      .then(_ => {
        setError(null);
        setIsLoading(false);
        setAddModalVisible(true);
      })
      .catch(err => {
        if (err instanceof Error) {
          setError(err.message);
          setIsLoading(false);
          console.error(err.message);
        } else {
          setError("Something went wrong, try again later!")
          setIsLoading(false);
        }
      });
  }

  // generate playlist with props from FilterScreen, fetch from API
  const genPlaylist = () => {
    setIsLoading(true);
    Endpoints.theOne(filters, coords.lat, coords.long)
      .then(results => {
        console.log("results " + JSON.stringify(results));
        setData(results.body);
        setError(null);
        setIsLoading(false);
      })
      .catch(err => {
        if (err instanceof Error) {
          setError(err.message);
          setIsLoading(false);
          console.error(err.message);
        } else {
          setError("Something went wrong, try again later!")
          setIsLoading(false);
        }
      });

  }

  const deleteSong = (id) => {
    if (data.length != 1) {
      setData(data.filter(song => song.id !== id));
      setSearchData(searchData.filter(song => song.id !== id));
    }
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
        <Text style={{ fontSize: 18 }}>
          {error}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <Modal isVisible={isAddModalVisible} backdropOpacity={0.4} animationInTiming={700}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <AddedModal toggle={isAddModalVisible} onPress={toggleAddModal} name={name}></AddedModal>
        </View>
      </Modal>

      <Modal isVisible={isLeaveModalVisible} backdropOpacity={0.4} animationIn={"wobble"} animationInTiming={700} useNativeDriver={true} >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <LeaveModal
            toggle={true}
            onLeave={onLeave}
            onCancel={onCancel}
            e={i}
            name={name}>
          </LeaveModal>
        </View>
      </Modal>

      <Modalize ref={modalRef} adjustToContentHeight={toggle}>
        <PlaylistSettings info={filters} toggle={toggle} handleClose={handleClose} title={name} />
      </Modalize>

      <KeyboardAwareFlatList
        data={query ? searchData : data}
        renderItem={({ item }) => <SongListItem song={item} deleteSong={deleteSong} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={() =>
          <AlbumHeader
            album={data}
            setSearchData={setSearchData}
            query={query}
            setQuery={setQuery}
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
};

export default AlbumScreen;
