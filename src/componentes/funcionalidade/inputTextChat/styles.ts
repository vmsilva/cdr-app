import { StyleSheet, Platform, Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    borderTopWidth: .3,
    //borderBottomWidth: 10,
    //flex: 1,
    backgroundColor: CustomDefaultTheme.colors.bottomTab,
    height: 50,
    //justifyContent: 'center',
    //alignItems: 'center',
    position: "absolute",
    flexDirection: 'row',
    padding:5
    //bottom: 1,
  }, fonte:{
    fontSize: 8,
    color: CustomDefaultTheme.colors.branco,
    letterSpacing: 1.2,
    //textShadowColor: '#FF0', // Cor da sombra do texto
    //textShadowOffset: { width: 20, height: 4 }, // Offset da sombra do texto
  },inputButtonsView:{
    width: "15%",
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default styles;
