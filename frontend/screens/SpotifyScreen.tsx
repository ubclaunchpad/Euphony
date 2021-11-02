import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


export default function HomeScreen() {
  return (
    <View style={styles.container} lightColor="#eee" darkColor="rgba(255,255,255,0.1)">
      <Text style={styles.text}>Hello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  text: {
    color: "white"
  },
});
