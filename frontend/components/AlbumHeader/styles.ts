import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    searchText: {
        color: '#8B8B8B',
        fontSize: 17,
        lineHeight: 22,
        marginLeft: 8,
    },
    searchBox: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: '#0F0F0F',
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    container: {
        alignItems: "center",
    },
    image: {
        width: 200,
        height: 200,
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
        backgroundColor: '#7432FF',
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
        alignItems: 'center'
    },
    headerText: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    creatorContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
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
        padding: 5,
        flexDirection: "row",
        alignItems: "center",
    },
    gapAfterIcon: {
        marginLeft: 10
    },

  input: {
    width: 350,
    height: 40,
    padding: 5,
    margin: 5,
    borderWidth: 1,
    borderColor: 'grey',
    borderStyle: 'solid',
    borderRadius: 3
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
},
  line: {
    flex: 1, 
    height: 1, 
    backgroundColor: 'black'
},
});

export default styles;