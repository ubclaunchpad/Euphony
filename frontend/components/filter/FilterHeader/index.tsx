import React from 'react';
import { FunctionComponent } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Choice } from '../../../types';
import ChoiceComponent from '../Choice';
import styles from "./styles";

interface Props {

    /* The title */
    title: string,

    /* The description placed under the header */
    description: string,

    /* The function that is called when the clear button is pressed */
    callback?: (a: any) => void,

    /* Whether this filter is required */
    required?: boolean,
}

const FilterHeader: FunctionComponent<Props> = (props) => {
    var clearButton;
    var requiredText;

    if (props.required) {
        requiredText = <Text style={styles.requiredText}>REQUIRED</Text>
    } else {
        clearButton = <TouchableOpacity
            style={styles.clearButton}
            onPress={props.callback}>
            <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
    }

    return (
        <View style={styles.container}>
            <View style={styles.textStackView}>
                <Text style={styles.title}>{props.title}</Text>
                {requiredText}
            </View>
            <Text style={styles.description}>{props.description}</Text>
            {clearButton}
        </View>
    );
}

FilterHeader.defaultProps = {
    required: true
}

export default FilterHeader;