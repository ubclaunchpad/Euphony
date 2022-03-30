import * as React from 'react';
import { SafeAreaView, TouchableHighlight, StyleSheet, Button, Text, View, Image, ImageBackground, Alert } from 'react-native';
import { baseProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';
import AsyncStorage from '@react-native-async-storage/async-storage';

function OnboardingScreen(props) {
    const [page, setPage] = React.useState(<ScrollA/>);

    return (
        <ImageBackground source={require('./images/onboarding-background.png')} style={{ flex: 1 }}>
            {page}
        </ImageBackground>
    );

    function ScrollA() {
        return (
            <SafeAreaView style={styles.cardContainer}>
                <Text style={styles.skipText} onPress={() => {
                    props.onComplete()
                    AsyncStorage.setItem('alreadyLaunched', 'true')
                }}>Skip</Text>
    
                <View style={styles.swipeable}>
                    <View style={styles.graphicContainer}>
                        <Image source={require('./images/onboarding-a.png')} style={styles.graphicA}/>
                    </View>
                    <View style={styles.textStack}>
                        <Text style={styles.headerText}>Welcome to</Text>
                        <Text style={styles.headerText}><Text style={styles.purpleText}>Euphony</Text>!</Text>
                        <Text style={styles.baseText}>Where we strive to make your music listening experience Eu-nique.</Text>
                    </View>
                    <View style={styles.pageIndicator}>
                        <Text style={styles.pageIndicatorTxt}>1 of 3</Text>
                    </View>
                </View>
    
                <TouchableHighlight style={styles.rightButton} onPress={() => setPage(<ScrollB/>)} underlayColor="#9663ff">
                    <Image source={require('./images/rightarrow.png')} style={{width: 20, height: 10, resizeMode: 'stretch'}}/>
                </TouchableHighlight>
            </SafeAreaView>
        );
    }

    function ScrollB() {
        return (
            <SafeAreaView style={styles.cardContainer}>
                <Text style={styles.skipText} onPress={() => {
                    props.onComplete()
                    AsyncStorage.setItem('alreadyLaunched', 'true')
                }}>Skip</Text>
    
                <View style={styles.swipeable}>
                    <View style={styles.graphicContainer}>
                        <Image source={require('./images/onboarding-b.png')} style={styles.graphicB}/>
                    </View>
                    <View style={styles.textStack}>
                        <Text style={styles.headerText}>Customize your</Text>
                        <Text style={styles.headerText}>playlist with <Text style={styles.purpleText}>filters</Text></Text>
                        <Text style={styles.baseText}>We are constantly optimizing our models for more accurate results.</Text>
                    </View>
                    <View style={styles.pageIndicator}>
                        <Text style={styles.pageIndicatorTxt}>2 of 3</Text>
                    </View>
                </View>

                <TouchableHighlight style={styles.leftButton} onPress={() => setPage(<ScrollA/>)} underlayColor="#9663ff">
                    <Image source={require('./images/leftarrow.png')} style={{width: 20, height: 10, resizeMode: 'stretch'}}/>
                </TouchableHighlight>
    
                <TouchableHighlight style={styles.rightButton} onPress={() => setPage(<ScrollC/>)} underlayColor="#9663ff">
                    <Image source={require('./images/rightarrow.png')} style={{width: 20, height: 10, resizeMode: 'stretch'}}/>
                </TouchableHighlight>
            </SafeAreaView>
        );
    }

    function ScrollC() {
        return (
            <SafeAreaView style={styles.cardContainer}>
                <Text style={styles.skipText} onPress={() => {
                    props.onComplete()
                    AsyncStorage.setItem('alreadyLaunched', 'true')
                }}>Skip</Text>
    
                <View style={styles.swipeable}>
                    <View style={styles.graphicContainer}>
                        <Image source={require('./images/onboarding-c.png')} style={styles.graphicC}/>
                    </View>
                    <View style={styles.textStack}>
                        <Text style={styles.headerText}>Playlists curated by</Text>
                        <Text style={styles.headerText}><Text style={styles.purpleText}>you</Text>, for <Text style={styles.purpleText}>you</Text></Text>
                        <Text style={styles.baseText}>For more personalized results, connect your Spotify account.</Text>
                    </View>
                    <View style={styles.pageIndicator}>
                        <Text style={styles.pageIndicatorTxt}>3 of 3</Text>
                    </View>
                </View>
    
                <TouchableHighlight style={styles.leftButton} onPress={() => setPage(<ScrollB/>)} underlayColor="#9663ff">
                    <Image source={require('./images/leftarrow.png')} style={{width: 20, height: 10, resizeMode: 'stretch'}}/>
                </TouchableHighlight>

                <TouchableHighlight style={[styles.spotifyButtonContainer, styles.shadowPropIOS, styles.shadowPropAndroid]} onPress={() => Alert.alert('bruh!')} underlayColor="#9663ff">
                    <View style={styles.spotifyButton}>
                        <Image source={require('./images/spotify-logo.png')} style={{width: 22, height: 33, resizeMode: 'stretch'}}/>
                        <Text style={styles.spotifyText}>CONNECT SPOTIFY</Text>
                    </View>
                </TouchableHighlight>
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 30
    },
    swipeable: {
        display: "flex",
        justifyContent: "center",
        position: 'relative',
        bottom: 25
    },
    graphicContainer: {
        height: 320,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    graphicA: {
        width: '130%',
        resizeMode: 'contain',
        marginBottom: 30
    },
    graphicB: {
        width: '140%',
        resizeMode: 'contain'
    },
    graphicC: {
        width: '140%',
        resizeMode: 'contain'
    },
    skipText: {
        fontFamily: "transat-bold",
        fontSize: 18,
        color: "#7432FF",
        lineHeight: 40,
        textAlign: 'left',
        marginBottom: 10,
        position: "absolute",
        top: 30,
        right: 40
    },
    baseText: {
        fontFamily: "Avenir-Medium",
        fontSize: 16,
        lineHeight: 25,
        marginTop: 20,
        textAlign: 'left',
        color: "#13008A"
    },
    headerText: {
        fontFamily: "transat-bold",
        fontSize: 30,
        lineHeight: 40,
        textAlign: 'left',
        color: "black"
    },
    spotifyText: {
        fontFamily: "Roboto-Bold",
        fontSize: 14,
        lineHeight: 40,
        textAlign: 'left',
        color: "white"
    },
    textStack: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: -25,
        padding: 10
    },
    purpleText: {
        color: "#7432FF",
        fontFamily: "transat-black"
    },
    pageIndicator: {
        width: 60,
        padding: 3,
        borderRadius: 20,
        backgroundColor: "#E2DBFF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
        marginLeft: 10
    },
    pageIndicatorTxt: {
        fontFamily: "Avenir-Medium",
        color: "#13008A",
        fontSize: 14
    },
    leftButton: {
        width: 50,
        height: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        backgroundColor: "#7432FF",
        position: 'absolute',
        bottom: 50,
        left: 40
    },
    rightButton: {
        width: 50,
        height: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        backgroundColor: "#7432FF",
        position: 'absolute',
        bottom: 50,
        right: 40
    },
    spotifyButtonContainer: {
        width: 210,
        height: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        backgroundColor: "#7432FF",
        position: 'absolute',
        bottom: 50,
        right: 40
    },
    shadowPropIOS: {
        shadowColor: '#4D00CB',
        shadowOffset: {width: 0, height: -4},
        shadowOpacity: 0.13,
        shadowRadius: 6
    },
    shadowPropAndroid: {
        elevation: 6,
        shadowColor: '#4D00CB'
    },
    spotifyButton: {
        width: '100%',
        height: '100%',
        display: "flex",
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 50,
        backgroundColor: "#7432FF",
        paddingRight: 25,
        paddingLeft: 25
    }
});


export default OnboardingScreen;
