import { StyleSheet, Platform } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomDefaultTheme } from "../../configuracoes/styles/Theme";

export const BANNER_H = wp("115");
export const TOPNAVI_H = 50;

const Styles = StyleSheet.create({
  slide: {
    height: hp("100%"),
    width: wp("100%"),
    justifyContent: "center",
    alignItems: "center",
  },
  LinearContent: {
    position: "absolute",
    height: hp("100%"),
    width: wp("100%"),
  },
  slideImage: { width: wp("100%"), height: hp("100%") },
  slideTitle: { fontSize: 24 },
  slideSubtitle: { fontSize: 18 },
  SlideLogo: {
    width: 250,
    height: 40,
    position: "absolute",
    marginLeft: wp("15%"),
    flex: 1,
    justifyContent: "center",
    marginTop: hp("10%"),
  },
  pagination: {
    position: "absolute",
    width: wp("100%"),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    top: hp("90%"),
  },
  paginationDot: {
    width: 25,
    height: 10,
    borderRadius: 10,
    marginHorizontal: 3,
  },
  paginationDotActive: { backgroundColor: "#FFF" },
  paginationDotInactive: { backgroundColor: "gray" },
  categoriaChip: {
    fontSize: 5,
    color: "#FFF",
    backgroundColor: CustomDefaultTheme.colors.tagChipBg,
    borderRadius: 50,
    height: 25,
    marginTop: Platform.OS == "ios" ? hp("6%") : hp("6%"),
  },
  categoriaChipTexto: {
    color: "#FFF",
    marginTop: -1,
  },
  tituloTexto: {
    width: wp("80%"),
    fontSize: 28,
    color: "#FFF",
    marginTop: 15,
    textAlign: "center",
  },
  subTitulo: {
    fontSize: 17,
    color: "#FFF",
    marginTop: 15,
    alignContent: "center",
    width: wp("95%"),
    textAlign: "center",
  },
  carousel: { flex: 1 },
  blocoBotoes: {
    flexDirection: "row",
    marginTop: 15,
  },
  blocoSinopse: {
    width: wp("90%"),
    left: wp("5%"),
    top: hp("-15%"),
  },
  tituloSinopse: {
    color: "#FFF",
    fontSize: 20,
  },
  conteudoSinopse: {
    color: CustomDefaultTheme.colors.textoOpaco,
    fontSize: 13,
  },
  blocoFicha: {
    top: hp("-10%"),
    width: wp("90%"),
    left: wp("5%"),
  },
  conteudoFichaTitulo: {
    color: CustomDefaultTheme.colors.textoOpaco,
  },
  conteudoFichaConteudo: {
    color: "#FFF",
  },
  linha: {
    width: wp("100"),
    flexDirection: "row",
    justfiyContent: "space-between",
  },
  bordaBottom: {
    borderBottomWidth: 0.9,
    borderColor: CustomDefaultTheme.colors.textFundoEscuro,
  },
  verticalTamanho: {
    minHeight: wp("52"),
    flexGrow: 1,
  },
  blocoTitulo: {
    width: wp("100"),
    alignItems: "center",
    bottom: hp("10"),
  },
  b2: {
    height: BANNER_H,
    width: "100%",
    opacity: Platform.OS == 'android' ? 1 : .4,
    
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: CustomDefaultTheme.colors.backgroundCards
  }, LineaImagem: {
    position: "absolute",
    height: ("100%"),
    width: ("100%"),
    justifyContent: 'center',
    alignItems: 'center',
  },tituloinformacoesicon:{
    flexDirection: 'row',
    //alignItems: 'center',
    padding: 2
  }, fontTituloIcon:{
    color: CustomDefaultTheme.colors.text,
    left: 5
  },tituloinformacoesiconPaiView:{
    width: '33%',
    justifyContent: 'center',
    alignItems: 'center'
  },sombraIos: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: .9,
    shadowRadius: 100,
    elevation: 20,
  }, sombraAndroid: {
    overflow: 'visible',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: .3,
    shadowRadius: 100,
    elevation: 20,
  }, borderinformacoes:{
    height: 30,
    width: 2,
    backgroundColor: CustomDefaultTheme.colors.borderInformacoesLivro
  }
});

export default Styles;
