import { StyleSheet, Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    width: wp('80%'),
    flexDirection: "row",
    //justifyContent: "space-between",
    alignItems: 'center',
    //height: 50,
    paddingVertical: 10,
    paddingHorizontal:5,
    //borderWidth: .2,
    borderBottomColor: CustomDefaultTheme.colors.backgroundAulas,
    //backgroundColor: '#F00'
    
  },
});

export default styles;
