import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, Button } from 'react-native';
import { Album } from '../../types';
import styles from './styles';
import { MaterialCommunityIcons, Entypo, AntDesign } from 'react-native-vector-icons';

export type AlbumHeaderProps = {
    album: Album;
}

const AlbumHeader = (props: AlbumHeaderProps) => {
    const { album } = props;

    const [toggle, setToggle] = useState(false);

    return (
        <View style={styles.container}>
            {/* cover image */}
            <Image source={{uri: album.imageUri}} style={styles.image} />
            {/* Name */}
            <TouchableOpacity>
                <View style={styles.title}>
                    <Text style={styles.name}>{album.name}</Text>
                    {/* <AntDesign name="edit" size={18} color={'hsl(0, 0%, 15%)'} style={styles.edit}/> */}
                </View>
            </TouchableOpacity>
            {/* creator... number of likes */}
            <View style={styles.creatorContainer}>
                {/* TODO: need to rename style names*/}
                <Text style={styles.likes}>{album.songs.length} tracks</Text>
                { /* <Entypo name="dot-single" size={15} color={"hsl(0, 0%, 46%)"}/> */}
                <Text style={styles.creator}>{album.duration}</Text>
                
            </View>

            {/* public or private toggle*/}
            <View style={styles.visibilityButton}>
                <TouchableOpacity style={styles.visibilitySectionAlpha}>
                    <Text style={styles.visibilityTextAlpha}>Public</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.visibilitySectionBeta}>
                    <Text style={styles.visibilityTextBeta}>Private</Text>
                </TouchableOpacity>
            </View>

            {/* play button */}
            <TouchableOpacity>
                <View style={styles.button}>
                    { /* <MaterialCommunityIcons name="spotify" size={30} color={"white"}/> */}
                    <Text style={styles.buttonText}>Add to Spotify</Text>
                </View>
            </TouchableOpacity>
            
            <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                    <Text style={styles.tracksHeader}>Tracks</Text>
                </View>
            </View>
        </View>
    )
}

export default AlbumHeader;