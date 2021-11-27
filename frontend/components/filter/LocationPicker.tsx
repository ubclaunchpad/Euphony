import React from 'react';
import { View, Text, Button } from 'react-native';
import FilterHeader from './FilterHeader';

export type Props = {
    title: string;
    description: string;
}

const LocationPicker = (props: Props) => {
    return (
        <View>
          <FilterHeader 
            title={props.title}
            description={props.description}
            callback={() => 1}
          />
          <Button 
            title="CURRENT LOCATION"
            onPress={() => console.log("Retrieve current location")}
          />
          <Text>or select from the ones below</Text>
          <Button title="U.S.A."/>
          <Button title="Canada"/>
        </View>
      );

      // TODO
      // retrieve current location
      // checks to see if current location is not supported
      // give option of US and Canada
}

export default LocationPicker;