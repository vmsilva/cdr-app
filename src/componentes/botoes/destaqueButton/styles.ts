import { StyleSheet, Platform, Dimensions } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
    buttonDestaque:{
        backgroundColor: CustomDefaultTheme.colors.buttonPrimary,
        height: 50,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        width: wp('50'),
        borderRadiu: 99
    }
});

export default styles;