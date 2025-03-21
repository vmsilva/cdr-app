import { StyleSheet, Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  googleButton: {
    backgroundColor: CustomDefaultTheme.colors.branco,
    borderRadius: 5,
    width: "100%",
    marginTop: 10,
    height: 40
  },
  googleText: {
    color: CustomDefaultTheme.colors.preto,
  },
  appleButton: {
    backgroundColor: CustomDefaultTheme.colors.branco,
    borderRadius: 5,
    height: 40,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFF",
    marginTop: 10,
  },
  appleText: {
    color: "#000",
    //fontSize: 19,
  },
  facebookButton: {
    height: 40,
    marginTop: 10,
    backgroundColor: CustomDefaultTheme.colors.facebookColor,
    borderRadius: 5,
    textAlign: "center",
  },
  facebookText: {
    color: CustomDefaultTheme.colors.branco,
  },
});

export default styles;
