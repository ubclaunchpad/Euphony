import * as React from 'react';
import LoginScreen from './login/LoginScreen';
import { Modal, Button, Text, TextInput, StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import LocationPicker from '../components/filter/LocationPicker';
import Carousel from '../components/filter/Carousel';
import AppContext from '../AppContext';

import { genreChoices, moodChoices, activityChoices, weatherChoices } from '../data/filterChoices';
import LengthPicker from '../components/filter/LengthPicker';

function FilterScreen({ navigation }) {
  const MAX_LENGTH = 100;

  const authContext = React.useContext(AppContext);

  const [loginPresented, setLoginPresented] = React.useState(true);
  const [text, onChangeText] = React.useState("");
  const [textLength, setTextLength] = React.useState(MAX_LENGTH);

  const dismissModal = React.useCallback(() => {
    setLoginPresented(false);
  }, [loginPresented]);

  var isSpotifyConnected = false;
  var messageText;
  if (!isSpotifyConnected) {
    messageText = <Text>Connect your Spotify account for more personalized results.</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>
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
      <ScrollView
        style={styles.scrollView}
      >
        <Text style={styles.header}>Filters</Text>
        <Text style={styles.text}>{messageText}</Text>
        <Button
          title="logout"
          onPress={() => authContext.setAuthToken(undefined)}
        />
        <TextInput
          onChangeText={
            (text) => { setTextLength(MAX_LENGTH - text.length); onChangeText(text) }
          }
          value={text}
          style={styles.textInput}
          placeholder="Enter playlist name"
          placeholderTextColor={'black'}
          maxLength={MAX_LENGTH} //TODO confirm this
        />
        <Text>{textLength}</Text>
        <Carousel
          title={"Genre"}
          description={"Choose a mood from the ones below"}
          choices={genreChoices}
        />
        <Carousel
          title={"Mood"}
          description={"Choose a mood from the ones below"}
          choices={moodChoices}
        />
        <Carousel
          title="Activity"
          description="Choose an activity that fits your playlist best."
          choices={activityChoices}
        />
        <LocationPicker
          title="Location"
          description="See what people are listening to in your area"
        />
        <Carousel
          title="Weather"
          description="Select your current weather or from our choices"
          choices={weatherChoices}
          required={false}// TODO make current weather be dependent on location
        />
        <LengthPicker
          title="Playlist length"
          description="How many tracks do you want in your playlist?"
        />
      </ScrollView>
      <Button
        title="Okay, leggo"
        onPress={() => {
          if (authContext.authToken)
            navigation.navigate('Playlist', {
              obj: {
                "mood": 1,
                "activity": 3,
                "limit": 20
              },
              coords: {
                lat: "37.7614",
                long: "-122.4241"
              },
              initName: text ? text : "My Playlist" ,
            })
          else { authContext.setAuthToken(undefined); }
        }}
      />
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  text: {
    color: 'black',
    fontSize: 15,
  },
  textInput: {
    color: 'black',
    fontSize: 15,

  },
  header: {
    fontSize: 32,
    color: 'black',
  },
});

export default FilterScreen;