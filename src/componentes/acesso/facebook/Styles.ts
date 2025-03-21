import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';

const styles = StyleSheet.create({  
  facebookButton: {
    backgroundColor: CustomDefaultTheme.colors.branco,
    borderRadius: 5,
    textAlign: 'center',
  }, 
  facebookText: {
    color: CustomDefaultTheme.colors.branco
  }, 
});

export default styles;
