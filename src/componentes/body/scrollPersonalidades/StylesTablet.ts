import { StyleSheet, Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: hp("0.5%"),
  },
  thumbContent: {
    borderRadius: wp("3%"),
    width: wp("19%"),
    height: wp("30.5%"),
    marginTop: hp("2%"),
    marginLeft: wp("1.5%"),
    marginRight: wp("1.5%"),
    marginBottom: hp("2%"),
  },
  thumbContentFaleConosco: {
    borderRadius: wp("3%"),
    width: wp("37.5%"),
    height: wp("37.5%"),
    marginTop: hp("2%"),
    marginLeft: wp("1.5%"),
    marginRight: wp("1.5%"),
    marginBottom: hp("2%"),
  },
  imgThumbContent: {
    width: wp("20.5%"),
    height: wp("30.5%"),
    borderRadius: wp('3%'),
  },
  imgThumbContentFaleConosco: {
    width: wp("37.5%"),
    height: wp("37.5%"),
    borderRadius: wp('1.3%'),
  },
  slideImage: {
    width: wp("100%"),
    height: hp("100%"),
    opacity: 0.01,
  },
});

export default styles;
