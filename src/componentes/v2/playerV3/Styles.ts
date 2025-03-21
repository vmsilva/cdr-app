import { StyleSheet, Platform, Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

const { width: width, height: height } = Dimensions.get("window");

const TAMANHO_16X_16 = wp("57");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomDefaultTheme.colors.bgcarrossel,
  },
  video: {
    backgroundColor: "trasparent",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  poster: {
    width: hp("30%"),
    height: hp("10%"),
    top: hp("10%"),
    left: wp("20%"),
  },
  botaoPularAnuncioView: {
    marginTop: hp("-15"),
  },
  botaoPularAnuncio: {
    backgroundColor: "#00000099",
    height: 50,
    width: 150,
    borderWidth: 0.5,
    borderColor: "#FFF",
  },
  textoLinkView: {
    position: "absolute",
    height: 50,
    width: wp("100%"),
    left: 100,
    top: hp("1%"),
  },
  textoLink: {
    fontSize: 30,
    backgroundColor: "#00000099",
    height: 50,
    width: wp("100%"),
    left: 100,
    borderWidth: 0.5,
    borderColor: "#FFF",
  },
  linhaSuperior16x9: {
    top: hp("20%"),
    width: wp("100"),
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  linhaControll16x9: {
    top: Platform.OS == "android" ? wp("25") : wp("26%"),
    width: wp("100"),
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
  },
  linhaSlider16x9: {
    bottom: 0,
    width: wp("100"),
    paddingHorizontal: "2.5%",
    paddingVertical: 5,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    //flex: 1,
    //paddingLeft: "5%",
    //backgroundColor: '#0F0'
  },
  linhaSliderFull: {
    width: hp("80%"),
    height: hp("4%"),
    left: wp("10%"),
    position: "absolute",
    flexDirection: "row",
    top: wp("86"),
  },
  linhaTempoFull: {
    bottom:
      Platform.OS == "android" ? wp("5") : height < 750 ? wp("4.5") : wp("9.5"),
    width: hp("90"),
    position: "absolute",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  linhaBaixoSlide: {
    bottom:
      Platform.OS == "android"
        ? wp("-5")
        : height < 750
        ? wp("-6.5")
        : wp("-4.5"),
    width: hp("90"),
    position: "absolute",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  linhaTempo16x9: {
    //flex: 1,
    flexDirection: "row",
    //justfiyContent: "space-between",
    width: "100%",
    paddingHorizontal: 5,
    //paddingLeft: wp("2.5"),
    //paddingRight: 15,
  },
  linhaBaixo16x9: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    //position: "absolute",
    bottom: -20,
    //backgroundColor: '#FF0',
    height: 20,
    zIndex: 1002,
  },
  controlesFull: {
    top:
      Platform.OS == "android"
        ? wp("45")
        : height < 750
        ? wp("45%")
        : wp("45%"),
    width: hp("30"),
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  linhaSliderTopFull: {
    top: Platform.OS == "android" ? wp("5%") : wp("3%"),
    width: hp("100"),
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    paddingHorizontal: "2.5%",
  },
  seekTime: {
    flexDirection: "row",
  },

  controllViewFullScreen: {
    height: width,
    width: "100%", //Platform.OS == "ios" ? width : "100%",
    zIndex: 100,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  controllLinearGradientFullScreen: {
    height: "100%",
    width: "100%",
    backgroundColor: CustomDefaultTheme.colors.backgroundControlesplayer,
  },
  controllSliderFullScreen: {
    width: Platform.OS == "ios" ? hp("90%") : hp("95%"),
  },
  controllTextoFullScreen: {
    color: "#FFF",
    backgroundColor: "transparent",
    width: "50%",
    textAlign: "right",
    paddingRight: 5,
  },

  loadView: {
    height: "100%",
    width: "100%",
    zIndex: 100,
    position: "absolute",
    alignContent: "center",
    top: Platform.OS == "android" && width < height ? -85 : 0,
  },
  loadViewFilho: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },

  pipView: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  pipPressable: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  controllView16x9: {
    height: TAMANHO_16X_16,
    width: width,
    zIndex: 100,
    position: "absolute",
    backgroundColor: CustomDefaultTheme.colors.backgroundControlPlayer,
    top: Platform.OS == "ios" ? 0 : -95,
  },
  controllLinearGradient16x9: {
    //top: Platform.OS == "ios" ? 0 : 0,
    //height: Platform.OS == "ios" ? (height < 750 ? hp("34") : hp("28.5")) : hp("35"),
    width: width,
  },

  /// newwww
  backButtonContainer: {
    height: 60,
    width: 60,
    top: Platform.OS === "ios" ? hp("-18%") : hp("-18%"),
    left: wp("3%"),
    borderRadius: 100,
  },
  titleContainer: {
    top: Platform.OS === "android" ? hp("-18") : hp("-18"),
    right: wp("5"),
    width: wp("50"),
    height: hp("5"),
  },
  titleText: {
    color: "#FFF",
  },
  buttonRow: {
    flexDirection: "row",
    top: Platform.OS === "ios" ? hp("-18%") : hp("-18%"),
    paddingRight: 20,
  },
  spacing: {
    width: 5,
  },
  timeText: {
    color: "#FFF",
    backgroundColor: "transparent",
    width: "50%",
  },
  timeTextRight: {
    textAlign: "right",
  },
  slider: {
    width: "100%",
    //backgroundColor: '#F00',
    height: 40,
    bottom: -15,
    //bottom: Platform.OS == 'android' ? -5 : -15
    //zIndex: 100
  },legendaHorizontal: {
    zIndex: 1,
    position: "absolute",
    left: Platform.OS == "android" ? 30 : 0,
  },legendaVertical :{
    zIndex: 1,
    top: Platform.OS == "ios" ? wp("0") : -85,
    position: "absolute",
  }
});

export default styles;
