import { StyleSheet, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';


const styles = StyleSheet.create({  
  container:{
    flex: 1, flexDirection: 'row',
    justifyContent: 'space-between',
  },containerView:{
  },thumbContent:{
    width: wp('100%'),
    height: wp('60%'),
    marginTop: hp('2%')
  },imgThumbContent:{
    width: wp('100%'),
    height: wp('60%'),
    with: 400,
    backgroundColor: CustomDefaultTheme.colors.branco,
    marginTop: hp('15')
  },tituloCard:{
    marginTop: hp('1%'),
    color: '#FFF',
    fontFamily: 'Inter_900Black'
  },textoRodaPeCard:{
    color: '#FFF',
    fontSize: 12,
    marginTop: -12,
  }
});

export default styles;
