import { StyleSheet, Dimensions } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';

const Styles = StyleSheet.create({
  container: {},
  conteudoProgramacao: {
    marginTop: hp('2%')
  },
  header: {
    //marginLeft: wp('7%'),
    //color: '#FFF'
    //height:400,
    width: wp('100%'),
    backgroundColor: CustomDefaultTheme.colors.secondary ,
    paddingVertical: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    overflow: 'hidden',
    left:0,
    right:0,
    top:0
  },
  listagemItem:{
    padding: hp('1%'),
    fontSize: hp('1.5%'),
    color: '#FFF'
  },
  scrollView: {
    // backgroundColor: CustomDefaultTheme.colors.secondary,
    minWidth: wp('100%'),
    minHeight: wp('100%'),
  }, thumb:{
    //paddingVertical:170,
    //height: hp('100%'),
    //width: wp('100%'),
    //borderRadius: 70,
    /*height: wp('30%'),
    width: wp('100%'),*/
    //backgroundColor: 'rgba(0,0,0,0.2)',
    height: 450,
    width: wp('100%'),
  }, LinearContent: {  
    position: "absolute", 
    height: hp('100%'), 
    width: wp('100%')
  }, conteudoVideo: {
    marginLeft: wp('5%'),
    //marginLeft: 15,
    marginTop: -10,
    alignItems: 'flex-start',
    width: wp('95%'),
    //backgroundColor: '#FFF',
    height: hp('35%') 
  }, tituloVidoe:{
    color: '#FFF'
  },textoCategoriaVideo:{
    //color: '#c2c3c4db',
    color: CustomDefaultTheme.colors.textoOpaco,
    left: 15,
    fontSize: 10
  }, informacoesVideo:{

  }, descricaoVideo:{
    color: '#FFF',
    width: wp('90%'),
  }, mes:{
    flexDirection: 'row'
  }, dia:{
    flexDirection: 'row'
  },botaoMes:{
    height: hp('6.5%'),
    width: wp('15%'),
    backgroundColor: CustomDefaultTheme.colors.corBotaoProgramacao,
    borderRadius:10
  },informacaoMes:{
    height: hp('6.5%'),
    width: wp('60%'),
    backgroundColor: CustomDefaultTheme.colors.corBotaoProgramacao,
    borderRadius:10
  },
  botaoDia:{
    height: hp('9%'),
    width: wp('15%'),
    backgroundColor: CustomDefaultTheme.colors.corBotaoProgramacao,
    borderRadius:10,
    /*flex: 1,
    alignItems: "center", // ignore this - we'll come back to it
    justifyContent: "center", // ignore this - we'll come back to it
    flexDirection: "row",*/
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },informacaoDia:{
    textAlign: 'center',
    height: hp('9%'),
    width: wp('60%'),
    backgroundColor: CustomDefaultTheme.colors.bgcarrossel,
    borderRadius:10,
    
  }, legendasProgramacao:{
    borderRadius: 15,
    top: 25,
    borderWidth:0.3,
    borderColor: '#FFF',
    backgroundColor: 'transparent',
    height: hp('10%'),
    width: wp('92%')
  }, botaoCards:{
    borderRadius: 5,
    //top: 10,
    //height: hp('20%'),
    width: wp('25%'),
    backgroundColor: '#2f2f34cf',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    alignItems: "center",
    backgroundColor: "#dcda48",
    flexGrow: 1,
    margin: 4,
    padding: 20,
    flexBasis: 0,
  },
  text: {
    color: "#333333"
  },
  itemEmpty: {
    backgroundColor: "transparent",
    height: hp('40%')
    //bottom: 350

  },thumbContent:{
    backgroundColor: "green",
    top: hp('3%'),
    left:wp('3%'),
    width: wp('32%'),
    height: hp('20%'),
    borderRadius: 15
  },imgThumbContent:{
    width: wp('32%'),
    height: hp('20%'),
    backgroundColor: 'transparent',
    borderRadius: 15
    //borderTopLeftRadius:wp('5%'),
    //borderTopRightRadius:wp('6%')
  }
});

export default Styles;
