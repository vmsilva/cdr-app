import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Slider from "@react-native-community/slider";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import GoogleCast, { useRemoteMediaClient } from "react-native-google-cast";
import FastImage from "react-native-fast-image";

import { useAuth } from "../../../configuracoes/hooks/auth";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

import Styles from "./Styles";
import CustomText from "../../componentes/customText";
import { formatSubtitles, getVideosByCategory, montaJsonVideo } from "../../../configuracoes/utils/utils";
import Loading from "../../funcionalidade/Loading";
import { EMPRESA } from "../../../configuracoes/utils/constants";
import { getData } from "../../../configuracoes/services/request";

interface CardContinuarAssistindoProps {
  array: any;
  quantidade: any;
  label: string;
  nome_grupo_conteudo: string;
  veja_mais: boolean;
}

const CardContinuarAssistindo: React.FC<CardContinuarAssistindoProps | any> = ({
  array,
}) => {
  const client = useRemoteMediaClient() as any;
  const navigation = useNavigation() as any;
  const { user, cliente } = useAuth();
  const [isLoading, setIsLoading] = useState<any>(false);

  const loadMedia = (media: any) => {
    //console.log('loadingmedia chromecast', formatSubtitles(media.legenda_video));
    // formatSubtitles(media.legenda_video)
    try{
      client.loadMedia({
        autoplay: true,
        mediaInfo: {
          contentUrl: media.hls ? media.hls : media.hls_path,
          metadata: {
            images: [
              {
                url: media.url_thumb_video,
              },
            ],
            title: media.titulo_video,
            type: "movie",
          },
          mediaTracks: [] //formatSubtitles(media.legenda_video)
        },
      });
  
      GoogleCast.showExpandedControls();
    }catch(error){
      console.log(error, '--> cast error')
    }
  };

  const buscaCategoria = async (cod_categoria: any) => {
    try {
      let parametros = {
        rota: `/categorias/categoria/${cod_categoria}`,
        parametros: `token=${cliente.token}&token_usuario=${user.token}`,
        showNotification: false,
        showLogError: true,
      };
      let parametrosCAT = {
        rota: `/categorias/categoria/${cod_categoria}/temporadas`,
        parametros: `token=${cliente.token}&token_usuario=${user.token}`,
        showNotification: false,
        showLogError: true,
      };
      console.log(parametros, '-->> parametros')

      //console.log(parametros, "sinopse serieeee");
      const responseCat = (await getData(parametrosCAT)) as any;
      let response = (await getData(parametros)) as any;

      response.data.data['temporadas'] =  responseCat.data.data.temporadas;

      return response.data.data
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenUrl = async (item) => { //console.log('victor silva teste', item); return;
    try {
      setIsLoading(true);
      const categoria = await buscaCategoria(item.cod_categoria_especifica);

      let VIDEOTEMPORADASELECIONADAINCORPORADOCATEGORIA = getVideosByCategory(item.cod_categoria_temporada_especifica, categoria);
      categoria['videos'] = Object.values(VIDEOTEMPORADASELECIONADAINCORPORADOCATEGORIA.videos);

      categoria.categoria['apresentacao_apresentador'] = VIDEOTEMPORADASELECIONADAINCORPORADOCATEGORIA.apresentacao_apresentador_temporada;
      categoria.categoria['nome_apresentador'] = VIDEOTEMPORADASELECIONADAINCORPORADOCATEGORIA.nome_apresentador_temporada;
      categoria.categoria['subtitulo_apresentador'] = VIDEOTEMPORADASELECIONADAINCORPORADOCATEGORIA.subtitulo_apresentador_temporada;
      categoria.categoria['url_foto_apresentador'] = VIDEOTEMPORADASELECIONADAINCORPORADOCATEGORIA.url_foto_apresentador_temporada;

      //console.log(categoria); setIsLoading(false);return;
      if (client) {
        loadMedia(item);
      } else {
        //console.log(montaJsonVideo(item, "videozoeplayContinuarAssistindo"), '(((()))))))', item);return;
        navigation.navigate("PlayerDrawer", {
          item: montaJsonVideo(item, "videozoeplayContinuarAssistindo"),
          relacionados: array,
          aovivo: false,
          isFullScreen: false,
          pagina_origem: undefined,
          materia: Object.values(item.categorias)[0],
          categoria: categoria,
          cod_categoria_temporada: item.cod_categoria_temporada_especifica
        });
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error, "handleopenurl");
      setIsLoading(false);
    }
  };

  return (<>
   { array != undefined && (
      <FlatList
        style={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal
        data={array}
        renderItem={(_, i) => {
          return (
            <TouchableOpacity onPress={() => handleOpenUrl(_.item)}>
              <View style={Styles.thumbContent}>
                <View style={{ width: 140, height: "100%", padding: 10 }}>
                  <FastImage
                    style={{
                      borderRadius: 5,
                      width: "100%",
                      height: "100%",
                      backgroundColor:
                        CustomDefaultTheme.colors.backgroundCards,
                    }}
                    source={{
                      uri: _.item.url_thumb_video,
                    }}
                  />
                </View>
                <View style={{ width: "57%", height: "100%", paddingVertical: 10, paddingHorizontal: 5 }}>
                  <CustomText
                    textType="montserratBold"
                    style={{ color: CustomDefaultTheme.colors.textFundoEscuro, fontSize: 12, backgroundColor: 'transparent', height: 45, letterSpacing: .23   }}
                    numberOfLines={3}
                  >
                    {_.item.titulo_video}
                  </CustomText>
                 {/* <CustomText
                    textType="montserratLight"
                    style={{ color: CustomDefaultTheme.colors.textFundoEscuro, display: 'none' }}
                    numberOfLines={1}
                  >
                    {_.item.descricao_video}
                  </CustomText> */}
                  <Slider
                    value={parseInt(_.item.assistido)}
                    thumbTintColor={"transparent"}
                    minimumValue={0}
                    maximumValue={parseInt(_.item.duracao_video)}
                    minimumTrackTintColor={"#FFF"}
                    maximumTrackTintColor={CustomDefaultTheme.colors.backgroundSliderContinuarAssistindo}
                    style={{
                      bottom: 6
                    }}
                    
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    )}

    {isLoading && <Loading />}
    </>);
};
export default CardContinuarAssistindo;
