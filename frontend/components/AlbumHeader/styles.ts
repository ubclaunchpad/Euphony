import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    image: {
        width: 200,
        height: 200,
        margin: 15,
    },
    name: {
        color: 'hsl(0, 0%, 15%)',
        fontSize: 30,
        fontWeight: 'bold',
    },
    title: {
        flexDirection: "row",
        justifyContent: 'center',
    },
    creatorContainer: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5
    },
    edit: {
        margin: 10,
    },
    creator: {
        color: 'hsl(0, 0%, 46%)',
        margin: 3,
        fontSize: 14
    },
    likes: {
        color: 'hsl(0, 0%, 46%)',
        margin: 3,
        fontSize: 14
    },
    button: {
        backgroundColor: '#1CD05D',
        height: 50,
        width: 200,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        flexDirection: "row",
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        margin: 10
    },
    tracksHeader: {
        marginLeft: 20,
        color: 'hsl(0, 0%, 20%)',
        fontSize: 25,
        fontWeight: 'bold',
    },
    visibility: {
        flex: 1, 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    visibilitySectionAlpha: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
    },
    visibilitySectionBeta: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#3386ff',
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
    },
    visibilityTextAlpha: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#3386ff',
    },
    visibilityTextBeta: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white'
    },
    visibilityButton: {
        borderColor: '#3386ff',
        borderWidth: 2,
        height: 50,
        width: 200,
        justifyContent: 'center',
        alignContent: 'stretch',
        margin: 5,
        flexDirection: "row",
        borderRadius: 25
    },
});

export default styles;