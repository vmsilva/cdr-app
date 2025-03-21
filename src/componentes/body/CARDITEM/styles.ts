import { Dimensions, Platform, StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: CustomDefaultTheme.colors.backgroundAulas,
        marginBottom: 5,
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
      },
      title: {
        fontSize: 18,
        color: '#000'
      },
      content: {
        padding: 10,
      },
      icon: {
        padding: 10,
      },slider : {
        width: '100%',
        //bottom: windowHeight >  750 ? 0 : -15,
        bottom: Platform.OS  == 'android' ? 0 : -15
        //position: 'absolute'
      }
});

export default styles;