import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 6,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 19,
        padding: 10
    },
    image: {
        width: 55,
        height: 55,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'hsla(252, 64%, 86%, 0.6)'
    },
    info: {
        justifyContent: 'space-evenly',
        marginLeft: 10,
    },
    title: {
        color: '#3700AB',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Avenir'
    },
    artist: {
        color: '#867CC0',
        marginRight: 5,
        fontSize: 14,
        fontFamily: 'Avenir-Medium'
    },
    sub: {
        flexDirection: "row",
        alignItems: 'center',
    },
    duration: {
        marginLeft: 5,
        color: '#867CC0',
        fontFamily: 'Avenir-Medium'
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 25,
        paddingRight: 25,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#CDC4F2'
    },
    leftContainer: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
})

export default styles;