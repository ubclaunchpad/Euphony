import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 6,
        marginBottom: 6,
        borderRadius: 3,
        padding: 10,
        backgroundColor: '#E3DEF9',
    },
    image: {
        width: 45,
        height: 45,
        borderColor: 'hsla(252, 64%, 86%, 0.6)'
    },
    info: {
        justifyContent: 'center',
        marginLeft: 10,
    },
    title: {
        color: '#3700AB',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Avenir',
        maxWidth: 100,
    },
    artist: {
        color: '#867CC0',
        marginRight: 8,
        fontSize: 14,
        fontFamily: 'Avenir-Medium'
    },
    duration: {
        marginLeft: 5,
        color: '#3700AB',
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: 'Avenir'
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
    sub: {
        flexDirection: "row",
        alignItems: 'center',
    },
})

export default styles;