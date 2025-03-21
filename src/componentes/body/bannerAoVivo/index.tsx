import React,{ useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import {
  Card, 
  Button
} from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import styles from './Styles';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';
//import GoogleCast, { useCastDevice, CastButton, useDevices, useMediaStatus, useRemoteMediaClient, useStreamPosition } from 'react-native-google-cast';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

interface BannerPublicitarioProps  {
  informacoes: any;
  rota: string;
  midia: string;
  tipo: string;
}

const BannerAoVivo: React.FC<BannerPublicitarioProps|any> = ({ 
  informacoes,
  rota,
  midia,
  tipo,
}) => {
  const navigation = useNavigation();
  // chrome cast
  const client = useRemoteMediaClient();
  const castDevice = useCastDevice();
  const devices = useDevices();
  const sessionManager = GoogleCast.getSessionManager();
  const mediaSreamPosition = useStreamPosition();

  const handleRotaNavigate = () =>{        
    if(tipo == '1'){
        navigation.navigate(rota, { video: informacoes });
    }else{
        navigation.navigate(rota, { midia:{audio: informacoes} });
    }
  }

  const handleChromeCast = () => {
    return;
    if(tipo == '1'){

      client.loadMedia({ 
          autoplay: true,
          //startTime: 140,
          mediaInfo: {
              contentUrl: informacoes.dados_empresa.hls,
              metadata: {
              images: [
                  {
                  url:informacoes.imagem_h_programacao,
                  },
              ],
              title: informacoes.dados_empresa.nome,
              subtitle: informacoes.descricao_programacao,
              type: 'movie',
              },
              //streamDuration: 596, // seconds
          },
          //startTime: parseInt(midia.pos), // seconds
        });
        //GoogleCast.showExpandedControls();
      }else{
        client.loadMedia({ 
          autoplay: true,
          //startTime: 140,
          mediaInfo: {
              contentUrl: informacoes.dados_empresa.url_stream,
              metadata: {
              images: [
                  {
                  url:informacoes.imagem_h_programacao,
                  },
              ],
              title: informacoes.dados_empresa.nome,
              type: 'musicTrack',
              },
              //streamDuration: 596, // seconds
          },
          //startTime: parseInt(midia.pos), // seconds
        });
        //GoogleCast.showExpandedControls();
      }
  }

  useEffect(() => {
    //console.log('banner ao vivo teste leak')
    return () => {};
  }, []);

  return(
    <View  
      style={styles.thumbContent}      
    >
      <Card.Cover 
        source={{uri: informacoes !== undefined ? informacoes.imagem_h_programacao: 'http'}} 
        style={styles.imgThumbContent}
        resizeMode={'cover'}
      />                
      <Card.Content>
        <View style={[styles.chipAoVivo,{justifyContent: 'center'}]}>
          <Text style={{
            color: '#FFF',
            textAlign: 'center', 
            fontSize: wp('3'),
            fontFamily: 'Sora_800ExtraBold'
            }}
          >
            AO VIVO
          </Text>
        </View>
        <View style={{width: wp('30%'), 
          top: hp('-10%')
          }}
        >
          <Button 
            style={{
              borderRadius: 150,
              backgroundColor:'#FFF'
             }}
              //icon="play" 
            onPress={()=>
              client != null ?
                handleChromeCast()
              :
                handleRotaNavigate()
                
            }    
          >
            <Text>
            { 
              client != null ?
                'CAST '
              :
                tipo == '1' ? 'ASSISTIR ': 'OUVIR '
              
            }
            <FontAwesome name="play" size={windowHeight > 800 ? hp('1.7') : hp('1.8') } color={CustomDefaultTheme.colors.primary} 
                style={{//marginTop:hp('0.5'), //position: 'absolute'
                }}
            />
            </Text>
          
          </Button>
        </View>
        <View style={[styles.blocoinferior]}>
          <Text style={styles.textoHora}>{informacoes !== undefined ? `${informacoes.hora_inicio_programacao}    ${informacoes.hora_termino_programacao}`: ''}</Text>
          <Text style={styles.textoTitulo}>{informacoes !== undefined ? `${informacoes.nome_programacao}`: ''}</Text>
          <Text style={styles.textoSubTitulo}>{informacoes !== undefined ? informacoes.descricao_programacao : ''}</Text>
          <View style={{height:hp('1.5%')}}></View> 
          
        </View>
      </Card.Content>              
    </View>
  );
}
export default BannerAoVivo;

/* 
<Button 
  onPress={()=> navigation.navigate('ProgramacaoDrawer',{ empresa:informacoes.cod_empresa }) }
  style={styles.botaoProgramacao} 
> 
  <Text style={[styles.textoSubTitulo,{fontSize: wp('3')}]}> 
    Programação{'  '}
    <FontAwesome name="calendar" size={windowHeight > 800 ? hp('1.7') : hp('1.8') } color={'#FFF'} 
        style={{}}
    />
  </Text>
</Button>

*/