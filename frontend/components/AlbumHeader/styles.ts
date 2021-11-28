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
        backgroundColor: '#EEEAFF',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 150,
        paddingBottom: 10,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#CDC4F2'
    },
    center: {
        alignItems: "center",
        marginTop: -150,
    },
    image: {
        width: 200,
        height: 200,
    },
    miniImage: {
        width: 100,
        height: 100,
    },
    name: {
        color: '#3700AB',
        fontSize: 25,
        fontWeight: 'bold',
    },
    edit: {
        margin: 10,
    },
    creator: {
        color: '#867CC0',
        margin: 3,
        fontSize: 14
    },
    likes: {
        color: '#867CC0',
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
        marginLeft: 20,
        marginRight: 20,
        flexDirection: "row",
        flex: 1,
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
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: 13,
        marginRight: 13,
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
        marginBottom: 10,
        marginLeft: 25,
        marginRight: 25,
    },
    visibility: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftContainer: {
        flex: 4,
        flexDirection: 'row',
        justifyContent: 'flex-start',
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
        backgroundColor: 'hsla(251, 100%, 82%, 0.31)',
        borderRadius: 11,
        padding: 6,
        paddingLeft: 10,
        justifyContent: 'space-around',
    },
    promptText: {
        fontWeight: "bold",
        color: '#3700AB',
        fontSize: 16
    },
    findContents: {
        justifyContent: 'flex-start',
        padding: 3,
        flexDirection: "row",
        alignItems: "center",
    },
    gapAfterIcon: {
        marginLeft: 20
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
    marginLeft: 20,
    marginRight: 20,
    flex: 1, 
    height: 0.5, 
    backgroundColor: 'black'
},
});

export default styles;