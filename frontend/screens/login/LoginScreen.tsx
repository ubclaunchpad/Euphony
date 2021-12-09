import * as React from 'react';
import { SafeAreaView, TouchableOpacity, StyleSheet, Button, Text, View, Image, ImageBackground } from 'react-native';
import authHandler from '../../networking/AppAuth';
import AppContext from '../../AppContext';
import JGButton, { JGButtonImageType } from '../../components/shared/JGButton/JGButton';
export default function LoginScreen({ dismissAction }: { dismissAction: () => void }) {
    const authContext = React.useContext(AppContext);

    return (
        <ImageBackground source={require('./images/login-background.png')} style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ alignItems: "flex-end" }}>
                    <TouchableOpacity
                        style={styles.skipButton}
                        onPress={() => {
                            console.log("Skip button pressed");
                            dismissAction()
                        }}
                    >
                        <View>
                            <Text style={styles.skipText}>Skip</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.contentContainer}>
                    <View style={{ flex: 0, justifyContent: "center", alignItems: "center" }}>
                        <Image source={require('./images/login-image.png')}></Image>
                        <View style={styles.textStack}>
                            <Text style={styles.headerText}>Playlists curated by <Text style={styles.purpleText}>you</Text>, for <Text style={styles.purpleText}>you</Text></Text>

                            <Text style={styles.baseText}>For more personalized results, we recommend that you connect your Spotify account.</Text>
                        </View>


                    </View>
                    <JGButton style={{ marginTop: 20 }} icon={JGButtonImageType.Spotify} title="CONNECT SPOTIFY" onClick={async () => {
                        let result = await authHandler.onLogin();
                        console.log(result);
                        result?.accessToken && authContext.setAuthToken(result.accessToken);
                    }}></JGButton>
                </View>
            </SafeAreaView >
        </ImageBackground>

    );
}

const styles = StyleSheet.create({
    baseText: {
        fontFamily: "Avenir",
        fontSize: 16,
        fontWeight: "500",
        lineHeight: 25,
        textAlign: 'left',
    },
    headerText: {
        fontFamily: "Raleway",
        fontSize: 30,
        fontWeight: "bold",
        lineHeight: 40,
        textAlign: 'left',
        marginTop: 10,
        marginBottom: 25,
    },
    textStack: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: -25,
        padding: 10
    },
    purpleText: {
        color: "#7432FF",
    },
    skipText: {
        fontFamily: "Raleway",
        fontSize: 20,
        fontWeight: 'bold',
        color: '#5200FF',
        backgroundColor: 'transparent'
    },
    skipButton: {
        marginTop: 15,
        marginRight: 25,
        padding: 10,
        backgroundColor: 'transparent',
    },
    contentContainer: {
        marginTop: -20,
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 40,
    }
});


