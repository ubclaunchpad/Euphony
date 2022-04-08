import * as React from 'react';
import { Button, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './screens/onboarding/OnboardingScreen';
import FilterScreen from './screens/FilterScreen';
import AlbumScreen from './screens/AlbumScreen';
import ProfileScreen from './screens/ProfileScreen';
import AppContext from './AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authHandler } from './networking/Endpoints';
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

  // Onboarding Screen Logic
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);

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

  React.useLayoutEffect(() => {
    AsyncStorage.getItem('alreadyLaunched')
      .then(value => {
        setIsLoading(false);
        if (value) {
          setIsFirstLaunch(false);
        } else {
          setIsFirstLaunch(true);
        }
      })
  }, [])

  if (isLoading) {
    return <ActivityIndicator size="large" color="#7432FF"></ActivityIndicator>
  }
  else if (isFirstLaunch == true) {
    // First launch, onboarding screen
    return (<AppContext.Provider value={userSettings}>
      <OnboardingScreen onComplete={() => {
        setIsFirstLaunch(false);
      }} />
    </AppContext.Provider>);

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
}
export default App;