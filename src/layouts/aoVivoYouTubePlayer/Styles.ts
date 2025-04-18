import { StyleSheet, Dimensions, Platform } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomDefaultTheme } from "../../configuracoes/styles/Theme";

const altura = Dimensions.get("screen").height;
const Styles = StyleSheet.create({
  container: {},
  conteudoProgramacao: {
    marginTop: hp("2%"),
  },
  headerConteudoProgramacao: {
    marginLeft: wp("7%"),
    color: "#FFF",
  },
  header: {
    height: 400,
    width: wp("100%"),
    backgroundColor: CustomDefaultTheme.colors.primary,
    paddingVertical: 0,
    justifyContent: "flex-end",
    alignItems: "center",
    position: "absolute",
    overflow: "hidden",
    left: 0,
    right: 0,
    top: 50,
  },
  listagemItem: {
    top: 25,
    padding: 20,
    fontSize: 18,
    color: "#FFF",
  },
  scrollView: {
    minWidth: wp("100%"),
    minHeight: wp("100%"),
  },
  thumb: {
    height: 450,
    width: wp("100%"),
  },
  LinearContent: {
    position: "absolute",
    height: hp("100%"),
    width: wp("100%"),
  },
  conteudoVideo: {
    marginLeft: wp("5%"),
    marginTop: -10,
    alignItems: "flex-start",
    width: wp("95%"),
    height: hp("35%"),
  },
  tituloVidoe: {
    color: "#FFF",
  },
  textoCategoriaVideo: {
    color: CustomDefaultTheme.colors.textoOpaco,
    left: 15,
    fontSize: 10,
  },
  informacoesVideo: {},
  descricaoVideo: {
    color: "#FFF",
    width: wp("90%"),
  },
  orientacaoBtnAndroid: {},
  orientacaoBtnIos: {},
  font: {
    color: "#FFF",
    fontSize: 15,
  },
  scrollRelacionados: {
    //bottom: Platform.OS == "ios" ? hp("10") : hp("23"),
    //flexGrow: 1,
  },
  linhaheader: { height: Platform.OS == "ios" ? hp("13") : hp("13") },
  blocoInformacoes: {
    width: wp("100"),
    backgroundColor: CustomDefaultTheme.colors.informacoesPlayerColor,
    padding: 20,
    flexDirection: "row",
  },
});

export default Styles;
