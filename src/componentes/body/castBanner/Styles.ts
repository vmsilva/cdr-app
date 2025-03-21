import { StyleSheet, Dimensions, PlatformColor } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';


const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({  
  container:{
    flex: 1, flexDirection: 'row',
    justifyContent: 'space-between',
  },containerView:{
  },thumbContent:{
    width: wp('90%'),
    height: wp('87%'),
    backgroundColor: 'transparent',
    marginTop: hp('2%'),
    left: wp('5%'),
  },imgThumbContent:{
    height: wp('48%'),
    top: 3,
    backgroundColor: '#FF00',
    borderRadius: 15
  },tituloCard:{
    marginTop: hp('1%'),
    color: '#FFF',
    fontFamily: 'Inter_900Black'
  },textoRodaPeCard:{
    color: '#FFF',
    fontSize: 12,
    marginTop: -12,
  }, chipAoVivo:{
    backgroundColor: CustomDefaultTheme.colors.aoVivoColor,
    width: wp('20%'),
    height: hp('3'),
    borderRadius: wp('10'),
    top: windowHeight > 890? hp('-19%') : hp('-23%'),
  },blocoinferior:{
    top: hp('-5%'),
    left: wp('-3%')
  }, textoHora:{
    color: '#e9e8e8eb',
    fontSize: 12
  }, textoTitulo:{
    color: '#FFF',
    fontSize: wp('2.4')
  }, textoSubTitulo:{
    color: '#e9e8e8eb',
    fontSize: wp('2'),
    fontFamily:'Sora_400Regular'
  }, botaoProgramacao:{
    backgroundColor: 'transparent',
    borderColor: '#FFF',
    width: wp('42%'),
    //height: hp('5%'),
    borderWidth: 0.6,
    borderRadius: hp('10')
  }
});

export default styles;
