import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        margin: 15,
    },
    name: {
        color: 'hsl(0, 0%, 15%)',
        fontSize: 30,
        fontWeight: 'bold',
    },

    container: {
        alignItems: "center",
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        paddingLeft: 50,
        paddingRight: 50,
    },
    line: {
        flex: 1, 
        height: 1, 
        backgroundColor: 'black'
    },
    info: {
        justifyContent: 'space-between',
        flexDirection: 'column',
        backgroundColor: 'green',
        alignItems: 'stretch',
        flex: 1,
        width: '75%'
    },
    properties: {
        marginBottom: 25,
    },
    h2: {
        color: 'hsl(0, 0%, 15%)',
        fontSize: 22,
        fontWeight: 'bold',
    },
    h3: {
        color: 'hsl(0, 0%, 15%)',
        fontSize: 18,
    },
    h4: {
        color: 'hsl(0, 0%, 15%)',
        fontSize: 18,
        fontWeight: 'bold',
    },
    icon: {
        marginRight: 20
    },
    description: {
        flexDirection: 'row', 
        paddingTop: 3,
        alignItems: 'center',
    }
});

export default styles;