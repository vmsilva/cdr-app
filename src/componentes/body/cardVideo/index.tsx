import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import GoogleCast, { useRemoteMediaClient } from "react-native-google-cast";
import FastImage from "react-native-fast-image";

import { useAuth } from "../../../configuracoes/hooks/auth";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

import styles from "./Styles";
import CustomText from "../../componentes/customText";
import { montaJsonVideo } from "../../../configuracoes/utils/utils";
import Loading from "../../funcionalidade/Loading";
import { getData } from "../../../configuracoes/services/request";
import { convertSeconds } from "../../../configuracoes/utils/constants/utils";
import ProgressoVideo from "../../funcionalidade/ProgressoVideo";
import DownloadButton from "../../botoes/downloadButton";
import MinhaListaButton from "../../botoes/minhaListaButton";
import CompartilharButton from "../../botoes/compartilharButton";

interface CardVideoProps {
  array: any;
  quantidade: any;
  label: string;
  nome_grupo_conteudo: string;
  veja_mais: boolean;
}

const CardVideo: React.FC<CardVideoProps | any> = ({ item, array, index }) => {
  const client = useRemoteMediaClient() as any;
  const navigation = useNavigation() as any;
  const { user, cliente } = useAuth();
  const [isLoading, setIsLoading] = useState<any>(false);

  const loadMedia = (media: any) => {
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

  const handleOpenUrl = async (item, relacionados) => { //console.log('olaaar', item); return;
    try {
      setIsLoading(true);
      const categoria = await buscaCategoria(item.cod_categoria_especifica);

      if (client) {
        loadMedia(item);
      } else {
        navigation.navigate("PlayerDrawer", {
          item: montaJsonVideo(item, "videozoeplayContinuarAssistindo"),
          relacionados: array,
          aovivo: false,
          isFullScreen: false,
          pagina_origem: undefined,
          materia: Object.values(item.categorias)[0],
          categoria: categoria,
          cod_categoria_temporada: item.cod_categoria_temporada_especifica,
        });
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error, "handleopenurl");
      setIsLoading(false);
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          handleOpenUrl(item, []);
        }}
        style={{
          borderBottomWidth: 0.3,
          borderBottomColor: "#282828",
          paddingBottom: 15,
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
              display: index != undefined ? 'flex' : 'none',
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
                backgroundColor: CustomDefaultTheme.colors.bottomTab,
                borderRadius: 99,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CustomText textType="bold" style={{color: CustomDefaultTheme.colors.textFundoEscuro}} >{index != undefined && index + 1}</CustomText>
            </View>
          </View>
          <FastImage
            source={{ uri: item.url_thumb_video }} // Substitua pelo URL da imagem retangular desejada
            style={{
              width: 120,
              height: 68,
              borderRadius: 8,
              marginRight: 10,
              backgroundColor: CustomDefaultTheme.colors.backgroundCards,
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
              <View style={[styles.subtituloFonte]}>
                <CustomText style={styles.subtituloFonteText}>
                  {item.subtitulo_video}
                </CustomText>
              </View>

              <View style={[{ marginLeft: 5 }]}>
                <DownloadButton color={"#707070"} hls={item.mp4} item={item} />
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                top: 3,
              }}
            >
              <View>
                <CustomText
                  numberOfLines={2}
                  textType="montserratSemiBold"
                  style={{
                    fontSize: 14,
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
                    color: CustomDefaultTheme.colors.bioapresentadorFont,
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
          textType="montserratRegular"
          style={{
            fontSize: 12,
            color: CustomDefaultTheme.colors.bioapresentadorFont,
            letterSpacing: 0.12,
            lineHeight: 15,
            textAling: "left",
            marginTop: 5,
          }}
        >
          {item.descricao_video}
        </CustomText>
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 5,
            flexDirection: "row",
            justifyContent: 'space-between',
            //backgroundColor: '#FF0'
          }}
        >
         <View />
         <View
          style={{
            flexDirection: "row",
            justifyContent: 'space-between'
          }}
        >
          <MinhaListaButton
            cod_video={item.cod_video}
            changeMinhaLista={() => {}}
          />
          <View
            style={{
              marginLeft: 10,
              display: item.mp4 == undefined ? "none" : "flex",
            }}
          >
            <DownloadButton color={"#222222"} item={item} hls={item.mp4} />
          </View>
          <View
            style={{
              marginLeft: 10,
              display: item.mp4 == undefined ? "none" : "flex",
            }}
          >
            <CompartilharButton tipo={4} array={item} />
          </View>
        </View>
        </View>
      </TouchableOpacity>
      {isLoading && <Loading />}
    </View>
  );
};
export default CardVideo;
