import React from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';

import styles from './styles';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, {
    Circle,
    Ellipse,
  } from 'react-native-svg';

export type Props = {};

const LeaveModal = (props: Props) => {

    const updateLeave = () => { 
        props.onLeave(props.e);
    }

    const updateCancel = () => { 
        props.onCancel();
    }

    return (
        <View style={styles.container}>
            <View style={{position: 'absolute'}}>
                <Svg height="350" width="350">
                    <Circle cx="320" cy="300" r="70" fill="transparent" stroke="hsla(252, 100%, 66%, 0.1)" strokeWidth="70" />
                </Svg>
            </View>
            <View style={{position: 'absolute'}}>
                <Svg height="350" width="350">
                    <Circle cx="10" cy="300" r="50" fill="hsla(252, 100%, 66%, 0.1)"/>
                </Svg>
            </View>
            <View style={styles.topContainer}>
                <Svg height="200" width="200">
                    <Circle cx="100" cy="60" r="60" fill="hsla(252, 100%, 66%, 0.1)"  />
                </Svg>
                <FontAwesome5
                    name="sad-tear"
                    size={90}
                    color={'black'}
                    style={{position: 'absolute', padding: 13}}
                />
                <View style={{backgroundColor:'white', position: 'absolute', borderRadius: 100, right: 40, bottom: 10}}>
                    <MaterialCommunityIcons
                        name="alert-circle"
                        size={40}
                        color={'red'}
                    />
                </View>
            </View>
            <View style={styles.middleContainer}>
                <Text style={styles.title}>You have not saved your playlist yet!</Text>
                <Text style={styles.subheader}>Are you sure you want to abandon {props.name}?</Text>
                
            </View>
            <View style={styles.bottomContainer}>
                <TouchableOpacity onPress={updateLeave}>
                    <View style={styles.buttonLeave}>
                        <Text style={styles.buttonLeaveText}>LEAVE</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={updateCancel}>
                    <View style={styles.buttonCancel}>
                        <Text style={styles.buttonCancelText}>CANCEL</Text>
                    </View>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}

export default LeaveModal;