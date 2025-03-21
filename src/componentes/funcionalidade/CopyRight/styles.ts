import { StyleSheet, Platform, Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //backgroundColor: CustomDefaultTheme.colors.background,
    //justifyContent: 'center',
    //alignItems: 'center',
    position: "absolute",
  }, fonte:{
    fontSize: 8,
    color: CustomDefaultTheme.colors.branco,
    letterSpacing: 1.2,
    //textShadowColor: '#FF0', // Cor da sombra do texto
    //textShadowOffset: { width: 20, height: 4 }, // Offset da sombra do texto
  }
});

export default styles;
