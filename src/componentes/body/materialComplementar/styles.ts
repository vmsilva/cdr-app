import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';


const styles = StyleSheet.create({
    container: {
        //borderRadius: 10,
        overflow: 'hidden',
        //backgroundColor: CustomDefaultTheme.colors.preto,
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
      },
});

export default styles;