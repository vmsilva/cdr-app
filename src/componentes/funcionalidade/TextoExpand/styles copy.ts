import { StyleSheet, Platform, Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
  readMore: {
    letterSpacing: .14,
    color: CustomDefaultTheme.colors.bioapresentadorFont,
    fontSize: 14,
    lineHeight: 15
  },
});

export default styles;
