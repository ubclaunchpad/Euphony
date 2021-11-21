import * as React from 'react';
import { View, Button, Text, TextInput, StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import LocationPicker from '../components/filter/LocationPicker';
import Carousel from '../components/filter/Carousel';

import { moodChoices, activityChoices, weatherChoices } from '../data/filterChoices';
import LengthPicker from '../components/filter/LengthPicker';

function submit() {
  //
}

function FilterScreen() {
    const [text, onChangeText] = React.useState("");
    
    var isSpotifyConnected = false;
    var messageText;
    if (!isSpotifyConnected) {
      messageText = <Text>Connect your Spotify account for more personalized results.</Text>;
    }
    return (
         <SafeAreaView style={styles.container}>
         <ScrollView style={styles.scrollView}>
          <Text style={styles.header}>Filters</Text>
          <Text style={styles.text}>{messageText}</Text>
          <Button title="Clear all"/>
          <TextInput
            onChangeText={onChangeText}
            value = {text}
            style = {styles.textInput}
            placeholder = "Enter playlist name"
            placeholderTextColor = {'black'}
          /> 
          <Carousel 
            title={"Genre"}
            description={"Choose a mood from the ones below"}
            choices={moodChoices}
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
            choices={weatherChoices} // TODO make current weather be dependent on location
          />
          <LengthPicker
            title="Playlist length"
            description="How many tracks do you want in your playlist?"
          />
          <Button
            title="Okay, leggo"
            onPress={submit}
          />
           </ScrollView>
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