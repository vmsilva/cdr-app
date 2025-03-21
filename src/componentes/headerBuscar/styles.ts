import { StyleSheet, Platform, Dimensions } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { CustomDefaultTheme } from '../../configuracoes/styles/Theme';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
    container:{
        //height: windowHeight < 800 ? hp('13%') : hp('13%'),
        backgroundColor: CustomDefaultTheme.colors.background,
        width: wp('100%'),
        position:'absolute',
        zIndex: 100,
        marginTop: 50 
    }, containerMinimizado:{ 
        //backgroundColor: '#00000099',
        position: 'absolute',
        height: 45,
        width: wp('100%'),
    }, topBar:{
        backgroundColor: CustomDefaultTheme.colors.background,
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        //marginTop: Platform.OS == 'ios' ? hp('1.5%') : hp('7%'),
        //height: hp('2%')
    }, logoHeader:{
        height: hp('10%'),
        width: wp('55%'),
        marginLeft: 0,
        marginTop: windowHeight > 890 ? hp('0.3') : -8

    }, img:{
        width: 225,
        height: 30
    }, buttonCLick:{
        height: hp('10'),
        
    }, contentButtonsHeader:{
        flexDirection: 'row',
        width: wp('45%'),
        justifyContent: 'flex-end',

        right: wp('1%'),
    }, texto: {
        color: '#FFF'
    }
});

export default styles;