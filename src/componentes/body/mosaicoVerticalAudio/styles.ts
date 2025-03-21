import { StyleSheet, Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

const Styles = StyleSheet.create({
  container:{
    flex: 1, 
    flexDirection: 'column',
    justifyContent: 'space-between',
    //backgroundColor: '#F00'
  },containerView:{
    //width: wp('43%'),
  },thumbContent:{
    marginTop: 35,
    paddingHorizontal: 10,
    //marginLeft: wp("5"),
    width: wp('47%'),
    height: 166,///wp('28.5%'),//wp('31%'),
    //backgroundColor: '#0FF', 
    //marginRight: 7,
  },imgThumbContent:{
    width: '99%',//166,//wp('25.4%'),
    height: 166,//wp('25.5%'),//wp('31%'),
    backgroundColor: CustomDefaultTheme.colors.cinzaEscuro,
    borderRadius: 10,
  },tituloCard:{
    marginTop: hp('1%'),
    color: '#FFF',
  },textoRodaPeCard:{
    color: '#FFF',
    marginTop: 2,
    left: 5    
  },textoSubititulo:{
    color: CustomDefaultTheme.colors.preto,
    //marginTop: 2,
    left: 5,
    fontSize: 10.5,
    flexWrap: 'wrap',
    width: '90%'
  }
});

export default Styles;
