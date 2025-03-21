import { StyleSheet, Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomDefaultTheme } from "../../configuracoes/styles/Theme";
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const Styles = StyleSheet.create({
  container: {},
  conteudoProgramacao: {
    marginTop: hp("2%"),
  },
  header: {
    width: wp("100%"),
    backgroundColor: CustomDefaultTheme.colors.secondary,
    paddingVertical: 0,
    justifyContent: "flex-end",
    alignItems: "center",
    position: "absolute",
    overflow: "hidden",
    left: 0,
    right: 0,
    top: 0,
  },
  listagemItem: {
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
  mes: {
    flexDirection: "row",
  },
  dia: {
    flexDirection: "row",
  },
  botaoMes: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    width: wp("15%"),
    backgroundColor: CustomDefaultTheme.colors.corBotaoProgramacao,
    borderRadius: 10,
  },
  informacaoMes: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    width: wp("60%"),
    backgroundColor: CustomDefaultTheme.colors.corBotaoProgramacao,
    borderRadius: 10,
  },
  botaoDia: {
    height: hp("9%"),
    width: wp("15%"),
    backgroundColor: CustomDefaultTheme.colors.corBotaoProgramacao,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  informacaoDia: {
    textAlign: "center",
    height: hp("9%"),
    width: wp("60%"),
    backgroundColor: CustomDefaultTheme.colors.bgprogramacao,
    borderRadius: 10,
  },
  legendasProgramacao: {
    padding: 15,
    borderRadius: 15,
    top: 10,
    borderWidth: 0.3,
    borderColor: "#FFF",
    backgroundColor: "transparent",
    height: hp("11.5%"),
    width: wp("92%"),
  },
  botaoCards: {
    borderRadius: 5,
    width: wp("25%"),
    backgroundColor: "#2f2f34cf",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
  },
});

export default Styles;
