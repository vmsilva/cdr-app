import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

const styles = StyleSheet.create({
  container: {},
  header: {
    height: 30,
    marginTop: 7,
  },
  title: {
    fontSize: 18,
    color: "#000",
  },
  content: {
    padding: 10,
  },
  icon: {
    //padding: 10,
  },textoRate:{
    color: '#FFF'
  },overlay: {
    width: '100%',
    height: '100%',
  },
  rateBox: {
    padding: 10,
    borderRadius: 10,
    position: "absolute",
    //width: 80,
    //height: 155,
    top: 130,
    right: 10,
    backgroundColor: CustomDefaultTheme.colors.background,
    borderWidth: .2,
    borderColor: '#FFF',
    zIndex: 1,
  }
});

export default styles;
