import { StyleSheet, Dimensions, Platform } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const screenHeight = Dimensions.get("screen").height;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
    /*container:{
        width: wp('100'),
        height: Platform.OS == 'ios' ? hp('8') : hp('7'),
        backgroundColor: CustomDefaultTheme.colors.bgsliderplayer,
        position: 'absolute',
        zIndex: 10,
        bottom: 0,
        flex: 1,
    }, */blocoTitulo:{
        color: CustomDefaultTheme.colors.preto, 
        fontSize: screenHeight < 750 ? 20 :25,
    }, blocoSubTitulo:{
        color: '#707070', 
        fontSize: screenHeight < 750 ? 10 :13, 
        maxWidth:('100%')
    },blocoTextoTitulo: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 10,
        top: -5,
        padding: 5,
      },
      blocoTempo: {
        flexDirection: "row",
        display: "flex",
        alignItems: "stretch",
        justifyContent: "space-between",
      },
      blocoBotoesCurtir: {
        flexDirection: "row",
        display: "flex",
        alignItems: "stretch",
        justifyContent: "space-between",
        marginTop: 10,
        marginBottom: 10,
      },
      blocoBotoesPlayer: {
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
      },
});

export default styles;