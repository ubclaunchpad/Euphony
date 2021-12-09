import * as React from 'react';
import LoginScreen from './login/LoginScreen';
import { Modal, TouchableOpacity, Text, TextInput, StyleSheet, SafeAreaView, ScrollView, StatusBar, View } from 'react-native';
import LocationPicker from '../components/filter/LocationPicker';
import Carousel from '../components/filter/Carousel';
import AppContext from '../AppContext';

import { genreChoices, moodChoices, activityChoices, weatherChoices } from '../data/filterChoices';
import LengthPicker from '../components/filter/LengthPicker';
import JGButton from '../components/shared/JGButton/JGButton';

function FilterScreen({ navigation }) {
  const MAX_LENGTH = 100;

  const authContext = React.useContext(AppContext);

  const [text, onChangeText] = React.useState("");
  const [textLength, setTextLength] = React.useState(MAX_LENGTH);

  const [genre, setGenre] = React.useState(-1);
  const [mood, setMood] = React.useState(-1);
  const [activity, setActivity] = React.useState(-1);

  const [playlistLength, setPlaylistLength] = React.useState(1);

  var messageText;
  if (authContext.authToken === "") {
    messageText =
      <View>
        <TouchableOpacity onPress={() => { authContext.setAuthToken(undefined) }}>
          <Text style={styles.connectSpotifyText}>Connect your Spotify account for more personalized results.</Text>
        </TouchableOpacity>
      </View>

  }
  return (
    <View style={styles.container}>

      <Modal
        animationType="slide"
        visible={authContext.authToken === undefined}
        onRequestClose={() => {
          authContext.setAuthToken("");
        }}
      >
        <LoginScreen dismissAction={() => {
          authContext.setAuthToken("")
        }} ></LoginScreen>
      </Modal>
      <SafeAreaView>

      </SafeAreaView>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* <Text style={styles.header}>Filters</Text> */}
        {messageText}
        {/* <Button
          title="logout"
          onPress={() => authContext.setAuthToken(undefined)}
        /> */}
        <View style={styles.playlistNameContainer}>

          <Text style={styles.title}>Playlist Name</Text>
          <View style={styles.playlistNameContainerInner}>
            <TextInput
              onChangeText={
                (text) => { setTextLength(MAX_LENGTH - text.length); onChangeText(text) }
              }
              value={text}
              style={styles.textInput}
              placeholder="Enter playlist name"
              placeholderTextColor={'#867CC0'}
              maxLength={MAX_LENGTH} //TODO confirm this
            />
            <Text style={styles.textInput}
            >{textLength}</Text>
          </View>

        </View>
        <Carousel
          title={"Genre"}
          description={"Choose a mood from the ones below"}
          choices={genreChoices}
          selectedChoice={genre}
          onChange={(choice) => { setGenre(choice) }}
        />
        <Carousel
          title={"Mood"}
          description={"Choose a mood from the ones below"}
          selectedChoice={mood}
          choices={moodChoices}
          onChange={(choice) => { setMood(choice) }}
        />
        <Carousel
          title="Activity"
          description="Choose an activity that fits your playlist best."
          choices={activityChoices}
          selectedChoice={activity}
          onChange={(choice) => { setActivity(choice) }}
        />
        <LocationPicker
          title="Location"
          description="See what people are listening to in your area"
        />
        {/* <Carousel
          title="Weather"
          description="Select your current weather or from our choices"
          choices={weatherChoices}
          required={false}// TODO make current weather be dependent on location
        /> */}
        <LengthPicker
          title="Playlist length"
          description="How many tracks do you want in your playlist?"
          value={playlistLength}
          onChange={(value) => { setPlaylistLength(value) }}
        />
      </ScrollView>


      <View style={{ alignItems: 'center', marginHorizontal: 30 }}>
        <View style={{ position: 'absolute', width: '100%', bottom: 30 }}>
          <JGButton fillParent={true} title="OKAY, LET'S GO" onClick={
            () => {
              if (authContext.authToken) {
                console.log(mood, genre, activity, playlistLength, text);

                if (mood !== -1 && genre !== -1 && activity !== -1) {
                  navigation.navigate('Playlist', {
                    obj: {
                      "mood": mood,
                      "activity": activity,
                      "limit": playlistLength,
                    },
                    coords: {
                      lat: "37.7614",
                      long: "-122.4241"
                    },
                    initName: text ? text : "My Playlist",
                  })
                }
              }
              else { authContext.setAuthToken(undefined); }
            }
          } />
        </View>
      </View>
    </View >
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  connectSpotifyText: {
    color: 'white',
    marginHorizontal: 25,
    fontSize: 16,
    fontFamily: 'Avenir',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 16,
    backgroundColor: '#7432FF',
    overflow: 'hidden',
    fontWeight: "500",
    marginBottom: 30,
    marginTop: 20,
  },
  scrollView: {
    marginHorizontal: 0,
  },
  scrollViewContent: {
    paddingBottom: 100,
  },
  text: {
    color: 'black',
    fontSize: 16,
  },
  title: {
    color: '#3700AB',
    fontSize: 20,
    fontFamily: 'Raleway',
    fontWeight: 'bold',
  },
  textInput: {
    color: '#867CC0',
    fontSize: 16,
    fontFamily: 'Avenir',
    maxWidth: '92%',
  },
  header: {
    fontSize: 32,
    color: 'black',
  },
  playlistNameContainerInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18,
    borderBottomWidth: 1,
    paddingBottom: 2,
    borderBottomColor: '#3700AB',
    marginBottom: 10,
  },
  playlistNameContainer: {
    marginHorizontal: 25,
  }
});

export default FilterScreen;