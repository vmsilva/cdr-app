import { StyleSheet, Dimensions, Platform } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const screenHeight = Dimensions.get("screen").height;

const styles = StyleSheet.create({
  container: {
    width: wp("100"),
    paddingHorizontal: "2.5%",
    position: "absolute",
    //zIndex: 10,
    //bottom: 90,
    flex: 1,
  },
  blocoTitulo: {
    color: CustomDefaultTheme.colors.preto,
    //fontSize: screenHeight < 750 ? 20 :25,
    fontSize: 20,
  },
  blocoSubTitulo: {
    color: "#707070",
    fontSize: screenHeight < 750 ? 10 : 13,
    maxWidth: "100%",
  },
  blocoTextoTitulo: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    top: -5,
    padding: 5,
  },
  blocoTempo: {
    flexDirection: "row",
    display: "flex",
    alignItems: "stretch",
    justifyContent: "space-between",
  },
  blocoBotoesCurtir: {
    flexDirection: "row",
    display: "flex",
    alignItems: "stretch",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
  },
  blocoBotoesPlayer: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  itemBotoesSlider: {
    //width: 40,
    //backgroundColor: '#F0F'
  },
  containerIcons: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: CustomDefaultTheme.colors.buttonPrimary,
    justifyContent: "center",
    alignItems: "center",
  },
  sombraIos: {
    shadowColor: "#FFF",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 100,
    elevation: 20,
  },
  sombraAndroid: {
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

export default styles;
