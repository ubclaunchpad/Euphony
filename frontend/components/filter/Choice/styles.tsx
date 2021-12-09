import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: 150,
        margin: 5,
    },
    image: {
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        height: 150,
        borderRadius: 16,
    },
    imageText: {
        fontSize: 50,
    },
    selected: {
        backgroundColor: '#C4C4C4',
    },
    text: {
        color: '#867CC0',
        fontSize: 13,
        fontFamily: 'Avenir',
        marginTop: 10,
        textAlign: 'center',
    },
    rightSliderText: {
        color: '#3700AB',
        fontSize: 16,
        fontFamily: 'Avenir',
        fontWeight: '900',
    },
    cardBottomText: {
        color: '#867CC0',
        fontSize: 15,
        fontFamily: 'Avenir',
        textAlign: 'center',
        marginTop: 10,
    },
    bold: {
        fontWeight: '900',
        color: '#3700AB',
    },
    sliderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        paddingHorizontal: 20,
    },
    sliderInnerContainer: {
        alignItems: 'center',
        width: '90%',
    },
    sliderLabelView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '95%',
        paddingLeft: 3,

    }
})

export default styles;