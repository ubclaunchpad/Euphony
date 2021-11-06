import * as React from 'react';
import { View, Button, Text, TextInput, StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import LocationPicker from '../components/filter/LocationPicker';
import LengthPicker from '../components/filter/LengthPicker';
import Carousel from '../components/filter/Carousel/Carousel';

function FilterScreen() {
    const [text, onChangeText] = React.useState("");

    const moodChoices: Array<Object> =[{label: 'Happy'}, {label: "Melancholy"}, {label: "Compassion"}, {label: "Loneliness"}];
    const activityChoices: Array<Object> = [{label: "Chill"}, {label: "Study"}, {label: "Party"}, {label: "Work out"}, {label: "Bed"}];
    const weatherChoices: Array<Object> = [{label: "Current weather"}, {label: "Rainy"}, {label: "(something else)"}];

    var isSpotifyConnected;
    var messageText;
    if (isSpotifyConnected) {
      messageText = <Text>Connect your Spotify account for mroe personalized results.</Text>;
    }
    return (
         <SafeAreaView style={styles.container}>
           
           {/*options in branch 32 */}
        
         <ScrollView style={styles.scrollView}>
          <Text>FilterScreen</Text>
          <Text>Header: Filters</Text>
          {messageText}
          <Button title="Clear all"/>
          <TextInput
            onChangeText={onChangeText}
            value = {text}
            placeholder = "Enter playlist name"
          /> 
          <Carousel 
            title="Mood"
            description="Choose a mood from the ones below"
            items={moodChoices}
            />
           <Carousel
            title="Activity"
            description="Choose an activity that fits your playlist best." 
            items={activityChoices}
            />
          <LocationPicker
            title="Location"
            description="See what people are listening to in your area"
          />
          {
          // how do we hook up the Location picker?
          }
          <Carousel
            title="Weather"
            description="Select your current weather or from our choices"
            items={weatherChoices}
          />
          <LengthPicker
            title="Playlist length"
            description="How many tracks do you want in your playlist?"
          />
          <Button
            title="Okay, leggo"
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
    fontSize: 42,
  },
});


export default FilterScreen;