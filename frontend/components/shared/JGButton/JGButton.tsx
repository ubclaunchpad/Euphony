import React from "react"
import { View, TouchableOpacity, Image, Text, StyleSheet, ViewStyle, StyleProp, ActivityIndicator } from "react-native";

export type JGButtonProps = {
    title?: string;
    clickable?: boolean;
    icon?: JGButtonImageType;
    style?: StyleProp<ViewStyle>;
    fillParent?: boolean;
    isLoading?: boolean;
    onClick?: () => void;
};
export enum JGButtonImageType {
    Spotify = "./images/spotify-logo.png",

}
export default function JGButton(props: JGButtonProps) {
    // let image = props.imagePath ? <Image source={require(props.imagePath)} style={{ width: 20, height: 20 }} /> : null;
    let isLoading = props.isLoading ?? false;
    let wrapperStyle = props.fillParent ? { ...styles.wrapperView, ...styles.fullWidth } : styles.wrapperView;
    let clickableStyle = props.clickable || props.clickable == null ? { ...styles.clickableTrue } : { ...styles.clickableFalse };
    let imagePath = props.icon ? require("./images/spotify-logo.png") : null;
    console.log(imagePath);
    let image = props.icon ? <Image style={styles.image} source={imagePath} /> : null;
    let title = props.title ? <Text style={styles.text}>{props.title}</Text> : null;

    let loadingView;
    if (isLoading) {
        loadingView = <ActivityIndicator size="small" color="#FFFFFF" style={{ marginLeft: 10 }} />
    }
    return (
        <View style={props.style}>
            <TouchableOpacity onPress={props.onClick}>
                <View style={[wrapperStyle, clickableStyle]}>
                    {image}
                    {title}
                    {loadingView}
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontFamily: "Roboto-Bold",
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
        paddingHorizontal: 20,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    clickableTrue: {
        backgroundColor: "#7432FF",
    },
    clickableFalse: {
        backgroundColor: "#483b63",
    },
    fullWidth: {
        width: "100%",
    }

});


