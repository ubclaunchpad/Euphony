import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        height: 350,
        width: 340,
        borderRadius: 19,
        alignItems: 'center',
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        backgroundColor: 'white'
    },
    image: {
        width: 55,
        height: 55,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'hsla(252, 64%, 86%, 0.6)'
    },
    rightContainer: {
        justifyContent: 'space-evenly',
        marginLeft: 10,
    },
    title: {
        color: '#3700AB',
        fontSize: 17,
        fontWeight: 'bold',
        fontFamily: 'Raleway',
        textAlign: 'center'
    },
    subheader: {
        color: '#867CC0',
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'Avenir',
        textAlign: 'center'
    },
    topContainer: {
        alignItems: 'center',
        flex: 3,
    },
    middleContainer: {
        alignItems: 'center',
        flex: 2,
        justifyContent: 'space-evenly'
    },
    bottomContainer: {
        flex: 3,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    buttonLeave: {
        backgroundColor: '#7432FF',
        height: 45,
        width: 250,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
        flexDirection: "row",
    },
    buttonLeaveText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        margin: 10
    },
    buttonCancel: {
        backgroundColor: 'white',
        height: 45,
        width: 250,
        borderRadius: 25,
        borderColor: "#7432FF",
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
        flexDirection: "row",
    },
    buttonCancelText: {
        color: '#3700AB',
        fontSize: 15,
        fontWeight: 'bold',
        margin: 10
    },
})

export default styles;