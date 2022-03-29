import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginLeft: 25,
    marginRight: 30,
    paddingTop: 30,
    marginBottom: 70,
  },
  header: {
    padding: 10
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    width: 310,
  },
  name: {
    color: '#3700AB',
    fontSize: 20,
    fontWeight: '800',
    fontFamily: 'Raleway',
  },
  p: {
    color: '#867CC0',
    fontSize: 15,
    fontFamily: 'Avenir',
    fontWeight: 'bold'
  },
  leftText: {
    color: '#3700AB',
    fontSize: 16,
    fontFamily: 'Avenir',
    marginBottom: 2,
  },
  rightText: {
    color: '#3700AB',
    fontSize: 16,
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    marginTop: 2
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
    paddingTop: 20,
  },
  line: {
    flex: 1,
    height: 0.35,
    backgroundColor: 'black'
  },
});

export default styles;