import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';


const styles = StyleSheet.create({
    container:{
        zIndex: 3, // works on ios
        elevation: 3, // works on android
        //backgroundColor: '#00000099',
        backgroundColor: '#00000099',
        position: 'absolute',
        height: 95,
        width: wp('100%'),
    },containerMinimizado:{ 
        zIndex: 3, // works on ios
        elevation: 3, // works on android
        //backgroundColor: '#00000099',
        backgroundColor: '#00000099',
        position: 'absolute',
        height: 45,
        width: wp('100%'),
    },topBar:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 50
        /*flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'*/
    },title:{
        /*color:'#FFF',
        fontSize:24,
        lineHeight:32,
        maxWidth:160,
        marginVertical: 40*/
    },header:{
       /*flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'space-between', 
       backgroundColor: '#000'*/
    },logoHeader:{
        height: hp('10%'),
        width: wp('70%'),
        marginTop: hp('-2%'),
        //backgroundColor: '#FFF'

    },buttonCLick:{
        //flexDirection: 'row',
        //height: 100,
        
    },contentButtonsHeader:{
        flexDirection: 'row',
    }
});

export default styles;