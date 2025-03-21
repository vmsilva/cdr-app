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
    width: wp('40.5'),
    height: wp('54'),
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
  LinearContent: {height: ('100%'), width: ('100%')},
  slideImage: {  width: wp('100%'), height: hp('100%'),opacity: 0.01},
  informacoesBloco:{
    width: wp('100'),
    top: ('70%')
  }, blocoDireita:{
    paddingTop: Platform.OS == 'ios' ? 10 : 25, 
    paddingLeft: 5,
    width: wp('60')
  }
});

export default styles;
