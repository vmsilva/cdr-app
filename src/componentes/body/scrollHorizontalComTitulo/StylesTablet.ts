import { StyleSheet, Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: hp("0.5%"),
  },
  containerView: {
    width: wp("34%"),
  },
  thumbContent: {
    width: wp("32%"),
    minHeight: hp("20%"),
    backgroundColor: "transparent",
    marginTop: hp(".9%"),
  },
  imgThumbContent: {
    width: wp("32%"),
    minHeight: hp("15%"),
    backgroundColor: CustomDefaultTheme.colors.backgroundCards,
    left: wp("2"),
    right: wp("2"),
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flexWrap: "wrap",
    height: hp("15.2"),
  },
  tituloCard: {
    marginTop: hp("1%"),
    color: "#FFF",
  },
  textoRodaPeCard: {
    color: "#FFF",
    marginTop: 2,
    left: 5,
  },
  textoSubititulo: {
    maxWidth: wp("100"),
    color: CustomDefaultTheme.colors.branco,
    left: 20,
    fontSize: 12.5,
    flexWrap: "wrap",
  },
  blocoHeader: {
    width: wp("32"),
    left: wp("2"),
    right: wp("2"),
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: CustomDefaultTheme.colors.cinzaEscuro,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  blocoHeaderImagem: {
    left: wp("2"),
    right: wp("2"),
    height: wp("10"),
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: CustomDefaultTheme.colors.cinzaEscuro,
    //height: 25,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});

export default styles;
