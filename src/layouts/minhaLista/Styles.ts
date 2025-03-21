import { StyleSheet, Dimensions } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { CustomDefaultTheme } from '../../configuracoes/styles/Theme';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const Styles = StyleSheet.create({
  container: {
    paddingTop: windowHeight < 750 ? 80 :110,
  },
  contentTab: {
    backgroundColor: "transparent",
  },
  tabButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    paddingHorizontal: '2.5%',
    borderRadius: 99,
    marginLeft:5,
    marginRight: 5
  },containerIcons:{
    width: 24,
    height: 24,
    borderRadius: 30,
    backgroundColor: CustomDefaultTheme.colors.cinzaGov,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Styles;
