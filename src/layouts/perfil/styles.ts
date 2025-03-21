import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import { MaterialCommunityIcons as MDIcon } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomDefaultTheme } from "../../configuracoes/styles/Theme";

export const BANNER_H = hp("35");
export const TOPNAVI_H = 50;

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  padding: 10px 10px 10px;
`;

export const AvatarContainer = styled.View``;

export const EditAvatarButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;

  background-color: ${CustomDefaultTheme.colors.accent};
  position: absolute;
  bottom: 0;
  right: 0;
`;

export const EditAvatarIcon = styled(MDIcon).attrs({
  name: "camera",
  size: 25,
  color: "#f1f1f1",
})``;

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
    alignItems: "center",
    bottom: hp("10"),
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
    padding: 10,
  },
  bordaBottom: {
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
  },
  bannerTeste: {
    marginTop: 30,
    height: BANNER_H,
    width: "100%",
  },
  tabdeputados: {
    padding: 7,
    width: "33%",
    height: "100%",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "transparent",
  },
  textoTab: {
    fontSize: 15,
  },
  b2: {
    zIndex: 10,
    height: 210,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CustomDefaultTheme.colors.iconsPrimaryColor,
  },
  LineaImagem: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  logoView: {
  },
  logo: {
    width: 200,
    height: 200,
  },
  progressBar: {
    width: "60%",
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  iconStyle: {
  },
  iconStyleFilho: {
    alignItems: "center",
    marginTop: 5,
    flexDirection: 'row',
  },
  fontFilho: { color: "#FFF", fontSize: 12, letterSpacing: .18, left: 15 },
  inputView: {
    height: 50
  },blocoInputs:{
    marginTop: 10,
    width: "100%",
    backgroundColor: CustomDefaultTheme.colors.backgroundMaterialComplementar,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 25,
  }, iconInput:{
    width: 35,
    height: 35,
    padding: 5,
    borderRadius: 99,
    backgroundColor: CustomDefaultTheme.colors.backgroundIndiceCardVideo,
    justifyContent: "center",
    alignItems: "center",
  }
});

export default Styles;
