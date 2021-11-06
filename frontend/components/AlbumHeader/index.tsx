import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, Switch, Alert } from 'react-native';
import { Album } from '../../types';
import styles from './styles';
import { MaterialCommunityIcons, Entypo, AntDesign } from 'react-native-vector-icons';

export type AlbumHeaderProps = {
    album: Album;
}

const AlbumHeader = (props: AlbumHeaderProps) => {
    const { album } = props;

    const [toggle, setToggle] = useState(false);

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const createThreeButtonAlert = () =>
        Alert.alert(
            "Added to Spotify!",
        );

    const notSaved = () =>
        Alert.alert(
            "Go Back?",
            "You have not saved this playlist yet. Are you sure you want to abandon it?",
            [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            { text: "Leave", onPress: () => console.log("OK Pressed") }
        ]);

    return (
        <View>
            <View style={styles.container}>
                {/* cover image */}
                <TouchableOpacity onPress={notSaved}>
                    <Image source={{uri: album.imageUri}} style={styles.image} />
                </TouchableOpacity>

                {/* Header text */}

                {/* public or private toggle*/}
                <View style={styles.headerInfo}>
                    <View style={styles.headerText}>
                        {/* Name */}
                        <View style={styles.leftContainer}>
                            <View style={styles.columnStack}>
                                <TouchableOpacity>
                                    <View style={styles.title}>
                                        <Text style={styles.name}>{album.name}</Text>
                                        {/* <AntDesign name="edit" size={18} color={'hsl(0, 0%, 15%)'} style={styles.edit}/> */}
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.creatorContainer}>
                                        {/* TODO: need to rename style names*/}
                                        <Text style={styles.likes}>{album.songs.length} songs</Text>
                                        { /* <Entypo name="dot-single" size={15} color={"hsl(0, 0%, 46%)"}/> */}
                                        <Text style={styles.creator}>{album.duration}</Text>
                                        
                                </View>
                            </View>
                        </View>
                        {/* creator... number of likes */}
                        <View style={styles.rightContainer}>
                            
                        </View>
                    </View>
                    <View style={styles.visibility}>
                        <View style={styles.leftContainer}>
                            <Text style={styles.promptText}>Make playlist private</Text>
                        </View>
                        <View style={styles.rightContainer}>
                            <Switch
                                trackColor={{ false: "#767577", true: "#1CD05D" }}
                                thumbColor={isEnabled ? "hsl(0, 0%, 85%)" : "hsl(0, 0%, 85%)"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>
                    </View>
                </View>
                
                {/* play button */}
                <TouchableOpacity onPress={createThreeButtonAlert}>
                    <View style={styles.button}>
                        { /* <MaterialCommunityIcons name="spotify" size={30} color={"white"}/> */}
                        <Text style={styles.buttonText}>ADD TO SPOTIFY</Text>
                    </View>
                </TouchableOpacity>
                

            </View>

            <View style={styles.findInPlaylist}>
                <View style={styles.findContents}>
                    <Text style={styles.promptText}>Find in playlist</Text>
                </View>
            </View>
            
        </View>
    )
}

export default AlbumHeader;