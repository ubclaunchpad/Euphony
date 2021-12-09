import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 25,
    },
    title: {
        color: '#3700AB',
        fontSize: 20,
        fontFamily: 'Raleway',
        fontWeight: 'bold',
    },
    description: {
        color: '#867CC0',
        fontSize: 12,
        fontFamily: 'Avenir',
        fontWeight: '500',
        marginTop: 7,
    },
    clearButton: {
        position: 'absolute',
        right: 0,
    },
    clearText: {
        color: '#D02929',
        fontSize: 13,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        paddingTop: 3
    },
    requiredText: {
        // TODO
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginLeft: 10,
        color: '#fff',
        borderRadius: 5,
        backgroundColor: '#5A4CAD',
        fontSize: 13,
        fontFamily: 'Raleway',
        fontWeight: '900',
        overflow: 'hidden',
    },
    textStackView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    }
});

export default styles;