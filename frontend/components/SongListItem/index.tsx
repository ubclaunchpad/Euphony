import React from 'react';
import { Text, View, TouchableOpacity, Linking } from 'react-native';
import FastImage from 'react-native-fast-image'
import moment from 'moment';
import "moment-duration-format";

import styles from './styles';
import {Song} from "../../types";

import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

export type SongListItemProps = {
    song: Song,
    deleteSong: Function
}

const SongListItem = (props: SongListItemProps) => {
    const { song, deleteSong } = props;
    let duration = moment.duration(song.duration, "milliseconds").format("d[d] h[h] m[m] s[s]", {
        largest: 2
    });
    return (
        <View>
            <TouchableOpacity style={styles.container} onPress={() => Linking.openURL('https://open.spotify.com/track/' + song.id)}>
                <View style={styles.leftContainer}>
                    <FastImage source={{ uri: song.imageUrl }} style={styles.image}/>
                    <View style={styles.info}>
                        <View style={[styles.sub]}>
                            <Text style={styles.title}>{song.name}</Text>
                            
                        </View>
                        <View style={styles.sub}>
                            <MaterialCommunityIcons name="spotify" size={25} color={'black'} />
                            <Text style={styles.artist}>{song.artists[0].name}</Text>
                            <Entypo
                                name="dot-single"
                                size={18}
                                color={'#867CC0'}
                            />
                            <Text style={styles.duration}>{duration}</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.rightContainer} onPress={() => {
                    deleteSong(song.id);
                    ReactNativeHapticFeedback.trigger("soft");
                }}>
                    <IonIcons
                        name="remove-circle-outline"
                        size={25}
                        color={'red'}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </TouchableOpacity>

            <View style={styles.divider}>
                <View style={styles.line} />
            </View>
        </View>
    )
}

export default SongListItem;