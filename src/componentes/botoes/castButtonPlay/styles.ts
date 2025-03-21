import { StyleSheet, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
    btnCastPlay:{
        backgroundColor: CustomDefaultTheme.colors.buttonPrimary,
        height: 50,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: -10,
        width: wp('82'),
    }
});

export default styles;