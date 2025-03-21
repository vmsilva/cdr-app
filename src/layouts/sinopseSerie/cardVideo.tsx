import React from "react";
import { View, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import GoogleCast, { useRemoteMediaClient } from "react-native-google-cast";
import { CustomDefaultTheme } from "../../configuracoes/styles/Theme";

// config
import { getData } from "../../configuracoes/services/request";

// estilos
import Styles from "./Styles";
import { useNavigation } from "@react-navigation/native";
import { getVideosByCategory, montaJsonVideo } from "../../configuracoes/utils/utils";
import { convertSeconds } from "../../configuracoes/utils/constants/utils";
import ProgressoVideo from "../../componentes/funcionalidade/ProgressoVideo";
import CustomText from "../../componentes/componentes/customText";
import DownloadButton from "../../componentes/botoes/downloadButton";

const CardVideo: React.FC<any> = ({ item, categoria, pagina_origem, index, cod_categoria_temporada }) => {
  const navigation = useNavigation() as any;const client = useRemoteMediaClient() as any;

  const loadMedia = (media: any) => {
    console.log("loadingmedia chromecast");
    try {
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
        },
      });

      GoogleCast.showExpandedControls();
    } catch (error) {
      console.log(error, "--> cast error");
    }
  };

  const handleOpenUrl = (video, relacionados) => { 
    if (client) {
      loadMedia(montaJsonVideo(video, "videozoeplay"));
    } else {

      let VIDEOTEMPORADASELECIONADAINCORPORADOCATEGORIA = getVideosByCategory(cod_categoria_temporada, categoria);

      categoria['videos'] = Object.values(VIDEOTEMPORADASELECIONADAINCORPORADOCATEGORIA.videos);

      categoria.categoria['apresentacao_apresentador'] = VIDEOTEMPORADASELECIONADAINCORPORADOCATEGORIA.apresentacao_apresentador_temporada;
      categoria.categoria['nome_apresentador'] = VIDEOTEMPORADASELECIONADAINCORPORADOCATEGORIA.nome_apresentador_temporada;
      categoria.categoria['subtitulo_apresentador'] = VIDEOTEMPORADASELECIONADAINCORPORADOCATEGORIA.subtitulo_apresentador_temporada;
      categoria.categoria['url_foto_apresentador'] = VIDEOTEMPORADASELECIONADAINCORPORADOCATEGORIA.url_foto_apresentador_temporada;
      
      navigation.navigate("PlayerDrawer", {
        item: montaJsonVideo(video, "videozoeplay"),
        relacionados: relacionados,
        aovivo: false,
        isFullScreen: false,
        titulo: "",
        materia: [],
        pagina_origem: pagina_origem,
        categoria: categoria,
        cod_categoria_temporada: cod_categoria_temporada
      });
    }

    return;
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          handleOpenUrl(item, []);
        }}
        style={{
          borderBottomWidth: .3,
          borderBottomColor: '#282828',
          paddingBottom: 15
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <View
            style={{
              height: 50,
              width: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                height: 40,
                width: 40,
                backgroundColor: CustomDefaultTheme.colors.backgroundIndiceCardVideo,
                borderRadius: 99,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CustomText textType="bold" style={{color:CustomDefaultTheme.colors.fontIndiceCardVideo}}>{index}</CustomText>
            </View>
          </View>
          <FastImage
            source={{ uri: item.url_thumb_video }} // Substitua pelo URL da imagem retangular desejada
            style={{
              width: 120,
              height: 68,
              borderRadius: 8,
              marginRight: 10,
              backgroundColor:
                CustomDefaultTheme.colors.backgroundCards,
            }}
            resizeMode="cover"
          >
            {item.progresso_pct > 95 && (
              <View
                style={{
                  position: "absolute",
                  bottom: 15,
                  left: 5,
                  borderRadius: 99,
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    width: 15,
                    height: 15,
                    backgroundColor: "#000",
                    borderRadius: 99,
                    left: 5,
                    top: 2,
                  }}
                />
                <MaterialCommunityIcons
                  name="checkbox-marked-circle"
                  size={24}
                  color={CustomDefaultTheme.colors.visto}
                />
              </View>
            )}
            <ProgressoVideo
              width={"100%"}
              height={2}
              valorTotal={100}
              valor={parseInt(item.progresso_pct)}
              style={{
                position: "absolute",
                bottom: 0,
              }}
            />
          </FastImage>
          <View
            style={{
              width: "55%",
              height: "100%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                display: "none",
              }}
            >
              <View style={[Styles.subtituloFonte]}>
                <CustomText style={Styles.subtituloFonteText}>
                  {item.subtitulo_video}
                </CustomText>
              </View>

              <View style={[{ marginLeft: 5 }]}>
                <DownloadButton
                  color={CustomDefaultTheme.colors.primaryButton}
                  hls={item.mp4}
                  item={item}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                top: 3,
                //backgroundColor: '#0F0',
                maxWidth: '85%'
              }}
            >
              <View>
                <CustomText
                  numberOfLines={3}
                  textType="montserratSemiBold"
                  style={{
                    fontSize: 12,
                    color: CustomDefaultTheme.colors.text,
                    letterSpacing: 0.28,
                    lineHeight: 18,
                  }}
                >
                  {item.titulo_video}
                </CustomText>
                <CustomText
                  numberOfLines={2}
                  textType="montserratRegular"
                  style={{
                    fontSize: 11,
                    color:
                      CustomDefaultTheme.colors.bioapresentadorFont,
                    letterSpacing: 0,
                    lineHeight: 14,
                  }}
                >
                  {convertSeconds(item.duracao_video)}
                </CustomText>
              </View>
            </View>
          </View>
        </View>

        <CustomText
          //numberOfLines={3}
          textType="montserratRegular"
          style={{
            fontSize: 12,
            color: CustomDefaultTheme.colors.bioapresentadorFont,
            letterSpacing: 0.12,
            lineHeight: 15,
            marginTop: 5,
          }}
        >
          {item.descricao_video}
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default CardVideo;
