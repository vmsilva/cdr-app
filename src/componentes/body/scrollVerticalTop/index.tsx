import React, { useContext } from "react";
import { View, TouchableOpacity, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import FastImage from "react-native-fast-image";
import GoogleCast, { useRemoteMediaClient } from "react-native-google-cast";
import LinearGradient from "react-native-linear-gradient";

// Configuracões
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";
import styles from "./Styles";
import CustomText from "../../componentes/customText";
import { UtilContext } from "../../../configuracoes/contexts/UtilContext";

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
  tipo: "series" | "videos"; // audio ou video
}

const ScrollVerticalTop: React.FC<CapaVerticalProps> = ({
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

  const handleOpenUrl = (video: videoProps, relacionados) => {
    if (client) {
      loadMedia(video);
    } else {
      if (tipo == "videos") {
        navigation.navigate("PlayerDrawer", {
          item: video,
          relacionados: relacionados,
          aovivo: false,
          isFullScreen: true,
          titulo: video.titulo_video,
        });
      } else {
        navigation.navigate("SinopseSerieDrawer", {
          item: video,
          relacionados: [],
        });
      }
    }
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {capaVertical != undefined &&
            capaVertical.map((_: any, i: any) => {
              //console.log(_.)
              return (
                <TouchableOpacity
                  key={tipo == "series" ? _.cod_serie : _.cod_video}
                  onPress={() => handleOpenUrl(_, capaVertical)}
                >
                  <View style={styles.thumbContent}>
                    <FastImage
                      //resizeMode={FastImage.resizeMode.stretch}
                      source={{
                        uri:
                          tipo == "series"
                            ? _.imagem_v_serie
                            : _.imagem_v_video,
                        priority: FastImage.priority.high,
                      }}
                      style={styles.imgThumbContent}
                    >
                      <LinearGradient
                        style={[styles.LinearContent]}
                        start={{
                          x: 0,
                          y: Platform.OS == "ios" ? 0.15 : 0,
                        }}
                        end={{
                          x: 0,
                          y: Platform.OS == "ios" ? 0.99 : 0.99,
                        }}
                        colors={[
                          "transparent",
                          "transparent",
                          CustomDefaultTheme.colors.preto,
                        ]}
                      >
                        <View style={styles.informacoesBloco}>
                          <View
                            style={{ flexDirection: "row", paddingLeft: 5 }}
                          >
                            <View style={{}}>
                              <CustomText
                                textType="soraBold"
                                style={{ fontSize: 50 }}
                              >
                                {i + 1}
                              </CustomText>
                            </View>

                            <View
                              style={[
                                styles.blocoDireita,
                                {
                                  maxWidth: 110,
                                },
                              ]}
                            >
                              <CustomText
                                numberOfLines={2}
                                style={{ fontSize: 12, maxHeight: 60 }}
                                textType="soraBold"
                              >
                                {tipo == "series"
                                  ? _.nome_serie
                                  : _.titulo_video}
                              </CustomText>
                            </View>
                          </View>
                        </View>
                      </LinearGradient>
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
export default ScrollVerticalTop;
