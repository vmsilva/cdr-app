import React,{ useState, useEffect, useRef, useMemo, useCallback, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, Platform } from 'react-native';
import { Notifier, Easing, NotifierComponents } from 'react-native-notifier';
import { useAuth } from '../../../configuracoes/hooks/auth';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming
} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { List } from 'react-native-paper';
import { SimpleLineIcons as SIcon, Feather, FontAwesome, AntDesign, Entypo } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import api from '../../../configuracoes/services/api';
import styles from './Styles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { UtilContext } from '../../../configuracoes/contexts/UtilContext';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';


interface CardProgramacaoProps  {
  url: string;
  info: any;
  lembretesArray: any,
  setUpdateData : any,
  dadosEmpresa : any,
}

const CardProgramacao: React.FC<CardProgramacaoProps> = ({ url, info, lembretesArray, setUpdateData }) => {
  const navigation = useNavigation();
  const boxHeight = useSharedValue(hp('10%'));
  //const { meusLembretes, setMeusLembretes, setMeusAlertas } = useContext(UtilContext)
  const { user } = useAuth();

  const [mostraDescricao, setMostraDescricao] = useState(false);
  const [lembretesLocal, setLembretesLocal] = useState([]);

  const cardStyleExpand = useAnimatedStyle(() => {
    return {
      minHeight: withTiming(boxHeight.value, {duration: 750}),
    }
  });

  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);
  
  const handleRemoverAlerta = async(cod_programacao: any) => {
    try {
      const response = await api.post('programacao/removelembrete', { token: user.token, cod_programacao: cod_programacao });
      
      removeLembretesLocal();
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
      },});
    }
  };

  const handleAdicionarAlerta = async(cod_programacao: any) => {
    try {
      const response = await api.post('programacao/addlembrete', { token: user.token, cod_programacao: cod_programacao });
      
      concatenaLembretesLocal();
      //carregaLembretesLocal();
      setUpdateData(false)
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
      },});
    } finally {
      
    }
  };

  const concatenaLembretesLocal = async () => {
      let obj ={};
      obj[info.cod_programacao] = info.cod_programacao
      try{
        await AsyncStorage.mergeItem('@tvminas:meus_lembretes',JSON.stringify(obj));

        //console.log('adiciona sino')
        carregaLembretesLocal()
      }catch(error){
        console.log(`merge programacao storage ${error}`)
      }
  }

  const removeLembretesLocal = async () => {
      let obj ={};
      obj[info.cod_programacao] = info.cod_programacao
      try{
        const [ meus_lembretes ] = await AsyncStorage.multiGet([
          '@tvminas:meus_lembretes'
      ]);

      let REGISTRODELETE = JSON.parse(meus_lembretes[1]);
      delete REGISTRODELETE[info.cod_programacao];
      delete lembretesArray[info.cod_programacao];

      AsyncStorage.multiRemove(['@tvminas:meus_lembretes']);

      await AsyncStorage.multiSet([
        ['@tvminas:meus_lembretes', JSON.stringify(REGISTRODELETE)]
      ]);

      const response =  await AsyncStorage.getItem('@tvminas:meus_lembretes');

      //console.log('remove sino');
      carregaLembretesLocal()
      }catch(error){
        console.log(`card programacao storage ${error}`)
      }

      setUpdateData(false)
  }

  const carregaLembretesLocal = async () => {
    try {
      const response =  await AsyncStorage.getItem('@tvminas:meus_lembretes');


      //console.log(JSON.parse(response)[info.cod_programacao])
      response.length > 0 ?
        setLembretesLocal(JSON.parse(response))
      :'';
    } catch (error:any) {
      console.log(`erro ao carregar lembretes pagina programacao ${error}`)
    } finally {
      
    }

    //setLoadingLembretes(true);
  }


  function toggleHeight() {
    boxHeight.value === hp('30%') ?
    boxHeight.value = hp('10%') :
    boxHeight.value = hp('30%');

    mostraDescricao ? setMostraDescricao(false): setMostraDescricao(true);
  };


  useEffect(()=>{
    //console.log(lembretesArray)
    return () => { 
      ;}
  },[ info, lembretesLocal, mostraDescricao])
    
  return(
  <>
    <View style={{backgroundColor: info.flg_live ? CustomDefaultTheme.colors.aoVivoLive: 
      CustomDefaultTheme.colors.blocoAoVivoCor, 
        borderTopRightRadius: 16, 
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16, 
        borderBottomRightRadius: 16,
        width: wp('90'), left: wp('5')
      }}
    >
      <List.Section
        style={{backgroundColor: info.flg_live ? CustomDefaultTheme.colors.aoVivoLive: 
          CustomDefaultTheme.colors.blocoAoVivoCor, 
          borderTopRightRadius: 16, 
          borderTopLeftRadius: 16,
          borderBottomLeftRadius: 16, 
          borderBottomRightRadius: 16,
          marginBottom:40
        }}
      >
        <View
          style={{flexDirection: 'row'}}
        >
            <View
              style={{flexDirection: 'column', width:wp('60%'), alignSelf: 'center'}}
            >
              <Text style={styles.textoHora} >{info.hora_inicio_programacao} - {info.hora_termino_programacao}</Text>
              <Text style={styles.textoNome}>{info.nome_programacao}</Text>
            </View>
            <View
              style={{flexDirection: 'row',width:wp('40%'), left: 10}}
            > 
            
              {
                user
                ?

                info.flg_live ? 
                  <TouchableOpacity
                    onPress={()=> {
                      //andlePlay(info.cod_empresa, info.descricao_programacao)
                    }}
                  >
                    <View style={[styles.botaoCards,
                      { 
                        backgroundColor: info.flg_live ? 
                          '#FFF'
                        :
                          CustomDefaultTheme.colors.blocoAoVivoCor
                    }]}>
                      <Entypo name="controller-play" size={23} color={CustomDefaultTheme.colors.aoVivoLive} />
                    </View>
                  </TouchableOpacity>
                :
                    info.flg_passou == '1' ?
                    //false ?
                      <></>
                    :
                      lembretesArray[info.cod_programacao] !== undefined || lembretesLocal[info.cod_programacao] != undefined ? 
                          <TouchableOpacity
                            onPress={()=> handleRemoverAlerta(info.cod_programacao)}
                          >
                            <View 
                              style={[styles.botaoCards,
                                {backgroundColor: info.flg_live ? CustomDefaultTheme.colors.aoVivoLive: CustomDefaultTheme.colors.bgcarrossel}
                            ]}>
                              <Feather name="bell-off" size={20} color="#FFF"  />
                            </View>
                          </TouchableOpacity>
                          : 
                          <TouchableOpacity
                            onPress={()=> handleAdicionarAlerta(info.cod_programacao)}
                          >
                            <View style={[styles.botaoCards,
                              { 
                                borderWidth: 0.6,
                                borderColor: '#FFF',
                                backgroundColor:info.flg_live ? CustomDefaultTheme.colors.aoVivoLive: CustomDefaultTheme.colors.corBotaoProgramacao
                            }]}>
                              <Feather name="bell" size={20} color="#FFF" />
                            </View>
                          </TouchableOpacity>
                        :
                          <>
                            {user ?
                            <TouchableOpacity
                              onPress={()=> {
                                //handlePlay(info.cod_empresa, info.descricao_programacao)
                              }}
                            >
                              <View style={[styles.botaoCards,
                                { 
                                  borderWidth: 0.6,
                                  borderColor: '#FFF',
                                  backgroundColor:info.flg_live ? CustomDefaultTheme.colors.aoVivoLive: CustomDefaultTheme.colors.blocoAoVivoCor
                              }]}>
                                <Entypo name="controller-play" size={23} color="#FFF" />
                              </View>
                            </TouchableOpacity>
                            :
                            <></>
                          }
                            
                          </>
              }
              
              {
                !user?
                  info.flg_live ?
                    <TouchableOpacity
                      onPress={()=> {
                        //handlePlay(info.cod_empresa, info.descricao_programacao)
                      }}
                    >
                      <View style={[styles.botaoCards,
                        { 
                          backgroundColor: info.flg_live ? 
                            '#FFF'
                          :
                            CustomDefaultTheme.colors.blocoAoVivoCor
                      }]}>
                        <Entypo name="controller-play" size={23} color={CustomDefaultTheme.colors.aoVivoLive} />
                      </View>
                    </TouchableOpacity>
                  :
                    <></>
                :
                  <></>
              }
              <View style={{width: 10}} />
              <TouchableOpacity
                style={{borderColor: '#FFF'}}
                onPress={(e) => toggleHeight()
                }
              >
                <View style={[
                  styles.botaoCards,
                  {
                    borderWidth: 0.6,
                    borderColor: '#FFF',
                    backgroundColor:info.flg_live ? CustomDefaultTheme.colors.aoVivoLive: CustomDefaultTheme.colors.corBotaoProgramacao,
                  }]
                }>
                  
                  {
                    mostraDescricao?
                      <AntDesign  name="minus" size={20} color="#FFF" style={{borderColor: '#FFF'}} />
                    :
                      <AntDesign  name="plus" size={20} color="#FFF" style={{borderColor: '#FFF'}}/>
                  }
                
                </View>
              </TouchableOpacity>
              
            </View>
        </View>
        <List.Item
          style={{
            display: mostraDescricao ? 'flex':'none',
            top:30
          }}
          title={(<>
              {
                mostraDescricao ?
                  <View style={{ 
                    }}
                  >
                    <Text style={{
                      color:CustomDefaultTheme.colors.preto,
                      opacity: .5
                      }}
                    >{info.descricao_programacao}</Text>
                  </View>
                :
                  <></>}
           
            
          </>)}
        />
      </List.Section>
      
    </View>
  
  </>
  );
}
export default CardProgramacao;
