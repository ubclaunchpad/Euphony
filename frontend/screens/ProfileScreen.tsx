import React, { useLayoutEffect } from 'react';
import { StatusBar, SafeAreaView, TouchableOpacity, View, Text, StyleSheet, Image  } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useHeaderHeight } from '@react-navigation/elements';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const profileImage = require('./images/profile.png');

const ProfileScreen = ({navigation}) => {
    const headerHeight = useHeaderHeight();
    // set Navigation Screen options leaving
   useLayoutEffect(() => {
    navigation.setOptions({
      headerLargeTitle: true,
      headerTitleStyle: {
        fontSize: 30,
        fontFamily: 'Raleway-Bold',
        color:'white',
      },
      headerTitleAlign: "left",
      headerTransparent: true,
      headerShadowVisible: false,
      headerLeft: () => (
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}
          style={{paddingRight: 8}}>
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              color={'hsl(0, 0%, 100%)'}
              style={{ paddingLeft: 10 }}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

    return (
        <View style={{ backgroundColor: 'white', flex: 1, }}>
            <StatusBar translucent barStyle="light-content" backgroundColor="transparent"/>

            <LinearGradient colors={['#843CDE', '#4A18DD', '#2E1181']} style={{flex: 1}}>
                <SafeAreaView style={{alignItems: 'center', marginTop: headerHeight}}>
                    <View style={{backgroundColor: 'white', marginTop: 20, width: 340, borderRadius: 15, padding: 25}}>
                        <View style={styles.playlistInformation}>
                            <Image source={profileImage} style={styles.image}/>
                            <View style={styles.info}>
                                <Text style={styles.spotifyName}>John Doe</Text>
                                <TouchableOpacity>
                                    <Text style={[styles.redirectText, styles.underline]}>Open on Spotify </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.divider}>
                            <View style={styles.line} />
                        </View>
                        <View>
                            <Text style={styles.playlistTitle}>Your Playlists</Text>
                            <Text style={styles.redirectText}>List of Spotify playlists used to personalize results for you</Text>
                        </View>
                        <View style={styles.divider}>
                            <View style={styles.line} />
                        </View>
                        <View>
                            <Text style={styles.item}>Liked Songs</Text>
                            <Text style={styles.item}>On Repeat</Text>
                            <Text style={styles.item}>Time Capsule</Text>
                            <Text style={styles.item}>Playlist Name 1</Text>
                            <Text style={styles.item}>Playlist Name 2</Text>
                        </View>
                        <View style={styles.divider}>
                            <View style={styles.line} />
                        </View>
                        <TouchableOpacity style={{flexDirection: 'row', marginTop: 10}}>
                                <View style={styles.button}>
                                    <MaterialCommunityIcons name="spotify" size={30} color={'white'} />
                                    <Text style={styles.buttonText}>DISCONNECT SPOTIFY</Text>
                                </View>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity>
                        <View style={styles.informationButton}>
                            <Text style={styles.disclaimer}>HOW WE USE YOUR INFORMATION</Text>
                            <MaterialIcons
                                name="arrow-forward-ios"
                                size={15}
                                color={'#3700AB'}
                                style={{ paddingLeft: 10 }}
                            />
                        </View>
                    </TouchableOpacity>
                </SafeAreaView>
            </LinearGradient>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 6,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 19,
        padding: 10
    },
    image: {
        width: 55,
        height: 55,
        borderRadius: 25,
    },
    info: {
        marginTop: 5,
        marginLeft: 10,
    },
    underline: {
        textDecorationLine: 'underline'
    },
    spotifyName: {
        color: '#3700AB',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Avenir'
    },
    disclaimer: {
        color: '#3700AB',
        fontSize: 13,
        fontWeight: 'bold',
        fontFamily: 'Avenir'
    },
    item: {
        color: '#3700AB',
        fontSize: 15,
        fontFamily: 'Avenir-Medium',
        paddingBottom: 10,
    },
    redirectText: {
        color: '#867CC0',
        marginRight: 5,
        fontSize: 14,
        fontFamily: 'Avenir-Medium'
    },
    playlistTitle: {
        color: '#3700AB',
        marginRight: 5,
        fontSize: 18,
        fontFamily: 'Avenir',
        fontWeight: 'bold',
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15
    },
    line: {
        flex: 1, 
        height: 0.5, 
        backgroundColor: '#CDC4F2'
    },
    playlistInformation: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    button: {
        backgroundColor: '#7432FF',
        height: 50,
        width: 320,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        flex: 1,
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        margin: 10
    },
    informationButton: {
        backgroundColor: 'white', 
        marginTop: 20, 
        width: 340, 
        borderRadius: 15, 
        padding: 25, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
    },
})

export default ProfileScreen;