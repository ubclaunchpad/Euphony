import React from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';

import styles from './styles';
import {Song} from "../../types";

import IonIcons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import { Shadow } from 'react-native-shadow-2';

export type SongListItemProps = {
    song: Song
}

const SongListItem = (props: SongListItemProps) => {
    const { song } = props;
    return (
        <View>
            <TouchableOpacity style={styles.container}>
                <View style={styles.leftXContainer}>
                    <Shadow paintInside={false} distance={5} offset={[0, 3]} startColor={'hsla(267, 100%, 41%, 0.2)'} paintInside={true}>
                        <Image source={{ uri: song.imageUri }} style={styles.image}/>
                    </Shadow>
                    <View style={styles.rightContainer}>
                        <Text style={styles.title}>{song.title}</Text>
                        <View style={styles.sub}>
                            <Text style={styles.artist}>{song.artist}</Text>
                            <Entypo
                                name="dot-single"
                                size={18}
                                color={'#867CC0'}
                            />
                            <Text style={styles.duration}>{song.duration}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.rightXContainer}>
                    <IonIcons
                        name="remove-circle-outline"
                        size={25}
                        color={'red'}
                        style={styles.icon}
                    />
                </View>
            </TouchableOpacity>

            <View style={styles.divider}>
                <View style={styles.line} />
            </View>
        </View>
    )
}

export default SongListItem;