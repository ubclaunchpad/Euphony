import * as React from 'react';
import { Button, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './screens/onboarding/OnboardingScreen';
import FilterScreen from './screens/FilterScreen';
import AlbumScreen from './screens/AlbumScreen';
import PlaylistInfo from './screens/PlaylistInfo';
import albumDetails from './mockData/albumDetails';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import AppContext from './AppContext';

const Stack = createNativeStackNavigator();


function App() {
  const [token, setAuthToken] = React.useState(undefined);
  
  const userSettings = {
    authToken: token,
    setAuthToken: setAuthToken,
  };

  // Onboarding Screen Logic
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched')
    .then(value => {
      console.log("Onboarding " + value)
      setIsLoading(false);
      if (value) {
        //setIsFirstLaunch(false);
      } else {
        setIsFirstLaunch(true);
      }
    })
  }, [])


  if (isLoading) {
    return <ActivityIndicator size="large" color ="#7432FF"></ActivityIndicator>
  }
  else if (isFirstLaunch == true) {
    // First launch, onboarding screen
    return <OnboardingScreen onComplete = {() => {
      setIsFirstLaunch(false);
    }} />;
  } else {
    // Rest of the app (what you get once onboarding is over)
    return (
      <AppContext.Provider value={userSettings}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" screenOptions={{
            headerLargeTitle: true,
            headerShadowVisible: true,
            headerTitleAlign: 'left',
            animation: 'slide_from_right',
            headerLargeStyle: {
              backgroundColor: 'transparent'
            },
            headerTitleStyle: {
              fontFamily: 'Raleway-ExtraBold',
              fontSize: 30
            },
            headerLargeTitleStyle: {
              fontFamily: 'Raleway-ExtraBold',
            },
  
          }}>
            <Stack.Screen name="Filters" component={FilterScreen}/>
            <Stack.Screen name="Playlist" component={AlbumScreen}
            />
            <Stack.Screen name="PlaylistInfo" component={PlaylistInfo}
              options={() => ({
                title: "Results Info"
              })} />
  
          </Stack.Navigator>
        </NavigationContainer>
      </AppContext.Provider>
    );
  }
}
export default App;