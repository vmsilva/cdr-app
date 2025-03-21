import React, { useContext, useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Image, Dimensions } from 'react-native';
import { Notifier, Easing, NotifierComponents } from 'react-native-notifier';
import { AntDesign, FontAwesome, Entypo } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Styles from './Styles';
import ButtonAssistir from '../../botoes/assistir';
import api from '../../../configuracoes/services/api';
import { UtilContext } from '../../../configuracoes/contexts/UtilContext';
import { useAuth } from '../../../configuracoes/hooks/auth';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme'
import FastImage from 'react-native-fast-image';

interface CardAlertaProps  {
  midia: any;
  imagem: string;
  rota: string;
  idVideo: string;
  tipo:string,
  setUpdate: any,
}
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const CardAlerta: React.FC<CardAlertaProps|any> = ({ midia, rota, idVideo, imagem, setUpdate }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const { setMeusLembretes, setMeusAlertas} = useContext(UtilContext);
  const { user } = useAuth()

  const [aoVivo, setAoVivo] = useState<any>([]);
  const EMPRESA =  ['','REDE MINAS','INCONFIDENCIA FM','INCONFIDENCIA AM'];
  const DIASEMANA = ['Domingo','Segunda','Terca','Quarta','Quinta','Sexta','Sabado'];
  
  const buscaProgramacaoAoVivo = async () => {
    // retorno sempre fixo com tres ao vivos
    try{
      const response = await api.post(`programacao/aovivo`, {});

      
      setAoVivo(response.data.data);
    } catch(error: any) {
      Notifier.showNotification({
        title: 'Erro Busca ao Vivo',
        description: error.response.data.data.error,
        translucentStatusBar: true,
        duration: 3000,
        showAnimationDuration: 800,
        showEasing: Easing.bounce,
        onHidden: () => console.log('Hidden'),
        onPress: () => console.log('Press'),
        hideOnPress: true,
        Component: NotifierComponents.Alert,
        componentProps: {
          alertType: 'error',
        },
      });  
    }
  }

  useEffect(() => {
    //console.log('card alertas teste leak')
    if(isFocused){
      Object.values(aoVivo).length > 0 ? '' : buscaProgramacaoAoVivo();
    }
    return()=>{}
  }, [
    aoVivo
  ]);

  const handleRemoveLembretes = async() =>{
    try {
      const response = await api.post('programacao/removelembrete', { token: user.token, cod_programacao: midia.cod_programacao });
      
      removeLembretesLocal(); 
      setUpdate(true);
    } catch (error:any) {
     Notifier.showNotification({
      title: 'Erro',
      description: `Não foi possivel reproduzir o video:  ${error}`,
      translucentStatusBar: true,
      duration: 30000,
      showAnimationDuration: 800,
      showEasing: Easing.bounce,
      onHidden: () => console.log('Hidden'),
      onPress: () => console.log('Press'),
      hideOnPress: true,
      Component: NotifierComponents.Alert,
      componentProps: {
        alertType: 'error',
      },
      
    });
    } finally {
      
    }
  }

  const removeLembretesLocal = async () => {
      let obj ={};
      obj[midia.cod_programacao] = midia.cod_programacao;
      try{
        const [ meus_lembretes ] = await AsyncStorage.multiGet([
          '@tvminas:meus_lembretes'
      ]);

      let REGISTRODELETE = JSON.parse(meus_lembretes[1]);
      delete REGISTRODELETE[midia.cod_programacao];

      AsyncStorage.multiRemove(['@tvminas:meus_lembretes']);

      await AsyncStorage.multiSet([
        ['@tvminas:meus_lembretes', JSON.stringify(REGISTRODELETE)]
      ]);

      const response =  await AsyncStorage.getItem('@tvminas:meus_lembretes');

      //console.log('remove sino');
      //carregaLembretesLocal()
      }catch(error){
        console.log(`card programacao storage ${error}`)
      }
  }

  const handleControllsChromeCast = (cod_empresa: any, titulo: any) => {
     
  }
  return(
    <>
      <View style={{
          width: wp('100%'),
          backgroundColor: 'transparent'
        }}
      >
        <View>
          <FastImage 
            resizeMode='cover'
            source={{uri: midia != undefined ?  midia.imagem_h_programacao: ''}} 
            style={Styles.imgThumbContent}
          />
            <View
              style={{
                position: 'absolute',
                height:hp('5'),
                top: hp('1%'),
                width:wp('10')
              }}
            >
              <TouchableOpacity style={{
                left: hp('5')    
              }}>
                  <AntDesign name="closecircle" size={hp('3.5%')} color={CustomDefaultTheme.colors.bgcarrossel} background={'#FFF'} 
                    style={{
                      
                    }}
                    onPress={handleRemoveLembretes}
                    iconStyle={{backgroundColor: '#FFF'}}
                  />
              </TouchableOpacity>
            </View>
        </View>
      </View>    
      <View style={{
            flexDirection:'row',
            width: wp('100%'),
            //height:hp('15%'), 
          }}>
            <View style={
              {
                width: wp('90%'),
                //height:hp('100%'),
                left: wp('5')
              }
            }>
              <View style={{flexDirection: 'row'}}>
                <Text style={[Styles.listagemItem,{top: hp('2%')}]}>
                  {
                    midia != undefined ?
                    EMPRESA[midia.cod_empresa]
                    : <></>
                  
                  } 
                </Text><Entypo name={
                  (midia != undefined && midia.cod_empresa == '1')? 'tv':'radio'
                  } size={24} color="#FFF" style={{top: hp('3'), position: 'absolute', right: wp('10')}} />
              </View>
              <Text style={[Styles.listagemItem,{top: hp('1%')}]}>{
                midia ?
                DIASEMANA[midia.dia_semana]
                :<></>
              } {
                midia != undefined ?
                 midia.hora_inicio_programacao
                :
                  <></>
               } - {
                midia != undefined ?
                  midia.hora_termino_programacao
                :
                  <></>
              }</Text>
              {
                midia != undefined ?
                <>
                  <Text style={[Styles.listagemItem,{fontSize: hp('1.8%'),top: hp('1%')}]}>{midia.nome_programacao}</Text>
                  <Text style={[Styles.listagemItem,{fontSize: hp('1.3%'),top: hp('0.2%')}]}>{midia.descricao_programacao}</Text>
                </>
                :
                  <></>
              }
              <View
                style={{flexDirection: 'row',padding: hp('1%'), top: hp('1.5%')}}
              >
                
                <View style={{width: wp('3%')}}/>
              </View>
            </View>  
      </View>   
    </>
  );
}
export default CardAlerta;
