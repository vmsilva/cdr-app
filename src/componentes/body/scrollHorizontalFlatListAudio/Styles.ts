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
    borderRadius: 10,
    width: wp("40%"),
    //height: wp("50.5%"), /// voltar caso tenha texto
    marginLeft: wp("1.5%"),
    marginRight: wp("1.5%"),
    padding: .4
    /*width: wp('37%'),
    backgroundColor: 'transparent', 
    marginRight: 7,*/
  },imgThumbContent:{
    //width: wp('40%'),
    height: wp('40.5%'),
    //flex: 1,    
    resizeMode: 'cover',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: CustomDefaultTheme.colors.backgroundCards
    
    /*width: wp('37.4%'),
    height: wp('37%'),//wp('31%'),
    backgroundColor: CustomDefaultTheme.colors.backgroundCards,
    left: wp('2'),
    right: wp('2'),
    borderRadius: 10,*/
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
