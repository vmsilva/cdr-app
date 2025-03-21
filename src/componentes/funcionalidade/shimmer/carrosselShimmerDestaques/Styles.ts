import { StyleSheet, Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomDefaultTheme } from "../../../../configuracoes/styles/Theme";

export const SLIDER_WIDTH = Dimensions.get("window").width + 0;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.4);

const styles = StyleSheet.create({
  container: {
    marginLeft: wp("0"),
    width: 150,
    paddingBottom: 0,
    paddingTop: 10,
    height: 120,
    borderRadius: 999,
    elevation: 7,
  },
  containerAndroid: {
    marginLeft: wp("0"),
    paddingBottom: 0,
    minHeight: 300,
    borderRadius: 10,
  },
  image: {
    width: 120,
    height: 120,
    opacity: 0.4,
    borderRadius: 999,
  },
  bloco: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: ITEM_WIDTH,
    height: hp("25"),
  },
  header: {
    color: "#FFF",
    fontSize: 38,
    fontWeight: "bold",
  },
  body: {
    color: "#222",
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20,
  },
  btnAtivo: {
    backgroundColor: CustomDefaultTheme.colors.primary,
    color: CustomDefaultTheme.colors.branco,
  },
  btnInativo: {
    backgroundColor: "transparent",
    borderColor: CustomDefaultTheme.colors.primary,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  _container: {
    flex: 1,
    position: "absolute",
    height: 500,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  posterImage: {
    borderRadius: 999,
    margin: 125,
  },
  blocoIcone: {
    right: 15,
    top: 120,
    backgroundColor: "#F00",
    position: "absolute",
    borderRadius: 999,
    textAlign: "center",
    padding: 2,
    height: 30,
    width: 30,
  },
  blocoAgora: {
    top: 220,
    position: "absolute",
    textAlign: "center",
    minHeight: 30,
    width: wp("40"),
  },
  blocoAgoraAndroid: {
    top: 190,
    position: "absolute",
    textAlign: "center",
    minHeight: 30,
    width: wp("40"),
  },
  imgCardCarrossel: {
    left: wp("5"),
    width: wp("90"),
    //width:400,
    height: hp("58"),
    backgroundColor: CustomDefaultTheme.colors.backgroundCards,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textoDestaqueTitle: {
    maxHeight: 100,
    color: CustomDefaultTheme.colors.branco,
    fontSize: 24,
    textAlign: "left",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    bottom: 15,
  },
  textoDestaque: {
    //backgroundColor: '#00F',
    maxHeight: 70,
    maxWidth: wp("80"),
    color: CustomDefaultTheme.colors.branco,
    fontSize: 16,
    textAlign: "left",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    bottom: 10,
  },
  LinearContent: {
    position: "absolute",
    height: hp("100%"),
    width: wp("100%"),
  },
  blocoItemBtn: {
    width: wp("100"),
    bottom: hp("-15"),
    //backgroundColor: '#000',
    paddingLeft: 10,
  },
  buttonDestaque: {
    backgroundColor: CustomDefaultTheme.colors.buttonPrimary,
    height: 50,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    width: wp("50"),
    borderRadiu: 99,
  },
  blocoTags: {
    width: wp("100"),
    minHeight: 45,
    paddingLeft: 30,
    flexDirection: "row",
  },
  blocoTexto: {
    width: wp("100"),
    paddingLeft: 30,
    flexDirection: "row",
  },
});

export default styles;
