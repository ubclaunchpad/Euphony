import * as React from 'react';
import {StyleSheet, StatusBar, Image, Text, View, SafeAreaView} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import PlaylistSettings from '../components/PlaylistSettings';

export default function PlaylistScreen({route, navigation}) {
  const info = route.params;
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <PlaylistSettings album={info} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  subHeader: {
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingRight: 20,
    paddingLeft: 20,
    marginBottom: 5,
  },
});