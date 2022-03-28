import React from 'react';
import { Image, ImageBackground, View, Text, TouchableOpacity } from 'react-native';
import JGButton from '../shared/JGButton/JGButton';
import FilterHeader from './FilterHeader';
import Geolocation from '@react-native-community/geolocation';
import AppContext from '../../AppContext';

import { privateName } from '@babel/types';

Geolocation.setRNConfiguration({
  skipPermissionRequests: true,
  authorizationLevel: 'whenInUse',
});

interface Props {
  /* The title */
  title: string,

  /* The description placed under the header */
  description: string,

  lat: number | null,
  lng: number | null,
  onChange: (lat: number, lng: number) => void,
}

type WeatherInfo = {
  city: string | null,
  country: string,
  weatherC: number,
  weatherF: number,
  feelsLikeC: number,
  feelsLikeF: number,
  weatherDesc: string,
}


const LocationPicker = (props: Props) => {
  const { authToken, userID } = React.useContext(AppContext);

  let [info, setInfo] = React.useState<WeatherInfo | null>(null);
  let [isCelsius, setIsCelsius] = React.useState(true);
  let buttonView = <JGButton style={{ marginHorizontal: 20, paddingTop: 13, paddingBottom: 30, }}
    title="USE CURRENT LOCATION"
    onClick={() => {
      getWeatherData();
    }} />

  let unit = isCelsius ? "°C" : "°F"

  let locationContentView = <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', marginHorizontal: 25 }}>

    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <Image source={require("./images/location.png")} style={{ marginRight: 10 }}></Image>
        <Text style={{ fontSize: 15, fontFamily: 'Avenir', color: "#3700AB", fontWeight: 'bold', marginVertical: 14 }}>{info?.city ? info?.city + ", " : ""}{info?.country}</Text>
      </View>

      <TouchableOpacity onPress={() => { getWeatherData() }}>
        <Image source={require("./images/refresh.png")} style={{ marginRight: 10, resizeMode: 'contain', marginBottom: 4 }}></Image>
      </TouchableOpacity>
    </View>

    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', backgroundColor: 'rgba(1,0,0,0.6)', borderRadius: 16, overflow: 'hidden', marginBottom: 16 }}>
      <ImageBackground source={require('./images/location-background.png')} resizeMode="cover">
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', margin: 10 }}>
          <TouchableOpacity onPress={() => { setIsCelsius(!isCelsius) }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#5A4CAD', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 30, overflow: 'hidden' }}>
              <Text style={{ fontFamily: 'Avenir', fontWeight: "900", fontSize: 13, color: 'white' }}>°C</Text>
              <Image source={require("./images/switch.png")} style={{ resizeMode: 'contain', height: 10, width: 20, marginHorizontal: 4 }} ></Image>
              <Text style={{ fontFamily: 'Avenir', fontWeight: "900", fontSize: 13, color: 'white' }}>°F</Text>
            </View>
          </TouchableOpacity>

        </View>
        <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center', color: "#2B0084", marginBottom: 5, shadowColor: "black", marginTop: -10, shadowRadius: 4, shadowOpacity: 0.3, shadowOffset: { width: 0, height: 2 } }}>{info?.weatherDesc}</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center', color: "#2B0084", shadowColor: "black", shadowRadius: 4, shadowOpacity: 0.3, shadowOffset: { width: 0, height: 2 } }}>{isCelsius ? info?.weatherC : info?.weatherF}{unit}</Text>
        <Text style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: "#2B0084", marginTop: 10, shadowColor: "black", shadowRadius: 4, shadowOpacity: 0.3, shadowOffset: { width: 0, height: 2 } }}>Feels like {isCelsius ? info?.feelsLikeC : info?.feelsLikeF}{unit}</Text>

      </ImageBackground>

    </View>

  </View >

  let bottomView = buttonView;

  if (info) {
    bottomView = locationContentView;
  }

  return (
    <View>
      <FilterHeader
        title={props.title}
        description={props.description}
        callback={() => {
          setInfo(null);
        }}
        required={false}
      />
      {bottomView}

    </View>
  );


  function getWeatherData() {
    Geolocation.requestAuthorization()
    Geolocation.getCurrentPosition((position) => {
      props.onChange(position.coords.latitude, position.coords.longitude);

      const API_ENDPOINT = `http://localhost:4000/openWeather/weather/${position.coords.latitude},${position.coords.longitude}/`;
      const REQUEST_OPTIONS = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'userid': `${userID}`,
        }
      };
      let weather = fetch(API_ENDPOINT, REQUEST_OPTIONS)
        .then(results => {
          return results.json();
        })
      console.log(userID)
      const locationEndpoint = `http://localhost:4000/mapbox/location/${position.coords.latitude},${position.coords.longitude}/`;
      let location = fetch(locationEndpoint, REQUEST_OPTIONS)
        .then(results => {
          return results.json();
        })


      return Promise.all([weather, location])
        .then(([weatherData, locationData]) => {
          console.log(locationData)
          setInfo({
            city: locationData.city,
            country: locationData.country,
            weatherC: Math.round(weatherData.temp_c),
            weatherF: Math.round(weatherData.temp_f),
            feelsLikeC: Math.round(weatherData.feels_like_c),
            feelsLikeF: Math.round(weatherData.feels_like_f),
            weatherDesc: weatherData.mainWeather,
          })

        })
        .catch(err => console.error(err));
    })
  }

}

export default LocationPicker;