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
          headerTransparent: true,
          headerLargeTitle: true,
          headerTitleStyle: {
            fontFamily: 'Raleway',
            fontWeight: '800',
            fontSize: 22
          },
          headerLargeTitleStyle: {
            fontFamily: 'Raleway',
            fontWeight: '800',
          }
        }}>
          <Stack.Screen name="Filter" component={FilterScreen} />
          <Stack.Screen name="Playlist" component={AlbumScreen}
            options={({navigation, route}) => ({ 
              title: "Results",
              headerStyle: {
                backgroundColor: 'hsla(0, 0%, 100%, 0.8)',
              },
              headerRight: () => (
              <View style={{flexDirection: 'row', justifyContent: 'center', paddingBottom: 5}}> 
                <MaterialIcons
                  name="refresh"
                  size={24}
                  color={'hsl(0, 0%, 0%)'}
                  style={{paddingRight:20}}
                />
                <MaterialIcons
                  name="info-outline"
                  size={24}
                  color={'hsl(0, 0%, 0%)'}
                  onPress={() => navigation.navigate("PlaylistInfo", albumDetails)}
                  style={{paddingRight:10}}
                />
              </View>
              ), })} />
          <Stack.Screen name="PlaylistInfo" component={PlaylistInfo} 
          options={() => ({ 
            title: "Results Info"})}/>
              
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}
export default App;