import { Platform } from "expo-modules-core";
import { StyleSheet, Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomDefaultTheme } from "../../configuracoes/styles/Theme";

const altura = Dimensions.get("screen").height;

const Styles = StyleSheet.create({
  blocoInformacoes: {
    width: wp("100"),
    backgroundColor: CustomDefaultTheme.colors.background,
    //bottom:  Platform.OS == "ios" ? (altura < 750 ? hp("12.5") : hp("10")) : hp("23"),
    zIndex: 99999,
    padding: 20,
    flexDirection: "row",
  },
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
    color:CustomDefaultTheme.colors.textFundoClaro,
    fontSize: 14,
  },
  scrollRelacionados: {
    flexGrow: 1,
    //backgroundColor:'#FF0',
  },linha:{
  }, textInputContent: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  }, balaoContent:{
    marginTop: 15,
    width: '100%',
    minHeight: 100,
  }, balaoHeaderContent: {
    height: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1, 
  }, balao:{
    marginLeft: '5%',
    width: '90%',
    minHeight: 70,
    borderRadius: 10,
    padding: 15,
    zIndex: 0,
  }, remetente:{
    paddingRight: 35,
    backgroundColor: CustomDefaultTheme.colors.chatRemetente,
    alignItems: 'flex-end'
  }, sender : {
    paddingLeft: 35,
    backgroundColor: CustomDefaultTheme.colors.chatSender,
    alignItems: 'flex-start'
  }
});

export default Styles;
