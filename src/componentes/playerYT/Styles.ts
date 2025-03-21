import { StyleSheet, Platform, Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomDefaultTheme } from "../../configuracoes/styles/Theme";

const { width: width, height: height } = Dimensions.get("window");

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
    top: Platform.OS == "android" ? hp("9") : hp("18%"),
    width: wp("100"),
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
  },
  linhaSlider16x9: {
    bottom:
      Platform.OS == "android"
        ? hp("23.5")
        : height < 750
        ? hp("12.5")
        : hp("9.5"),
    width: wp("100"),
    position: "absolute",
    justifyContent: "center",
    flex: 1,
  },
  linhaSliderFull: {
    width: hp("80%"),
    marginTop: Platform.OS == "ios" ? wp(`80%`) : wp(`85%`),
    left: wp("10%"),
    position: "absolute",
    flexDirection: "row",
  },
  linhaTempoFull: {
    bottom: Platform.OS == "android" ? wp("-6.5") : wp("-4.5"),
    width: hp("90"),
    left: wp("2"),
    position: "absolute",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  linhaTempo16x9: {
    flex: 1,
    flexDirection: "row",
    justfiyContent: "space-between",
    width: wp("100"),
    height: 30,
    paddingLeft: Platform.OS == "ios" ? wp("5") : wp("2.5"),
    paddingRight: Platform.OS == "ios" ? wp("5") : wp("2.5"),
    //backgroundColor: '#FF0'
  },
  controlesFull: {
    top: Platform.OS == "android" ? hp("18") : hp("18%"),
    width: hp("100"),
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
  },
  linhaSliderTopFull: {
    top: Platform.OS == "android" ? wp("5%") : wp("3%"),
    width: hp("100"),
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
});

export default styles;
