import { StyleSheet, Platform } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';
const styles = StyleSheet.create({
    container:{
       //flex: 1,
       //backgroundColor: CustomDefaultTheme.colors.primary,
       //justifyContent: "center",
    },horizontal: {
        position: 'absolute',
        flex: 1,
        //flexDirection: "row",
        //justifyContent: "space-around",
        minHeight: hp('110%'),
        minWidth: wp('100%')
    },conteudoFilho:{
        minHeight: hp('100%'),
        minWidth: wp('100%')
    }
});

export default styles;