import React from 'react';
import { View, Text, Button } from 'react-native';
import FilterHeader from './FilterHeader';

interface Props {
    /* The title */
    title: string,
    
    /* The description placed under the header */
    description: string,
}

const LocationPicker = (props: Props) => {
    return (
        <View>
          <FilterHeader 
            title={props.title}
            description={props.description}
            callback={() => 1}
            required={false}
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