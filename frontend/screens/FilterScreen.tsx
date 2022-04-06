import * as React from 'react';
import LoginScreen from './login/LoginScreen';
import { Modal, TouchableOpacity, Text, TextInput, StyleSheet, SafeAreaView, ScrollView, StatusBar, View, Image } from 'react-native';
import LocationPicker from '../components/filter/LocationPicker';
import Carousel from '../components/filter/Carousel';
import AppContext from '../AppContext';

import { genreChoices, moodChoices, activityChoices, weatherChoices } from '../data/filterChoices';
import LengthPicker from '../components/filter/LengthPicker';
import JGButton from '../components/shared/JGButton/JGButton';

import { useLayoutEffect } from 'react';
import UserInfo from '../networking/UserInfo';
import FastImage from 'react-native-fast-image';
import { authHandler } from '../networking/Endpoints';
import { useFocusEffect } from '@react-navigation/native';
const defaultProfileImage = require('./images/profile.png');

export type FilterWeatherInfo = {
  locationName: string;
  weatherString: string;
}

function FilterScreen({ navigation }: any) {
  const MAX_LENGTH = 100;

  const authContext = React.useContext(AppContext);

  const [text, onChangeText] = React.useState("");
  const [textLength, setTextLength] = React.useState(MAX_LENGTH);

  const [genres, setGenres] = React.useState(0);
  const [mood, setMood] = React.useState(-1);
  const [activity, setActivity] = React.useState(-1);
  const [lat, setLat] = React.useState<number | null>(null)
  const [long, setLong] = React.useState<number | null>(null)
  const [showIncomplete, setShowIncomplete] = React.useState(false);
  const [playlistLength, setPlaylistLength] = React.useState(1);

  // object of User Info, with getters.
  const [userInfo, setUserInfo] = React.useState<UserInfo | null>(null);

  const [locInfo, setLocInfo] = React.useState<FilterWeatherInfo | null>(null);
  const [networkError, setNetworkError] = React.useState<string | null>(null);
  var messageText;

  if (networkError) {
    messageText =
      <View>
        <TouchableOpacity onPress={() => {
          fetchUser().then(() => {
            setNetworkError(null)
          }).catch(() => {
            setNetworkError("Could not fetch user info")
          })
        }}>
          <Text style={styles.connectSpotifyText}>Could not retrieve profile, tap to reconnect.</Text>
        </TouchableOpacity>
      </View>
  }

  const fetchUser = async () => {
    if (authContext.authToken == null) {
      if (authContext.refreshToken) {
        let result = await authHandler.refreshLogin(authContext.refreshToken);
        if (result) {
          authContext.setAuthToken(result.accessToken);
          authContext.setRefreshToken(result.refreshToken);
        }
      }
    }
    const user = new UserInfo(authContext.authToken as string, authContext);
    const getUserInfo = await user.updateData(authContext);
    setUserInfo(getUserInfo);
    return getUserInfo

  }

  const headerTapped = () => {
    console.log(authContext)
    if (authContext.userID) {
      console.log("User ID exists")
      if (userInfo == null) {
        fetchUser()
          .then((info) => {
            navigation.navigate('Profile', { userInfo: info })
          })
          .catch(error => {
            setNetworkError(error.message)
          })
      } else {
        navigation.navigate('Profile', { userInfo: userInfo })
      }
    } else {
      console.log("User ID does not exist" + authContext.userID)
      authContext.setAuthToken(null);
    }
  }


  useFocusEffect(
    React.useCallback(() => {
      if (authContext.refreshToken) {
        fetchUser()
          .catch(error => {
            console.warn(error)
          })
      }
    }, [authContext.refreshToken])
  );




  // set Navigation Screen options leaving
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Filters",
      headerRight: () => (
        <View style={{}}>
          <TouchableOpacity onPress={() => {
            headerTapped()
          }}
            style={{ paddingVertical: 5 }}>
            <FastImage source={userInfo ? userInfo.getProfileImage() : defaultProfileImage} style={{ width: 45, height: 45, borderRadius: 35, }} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [userInfo, navigation, authContext]);

  return (
    <View style={styles.container}>
      <StatusBar translucent barStyle="dark-content" backgroundColor="transparent" />

      <Modal
        animationType="slide"
        visible={authContext.authToken == null && authContext.refreshToken == null}
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
              placeholder="My Playlist"
              placeholderTextColor={'#867CC0'}
              maxLength={MAX_LENGTH} //TODO confirm this
            />
            <Text style={styles.textInput}
            >{textLength}</Text>
          </View>

        </View>
        <Carousel
          title={"Genre"}
          description={"Choose a genre from the ones below"}
          showIncomplete={showIncomplete}
          choices={genreChoices}
          selectedChoice={genres}
          onChange={(choice) => { (choice < 0 || Object.is(choice, -0)) ? setGenres(genres & ~(1 << -choice)) : setGenres(genres | (1 << choice)) }}
        />
        <Carousel
          title={"Mood"}
          description={"Choose a mood from the ones below"}
          showIncomplete={showIncomplete}
          selectedChoice={mood}
          choices={moodChoices}
          onChange={(choice) => { setMood(choice) }}
        />
        <Carousel
          title="Activity"
          description="Choose an activity that fits your playlist best."
          showIncomplete={showIncomplete}
          choices={activityChoices}
          selectedChoice={activity}
          onChange={(choice) => { setActivity(choice) }}
        />
        <LocationPicker
          title="Location"
          description="See what people are listening to in your area"
          onChange={(lat, lng) => {
            setLat(lat)
            setLong(lng)
          }}
          locInfoObtained={setLocInfo}
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
                console.log(mood, genres, activity, playlistLength, text);

                if (mood !== -1 && genres !== 0 && activity !== -1) {
                  navigation.navigate('Playlist', {
                    filters: {
                      "genres": genres,
                      "mood": mood,
                      "activity": activity,
                      "limit": playlistLength,
                    },
                    coords: {
                      lat: lat ? lat : 27,
                      long: long ? long : 133,
                    },
                    initName: text ? text : "My Playlist",
                    locInfo: locInfo,
                  })
                  setShowIncomplete(false)
                } else {
                  setShowIncomplete(true)
                }
              }
              else { authContext.setAuthToken(null); }
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
    backgroundColor: 'white'
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
    fontFamily: 'Raleway-Bold',
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
    marginTop: 20,
  }
});

export default FilterScreen;