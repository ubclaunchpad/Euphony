import * as React from 'react';
import { SafeAreaView, TouchableHighlight, StyleSheet, Button, Text, View, Image, ImageBackground, Alert, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from '../../AppContext';
import { authHandler } from '../../networking/Endpoints';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

function OnboardingScreen(props) {
    const globalContext = React.useContext(AppContext);
    const [page, setPage] = React.useState(<ScrollA />);

    // trigger haptic feedback whenever the page changes
    React.useEffect(() => {
        ReactNativeHapticFeedback.trigger("soft");
    }, [page]);

    return (
        <SafeAreaView style={styles.main}>
            <StatusBar translucent barStyle="dark-content" backgroundColor="transparent" />

            <ImageBackground source={require('./images/onboarding-background.png')} style={{ flex: 1 }}>
                {page}
            </ImageBackground>
        </SafeAreaView>
    );

    function ScrollA() {
        return (
            <View style={styles.cardContainer}>
                <Text style={styles.skipText} onPress={() => {
                    globalContext.setAuthToken("")
                    props.onComplete()
                    AsyncStorage.setItem('alreadyLaunched', 'true')
                }}>Skip</Text>

                <View style={styles.swipeable}>
                    <View style={styles.graphicContainer}>
                        <Image source={require('./images/onboarding-a.png')} style={styles.graphicA} />
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

                <TouchableHighlight style={styles.rightButton} onPress={() => setPage(<ScrollB />)} underlayColor="#9663ff">
                    <Image source={require('./images/rightarrow.png')} style={{ width: 20, height: 10, resizeMode: 'stretch' }} />
                </TouchableHighlight>
            </View>
        );
    }

    function ScrollB() {
        return (
            <View style={styles.cardContainer}>
                <Text style={styles.skipText} onPress={() => {
                    globalContext.setAuthToken("")

                    props.onComplete()
                    AsyncStorage.setItem('alreadyLaunched', 'true')
                }}>Skip</Text>

                <View style={styles.swipeable}>
                    <View style={styles.graphicContainer}>
                        <Image source={require('./images/onboarding-b.png')} style={styles.graphicB} />
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

                <TouchableHighlight style={styles.leftButton} onPress={() => setPage(<ScrollA />)} underlayColor="#9663ff">
                    <Image source={require('./images/leftarrow.png')} style={{ width: 20, height: 10, resizeMode: 'stretch' }} />
                </TouchableHighlight>

                <TouchableHighlight style={styles.rightButton} onPress={() => setPage(<ScrollC />)} underlayColor="#9663ff">
                    <Image source={require('./images/rightarrow.png')} style={{ width: 20, height: 10, resizeMode: 'stretch' }} />
                </TouchableHighlight>
            </View>
        );
    }

    function ScrollC() {
        return (
            <View style={styles.cardContainer}>
                <Text style={styles.skipText} onPress={() => {
                    globalContext.setAuthToken("")

                    props.onComplete()
                    AsyncStorage.setItem('alreadyLaunched', 'true')
                }}>Skip</Text>

                <View style={styles.swipeable}>
                    <View style={styles.graphicContainer}>
                        <Image source={require('./images/onboarding-c.png')} style={styles.graphicC} />
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

                <TouchableHighlight style={styles.leftButton} onPress={() => setPage(<ScrollB />)} underlayColor="#9663ff">
                    <Image source={require('./images/leftarrow.png')} style={{ width: 20, height: 10, resizeMode: 'stretch' }} />
                </TouchableHighlight>

                <TouchableHighlight style={[styles.spotifyButtonContainer, styles.shadowPropIOS, styles.shadowPropAndroid]} onPress={async () => {
                    try {
                        let result = await authHandler.onLogin();
                        globalContext.setUserID(result.userID);
                        globalContext.setRefreshToken(result.refreshToken);
                        globalContext.setAuthToken(result.accessToken);
                        AsyncStorage.setItem('alreadyLaunched', 'true')
                        props.onComplete()
                        ReactNativeHapticFeedback.trigger("notificationSuccess");
                    } catch (error) {
                        if (error instanceof Error) {
                            Alert.alert(error.message)
                        }
                    }
                }} underlayColor="#9663ff">
                    <View style={styles.spotifyButton}>
                        <Image source={require('./images/spotify-logo.png')} style={{ width: 22, height: 33, resizeMode: 'stretch' }} />
                        <Text style={styles.spotifyText}>CONNECT SPOTIFY</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    main: {
        backgroundColor: 'white',
        flex: 1
    },
    cardContainer: {
        display: "flex",
        height: '100%',
        padding: 40,
        alignItems: 'center',
        flexDirection: "column",
        justifyContent: "center",
    },
    swipeable: {
        display: "flex",
        justifyContent: "center",
        position: 'relative',
        bottom: 25,
        width: '100%',
    },
    graphicContainer: {
        height: 320,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
        fontFamily: "Avenir",
        fontWeight: 'bold',
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
        fontFamily: "Avenir",
        fontSize: 16,
        lineHeight: 25,
        marginTop: 20,
        textAlign: 'left',
        color: "#13008A"
    },
    headerText: {
        fontWeight: 'bold',
        fontFamily: 'Avenir',
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
        fontWeight: 'bold',
        fontFamily: 'Avenir',
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
        shadowOffset: { width: 0, height: -4 },
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
