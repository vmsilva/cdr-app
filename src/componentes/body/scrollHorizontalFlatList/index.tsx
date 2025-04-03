import React, { useContext, useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import GoogleCast, { useRemoteMediaClient } from "react-native-google-cast";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";

import styles from "./Styles";
import stylesTablet from "./StylesTablet";
import CustomText from "../../componentes/customText";
import { UtilContext } from "../../../configuracoes/contexts/UtilContext";
import { getVideosByCategory, montaJsonVideo } from "../../../configuracoes/utils/utils";
import { getData } from "../../../configuracoes/services/request";
import { EMPRESA } from "../../../configuracoes/utils/constants";
import { useAuth } from "../../../configuracoes/hooks/auth";
import FastImage from "react-native-fast-image";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Loading from "../../funcionalidade/Loading";
import { CastContext } from "../../../configuracoes/contexts/CastContext";

interface videoProps {
  cod_video: any;
  cod_cliente: any;
  uuid_video: any;
  storage: any;
  cod_associacao_conteudo: any;
  cod_serie: any;
  cod_serie_temporada: any;
  cod_visibilidade_conteudo: any;
  grupos_conteudo: any;
  subgrupos_conteudo: any;
  assuntos: any;
  titulo_video: any;
  descricao_video: any;
  sinopse_video: any;
  ficha_tecnica_video: any;
  imagem_h_video: any;
  imagem_v_video: any;
  imagem_fhd_video: any;
  data_cadastro_video: any;
  data_video: any;
  classificacao_indicativa_video: any;
  trailer_video: any;
  legenda_video: any;
  json_video: any;
  duracao_video: any;
  flg_destaque: any;
  ordem_serie: any;
  ordem_video: any;
  status_video: any;
  tags: any;
  generos: any;
  slug: any;
  hls: any;
}

interface CapaHorizontalProps {
  isFullScreen: boolean;
  array: videoProps[];
  titulo: string;
  numberOfLines: any;
  pagina_origem: string;
  serie: any;
  personalidade: any;
  corte: boolean;
}

const ScrollHorizontalFlatList: React.FC<CapaHorizontalProps | any> = ({
  array,
  titulo,
  isFullScreen,
  numberOfLines,
  pagina_origem,
  serie,
  personalidade,
  corte,
  categoria,
  playlist,
  aovivo,
}) => {
  const navigation = useNavigation() as any;
  const { user, cliente} = useAuth();
  const client = useRemoteMediaClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isTablet, assistidos } = useContext(UtilContext);
  const { loadMedia } = useContext(CastContext);

  const buscaCategoria = async (cod_categoria: any) => {
    try {
      setIsLoading(true);
      
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
      
      const responseCat = (await getData(parametrosCAT)) as any;
      let response = (await getData(parametros)) as any;

      let RESPOSTATRATADO = response.data.data; 

      RESPOSTATRATADO['temporadas'] =  responseCat.data.data.temporadas;

      
      RESPOSTATRATADO["apresentacao_apresentador"] =  responseCat.data.data.temporadas[0].apresentacao_apresentador_temporada;
      RESPOSTATRATADO["nome_apresentador"] = responseCat.data.data.temporadas[0].nome_apresentador_temporada;
      RESPOSTATRATADO["subtitulo_apresentador"] =  responseCat.data.data.temporadas[0].subtitulo_apresentador_temporada;
      RESPOSTATRATADO["url_foto_apresentador"] =  responseCat.data.data.temporadas[0].url_foto_apresentador_temporada;
      RESPOSTATRATADO.categoria["apresentacao_apresentador"] =  responseCat.data.data.temporadas[0].apresentacao_apresentador_temporada;
      RESPOSTATRATADO.categoria["nome_apresentador"] = responseCat.data.data.temporadas[0].nome_apresentador_temporada;
      RESPOSTATRATADO.categoria["subtitulo_apresentador"] =  responseCat.data.data.temporadas[0].subtitulo_apresentador_temporada;
      RESPOSTATRATADO.categoria["url_foto_apresentador"] =  responseCat.data.data.temporadas[0].url_foto_apresentador_temporada;
      
      return RESPOSTATRATADO;
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenUrl = async (video, relacionados = null as any) => {
    try {
      if (client) {
        loadMedia(montaJsonVideo(video, "videozoeplay"));
      } else {
        setIsLoading(true);

        const CAT = await buscaCategoria(categoria.categoria.cod_categoria);
        let VIDEOTEMPORADASELECIONADAINCORPORADOCATEGORIA = getVideosByCategory(video.cod_categoria_temporada_especifica, CAT);
        CAT['videos'] = Object.values(VIDEOTEMPORADASELECIONADAINCORPORADOCATEGORIA.videos);

        navigation.navigate("PlayerDrawer", {
          item: montaJsonVideo(video, "videozoeplay"),
          aovivo: aovivo,
          isFullScreen: isFullScreen,
          pagina_origem: pagina_origem,
          serie: serie,
          materia: categoria !== undefined ? categoria : [],
          playlist: playlist,
          categoria: CAT,
          cod_categoria_temporada: video.cod_categoria_temporada_especifica
        });
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const RENDERITEMVIDEO = ({ item }) => (
    <>
      <TouchableOpacity
        key={
          item.seek_final_video != ""
            ? item.seek_final_video + item.cod_video
            : item.cod_video
        }
        style={isTablet ? stylesTablet.containerView : styles.containerView}
        onPress={() => {
          handleOpenUrl(item, array);
        }}
      >
        <View style={styles.thumbContent}>
          <FastImage
            source={{
              uri: item.url_thumb_video,
            }}
            style={
              isTablet ? stylesTablet.imgThumbContent : styles.imgThumbContent
            }
            resizeMode="cover"
          >
            {assistidos[item.cod_video] != undefined && (
              <View
                style={{
                  position: "absolute",
                  bottom: 5,
                  left: 5,
                  backgroundColor: 'green',
                  borderRadius: 99
                }}
              >
                <MaterialCommunityIcons
                  name="check"
                  size={24}
                  color="#FFF"
                />
              </View>
            )}
          </FastImage>
          <View
            style={{
              left: 10,
              marginTop: 1,
            }}
          >
            <CustomText
              textType="montserratSemiBold"
              style={[
                isTablet
                  ? stylesTablet.textoSubititulo
                  : styles.textoSubititulo,
              ]}
              numberOfLines={numberOfLines}
            >
              {item.titulo_video}
            </CustomText>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );

  return (
    <View>
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: 0,
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={array}
        horizontal={true} // Define a lista como horizontal
        renderItem={RENDERITEMVIDEO}
      />
      { isLoading && <Loading /> }
    </View>
  );
};
export default ScrollHorizontalFlatList;
