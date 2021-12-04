import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FilterScreen from './screens/FilterScreen';
import AlbumScreen from './screens/AlbumScreen';
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
          headerTransparent: true,
          headerLargeTitle: true,
          headerTitleStyle: {
            fontFamily: 'Roboto',
          },
          headerLargeTitleStyle: {
            fontFamily: 'Roboto',
          }
        }}>
          <Stack.Screen name="Filter" component={FilterScreen} />
          <Stack.Screen name="Playlist" component={AlbumScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}
export default App;