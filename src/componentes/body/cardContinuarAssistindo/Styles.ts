import { StyleSheet, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({  
  container:{
    flex: 1, 
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  thumbContent:{
    backgroundColor: CustomDefaultTheme.colors.continuarAssistindoBackground,
    opacity: 0.9,
    width: wp('84.5%'),
    height: wp('20.5%'),
    flexDirection: 'row',
    marginRight: wp('3.5%'),
    borderRadius: 10
  },imgThumbContent:{
    width: wp('27.5%'),
    height: wp('37.5%'),
    flex: 1,    
    resizeMode: 'cover',
    justifyContent: 'center',
    borderRadius: wp('3%'),
    backgroundColor: CustomDefaultTheme.colors.backgroundCards
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
  slideImage: {  width: wp('100%'), height: hp('100%'),opacity: 0.01}
});

export default styles;
