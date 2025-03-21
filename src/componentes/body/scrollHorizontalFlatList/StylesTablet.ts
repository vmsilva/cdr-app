import { StyleSheet, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';

const styles = StyleSheet.create({  
  container:{
    flex: 1, 
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: hp('0.5%'),
  },containerView:{
    width: wp('34%'),
  },thumbContent:{
    width: wp('32%'),
    minHeight: hp('20%'),
    backgroundColor: 'transparent',
    marginTop: hp('.9%'),
  },imgThumbContent:{
    width: wp('32%'),
    minHeight: hp('15%'),
    backgroundColor: CustomDefaultTheme.colors.backgroundCards,
    left: wp('2'),
    right: wp('2'),
    borderRadius: 15,
    flexWrap: 'wrap',
  },tituloCard:{
    marginTop: hp('1%'),
    color: '#FFF',
  },textoRodaPeCard:{
    color: '#FFF',
    marginTop: 2,
    left: 5    
  },textoSubititulo:{
    maxWidth: wp('26'),
    color: CustomDefaultTheme.colors.branco,
    left: 20,
    fontSize: 12.5,
    flexWrap: 'wrap',
  }
});

export default styles;
