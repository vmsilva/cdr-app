import React, { useEffect, useContext } from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import FastImage from "react-native-fast-image";
import GoogleCast, { useRemoteMediaClient } from "react-native-google-cast";

// Configuracões
import styles from "./Styles";
import CustomText from "../../componentes/customText";
import ClassificacaoIndicativa from "../classificacaoIndicativa";
import { montaJsonVideo } from "../../../configuracoes/utils/utils";
import { UtilContext } from "../../../configuracoes/contexts/UtilContext";

interface radioProps {
  cod_cliente: any;
  cod_radio: any;
  descricao_radio: any;
  flg_shoutcast: any;
  hls_radio: any;
  imagem_fhd_radio: any;
  imagem_h_radio: any;
  nome_radio: any;
  ordem_radio: any;
  status_radio: any;
  uuid_radio: any;
}

interface serieProps {
  cod_serie: any;
  cod_cliente: any;
  cod_tipo_conteudo: any;
  classificacao_indicativa_serie: any;
  nome_serie: any;
  descricao_serie: any;
  sinopse_serie: any;
  imagem_h_serie: any;
  imagem_v_serie: any;
  imagem_fhd_serie: any;
  imagem_v_fhd_serie: any;
  assuntos: any;
  status_serie: any;
  slug: any;
}

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
  duracao_video_segundos: any;
  hls: any;
  ad: any;
  ad_hit: any;
  cod_tipo_conteudo: any;
  dadosSerie: any;
}

interface CapaVerticalProps {
  capaVertical: any[];
  tipo: "radio" | "links" | "series"; // audio ou video
}

const ScrollVerticalRadio: React.FC<CapaVerticalProps> = ({
  capaVertical,
  tipo,
}) => {
  const navigation = useNavigation() as any;
  const client = useRemoteMediaClient();
  const { isTablet } = useContext(UtilContext);

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

  const handleOpenUrl = (item: radioProps, relacionados) => {
    if (client) {
      loadMedia(montaJsonVideo(item, "radio"));
    } else {
      navigation.navigate("PlayerDrawer", {
        item: montaJsonVideo(item, "radio"),
        relacionados: [],
        aovivo: true,
        isFullScreen: true,
        titulo: item.nome_radio,
      });
    }
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {capaVertical != undefined &&
            capaVertical.map((_: any, i: any) => {
              return (
                <TouchableOpacity
                  key={tipo == "radio" ? _.cod_radio : _.cod_video}
                  onPress={() => handleOpenUrl(_, [])}
                >
                  <View style={styles.thumbContent}>
                    <FastImage
                      resizeMode={FastImage.resizeMode.contain}
                      source={{
                        uri:
                          tipo == "radio" ? _.imagem_h_radio : _.imagem_v_video,
                        priority: FastImage.priority.high,
                      }}
                      style={styles.imgThumbContent}
                    >
                      <View
                        //style={styles.informacoesBloco}
                        style={{
                          bottom: 130,
                        }}
                      >
                        <View style={{ flexDirection: "row", paddingLeft: 5 }}>
                          <View>
                            <CustomText
                              textType="soraBold"
                              style={{ fontSize: 70 }}
                            >
                              {i + 1}
                            </CustomText>
                          </View>

                          <View style={styles.blocoDireita}>
                            <CustomText
                              style={{ fontSize: 10, maxWidth: 150 }}
                              textType="soraBold"
                            >
                              {tipo == "series" ? _.nome_serie : _.titulo_video}
                            </CustomText>
                            <View style={{ paddingTop: 5 }}>
                              <ClassificacaoIndicativa
                                styleFonte={{ fontSize: 10 }}
                                style={{ width: 20, height: 20 }}
                                classificacao={_.classificacao_indicativa_serie}
                              />
                              <CustomText
                                style={{ fontSize: 10 }}
                                textType="light"
                              >
                                {_.descricao_serie}
                              </CustomText>
                            </View>
                          </View>
                        </View>
                      </View>
                    </FastImage>
                  </View>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </View>
    </>
  );
};

export default ScrollVerticalRadio;
