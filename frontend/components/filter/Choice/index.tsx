import React from 'react';
import { View, Image, Text, TouchableWithoutFeedback, ImageBackground } from 'react-native';
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

const images = {
    "chill": require('./images/chill.png'),
    "chill-selected": require('./images/chill-selected.png'),
    "bed": require('./images/bed.png'),
    "bed-selected": require('./images/bed-selected.png'),
    "gym": require('./images/gym.png'),
    "gym-selected": require('./images/gym-selected.png'),
    "study": require('./images/study.png'),
    "study-selected": require('./images/study-selected.png'),
    "party": require('./images/party.png'),
    "party-selected": require('./images/party-selected.png'),
    "pop": require('./images/pop.png'),
    "r_and_b": require('./images/r_and_b.png'),
    "indie": require('./images/indie.png'),
    "hiphop": require('./images/hiphop.png'),
}

const ChoiceComponent = (props: Props) => {

    var highlight;
    var bold;
    if (props.selected) {
        bold = styles.bold;
    }

    var image;
    var imageText;
    if (props.choice.imageUri) {
        let imagePath = props.selected ? props.choice.imageUri + "-selected" : props.choice.imageUri;
        if (props.choice.isGenre === true) {
            imagePath = props.choice.imageUri;
        }
        image = <Image source={images[imagePath]} style={props.choice.isGenre === true ? { width: 150, height: 150 } : {}}></Image >
    }

    if (props.choice.imageTitle) {
        imageText = <Text style={styles.imageText}>{props.choice.imageTitle}</Text>
    }

    return (
        <TouchableWithoutFeedback onPress={props.onPress}>

            <View style={styles.container}>

                <ImageBackground style={{ borderRadius: 16, overflow: 'hidden' }} resizeMode='cover' source={props.selected ? require('./images/background-selected.png') : require('./images/background-unselected.png')}>

                    <View style={[styles.image, highlight]}>
                        {image}
                        {imageText}
                    </View>
                </ImageBackground>

                <Text style={[styles.cardBottomText, bold]}>{props.choice.label}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default ChoiceComponent;