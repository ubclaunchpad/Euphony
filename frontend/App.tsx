import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FilterScreen from './screens/FilterScreen';
import AlbumScreen from './screens/AlbumScreen';
import ProfileScreen from './screens/ProfileScreen';
import PlaylistInfo from './screens/PlaylistInfo';

import AppContext from './AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();


function App() {
  const [token, setAuthToken] = React.useState<string | null>("");

  const userSettings = {
    authToken: token,
    setAuthToken: setAuthToken,
  };

  React.useEffect(() => {
    AsyncStorage.getItem('@token').then((value) => {
      if (value) {
        console.log("Token from async storage is " + value)
        setAuthToken(value);
      } else {
        setAuthToken(null);
      }
    });
  }, []);


  React.useEffect(() => {
    if (token != null) {
      console.log("Setting token as " + token);
      AsyncStorage.setItem('@token', token)
    }
  }, [token]);
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
          <Stack.Screen name="Filters" component={FilterScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Playlist" component={AlbumScreen} />
          <Stack.Screen name="PlaylistInfo" component={PlaylistInfo}
            options={() => ({
              title: "Results Info"
            })} />

        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}
export default App;