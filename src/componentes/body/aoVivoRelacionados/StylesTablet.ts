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
  },
  all: {
    padding: wp("1"),
    paddingLeft: wp("4"),
  },
  containerView: {
    flexDirection: "row",
    width: wp("90%"),
    minHeight: hp("7"),
    paddingLeft: wp("2"),
    padding: wp("1.5"),
    borderRadius: 20,
    backgroundColor: CustomDefaultTheme.colors.informacoesPlayerColor,
  },
  imgThumbContent: {
    width: wp("30"),
    height: wp("10"),
    marginRight: 30
  },
  tituloCard: {
    marginTop: hp("1%"),
    color: "#FFF",
  },
  textoRodaPeCard: {
    color: "#FFF",
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
  textAoVivo: {
    fontSize: 12,
  }, blocoAgora:{
    width: wp("15"),
    borderRadius: 5,
    backgroundColor: "#F00",
    padding: 5,
    paddingLeft: 5,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

export default styles;
