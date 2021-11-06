/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, Entypo, MaterialCommunityIcons, MaterialIcons } from 'react-native-vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import NotFoundScreen from '../screens/NotFoundScreen';
import HomeScreen from '../screens/HomeScreen';
import AlbumScreen from '../screens/AlbumScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import WeatherScreen from '../screens/WeatherScreen';
import LoginScreen from '../screens/LoginScreen';
import SpotifyScreen from '../screens/SpotifyScreen';
import LocationScreen from '../screens/LocationScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps, TabOneParamList } from '../types';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen
        name="TabOneScreen"
        component={HomeScreen}
        options={{ headerTitle: 'Home',
          headerStyle:{ backgroundColor: '#FFF'},
          headerTitleStyle:{ color: 'green'},
        }}
      />

      <Stack.Screen
        name="AlbumScreen"
        component={AlbumScreen}
        options={{ 
          headerTitle: '',
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          shadowOpacity: 0,
          borderBottomWidth: 0, }}
      />
    </Stack.Navigator>
      
  );
}


/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'Home'
        })}
      />
      <BottomTab.Screen
        name="Custom Login"
        component={LoginScreen}
        options={{
          title: 'Custom Login'}}
      />
      <BottomTab.Screen
        name="Spotify OAuth"
        component={SpotifyScreen}
        options={{
          title: 'OAuth?',}}
      />
      <BottomTab.Screen
        name="Weather"
        component={WeatherScreen}
        options={{
          title: 'Weather',}}
      />
      <BottomTab.Screen
        name="Geolocation"
        component={LocationScreen}
        options={{
          title: 'Geolocation',}}
      />
    </BottomTab.Navigator>
  );
}
