import { StyleSheet, Dimensions, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';


export const SLIDER_WIDTH = Dimensions.get('window').width + 0
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.4)

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
      minHeight: windowHeight < 750 ? hp("45") : hp("34"),
      height:
        Platform.OS == "android"
          ? 300
          : windowHeight < 750
          ? hp("40")
          : hp("34"),
    },
    containerAndroid: {
      marginLeft: wp('0'),
      width: 150,
      paddingBottom: 0,
      paddingTop: 10,
      minHeight: 300,
      borderRadius: 999,
      //elevation: -1,
      //backgroundColor: "#000",
    },
    image: {
      width: 120,
      height: 120,
      opacity: 0.4,
      borderRadius: 999
    },
    bloco:{
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      width: ITEM_WIDTH,
      height: hp('25')
    },
    header: {
      color: "#FFF",
      fontSize: 38,
      fontWeight: "bold",
    },
    body: {
      color: "#222",
      fontSize: 18,
      paddingLeft: 20,
      paddingRight: 20
    }, 
    btnAtivo: {
      backgroundColor: CustomDefaultTheme.colors.primary,
      color: CustomDefaultTheme.colors.branco
    }, btnInativo: {
      backgroundColor: 'transparent',
      borderColor: CustomDefaultTheme.colors.primary
    },
    loadingContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    _container: {
      flex: 1,
      position: 'absolute',
      height: 500
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    posterImage: {
      borderRadius: 999,
      margin: 125,
    },blocoIcone:{
      right: 65,
      top: 85,
      backgroundColor: '#F00',
      position: 'absolute',
      borderRadius: 999,
      textAlign: 'center',
      padding: 2,
      height: 30,
      width:30
    },
    blocoAgora:{
      //right: -10,
      top: 200,
      //backgroundColor: '#F00',
      position: 'absolute',
      //borderRadius: 999,
      textAlign: 'center',
      //padding: 2,
      minHeight: 30,
      width:wp('100')
    },
    blocoAgoraAndroid:{
      top: 190,
      position: 'absolute',
      textAlign: 'center',
      minHeight: 30,
      width:wp('40')
    }, circulo:{
      width:100, 
      height: 100, 
      borderRadius: 9999,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: CustomDefaultTheme.colors.borda,
  }

});

export default styles;