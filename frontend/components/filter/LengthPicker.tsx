import * as React from 'react';
import { View, Text, Button } from 'react-native';
import FilterHeader from './FilterHeader';
import Slider from '@react-native-community/slider';

export type Props = {
    title: string;
    description: string;
}

const LengthPicker = (props: Props) => {
    const [value, setValue] = React.useState(1);
    return (
        <View>
          <FilterHeader
            title={props.title}
            description={props.description}
            callback={() => 1}
          />
          <Slider
            style={{height: 40, width: 300}}
            minimumValue={1}
            maximumValue={50}
            minimumTrackTintColor="#7432FF"
            maximumTrackTintColor="#FFFFFF"
            step={1}
            onValueChange={setValue}
          />
          <Text>{value}</Text>
        </View>
      );
}

export default LengthPicker;