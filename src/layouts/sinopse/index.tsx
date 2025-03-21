import React, {useMemo, useRef, useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  Platform,
  TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import { Ionicons   , FontAwesome, AntDesign } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler
} from 'react-native-reanimated';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomDefaultTheme } from '../../configuracoes/styles/Theme';
import { useIsFocused } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

// componentes
import FakeDownloadBloco from '../../componentes/body/fake/fakeDownloadBloco';
import VideoRelacionadoCardItemHorizontal from '../../componentes/body/videoRelacionadoCardItemHorizontal';
import AssistirButton from '../../componentes/botoes/assistirButton';
import CastButtom from '../../componentes/botoes/castButton';
import DownloadItem from '../../componentes/body/downloadItem';

// config
import { useAuth } from '../../configuracoes/hooks/auth';
import { postData } from '../../configuracoes/services/request';

// estilos
import Styles from './Styles';
import FakeRelacionadosBloco from '../../componentes/body/fake/fakeRelacionadosBloco';
import MinhaListaButton from '../../componentes/botoes/minhaListaButton';
import CustomText from "../../componentes/componentes/customText";


interface videoProps {
    cod_video:string;
    cod_cliente:string;
    hash_video:string;
    titulo_video:string;
    descricao_video:string;
    id_cdn_video:string;
    hls_path:string;
    data_upload_video:string;
    data_liberacao_video:string;
    data_remocao_video:string;
    url_thumb_video:string;
    url_thumb_vertical_video:string;
    url_hover_vertical_video:string;
    duracao_video:string;
    json_video:string;
    url_tmp_video:string;
    tags_video:string;
    versao_streaming:string;
    ordem_video:string;
    status_video:string;
    cod_categoria:string;
}

const Sinopse: React.FC<any> = ( props, {  }) => {
  const isFocused = useIsFocused();
  const scrollRef = useRef();
  const navigation = useNavigation();
  const { user } = useAuth();
  const { item } = props.route.params;

  const [video, setVideo] = useState<videoProps>(item != undefined ? item : []);
  const [videosRelacionados, setVideosRelacionados] = useState<videoProps>([]);
  const [materialApoio, setMaterialApoio] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadFakeComponent, setLoadFakeComponent] = useState(true);
  const [loadFakeComponentRelacionados, setLoadFakeComponentRelacionados] = useState(true);
  
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler( (event: any) => {
    scrollY.value = event.contentOffset.y;
  });

  const handleTop = () => {
     
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  }
  
  const dowloads = useMemo(() => {
    return <>
        <View
            style={[{paddingLeft: wp('10'),marginTop: 100, justfiyContent: 'space-between', flexDirection: 'row', width: wp('100')}]}
        >
            <View style={{justfiyContent: 'space-between', flexDirection: 'row',}}>
                <CustomText 
                    style={{marginBottom: 5,textAlign: 'center',color:CustomDefaultTheme.colors.textFundoEscuro, marginRight: 10}}
                >
                    MATERIAL DE APOIO
                </CustomText>
                <FontAwesome name="chevron-down" size={16} color={CustomDefaultTheme.colors.buttonPrimary} />
            </View>
        </View>
        {   
            materialApoio.map((_, index)=>{
                return(<View
                    key={index+_.cod_video_arquivo}
                    style={[Styles.linha,{marginTop: 10},Styles.bordaBottom]}
                >
                    <DownloadItem descricao={_.nome_original_arquivo} url={_.url_arquivo}/>
                </View>)
            })
        }
    </>
  },[materialApoio]);

  const videosRelacionadosComponente = useMemo(() => {
    return <>
        <View
            style={[{paddingLeft: wp('10'),marginTop: 50, justfiyContent: 'space-between', flexDirection: 'row', width: wp('100')}]}
        >
            <View style={{justfiyContent: 'space-between', flexDirection: 'row',}}>
                <CustomText 
                    style={{marginBottom: 0,textAlign: 'center',color:CustomDefaultTheme.colors.branco, fontWeight: '800', marginRight: 10}}
                >
                    Relacionados
                </CustomText>
                <FontAwesome name="chevron-down" size={16} color={CustomDefaultTheme.colors.buttonPrimary} />
            </View>
        </View>
        {
            videosRelacionados.map((_, index)=>{
                return(
                    <View
                        key={index + _.cod_video}
                        style={[Styles.linha,{marginTop: 30}]}
                    >
                        <VideoRelacionadoCardItemHorizontal item={_} />
                    </View>
                )
            })
        }
    </>
  },[videosRelacionados])

  const buscaMaterial = async()=>{
    //setLoadFakeComponent(true);
    let parametros = {
        rota: 'videos/arquivos/',
        parametros:{
          token: user.token,
          cod_video: item.cod_video
        },
        showNotification: false,
        showLogError: true,
    }
    const response =  await postData(parametros);
    setMaterialApoio(response.data.data.arquivos);
    setLoadFakeComponent(false);
  }

  const buscaRelacionados = async()=> {
    let parametros = {
        rota: '/videos/',
        parametros:{
          token: user.token,
          categoria: item.cod_categoria
        },
        showNotification: false,
        showLogError: true,
    }
    const response =  await postData(parametros);
    setVideosRelacionados(Object.values(response.data.data.videos));
    setLoadFakeComponentRelacionados(false);
  }

  useEffect(() => {
      
    if(isFocused){
        setVideo(item != undefined ? item : [])
        if(isLoading){
            loadFakeComponent && buscaMaterial();
            (loadFakeComponentRelacionados && item.cod_categoria != undefined) && buscaRelacionados();
        }

        handleTop()
    }else{
        if(video.length > 0){
            setVideo([])
        }
        if(videosRelacionados.length > 0){
            setVideosRelacionados([]);
        }

        setIsLoading(true);
        setLoadFakeComponent(true);
        setLoadFakeComponentRelacionados(true);
    }

    
    return () => {
      setIsLoading(false);
    };
  }, [
    isLoading,
    item,
    isFocused,
    video,
    videosRelacionados,
    materialApoio,
    loadFakeComponent,
    loadFakeComponentRelacionados
  ]);

  return (
  <>
    <Animated.ScrollView
        ref={scrollRef}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onMomentumScrollBegin={() => {}}
        style={{
          height: hp('100'),
          with: wp('100'),
          backgroundColor: CustomDefaultTheme.colors.background,
        }}
    >
        <FastImage 
            source={{ uri: video.url_thumb_vertical_video != '' ? video.url_thumb_vertical_video :video.url_thumb_video }} 
            style={[{backgroundColor:CustomDefaultTheme.colors.background},Styles.slideImage]}
        >
            <View style={Styles.slide}>
                <LinearGradient 
                style={Styles.LinearContent}
                start={{x: 0, y: 0}} 
                
                end={{
                    x:0,
                    y: Platform.OS == 'ios' ? 0.70 : 0.80, 
                }}                 
                colors={[
                        CustomDefaultTheme.colors.preto,
                        Platform.OS == 'ios' ? 'transparent' : 'transparent', 
                        CustomDefaultTheme.colors.background
                     ]}                 
                >    
                    <TouchableOpacity
                            style={{
                                position: 'absolute',
                                top: 40,
                                left: 20
                            }}
                            onPress={()=>navigation.goBack()}
                        >
                            <FontAwesome name="angle-left" size={50} color={CustomDefaultTheme.colors.buttonPrimary} />
                    </TouchableOpacity>      
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            top: 55,
                            right: 25
                        }}
                    >
                        <CastButtom />
                    </TouchableOpacity>    
                </LinearGradient>

                       
            </View>
        </FastImage>
        <View style={Styles.blocoTitulo}>
            <View
                style={Styles.linha}
            >
                <Text
                    color={'#FFF'}
                    style={{width: wp('74'), color: '#FFF', fontWeight: '800', fontSize: 15}}
                >
                    {video.titulo_video}
                </Text>
                <MinhaListaButton cod_video={video.cod_video}  changeMinhaLista={() => {}}/>
            </View>
            <View
                style={[Styles.linha,{marginTop: 10}]}
            >
                <Text
                    color={'#FFF'}
                    style={{width: wp('82'), 
                    color: CustomDefaultTheme.colors.cinzaSecundario, fontWeight: '500', fontSize: 12}}
                >
                    {video.descricao_video}
                </Text>
                <View></View>
            </View>
            <View
                style={[Styles.linha,{marginTop: 20}]}
            >
               <AssistirButton item={video} relacionados={videosRelacionados} />
            </View>
            
            {  
                loadFakeComponent ?
                    <FakeDownloadBloco />
                :
                    materialApoio.length == 0 ?
                        <></>
                    :
                        dowloads 
            }

            { 
                 (loadFakeComponentRelacionados && item.cod_categoria != undefined) ?
                    <FakeRelacionadosBloco />
                :
                    videosRelacionados.length == 0 ?
                        <></>
                    :
                        videosRelacionadosComponente
            }

        </View>   
    </Animated.ScrollView>

    <TouchableOpacity
        onPress={handleTop}
        style={{
            borderWidth: .4,
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: 50, 
            height: 50, 
            borderRadius: 50,
            backgroundColor: CustomDefaultTheme.colors.buttonPrimary, 
            position: 'absolute', 
            bottom: 50, 
            right: 30
        }}
    >
        <AntDesign name="totop" size={24} color={CustomDefaultTheme.colors.textFundoEscuro} />
    </TouchableOpacity>
    
    
  </>
  );
};

export default Sinopse;