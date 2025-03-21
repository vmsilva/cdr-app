import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 5,
    width: '100%'
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    marginLeft: 5,
    fontSize: 18,
    color: "#000",
    letterSpacing: -1,
    //backgroundColor: '#F00',
    //width: '85%'
  },
  content: {
    padding: 10,
  },
  icon: {
    padding: 10,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.4,
    padding: 10
  },
});

export default styles;
