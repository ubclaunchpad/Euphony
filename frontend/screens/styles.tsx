import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    subHeader: {
        width: '100%',
        paddingHorizontal: 10,
        backgroundColor: '#1c1c1c',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        paddingRight: 20,
        paddingLeft: 20,
        marginBottom: 5,
    },
    conversation: {
        color: 'white', fontSize: 16, fontWeight: 'bold', alignItems: 'center'
    },
    headerIcon: {
        marginLeft: 15
    },
});

export default styles;