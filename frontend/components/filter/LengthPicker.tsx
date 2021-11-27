import * as React from 'react';
import { View, Text, Button } from 'react-native';
import FilterHeader from './FilterHeader';

export type Props = {
    title: string;
    description: string;
}

const LengthPicker = (props: Props) => {
    return (
        <View>
          <FilterHeader
            title={props.title}
            description={props.description}
            callback={() => 1}
          />
          <Button
            title="10"
            onPress={() => console.log("10")}
          />
          <Button
            title="20"
            onPress={() => console.log("20")}
          />
          <Button
            title="30"
            onPress={() => console.log("30")}
          />
          <Button
            title="40"
            onPress={() => console.log("40")}
          />
          <Button 
            title="50"
            onPress={() => console.log("50")}
          />
        </View>
      );
}

export default LengthPicker;