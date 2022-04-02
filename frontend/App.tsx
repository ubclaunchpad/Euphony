import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FilterScreen from './screens/FilterScreen';
import AlbumScreen from './screens/AlbumScreen';
import ProfileScreen from './screens/ProfileScreen';
import AppContext from './AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authHandler from './networking/AppAuth';
import Endpoints from './networking/Endpoints';
import CustomHeader from './components/CustomHeader';

const Stack = createNativeStackNavigator();


function App() {
  const [token, setAuthToken] = React.useState<string | null>("");
  const [refreshToken, setRefreshToken] = React.useState<string | null>("");
  const [userID, setUserID] = React.useState<string | null>("");

  const userSettings = {
    authToken: token,
    setAuthToken: setAuthToken,
    refreshToken: refreshToken,
    setRefreshToken: setRefreshToken,
    userID: userID,
    setUserID: setUserID,
  };

  React.useEffect(() => {
    AsyncStorage.getItem('@token').then(async (value) => {
      if (value) {
        console.log("Token found in storage " + value);
        let result = await authHandler.refreshLogin(value)
        if (result) {
          setAuthToken(result.accessToken);
          setRefreshToken(result.refreshToken);
        } else {
          setAuthToken(null);
          setRefreshToken(value);
        }
      } else {
        setAuthToken(null);
        setRefreshToken(null);
      }
    });
  }, []);


  React.useEffect(() => {
    AsyncStorage.getItem('@userID').then(async (value) => {
      if (value) {
        setUserID(value);
      } else {
        setUserID(null);
      }
    }
    );
  }, []);

  React.useEffect(() => {
    console.log("Global Context Changed: " + JSON.stringify(userSettings));
  }, [userSettings])
  React.useEffect(() => {
    if (refreshToken != null) {
      console.log("Setting token as " + refreshToken);
      AsyncStorage.setItem('@token', refreshToken)
    }
  }, [refreshToken]);

  React.useEffect(() => {
    if (userID != null) {
      console.log("Setting userID as " + userID);
      AsyncStorage.setItem('@userID', userID)
    }
  }, [userID]);
  return (
    <AppContext.Provider value={userSettings}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Creation" screenOptions={{
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
          header: (props) => <CustomHeader {...props} />
        }}>
          <Stack.Screen name="Filters" component={FilterScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Playlist" component={AlbumScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}
export default App;