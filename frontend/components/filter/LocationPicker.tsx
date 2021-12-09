import React from 'react';
import { View, Text, Button } from 'react-native';
import JGButton from '../shared/JGButton/JGButton';
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
      <JGButton style={{ marginHorizontal: 20, paddingTop: 13, paddingBottom: 30, }}
        title="CURRENT LOCATION"
        onClick={() => console.log("Retrieve current location")}
      />

    </View>
  );

  // TODO
  // retrieve current location
  // checks to see if current location is not supported
  // give option of US and Canada
}

export default LocationPicker;