import React, { useContext } from "react";
import { View, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import FastImage from "react-native-fast-image";

import styles from "./Styles";
import CustomText from "../../componentes/customText";
import { getData } from "../../../configuracoes/services/request";

// Imagem
import { convertObjetoZoeParaPlaylistReactTrackPlayer } from "../../../configuracoes/utils/utils";
import { addTracks, removerQueues } from "../../../../trackPlayerServices";
import { PlayerContext } from "../../../configuracoes/contexts/PlayerContext";
import TrackPlayer from "react-native-track-player";
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

const ScrollHorizontalFlatListAudioFaixa: React.FC<any> = ({
  array,
  numberOfLines
}) => {
  const { setExibePlayer } = useContext(PlayerContext);


  const addTrackCard = async (params: any = null, posicao: any = null) => {
    try {

     let OBJETOPARAMS = await convertObjetoZoeParaPlaylistReactTrackPlayer(array);

      await removerQueues();
      await addTracks(OBJETOPARAMS, posicao);

      //setTimeout(() => 
      setExibePlayer(true)
      //,200);
      await TrackPlayer.play();

      return;
    } catch (error) {
      console.log("addtrack error -->", error);
    }
  };

  const RENDERITEMVIDEO = ({ item, index }) => ( 
    <>
      <TouchableOpacity
        onPress={() => addTrackCard(item, index)}
      >
        <View style={styles.thumbContent}>
          <FastImage
            source={{uri: item.url_foto_playlist }}
            style={
             styles.imgThumbContent
            }
            resizeMode={FastImage.resizeMode.cover}
          />
          
          <View
            style={{
              left: 10,
              marginTop: 1,
              paddingVertical: 1
            }}
          >
            <CustomText
              textType="montserratSemiBold"
              style={{
                color: CustomDefaultTheme.colors.textScrollDashboard,
                fontSize: 14,
                paddingHorizontal: 5,
                letterSpacing: 0.28,
                lineHeight: 18
              }}
              numberOfLines={numberOfLines}
            >
              {item.titulo_playlist_audio}
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
        renderItem={RENDERITEMVIDEO}
      />
    </View>
  );
};
export default ScrollHorizontalFlatListAudioFaixa;
