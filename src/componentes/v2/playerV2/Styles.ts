import { StyleSheet, Platform, Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

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
    top: ("20%"),
    width: wp("100"),
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  linhaControll16x9: {
    //top: Platform.OS == "android" ? ("9%") : ("9%"), 
    height: '100%',
    //backgroundColor: '#FF0',
    width: ("100%"),
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center',
    flex: 1,
  },
  linhaSlider16x9: {
   
    width: wp("100"),
    position: "absolute",
    justifyContent: "center",
    alignItems: 'center',
    flex: 1,
    bottom: '5%'
  },
  linhaSliderFull: {
    width: ("85%"),
    marginTop: Platform.OS == "ios" ? wp(`80%`) : wp(`85%`),
    //left: wp("10%"),
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
    alignItems: 'center',
    height: 30, // 
  },
  controlesFull: {
    top: Platform.OS == "android" ? wp("42") : hp("18%"),
    width: hp("100"),
    //height: wp('80'),
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center',
    //flex: 1,
    //backgroundColor: '#FF0'
  },
  linhaSliderTopFull: {
    top: Platform.OS == "android" ? wp("5%") : wp("3%"),
    width: hp("100"),
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },textoRate :{

    color: '#FFF'
  }, legendaButton:{
    height: height,
    width: width,
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: "40%",
  },legendaVertical :{
    top: Platform.OS == "ios" ? wp("0") : -85,
    position: "absolute",
  }, legendaHorizontal: {
    position: "absolute",
    left: Platform.OS == "android" ? 30 : 0,
  }, controlePlayPauseBackNext:{
    height: 50,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: width > height ? width : width
  }
});

export default styles;
