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
    title: {
        flexDirection: "row",
        marginBottom: 3,
    },
    headerText: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    creatorContainer: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    headerInfo: {
        flex: 1, 
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 40,
        marginRight: 40,
    },
    visibility: {
        flex: 1, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    promptText: {
        fontWeight: "bold",
        color: 'black'
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    findInPlaylist: {
        marginTop: 20,
        margin: 6,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: 'hsl(0, 0%, 85%)',
        borderRadius: 11,
        padding: 10,
        justifyContent: 'space-around',
    },
    findContents: {
        justifyContent: 'flex-start',
        padding: 5
    }
});

export default styles;