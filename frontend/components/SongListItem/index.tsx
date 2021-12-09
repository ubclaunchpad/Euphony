import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image'

import styles from './styles';
import {Song} from "../../types";

import IonIcons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import { Shadow } from 'react-native-shadow-2';

export type SongListItemProps = {
    song: Song,
    deleteSong: Function
}

const SongListItem = (props: SongListItemProps) => {
    const { song, deleteSong } = props;
    return (
        <View>
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <FastImage source={{ uri: song.imageUrl }} style={styles.image}/>
                    <View style={styles.info}>
                        <Text style={styles.title}>{song.name}</Text>
                        <View style={styles.sub}>
                            <Text style={styles.artist}>{song.artists[0].name}</Text>
                            <Entypo
                                name="dot-single"
                                size={18}
                                color={'#867CC0'}
                            />
                            <Text style={styles.duration}>{song.duration}</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.rightContainer} onPress={() => deleteSong(song.id)}>
                    <IonIcons
                        name="remove-circle-outline"
                        size={25}
                        color={'red'}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.divider}>
                <View style={styles.line} />
            </View>
        </View>
    )
}

export default SongListItem;