import { StyleSheet, Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomDefaultTheme } from "../../../../configuracoes/styles/Theme";

const Styles = StyleSheet.create({
  content: {
    backgroundColor: CustomDefaultTheme.colors.bgprogramacao,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    width: wp("90"),
    height: hp("10%"),
    left: wp("5"),
  }
});

export default Styles;
