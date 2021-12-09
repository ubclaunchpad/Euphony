import * as React from 'react';
import { View, Text } from 'react-native';
import FilterHeader from './FilterHeader';
import Slider from '@react-native-community/slider';
import styles from './Choice/styles';

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
      <View style={styles.sliderContainer}>
        <View style={styles.sliderInnerContainer}>
          <Slider
            style={{ height: 30, width: '100%' }}
            minimumValue={1}
            maximumValue={50}
            minimumTrackTintColor="#7432FF"
            maximumTrackTintColor="#FFFFFF"
            step={1}
            onValueChange={setValue}
          />
          <View style={styles.sliderLabelView}>
            <Text style={styles.text}>1</Text>
            <Text style={styles.text}>50</Text>
          </View>
        </View>
        <Text style={styles.rightSliderText}>{value}</Text>
      </View>

    </View>
  );
}

export default LengthPicker;