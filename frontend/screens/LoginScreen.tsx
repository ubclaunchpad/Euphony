import * as React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';


export default function LoginScreen({navigation} : {navigation:any}) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style = {styles.baseText}>For more personalized results, we recommend that you connect your Spotify account</Text>
        <Button
          title="Go to Filter"
          onPress={() => navigation.navigate('Filter')}
        />
      </View>
    );
  }

  const styles = StyleSheet.create({
    baseText: {
        fontFamily: "Roboto",
        fontSize: 24,
        fontWeight: "bold",
        marginHorizontal: 40,
    },
  });


  