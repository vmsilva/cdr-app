import { StyleSheet, Dimensions } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: hp("0.5%"),
    backgroundColor: "#F00",
  },
  containerView: {
    flexDirection: "row",
    width: wp("100%"),
    minHeight: hp("12.7"),
    paddingLeft: wp("5"),
  },
  imgThumbContent: {
    width: wp("45%"),
    height: hp("18.2%"),
    backgroundColor: CustomDefaultTheme.colors.cinzaSecundario,
    borderRadius: 10,
  },
  tituloCard: {
    marginTop: hp("1%"),
    color: "#FFF",
  },
  textoRodaPeCard: {
    marginTop: 2,
    left: 20,
    maxWidth: wp("40"),
    fontSize: 19,
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
});

export default styles;
