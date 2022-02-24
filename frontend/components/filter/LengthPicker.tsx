import * as React from 'react';
import { View, Text } from 'react-native';
import FilterHeader from './FilterHeader';
import Slider from '@react-native-community/slider';
import styles from './Choice/styles';

export type Props = {
  title: string;
  description: string;
  value: number;
  onChange: (value: number) => void;
}

const LengthPicker = (props: Props) => {
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
            maximumTrackTintColor="grey"
            step={1}
            onValueChange={(value) => {
              props.onChange(value);
            }}
          />
          <View style={styles.sliderLabelView}>
            <Text style={styles.text}>1</Text>
            <Text style={styles.text}>50</Text>
          </View>
        </View>
        <Text style={styles.rightSliderText}>{props.value}</Text>
      </View>

    </View>
  );
}

export default LengthPicker;