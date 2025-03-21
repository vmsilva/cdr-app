import { StyleSheet, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';

const styles = StyleSheet.create({  
  container:{
    flex: 1, 
    flexDirection: 'column',
    justifyContent: 'space-between',
    //backgroundColor: '#F00'
  },containerView:{
    //width: wp('43%'),
  },thumbContent:{
    width: wp('44%'),
    height: wp('31%'),
    backgroundColor: 'transparent',
    marginRight: 7,
  },imgThumbContent:{
    width: ('100%'),
    height: ('80%'),
    backgroundColor: CustomDefaultTheme.colors.backgroundCards,
    left: wp('2'),
    right: wp('2'),
    borderRadius: 15,
  },tituloCard:{
    marginTop: hp('1%'),
    color: '#FFF',
  },textoRodaPeCard:{
    color: '#FFF',
    marginTop: 2,
    left: 5    
  },textoSubititulo:{
    color: CustomDefaultTheme.colors.preto,
    //marginTop: 2,
    left: 5,
    fontSize: 10.5,
    flexWrap: 'wrap',
    width: '90%'
  }
});

export default styles;
