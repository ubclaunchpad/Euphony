import * as React from 'react';
import { View, Text, Button } from 'react-native';

export type Props = {
    title: string;
    description: string;
}

// Formed after https://reactnative.dev/docs/typescript
const LengthPicker: React.FC<Props> = ({
    title, 
    description
}) => {
    return (
        <View>
          <Text>{title}</Text>
          <Text>{description}</Text>
          <Button
            title="clear"
            onPress={() => console.log("Cleared")}
          />
          <Button
           // like choices...
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