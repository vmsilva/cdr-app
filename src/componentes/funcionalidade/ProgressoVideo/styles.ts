import { StyleSheet, Platform, Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: CustomDefaultTheme.colors.backgroundSlider,
  }, fonte:{
    fontSize: 8,
    color: CustomDefaultTheme.colors.branco,
    letterSpacing: 1.2,
  }
});

export default styles;
