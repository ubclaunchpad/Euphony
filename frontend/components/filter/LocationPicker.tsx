import React from 'react';
import { Image, ImageBackground, View, Text, TouchableOpacity } from 'react-native';
import JGButton from '../shared/JGButton/JGButton';
import FilterHeader from './FilterHeader';

import Endpoints, { WeatherInfo } from '../../networking/Endpoints';
import GetLocation, { LocationError } from 'react-native-get-location'
import { FilterWeatherInfo } from '../../screens/FilterScreen';
import AppContext from '../../AppContext';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';


interface Props {
  /* The title */
  title: string,

  /* The description placed under the header */
  description: string,
  onChange: (lat: number | null, lng: number | null) => void,
  locInfoObtained: (info: FilterWeatherInfo | null) => void
}

const LocationPicker = (props: Props) => {
  let appContext = React.useContext(AppContext);
  let [info, setInfo] = React.useState<WeatherInfo | null>(null);
  let [isCelsius, setIsCelsius] = React.useState(true);
  let [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  let [isLoading, setIsLoading] = React.useState(false);
  let buttonView = <JGButton style={{ marginHorizontal: 20, paddingTop: 13, paddingBottom: 30, }}
    title={"USE CURRENT LOCATION"}
    isLoading={isLoading}
    onClick={() => {
      ReactNativeHapticFeedback.trigger("soft");
      getWeatherData();
    }} />

  let unit = isCelsius ? "°C" : "°F"

  React.useEffect(
    () => {
      if (info) {
        let weatherDesc = isCelsius ? `${info.weatherC}°C` : `${info.weatherF}°F`;
        props.locInfoObtained({
          locationName: `${info.country}`,
          weatherString: `${info.weatherDesc} ${weatherDesc}`,
        })
      } else {
        props.locInfoObtained(null)
        props.onChange(null, null);
      }
    },
    [isCelsius, info]
  )

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
          <TouchableOpacity onPress={() => { setIsCelsius(!isCelsius); ReactNativeHapticFeedback.trigger("soft"); }}>
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
  let errorLabel;
  if (errorMessage) {
    errorLabel = <Text style={{ fontSize: 12, fontFamily: 'Avenir', color: "red", marginTop: 14, marginHorizontal: 25 }}>{errorMessage}</Text>
  }

  return (
    <View>
      <FilterHeader
        title={props.title}
        description={props.description}
        callback={() => {
          setErrorMessage(null);
          setInfo(null);
        }}
        required={false}
      />
      {errorLabel}
      {bottomView}

    </View >
  );



  async function getWeatherData() {
    setIsLoading(true)

    try {
      let location = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      })
      let weatherInfo = await Endpoints.getWeatherInfo(appContext, location.latitude, location.longitude)

      if (weatherInfo.weatherC == null || weatherInfo.weatherF == null) {
        throw new Error("Location Couldn't Be Found, Try Later");
      }

      props.onChange(location.latitude, location.longitude);
      setInfo(weatherInfo)
      setErrorMessage(null);
    } catch (error) {
      if ((error as LocationError).code) {
        setErrorMessage("Location " + (error as LocationError).code);
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Network Error, try again later.")
      }
    }
    setIsLoading(false)

  }


  // }


}

export default LocationPicker;