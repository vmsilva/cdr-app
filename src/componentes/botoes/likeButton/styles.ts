import { StyleSheet, Platform, Dimensions } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
   content :{
    
  }, buttonControll :{
    justifyContent: 'center',
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