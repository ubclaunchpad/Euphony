import * as React from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FilterScreen from './screens/FilterScreen';
import AlbumScreen from './screens/AlbumScreen';
import PlaylistInfo from './screens/PlaylistInfo';
import albumDetails from './mockData/albumDetails';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const Stack = createNativeStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{
        headerTransparent: true,
        headerLargeTitle: true,
        headerTitleStyle: {
          fontFamily: 'Roboto',
          fontWeight: 'bold',
        },
        headerLargeTitleStyle: {
          fontFamily: 'Roboto',
          fontWeight: 'bold',
        }
      }}>
        <Stack.Screen name="Filter" component={FilterScreen} />
        <Stack.Screen name="Playlist" component={AlbumScreen}
          options={({navigation, route}) => ({ 
            title: "Results",
            headerRight: () => (
            <View style={{flexDirection: 'row', justifyContent: 'center'}}> 
              <AntDesign
                name="reload1"
                size={23}
                color={'hsl(0, 0%, 15%)'}
              />
              <Feather
                name="settings"
                size={23}
                color={'hsl(0, 0%, 15%)'}
                onPress={() => navigation.navigate("PlaylistInfo", albumDetails)}
                style={{paddingLeft:10}}
              />
            </View>
            ), })} />
        <Stack.Screen name="PlaylistInfo" component={PlaylistInfo} 
        options={() => ({ 
          title: "Results Info"})}/>
            
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;