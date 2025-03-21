import React, { useContext, useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import GoogleCast, { useRemoteMediaClient } from "react-native-google-cast";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import FastImage from "react-native-fast-image";

import styles from "./Styles";
import stylesTablet from "./StylesTablet";
import CustomText from "../../componentes/customText";
import { UtilContext } from "../../../configuracoes/contexts/UtilContext";
import { montaJsonVideo } from "../../../configuracoes/utils/utils";
import { getData } from "../../../configuracoes/services/request";
import { EMPRESA } from "../../../configuracoes/utils/constants";
import { useAuth } from "../../../configuracoes/hooks/auth";

import { MaterialCommunityIcons } from "@expo/vector-icons";

// Imagem
import TESTEIMG from "../../../assets/audiocapa.png";
import Loading from "../../funcionalidade/Loading";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

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

const ScrollHorizontalFlatListAudio: React.FC<any> = ({
  array,
  numberOfLines,
  pagina_origem,
}) => {
  const navigation = useNavigation() as any;
  const { user } = useAuth();
  const client = useRemoteMediaClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isTablet, assistidos } = useContext(UtilContext);

  const loadMedia = (media: any) => {
    console.log(media);
    //alert('teste'); return;
    client.loadMedia({
      autoplay: true,
      mediaInfo: {
        contentUrl: media.hls ? media.hls : media.hls_path,
        metadata: {
          images: [
            {
              url: media.imagem_v_video,
            },
          ],
          title: media.titulo_video,
          type: "movie",
        },
      },
    });

    GoogleCast.showExpandedControls();
  };

  const buscaPlaylist = async (cod_playlist: any) => {
    try {
      let parametros = {
        rota: `/playlists/audios/${cod_playlist}`,
        parametros: `token=${user.token}`,
        showNotification: false,
        showLogError: true,
      };
      const response = (await getData(parametros)) as any;

      return response.data.data;
    } catch (error) {
      console.log(error, "Erro ao buscar categoria");
    }
  };

  const handleOpenUrl = async (playlist) => {
    //console.log(categoria.categoria.cod_categoria); return;
    try {
      setIsLoading(true);

      let retornorPlaylistAudios = await buscaPlaylist(playlist.cod_playlist);
      
      console.log(retornorPlaylistAudios);
      
      setIsLoading(false);
      navigation.navigate("SinopseAudioDrawer",{playlist: playlist, audios: retornorPlaylistAudios, pagina_origem })

    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const RENDERITEMAUDIO = ({ item }) => (
    <>
      <TouchableOpacity
        onPress={() => handleOpenUrl(item)}
      >
        <View style={styles.thumbContent}>
          <FastImage
            source={{uri: item.url_foto_playlist }}
            style={
             styles.imgThumbContent
            }
            resizeMode="cover"
          />
          <View
            style={{
              //left: -3,
              marginTop: 1,
              paddingVertical: 1,
              display: 'none'
            }}
          >
            <CustomText
              textType="montserratSemiBold"
              style={{
                color: CustomDefaultTheme.colors.textScrollDashboard,
                fontSize: 11.5,
                //paddingHorizontal: 5,
                letterSpacing: 0.28,
                lineHeight: 18
              }}
              numberOfLines={numberOfLines}
            >
              {item.nome_playlist}
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
          paddingHorizontal: 10,
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={array}
        horizontal={true} // Define a lista como horizontal
        renderItem={RENDERITEMAUDIO}
      />

      {isLoading && <Loading />}
    </View>
  );
};
export default ScrollHorizontalFlatListAudio;
