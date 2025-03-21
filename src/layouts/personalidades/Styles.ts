import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomDefaultTheme } from "../../configuracoes/styles/Theme";

export const BANNER_H = hp("70");
export const TOPNAVI_H = 50;

const Styles = StyleSheet.create({
  slide: {
    height: hp("100%"),
    width: wp("100%"),
  },
  LinearContent: {
    position: "absolute",
    height: hp("100%"),
    width: wp("100%"),
  },
  LinearContentTop: {
    position: "absolute",
    height: hp("15%"),
    width: wp("100%"),
  },
  slideImage: { width: wp("100%"), height: hp("100%") },
  slideTitle: { fontSize: 24 },
  slideSubtitle: { fontSize: 18 },
  blocoTitulo: {
    width: wp("100"),
    //height: hp("75"),
    alignItems: "center",
    bottom: hp("10"),
    //backgroundColor: '#FF0'
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
    flexDirection: "row",
    //justfiyContent: "space-between",
  },
  bordaBottom: {
    //borderWidth: .1,
    borderBottomWidth: 0.9,
    borderColor: CustomDefaultTheme.colors.textFundoEscuro,
  },
  textoInput: {
    width: wp("90"),
    color: "#FFF",
    marginTop: 5,
  },
  icones: {
    marginLeft: 10,
  },
  bannerContainer: {
    marginTop: -1000,
    paddingTop: 1000,
    alignItems: "center",
    overflow: "hidden",
    //width: wp('100')
    backgroundColor: '#FF0',
    //height: hp('100')
  }, bannerTeste: {
    marginTop: 30,
    height: BANNER_H,
    width: "100%",
  },
  banner: (scrollA) => ({
    marginTop: 30,
    height: BANNER_H,
    width: "100%",
    transform: [
      {
        translateY: scrollA.interpolate({
          inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
          outputRange: [-BANNER_H / 2, 0, BANNER_H * 0.75, BANNER_H * 0.75],
        }),
      },
      {
        scale: scrollA.interpolate({
          inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
          outputRange: [2, 1, 1, .1],
        }),
      },
    ],
  }) as any,
  tabdeputados : {
    padding: 7,
    width: '33%',
    height: '100%',
    //backgroundColor: '#F00',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'transparent'
  }, textoTab:{
    fontSize: 15
  }
});

export default Styles;
