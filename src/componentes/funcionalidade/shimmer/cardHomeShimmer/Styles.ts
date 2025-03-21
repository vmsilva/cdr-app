import { StyleSheet, Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

const Styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: wp("5"),
  },
  content: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    flexWrap: "wrap",
  },item:{
    marginTop: 10,
    width: wp("40"),
    height: wp("40"),
    marginBottom: 60,
    borderRadius: 10,
  },itemTexto:{
    width: wp("37"),
    marginLeft: wp("1"),
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: -1, height: 1.4 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    borderRadius: 10,
  },
  shadowElevation: {
    elevation: 1,
    shadowColor: "#000",
  },
  blocoIMG: {
    width: wp("40"),
    height: wp("40"),
    backgroundColor: "#E2E2E2",
    borderRadius: 10,
  },
});

export default Styles;
