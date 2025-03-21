import { StyleSheet, Dimensions } from "react-native";
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
    height: wp("25.5%"),
    backgroundColor: CustomDefaultTheme.colors.backgroundCards,
    borderRadius: 10,
  },
  tituloCard: {
    marginTop: hp("1%"),
    color: "#FFF",
  },
  textoRodaPeCard: {
    marginTop: 2,
    width: wp("40"),
    fontSize: 12,
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
  },subtituloFonte:{
    backgroundColor: CustomDefaultTheme.colors.iconsPrimaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    borderRadius: 5,
    minWidth: 60
  },subtituloFonteText:{
    color: '#FFF',
    fontSize: 12
  }
});

export default styles;
