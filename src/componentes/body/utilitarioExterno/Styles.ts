import { StyleSheet, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';

const styles = StyleSheet.create({  
  container:{
    flex: 1, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: hp('0.5%')
  },
  thumbContent:{
    borderRadius: wp('3%'),
    width: wp('25'),
    height: wp('25'),
    marginTop: hp('2%'),
    marginLeft: wp('1.5%'),
    marginRight: wp('1.5%'),
    marginBottom: hp('2%'),
  },imgThumbContent:{
    flex: 1,   
    justifyContent: 'center',
    borderRadius: wp('3%'),
    backgroundColor: CustomDefaultTheme.colors.backgroundCards,
  },
  LinearContent: {  
    position: "absolute",
    width: wp('45%'),
    height: wp('70%'),
    backgroundColor: '#FFF',
    marginTop: hp('2%'),
    marginLeft: wp('1.5%'),
    marginRight: wp('1.5%'),
    marginBottom: hp('2%'),},
  slideImage: {  width: wp('100%'), height: hp('100%'),opacity: 0.01},
  informacoesBloco:{
    bottom: Platform.OS == 'ios' ? hp('29'): hp('32'),
    position: 'absolute',
    width: wp('100'),
  }, blocoDireita:{
    //backgroundColor: '#FF0',
    paddingTop: Platform.OS == 'ios' ? 15 : 25, 
    paddingLeft: 5,
    width: wp('60')
  }
});

export default styles;
