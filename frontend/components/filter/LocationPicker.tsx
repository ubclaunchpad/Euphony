import * as React from 'react';
import { View, Text, Button } from 'react-native';

export type Props = {
    title: string;
    description: string;
}

// Formed after https://reactnative.dev/docs/typescript
const LocationPicker: React.FC<Props> = ({
    title, 
    description
}) => {
    return (
        <View>
          <Text>Location begin</Text>
          <Text>{title}</Text>
          <Text>{description}</Text>
          <Button
            title="clear"
            onPress={() => console.log("Cleared")}
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

      // Parts:
      // Title
      // Description 
      // X choices with icons
      // each icon has a selected and unselected state
      // can scroll through choices
      // tap to select a choice
      // clear button that deselects everything
}

export default LocationPicker;