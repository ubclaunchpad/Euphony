import React from 'react'
import { View, Text } from 'react-native'
import { styles } from './styles'

export const IconChoice = (props: any) => {

  const { label, icon } = props;

  return (
    <View style={styles.stat}>
        {/* icon here */}
        <Text style={{ ...styles.statLabel }}>
          {label}
        </Text>
    </View>
  );
}

export default IconChoice;