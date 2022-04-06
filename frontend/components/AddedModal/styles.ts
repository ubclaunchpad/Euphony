import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        height: 300,
        width: 340,
        borderRadius: 19,
        alignItems: 'center',
        padding: 20,
        paddingLeft: 40,
        paddingRight: 40,
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
    link: {
        color: '#3700AB',
        fontSize: 14,
        fontFamily: 'Avenir',
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'underline'
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
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#7432FF',
        height: 45,
        width: 200,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        margin: 10
    },
})

export default styles;