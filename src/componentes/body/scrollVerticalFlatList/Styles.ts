import { StyleSheet, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({  
  container:{
    //flex: 1, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    //paddingBottom: hp('0.9%')
  },
  thumbContent: {
    borderRadius: wp("3%"),
    width: wp("40%"),
    height: wp("53.5%"),
    marginLeft: wp("1.5%"),
    marginRight: wp("1.5%"),
    padding: .4
  },imgThumbContent:{
    width: wp('40%'),
    height: wp('53.5%'),
    flex: 1,    
    resizeMode: 'cover',
    justifyContent: 'center',
    borderRadius: 10,
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
