import React from 'react';
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import { Choice } from '../../../types';
import styles from './styles';

export type Props = {

    /* The choice associated with this component*/
    choice: Choice,

    /* The callback function called when this is pressed. */
    onPress: (a: any) => void, 

    /* Whether this choice has been selected. */
    selected: boolean,
}

const ChoiceComponent = (props: Props) => {

    var highlight;
    if (props.selected) {
        highlight = styles.selected;
    }
    return ( 
    <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={styles.container}>
            <View style={[styles.image, highlight]}></View>
            <Text style={styles.text}>{props.choice.label}</Text>
        </View>
    </TouchableWithoutFeedback>
    )
}

export default ChoiceComponent;