import { Platform, StyleSheet } from 'react-native';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';


const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: CustomDefaultTheme.colors.accordion,
        marginBottom: 5,
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
      },
      title: {
        fontSize: 14,
        color: '#000'
      },
      content: {
        padding: 10,
      },
      icon: {
        padding: 10,
      },subtituloFonte:{
        backgroundColor: CustomDefaultTheme.colors.iconsPrimaryColor,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
        borderRadius: 5,
        minWidth: 60
      },subtituloFonteText:{
        color: '#FFF',
        fontSize: 12
      },slider : {
        width: '100%',
        height: 100,
        //bottom: windowHeight >  750 ? 0 : -15,
        bottom: Platform.OS  == 'android' ? 0 : -10,
        position: 'absolute'
      }
});

export default styles;