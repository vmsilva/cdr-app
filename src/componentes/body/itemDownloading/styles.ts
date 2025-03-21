import { StyleSheet, Platform, Dimensions } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
    containerScroll:{
        height: '100%',
      },itemVideo:{
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 0.2,
        borderBottomColor: "#000",
        flexDirection: "row",
        justifyContent: "space-between",
        width: wp("100"),
      }, blocoBotoesPlay:{
        paddingRight: '5%',
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
      }, blocoTextoPlay:{
        paddingLeft: '5%',
        width: '95%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
      }
});

export default styles;