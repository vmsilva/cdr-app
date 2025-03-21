import { StyleSheet, Platform, Dimensions } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
   content :{
    height: 60,
    width: 60,
    borderRadius: 99,
    position: 'absolute',
    bottom: 50,
    backgroundColor: CustomDefaultTheme.colors.buttonPrimary,
    justifyContent: 'center',
    zIndex: 1,
    flexDirection: 'row',
    right: 30,
    paddingTop: 10
  }, buttonControll :{
    height: 70,
    width: 70,
    borderRadius: 99,
    justifyContent: 'center',
    zIndex: 1,
    flexDirection: 'row'
  },shadow: {
    shadowColor: '#000',
    shadowOffset: {width: -1, height: 1.4},
    shadowOpacity: 0.4,
    shadowRadius: 3,borderRadius: 10
  },shadowElevation :{
    elevation: 1,
    shadowColor: '#000'
  }
});

export default styles;