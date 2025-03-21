import { StyleSheet, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomDefaultTheme } from '../../../../configuracoes/styles/Theme';

const Styles = StyleSheet.create({
  container:{
    flex: 1, 
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: hp('0.5%'),
    backgroundColor:'#F00'
  },containerView:{
    flexDirection: 'row',
    width: wp('100%'),
    paddingLeft: wp('5')
  },thumbContent:{
    width: wp('40%'),
    height: hp('15%'),
    backgroundColor: 'transparent',
    marginTop: hp('2.5%'),
  },imgThumbContent:{
    width: wp('45%'),
    height: hp('14%'),
    backgroundColor: 'transparent',
    left: wp('2'),
    right: wp('2'),
    backgroundColor: CustomDefaultTheme.colors.fakerBG,
  },tituloCard:{
    marginTop: hp('1%'),
    color: '#FFF',
  },textoRodaPeCard:{
    backgroundColor: '#FFF',
    width: wp('40%'),
    height: hp('15%'),
    marginTop: 2,
    left: 20,
    maxWidth:  wp('40')    
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

export default Styles;
