import * as React from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
            fontFamily: 'Raleway',
            fontWeight: '800',
            fontSize: 22
          },
          headerLargeTitleStyle: {
            fontFamily: 'Raleway',
            fontWeight: '800',
          },

        }}>
          <Stack.Screen name="Filters" component={FilterScreen} />
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
export default App;