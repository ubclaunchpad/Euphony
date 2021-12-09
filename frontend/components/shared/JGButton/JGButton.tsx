import React from "react"
import { View, Pressable, Image, Text, StyleSheet, ViewStyle, StyleProp } from "react-native";

export type JGButtonProps = {
    title?: string;
    icon?: JGButtonImageType;
    style?: StyleProp<ViewStyle>;
    fillParent?: boolean;
    onClick?: () => void;
};
export enum JGButtonImageType {
    Spotify = "./images/spotify-logo.png",

}
export default function JGButton(props: JGButtonProps) {
    // let image = props.imagePath ? <Image source={require(props.imagePath)} style={{ width: 20, height: 20 }} /> : null;
    let wrapperStyle = props.fillParent ? { ...styles.wrapperView, ...styles.fullWidth } : styles.wrapperView;
    let imagePath = props.icon ? require("./images/spotify-logo.png") : null;
    console.log(imagePath);
    let image = props.icon ? <Image style={styles.image} source={imagePath} /> : null;
    let title = props.title ? <Text style={styles.text}>{props.title}</Text> : null;
    return (
        <View style={props.style}>
            <Pressable onPress={props.onClick}>
                <View style={wrapperStyle}>
                    {image}
                    {title}

                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: "Roboto",
        color: "#FFFFFF",
        marginVertical: 11,
    },
    image: {
        marginRight: 10,
        width: 32,
        aspectRatio: 1,
    },
    wrapperView: {
        flex: 0,
        flexDirection: "row",
        backgroundColor: "#7432FF",
        paddingHorizontal: 20,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    fullWidth: {
        width: "100%",
    }

});


