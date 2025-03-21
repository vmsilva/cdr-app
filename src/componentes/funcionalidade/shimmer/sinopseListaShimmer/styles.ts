import { StyleSheet, Dimensions } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

const styles = StyleSheet.create({
    container: {
      marginTop: 5,
      paddingBottom: 10,
      borderBottomColor: "#707070",
      borderBottomWidth: 0.4,
      flexDirection: "row",
      justifyContent: "space-between",
      
    },textContainer:{
      width: wp('70')
    }
});

export default styles;