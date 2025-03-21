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
    //width: wp('55%'),
    //width: wp('43%'),
    //backgroundColor: '#F00',
    paddingVertical: .5
  },thumbContent:{
    width: wp('55%'),
    //height: wp('40%'),
    //backgroundColor: '#FF0',
    //marginRight: 7,
    //borderRadius: 15,
    paddingHorizontal: 5,
  },imgThumbContent:{
    width: ('99%'),
    height: 122,//wp('30%'),
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
    color: CustomDefaultTheme.colors.textScrollDashboard,
    lineHeight: 18,
    letterSpacing: 0.28,
    //marginTop: 2,
    left: 5,
    fontSize: 11.5,
    flexWrap: 'wrap',
    width: '90%'
  }
});

export default styles;
