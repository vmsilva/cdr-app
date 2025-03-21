import { StyleSheet, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomDefaultTheme } from '../../configuracoes/styles/Theme';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  conteudoProgramacao: {
    marginTop: hp('-7%'),
  },rightBloco:{ paddingRight: 10, paddingTop: 0 },
  headerConteudoProgramacao: {
    marginLeft: wp('1.7%'),
    color: '#FFF'
  },
  scrollView: {
    minWidth: wp('100%'),
    minHeight: wp('100%'),
  },
  espacoHeader:{
    paddingRight: wp("5"),
    justifyContent: "center",
    alignItems: "center",
    width: wp("85"),
  },
  header: {
    height: hp(`11.8%`),
    width: wp('100%'),
    backgroundColor: 'transparent',
    paddingVertical: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    overflow: 'hidden',
    left: 0,
    right: 0,
    top: 0
  }, blocoAoVivo: {
    backgroundColor: CustomDefaultTheme.colors.blocoAoVivoCor
  }, topBar: {
    flexDirection: 'row',
  }, containerHeader: {
    position: 'absolute',
    zIndex: 3, // works on ios
    elevation: 3,
    height: hp('15%')
  }, containerMinimizado: {
    zIndex: 3, // works on ios
    elevation: 3, // works on android
    backgroundColor: '#00000099',
    position: 'absolute',
    height: 45,
    width: wp('100%'),
  }, logoHeader: {
    height: hp('10%'),
    width: wp('55%'),
    marginLeft: 0,
    marginTop: -12
  }, img: {
    width: 225,
    height: 30
  }, buttonCLick: {
    height: 25,
  }, contentButtonsHeader: {
    flexDirection: 'row',
    width: wp('45%'),
    justifyContent: 'flex-end',
    right: wp('1%'),
  }, texto: {
    color: '#FFF'
  }, headerBloco: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    width: wp('100%'),
    flexDirection: 'row',
    marginTop: Platform.OS == 'ios' ? hp('2%') : -20,
    paddingLeft: 30,
    paddingRight: 30,
  }, headerImgTamanho: {
    width: 90,
    height: 30,
  }, verticalTamanho:{
    // /minHeight: wp('25')
  }, linhaEspaco:{
    marginTop: 20,
    marginBottom: 20
  }, conteudoaccordion:{
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "50%",
  }, justificado: {
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    height: 30
  }, fonteTitulo:{ fontSize: 16, color: CustomDefaultTheme.colors.branco}, freqNumero: {
     justifyContent: 'center',
     alignItems: 'center',
     width: '50%'
   }
});

export default Styles;
