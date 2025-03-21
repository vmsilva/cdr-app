import { StyleSheet, Platform } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomDefaultTheme } from "../../configuracoes/styles/Theme";

export const BANNER_H = wp("85");
export const TOPNAVI_H = 50;

const Styles = StyleSheet.create({
  bannerContainer: {
    width: wp('100'),
    height: wp('115'),
    alignItems: "center",
    justifyContent: 'center',
    //backgroundColor: '#FF0',
  },
  bannerContainer2: {
    marginTop: -1000,
    paddingTop: 1000,
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: '#FF0',
  },
  sombraIos: {
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: .3,
    shadowRadius: 100,
    elevation: 20,
  }, sombraAndroid: {
    overflow: 'visible',
    borderRadius: 4,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: .3,
    shadowRadius: 100,
    elevation: 20,
  }
});

export default Styles;
