import { StyleSheet, Dimensions } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';


const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({  
  container:{
    flex: 1, flexDirection: 'row',
    justifyContent: 'space-between',
  },containerView:{
    //marginLeft: wp('5%'),
    //marginRight: wp('5%'),
  },thumbContent:{
    width: wp('100%'),
    height: wp('40%'),
    backgroundColor: '#FFF',
    marginTop: hp('2%'),
    //marginLeft: wp('2.5%'),
    //marginRight: wp('0.5%'),
    //marginBottom: hp('2%'),
    //borderRadius: 15,
  },imgThumbContent:{
    width: wp('100%'),
    height: wp('40%'),
    borderRadius: -15,
  },tituloCard:{
    marginTop: hp('1%'),
    color: '#FFF',
    fontFamily: 'Inter_900Black'
  },textoRodaPeCard:{
    color: '#FFF',
    fontSize: 12,
    marginTop: -12,
  },

  cardContent:{
    //height:hp('40%'),
    //minHeight: hp('2'),
    width: wp('95%'),
    left: wp('3%'),
    backgroundColor: CustomDefaultTheme.colors.corBotaoProgramacao,
    borderRadius: 15,
    justifyContent: 'space-between'
    //bottom:5
  }, textoHora:{
    color:CustomDefaultTheme.colors.preto,
    opacity: .5,
    fontSize: 14,
    top: 10,
    left: 15
  }, textoNome: {
    color:CustomDefaultTheme.colors.preto,
    opacity: .5,
    fontSize: 18,
    top: 10,
    left: 15,
    //height: hp('60')
  }, botaoCards:{
    borderRadius: 999,
    maxHeight: 30,
    width: 30,
    top: 10,
    height: hp('5%'),
    //width: wp('10%'),
    backgroundColor: '#2f2f34cf',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  }
});

export default styles;
