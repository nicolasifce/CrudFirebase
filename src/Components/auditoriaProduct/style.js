import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "#c1c1c1",
    marginTop: Constants.statusBarHeight
  },
  item: {
    borderColor: "#000",
    borderBottomWidth: 1,
    borderStyle: "dotted",
    marginVertical: 8,
    marginHorizontal: 16
  },
  itens: {
    marginBottom: 14,
    fontSize: 16,
    fontFamily: "serif"
  }
});

export default styles;
