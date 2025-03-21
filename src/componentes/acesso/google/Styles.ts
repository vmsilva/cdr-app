import { StyleSheet, Dimensions } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({  
  googleButton:{ 
    backgroundColor: CustomDefaultTheme.colors.branco,
    borderRadius: 5,
    textAlign: 'center',
    width: wp("85")
  },
  googleText:{
    color: CustomDefaultTheme.colors.branco
  },
});

export default styles;
