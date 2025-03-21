import { StyleSheet, Platform, Dimensions } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CustomDefaultTheme.colors.backgroundLoadingSecundary,
        justifyContent: 'center',
        alignItems: 'center',
      },
});

export default styles;