import React, { useRef, useState, useEffect, useMemo, useContext } from "react";
import { View, TouchableOpacity, Platform } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  interpolateColor,
} from "react-native-reanimated";
import LinearGradient from "react-native-linear-gradient";

// config
import { postData } from "../../configuracoes/services/request";
import { useAuth } from "../../configuracoes/hooks/auth";
import { CustomDefaultTheme } from "../../configuracoes/styles/Theme";
import Styles from "./Styles";
import StylesTablet from "./StylesTablet";
import StylesHeader from "../../componentes/header/styles";

// imagens
import LOGOHEADER from "../../assets/logo.png";


// componentes
import CarrosselDestaques from "../../componentes/body/carrosselDestaques";
import DestaquesZoeplayShimmer from "../../componentes/funcionalidade/shimmer/destaquesZoeplayShimmer";

import { UtilContext } from "../../configuracoes/contexts/UtilContext";
import CardContinuarAssistindo from "../../componentes/body/cardContinuarAssistindo";
import HeaderScroll from "../../componentes/headerSroll";
import ScrollVertical from "../../componentes/body/scrollVertical";
import ScrollHorizontalComTitulo from "../../componentes/body/scrollHorizontalComTitulo";
import ScrollVerticalFlatList from "../../componentes/body/scrollVerticalFlatList";
import ScrollHorizontalFlatList from "../../componentes/body/scrollHorizontalFlatList";
import ScrollHorizontalFlatListAudio from "../../componentes/body/scrollHorizontalFlatListAudio";
import ScrollHorizontalFlatListAudioFaixa from "../../componentes/body/scrollHorizontalFlatListAudio/Faixa";
import { SCROLLSTYLEESPACAMENTODASHBOARD } from "../../configuracoes/utils/constants/style";
import CastButtom from "../../componentes/botoes/castButton";
import ZoeIcone from "../../componentes/funcionalidade/ZoeIcone";

const Dashboard: React.FC<any> = (props) => {
  const navigation = useNavigation() as any;
  const isFocused = useIsFocused();
  const { user, cliente } = useAuth();
  const {
    isTablet,
    home,
    aoVivo,
    biblioteca,
    playlistsAudio,
    grupoPlaylistsAudio,
    destaques,
    categorias,
    palestrantes,
  } = useContext(UtilContext);

  const scrollY = useSharedValue(0); // Variável compartilhada para rastrear a posição de rolagem
  const flatListRef = useRef(); // Ref para acessar o FlatList

  // Manipulador de rolagem animado
  const handleScroll = (event) => {
    scrollY.value = event.nativeEvent.contentOffset.y;
  };

  const scrollRef = useRef() as any;
  const [continuarAssistindo, setContinuarAssistindo] = useState<any>([]);

  const handleTop = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  /*  Estilo header */
  const headerStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        //[400, 120],
        [100, 100],
        Extrapolate.CLAMP
      ),
    };
  });

  const bgHeaderColor = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        scrollY.value,
        [100, 200],
        ["transparent", CustomDefaultTheme.colors.background]
        //['transparent', CustomDefaultTheme.colors.primary],
      ),
    };
  });

  const HEADERMEMO = useMemo(() => {
    return (
      <Animated.View
        style={[
          Styles.header,
          headerStyle,
          bgHeaderColor,
          StylesHeader.container,
        ]}
      >
        <View style={StylesHeader.topBar}>
          <View style={Styles.headerBloco}>
            <View
              style={{
                flexDirection: 'row',
                width: '25%',
                justifyContent: 'flex-start',
                paddingLeft: '3%'
              }}
            >
               <View>
                <TouchableOpacity
                  onPress={() => navigation.toggleDrawer()}
                >
                  <ZoeIcone
                    name={'icone-menu-blue'}
                    width={24}
                    height={24}
                    style={{}}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                //backgroundColor: '#0F0',
                width: '50%',
                //height: 10,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <TouchableOpacity
              onPress={() => {
                if (scrollY.value > 550) {
                  handleTop();
                }
              }}
              style={{
                //width: wp("75"),
                //marginBottom: 10,
                //paddingHorizontal: wp("5"),
              }}
            >
              <FastImage
                source={LOGOHEADER}
                style={
                  isTablet
                    ? StylesTablet.headerImgTamanho
                    : Styles.headerImgTamanho
                }
                resizeMode={FastImage.resizeMode.contain}
              />
            </TouchableOpacity>

            </View>
            <View
              style={{
                width: '25%',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                paddingRight: '3%'
              }}
            >
              <View
                //style={[Styles.blocoIcone]}
                style={{
                  right: 5
                }}
              >
                <CastButtom  color={CustomDefaultTheme.colors.primaryButton}/>
              </View>

              <View
                //style={[Styles.blocoIcone]}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("BuscarNavigatorStack")}
                >
                   <ZoeIcone
                    name={'icone-busca-azul'}
                    width={24}
                    height={24}
                    style={{}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Animated.View>
    );
  }, [cliente]);

  const buscaContinuarAssistindo = async () => { 
    //return;
    try {
      let parametros = {
        rota: "/videos/continuarassistindo",
        parametros: {
          token: user.token,
          token_cliente: cliente.token,
        },
        showNotification: false,
        showLogError: true,
      };
      const response = (await postData(parametros)) as any;

      setContinuarAssistindo(response.data.data);
     
    } catch (error) {
      console.log(error, "--> continuar assistindo");
    }
  };

  const DESTAQUESMEMO = useMemo(() => {
    if (destaques.length > 0) {
      if (destaques !== undefined) {
        return <CarrosselDestaques array={home.destaques} />;
      } else {
        return <DestaquesZoeplayShimmer />;
      }
    } else {
      return <DestaquesZoeplayShimmer />;
    }
  }, [destaques]);

  const CATEGORIASCAPASMEMO = useMemo(() => {
    if (categorias.length > 0) {
      return (
        <View style={[SCROLLSTYLEESPACAMENTODASHBOARD]}>
          <HeaderScroll icon={"tv"} label={"Cursos e Eventos"} show={true} />
          <ScrollVerticalFlatList
            array={Object.values(categorias)}
            tipo="programas"
          />
        </View>
      );
    }
  }, [categorias]);

  const PALESTRANTESMEMO = useMemo(() => {
    return <></>;
    
    if (categorias.length > 0) {
      return (
        <View style={[SCROLLSTYLEESPACAMENTODASHBOARD, {display: Object.values(palestrantes).length > 0 ? 'flex' : 'none'}]}>
          <HeaderScroll icon={"user"} label={"Áreas de Aprendizado"} show={true} />
          <ScrollVerticalFlatList
            array={Object.values(palestrantes)}
            tipo="palestrantes"
          />
        </View>
      );
    }
  }, [palestrantes]);

  const BIBLIOTECADIGITALMEMO = useMemo(() => {

    if (biblioteca.length == 0) {
      return;
    }

    return (
      <View style={[SCROLLSTYLEESPACAMENTODASHBOARD]}>
        <HeaderScroll icon={"book"} label={"Biblioteca Digital"} show={false} />
        <ScrollVertical array={biblioteca} tipo="biblioteca_digital" />
      </View>
    );
  }, [biblioteca]);

  // videos na horizontal
  const CATEGORIASMEMO = useMemo(() => {
    if (Object.values(categorias).length > 0) {
      return Object.values(categorias).map((item: any, index) => {
        if (item.videos != undefined && Object.values(item.videos).length > 0) {
          console.log(item.nome_categoria == 'Bibliotecas Digitais' && item)
          return (
            <View
              key={item.cod_categoria}
              style={[SCROLLSTYLEESPACAMENTODASHBOARD]}
            >
              <HeaderScroll
                icon={"tv"}
                label={item.nome_categoria}
                show={false}
              />
              <ScrollHorizontalFlatList
                isFullScreen={false}
                numberOfLines={2}
                pagina_origem={undefined}
                serie={true}
                array={Object.values(item.videos)}
                categoria={{ categoria: item, videos: item.videos }}
                playlist={item.videos}
                aovivo={false}
              />
            </View>
          );
        }
      });
    }
  }, [categorias]);

  // pod pahh
  const GRUPOPLAYLISTSMEMO = useMemo(() => {
    if (grupoPlaylistsAudio.length > 0) {
      return grupoPlaylistsAudio.map((item: any, index) => {
        return (
          <View
            key={item.cod_grupo_playlist}
            style={[SCROLLSTYLEESPACAMENTODASHBOARD]}
          >
            <HeaderScroll
              icon={item.nome_grupo_playlist == "Podcast" ? "podcast" : ""}
              label={item.nome_grupo_playlist == "Podcast" ? "Trilhas de Podcasts" : item.nome_grupo_playlist} //Trilhas de Podcasts
              show={false}
            />
            <ScrollHorizontalFlatListAudio
              numberOfLines={2}
              pagina_origem={undefined}
              array={item.playlists}
            />
          </View>
        );
      });
    }
  }, [grupoPlaylistsAudio]);

  // pod pahh
  const PLAYLISTSMEMO = useMemo(() => {
    if (playlistsAudio.length > 0) {
      return playlistsAudio.map((item: any, index) => {
        return (
          <View
            key={item.cod_playlist}
            //style={{ marginTop: 15 }}
            style={[SCROLLSTYLEESPACAMENTODASHBOARD]}
          >
            <HeaderScroll
              icon={item.nome_grupo_playlist == "Podcast" ? "mic-outline" : ""}
              label={item.nome_playlist}
              show={false}
            />
            <ScrollHorizontalFlatListAudioFaixa
              numberOfLines={2}
              pagina_origem={undefined}
              array={item.audios}
            />
          </View>
        );
      });
    }
  }, [playlistsAudio]);

  const AOVIVOMEMO = useMemo(() => {
    if (Object.values(aoVivo) != null)
      if (Object.values(aoVivo) != undefined) {
        if (Object.values(aoVivo).length > 0) {
          return (
            <View style={[SCROLLSTYLEESPACAMENTODASHBOARD]}>
              <HeaderScroll label={"Ao vivo"} show={false} icon={"tv"} />
              <ScrollHorizontalComTitulo
                tipo="aoVivo"
                isFullScreen={true}
                array={Object.values(aoVivo)}
              />
            </View>
          );
        }
      }
  }, [aoVivo]);

  const COMPONENTECONTINUARASSISTINDO = useMemo(() => {
    if (continuarAssistindo.length > 0) {
      return (
        <View style={[SCROLLSTYLEESPACAMENTODASHBOARD]}>
          <HeaderScroll
            icon={"videocam-outline"}
            label={"Continuar Assistindo"}
            show={false}
          />
          <CardContinuarAssistindo array={continuarAssistindo} />
        </View>
      );
    }
  }, [continuarAssistindo]);

  useEffect(() => {
    if (isFocused) {
      setTimeout(() => {
        buscaContinuarAssistindo();
      }, 100);
    }
    return () => {};
  }, [isFocused]);

  return (
    <>
     <LinearGradient
          start={{
            x: 0,
            y: Platform.OS == "ios" ? 0.15 : 0,
          }}
          end={{
            x: 0,
            y: Platform.OS == "ios" ? 0.69 : 0.99,
          }}
          colors={[
            
            CustomDefaultTheme.colors.gradiente1,
            CustomDefaultTheme.colors.gradiente3,
            CustomDefaultTheme.colors.gradiente3,
          ]}
          style={{
            height: '100%',
            backgroundColor: CustomDefaultTheme.colors.background
          }}
        >
      {HEADERMEMO}

      <Animated.FlatList
        ref={flatListRef}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={[1]}
        onScroll={handleScroll}
        renderItem={() => {
          return (
            <>
              <View style={{ minHeight: hp("70") }}>{DESTAQUESMEMO}</View>

              {COMPONENTECONTINUARASSISTINDO}


              {CATEGORIASCAPASMEMO}

              {
                PALESTRANTESMEMO // ocultado para prova //
              }

              {AOVIVOMEMO}

              {GRUPOPLAYLISTSMEMO}

              {PLAYLISTSMEMO}

              {BIBLIOTECADIGITALMEMO}

              {CATEGORIASMEMO}

            </>
          );
        }}
        keyExtractor={(item, index) => index.toString()} // ou qualquer outra chave única
      />
      </LinearGradient>
    </>
  );
};

export default Dashboard;
