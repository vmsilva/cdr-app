import { StyleSheet, Platform, Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
console.log(windowWidth);
const Styles = StyleSheet.create({
  container: {
    backgroundColor: CustomDefaultTheme.colors.backgroundSubtitle,
    //flexDirection: "row",
    //marginTop: windowWidth > 700 ? 0 : hp('12%')
  },
  cores: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  coresSelecionadas: {
    borderWidth: 2,
    borderColor: '#000'
  },
  legenda: {
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    //bottom: 10,
  }, botaoFonteSize:{
    marginLeft: 10,
    flexDirection: 'row'
  },header: {
    //height: 30,
    //marginTop: 7,
  },
  title: {
    fontSize: 18,
    color: "#000",
  },
  content: {
    padding: 10,
  },
  icon: {
  },textoRate:{
    color: '#FFF'
  }, fontPadrao:{
    color: '#FFF'
  }
});

export default Styles;
