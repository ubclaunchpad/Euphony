import * as React from 'react';
import { SafeAreaView, TouchableOpacity, StyleSheet, Button, Text, View, Image, ImageBackground } from 'react-native';
import authHandler from '../../networking/AppAuth';
import AppContext from '../../AppContext';
import JGButton, { JGButtonImageType } from '../../components/shared/JGButton/JGButton';
import Endpoints from '../../networking/Endpoints';
export default function LoginScreen({ dismissAction }: { dismissAction: () => void }) {
    const authContext = React.useContext(AppContext);
    let [errorMessage, setErrorMessage] = React.useState<string | null>(null);

    let errorBody: Element | null = <Text style={{
        color: 'red',
        fontFamily: "Avenir",
        fontSize: 16,
        fontWeight: "500",
        paddingHorizontal: 40,
        textAlign: "center",
        marginTop: 20,
        marginBottom: -50,
    }}>
        {errorMessage}
    </Text>

    if (errorMessage == null) {
        errorBody = null
    }
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

                {errorBody}
                <View style={styles.contentContainer}>
                    <View style={{ flex: 0, justifyContent: "center", alignItems: "center" }}>
                        <Image source={require('./images/login-image.png')}></Image>
                        <View style={styles.textStack}>
                            <Text style={styles.headerText}>Playlists curated by <Text style={styles.purpleText}>you</Text>, for <Text style={styles.purpleText}>you</Text></Text>

                            <Text style={styles.baseText}>For more personalized results, we recommend that you connect your Spotify account.</Text>
                        </View>


                    </View>
                    <JGButton style={{ marginTop: 20 }} icon={JGButtonImageType.Spotify} title="CONNECT SPOTIFY" onClick={async () => {
                        try {
                            setErrorMessage(null);
                            let result = await authHandler.onLogin();
                            authContext.setUserID(result.userID);
                            authContext.setRefreshToken(result.refreshToken);
                            authContext.setAuthToken(result.accessToken);
                        } catch (error) {
                            if (error instanceof Error) {
                                setErrorMessage(error.message)
                            }
                        }
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
        color: "black"
    },
    headerText: {
        fontFamily: "Raleway-Bold",
        fontSize: 30,
        lineHeight: 40,
        textAlign: 'left',
        marginTop: 10,
        marginBottom: 25,
        color: "black"
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
        fontFamily: "Raleway-Bold",
        fontSize: 20,
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


