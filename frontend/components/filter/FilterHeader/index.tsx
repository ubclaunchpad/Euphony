import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import {Choice} from '../../../types';
import ChoiceComponent from '../Choice';
import styles from "./styles";

export type Props = {

    /* The title */
    title: string,
    
    /* The description placed under the header */
    description: string,

    /* The function that is called when the clear button is pressed */
    callback: (a: any) => void,
}

const FilterHeader = (props: Props) => (
    <View style={styles.container}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.description}>{props.description}</Text>
        <Button title={"clear"}
                onPress={props.callback}/>
    </View>
)

export default FilterHeader;