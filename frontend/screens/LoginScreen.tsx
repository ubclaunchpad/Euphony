import * as React from 'react';
import { SafeAreaView, Pressable, StyleSheet, Button, Text } from 'react-native';
import authHandler from '../networking/AppAuth';
import AppContext from '../AppContext';
export default function LoginScreen({ dismissAction }: { dismissAction: () => void }) {
    const authContext = React.useContext(AppContext);

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Pressable
                style={styles.button}
                onPress={() => dismissAction()}
            >
                <Text style={styles.underlinedText}>Skip</Text>

            </Pressable>
            <Text style={styles.baseText}>For more personalized results, we recommend that you connect your Spotify account</Text>
            <Button
                title="Login"
                onPress={async () => {
                    let result = await authHandler.onLogin();
                    console.log(result);
                    result?.accessToken && authContext.setAuthToken(result.accessToken);
                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    baseText: {
        fontFamily: "Roboto",
        fontSize: 24,
        fontWeight: "normal",
        marginHorizontal: 40,
        lineHeight: 35,
        marginTop: -100,
        textAlign: "center",
    },
    underlinedText: {
        textDecorationLine: "underline",
        fontSize: 20,
    },
    button: {
        marginHorizontal: 40,
        lineHeight: 35,
        textAlign: "center",
        position: "absolute",
        top: 50,
        right: 0,
    }
});


