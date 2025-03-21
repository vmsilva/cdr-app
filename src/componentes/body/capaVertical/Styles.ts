import { StyleSheet, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({  
  container:{
    flex: 1, flexDirection: 'row',
    justifyContent: 'space-between',
  },
  thumbContent:{
    width: wp('27%'),
    height: wp('45%'),
    backgroundColor: '#FFF',
    marginTop: hp('2%'),
    marginLeft: wp('1.5%'),
    marginRight: wp('1.5%'),
    marginBottom: hp('2%'),
  },imgThumbContent:{
    width: wp('27%'),
    height: wp('45%'),
    flex: 1,    
    resizeMode: 'cover',
    justifyContent: 'center',
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
});

export default styles;
