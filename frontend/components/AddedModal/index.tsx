import React, { useEffect } from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';

import styles from './styles';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Svg, {
    Circle,
  } from 'react-native-svg';

import { Shadow } from 'react-native-shadow-2';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

export type Props = {};

const AddedModal = (props: Props) => {

    const update = () => { 
        props.onPress();
    }

    useEffect(() => {
        ReactNativeHapticFeedback.trigger("notificationSuccess");
    }, []);

    return (
        <View style={styles.container}>
            <View style={{position: 'absolute'}}>
                <Svg height="300" width="350">
                    <Circle cx="320" cy="300" r="70" fill="transparent" stroke="hsla(252, 100%, 66%, 0.1)" strokeWidth="70" />
                </Svg>
            </View>
            <View style={{position: 'absolute'}}>
                <Svg height="300" width="350">
                    <Circle cx="10" cy="300" r="50" fill="hsla(252, 100%, 66%, 0.1)"/>
                </Svg>
            </View>
            <View style={styles.topContainer}>
                <Svg height="200" width="200">
                    <Circle cx="100" cy="60" r="60" fill="hsla(252, 100%, 66%, 0.1)"  />
                </Svg>
                <Image source={require('../../src/images/success.png')} style={{position: 'absolute', marginTop: 15}}></Image>
                <View style={{backgroundColor:'white', position: 'absolute', borderRadius: 100, right: 40, bottom: 10}}>
                    <Ionicons
                        name="checkmark-circle-sharp"
                        size={40}
                        color={'#86D407'}
                    />
                </View>
            </View>
            <View style={styles.middleContainer}>
                <Text style={styles.title}>{props.name} added to Spotify!</Text>
                <Text style={styles.subheader}>Open Spotify to check out your newly added playlist</Text>
                
            </View>
            <View style={styles.bottomContainer}>
                <TouchableOpacity onPress={update}>
                    <Shadow viewStyle={{alignSelf: 'stretch'}}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>OKAY</Text>
                        </View>
                    </Shadow>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}

export default AddedModal;