import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 6,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: 'hsl(0, 0%, 85%)',
        borderRadius: 19,
        padding: 10
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 12,
    },
    rightContainer: {
        justifyContent: 'space-around',
        marginLeft: 10,
    },
    title: {
        color: 'hsl(0, 0%, 15%)',
        fontSize: 20,
    },
    artist: {
        color: 'hsl(0, 0%, 46%)',
        fontSize: 14
    },
    sub: {
        flexDirection: "row"
    },
    duration: {
        marginLeft: 15,
        color: 'hsl(0, 0%, 46%)'
    }
})

export default styles;