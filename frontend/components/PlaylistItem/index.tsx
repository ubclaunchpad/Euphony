import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, Linking } from 'react-native';
import FastImage from 'react-native-fast-image'
import "moment-duration-format";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';
import {Song} from "../../types";

import IonIcons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import { Shadow } from 'react-native-shadow-2';

// TODO: fix type playlist
// export type PlaylistItemProps = {
//     playlist: Playlist,
//     deletePlaylist: Function
// }

const PlaylistItem = (props: any) => {
    const { playlist: playlist } = props;
    console.log("eeeee")
    console.log(playlist);

    return (
        <TouchableOpacity onPress={() => {Linking.openURL(playlist.external_urls.spotify)}}>
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <FastImage source={{ uri: playlist.images[0].url }} style={styles.image}/>
                    <View style={styles.info}>
                        <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                            <Text style={styles.title} 
                                numberOfLines={1}
                                ellipsizeMode='tail'>
                                    {playlist.name}</Text>
                            <Entypo
                                    name="dot-single"
                                    size={18}
                                    color={'#867CC0'}
                                />
                            <Text style={styles.duration}>{playlist.tracks.total} songs</Text>
                        </View>
                        <View style={styles.sub}>
                            <Text style={styles.artist}>{playlist.owner.display_name}</Text>
                            <MaterialCommunityIcons name="spotify" size={25} color={'black'} />
                        </View>
                    </View>
                </View>
                {/* Add back after demo, for a deletion feature */}
                {/* <TouchableOpacity style={styles.rightContainer}>
                    <IonIcons
                        name="remove-circle-outline"
                        size={25}
                        color={'red'}
                        style={styles.icon}
                    />
                </TouchableOpacity> */}
            </View>
        </TouchableOpacity>
    )
}

export default PlaylistItem;