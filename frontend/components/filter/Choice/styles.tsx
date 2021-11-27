import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: 150,
        margin: 5,
    },
    image: {
        width: '100%',
        height: 150,
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 16,
    },
    selected: {
        backgroundColor: '#C4C4C4',
    },
    text: {
        color: 'hsl(0, 0%, 46%)',
        marginTop: 10,
    }
})

export default styles;