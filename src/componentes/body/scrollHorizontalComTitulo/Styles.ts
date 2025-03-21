import { StyleSheet, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';


const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({  
  container:{
    flex: 1, 
    flexDirection: 'column',
    justifyContent: 'space-between',
  },containerView:{
    width: wp('55%'),
    //backgroundColor: '#0F0'
  },thumbContent:{
    width: wp('55%'),
    height: wp('40%'),
    backgroundColor: CustomDefaultTheme.colors.background,
    marginTop: hp('.9%'),
    padding: 5,
    //borderRadius: 15,
  },imgThumbContent:{
    width: ('100%'),
    height: wp('30%'),
    backgroundColor: CustomDefaultTheme.colors.backgroundCards,
    borderRadius: 15
  },tituloCard:{
    marginTop: hp('1%'),
    color: '#FFF',
    fontFamily: 'Inter_900Black'
  },textoRodaPeCard:{
    color: '#FFF',
    marginTop: 2,
    left: 5    
  },textoSubititulo:{
    color: CustomDefaultTheme.colors.branco,
    width: wp('45'),
    marginTop: 2,
    left: 5,
    fontSize: 12    
  },blocoHeader:{
    left: wp('2'),
    right: wp('2'),
    borderTopLeftRadius:  15,
    borderTopRightRadius:  15,
    backgroundColor: CustomDefaultTheme.colors.cinzaEscuro,
    height: 25,
    alignItems: "center",
    justifyContent: 'center',
    flexDirection: 'row'
  },blocoHeaderImagem:{
    left: wp('2'),
    right: wp('2'),
    height: wp('10'),
    borderTopLeftRadius:  15,
    borderTopRightRadius:  15,
    backgroundColor: CustomDefaultTheme.colors.cinzaEscuro,
    //height: 25,
    alignItems: "center",
    justifyContent: 'center',
    flexDirection: 'row'
  }
});

export default styles;
