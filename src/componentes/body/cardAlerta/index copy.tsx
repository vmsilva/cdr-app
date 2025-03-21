import React, { useContext, useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { Notifier, Easing, NotifierComponents } from 'react-native-notifier';
import { AntDesign, FontAwesome, Entypo } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Styles from './Styles';
import ButtonAssistir from '../../botoes/assistir';
import api from '../../../configuracoes/services/api';
import { UtilContext } from '../../../configuracoes/contexts/UtilContext';
import { useAuth } from '../../../configuracoes/hooks/auth';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme'

interface CardAlertaProps  {
  midia: any;
  imagem: string;
  rota: string;
  idVideo: string;
  tipo:string
}

const BKPCardAlerta: React.FC<CardAlertaProps|any> = ({ midia, rota, idVideo, imagem }) => {
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
    if(isFocused){
      Object.values(aoVivo).length > 0 ?  '': buscaProgramacaoAoVivo();

      console.log(Object.values(aoVivo));
    }
    return()=>{}
  }, [aoVivo]);

  const handleRemoveLembretes = async() =>{
    try {
      const response = await api.post('programacao/removelembrete', { token: user.token, cod_programacao: midia.cod_programacao });
      setMeusLembretes([]);
      setMeusAlertas([]);

    } catch (error:any) {
     //console.log('Erro ao buscar minhas listas context api', error);
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

  return(
       <View style={{
            flexDirection:'row',width: wp('100%'),
            height:hp('25%'), 
          }}>
            <View style={
              {
                width: wp('40%'),
                height:hp('100%'),
                backgroundColor: 'transparent'
              }
            }>
              <View                      
                style={Styles.thumbContent}
              >
                <Image 
                  resizeMode='cover'
                  source={{uri: midia.imagem_h_programacao}} 
                  style={Styles.imgThumbContent}
                />
                  <View
                    style={{
                      position: 'absolute',
                      left: wp('22%'),
                      height:hp('5'),
                      top: hp('1%'),
                      width:wp('10')
                    }}
                  >
                    <View style={{
                        }}>
                          <AntDesign name="closecircle" size={hp('3.5%')} color={'red'} background={'#FF0'} 
                            style={{
                              
                            }}
                            onPress={handleRemoveLembretes}
                            iconStyle={{backgroundColor: '#FFF'}}
                          />
                      </View>
                  </View>
              </View>
            </View>  
            <View style={
              {
                width: wp('60%'),
                height:hp('100%'),
              }
            }>
              <View style={{flexDirection: 'row'}}>
                <Text style={[Styles.listagemItem,{top: hp('2%')}]}>{EMPRESA[midia.cod_empresa]} 
                </Text><Entypo name={midia.cod_empresa == '1'? 'tv':'radio'} size={24} color="#FFF" style={{top: hp('3'), position: 'absolute', right: wp('10')}} />
              </View>
              <Text style={[Styles.listagemItem,{top: hp('1%')}]}>{DIASEMANA[midia.dia_semana]} {midia.hora_inicio_programacao} - {midia.hora_termino_programacao}</Text>
              <Text style={[Styles.listagemItem,{fontSize: hp('2.2%'),top: hp('1%')}]}>{midia.nome_programacao}</Text>
              <Text style={[Styles.listagemItem,{fontSize: hp('1.3%'),top: hp('0.2%')}]}>{midia.descricao_programacao}</Text>
              <View
                style={{flexDirection: 'row',padding: hp('1%'), top: hp('1.5%')}}
              >
                {
                  midia.cod_empresa == '1' ?
                    <ButtonAssistir 
                      rota={'PlayerDiretoFullScreenAoVivoDrawer'}
                      tipo={'1'}
                      midia={Object.values(aoVivo)[0]}
                      titulo={midia.nome_programacao}
                    />
                  :
                    midia.cod_empresa == '2' ?
                      <ButtonAssistir 
                        rota={'AudioPlayeraoRadioVivoDrawer'}
                        tipo={'2'}
                        midia={Object.values(aoVivo)[1]}
                        titulo={midia.nome_programacao}
                      />
                    :
                      <ButtonAssistir 
                        rota={'AudioPlayeraoRadioVivoDrawer'}
                        tipo={'2'}
                        midia={Object.values(aoVivo)[2]}
                        titulo={midia.nome_programacao}
                      />
                  }
                <View style={{width: wp('3%')}}/>
              </View>
            </View>  
        </View>   
  );
}
export default BKPCardAlerta;
