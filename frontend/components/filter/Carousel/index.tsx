import React, { FC, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import {Choice} from '../../../types';
import ChoiceComponent from '../Choice';
import styles from "./styles";
import FilterHeader from '../FilterHeader';

export type Props = {
    choices: [Choice],
    title: string,
    description: string,
}


const Carousel = (props: Props) => {
    const [selectedChoice, setSelectedChoice] = useState(-1);
    return (
    <View style={styles.container}>
         <FilterHeader 
            title={props.title}
            description={props.description}
            callback={() => setSelectedChoice(-1)}
           />

        <FlatList 
            data={props.choices}
            renderItem={({ item, index }) => <ChoiceComponent choice={item} onPress={(event) => index === selectedChoice ? setSelectedChoice(-1) : setSelectedChoice(index)} selected={selectedChoice === index}/>}
            keyExtractor={( item ) => item.id}
            showsHorizontalScrollIndicator={false}
            horizontal
        />
    </View>);

}

export default Carousel;