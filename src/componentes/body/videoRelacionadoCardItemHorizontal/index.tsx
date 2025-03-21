import React, { useEffect, useContext, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { useNavigation } from "@react-navigation/native";
import { useRemoteMediaClient } from "react-native-google-cast";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// Config
import Styles from "./Styles";
import StylesTablet from "./StylesTablet";

// Component
import CustomText from "../../componentes/customText";
import { UtilContext } from "../../../configuracoes/contexts/UtilContext";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";
import { useAuth } from "../../../configuracoes/hooks/auth";
import { getData, postData } from "../../../configuracoes/services/request";
import { montaJsonVideo } from "../../../configuracoes/utils/utils";
import Loading from "../../funcionalidade/Loading";
import MinhaListaButton from "../../botoes/minhaListaButton";
import DownloadButton from "../../botoes/downloadButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
  seek_video: any;
}

interface VideoRelacionadoCardItemHorizontalProps {
  item: videoProps;
  relacionados: any;
  abreDiretoPlayer: boolean;
  titulo: string;
  pagina_origem: string;
}

const VideoRelacionadoCardItemHorizontal: React.FC<
  VideoRelacionadoCardItemHorizontalProps | any
> = ({ item, relacionados, abreDiretoPlayer, titulo, pagina_origem, changeMinhaLista }) => {
  const navigation = useNavigation() as any;
  const client = useRemoteMediaClient() as any;
  const { isTablet, assistidos } = useContext(UtilContext);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<any>();

  const buscaVideosCategoria = async () => {
    console.log("busca minha lista");

    try {
      let parametros = {
        rota: "/minhalista",
        parametros: `token=${user.token}`,
        showNotification: false,
        showLogError: true,
        showLog: true,
      };
      const response = (await getData(parametros)) as any;
    } catch (error) {
      console.log(`--> error ${error}`);
    }
  };

  const buscaCategoria = async (cod_categoria: any) => {
    setIsLoading(true);
    try {
      let parametros = {
        rota: `/empresas/categoria`,
        parametros: {
          token: user.token,
          cod_categoria: cod_categoria,
        },
        showNotification: false,
        showLogError: true,
        showLog: true,
      };
      const response = (await postData(parametros)) as any;

      return response.data.data;
    } catch (error) {
      console.log("Error ->>", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigate = async () => {
    let categoria = await buscaCategoria(
      Object.values(item.categorias)[0].cod_categoria
    );

    //console.log(categoria); return;
    if (client) {
      loadMedia(item);
    }
    setTimeout(() => {
      navigation.navigate("PlayerDrawer", {
        item: montaJsonVideo(item, "videozoeplay"),
        relacionados: relacionados,
        isFullScreen: false,
        titulo: titulo,
        materia: [],
        pagina_origem: pagina_origem,
        categoria: categoria,
      });
    }, 100);
  };

  const loadMedia = async(media: any) => {
    try{
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
    }catch(error){
      console.log(error)
    }
  };

  const COMPONENTECATEGORIAS = () => {
    if (item.categorias) {
      return (
        <View style={{ flexDirection: "row", width: "100%" }}>
          {Object.values(item.categorias).map((_: any, index) => {
            console.log(_.nome_categoria);
            return (
              <CustomText
                key={_.cod_categoria}
                numberOfLines={1}
                textType="bold"
                style={[
                  {
                    marginTop: 2,
                    fontSize: 10,
                    color: CustomDefaultTheme.colors.preto,
                    backgroundColor:
                      _.cor_primaria == "" ? "#00F" : _.cor_primaria,
                    padding: 2,
                    marginRight: 2,
                  },
                ]}
              >
                {_.nome_categoria}
              </CustomText>
            );
          })}
        </View>
      );
    }

    return <></>;
  };
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <TouchableOpacity
        onPress={handleNavigate}
        style={{
          justifyContent: "space-between",
        }}
      >
        <View
          style={isTablet ? StylesTablet.containerView : Styles.containerView}
        >
          <FastImage
            resizeMode={FastImage.resizeMode.cover}
            source={{ uri: item.url_thumb_video }}
            style={
              isTablet ? StylesTablet.imgThumbContent : Styles.imgThumbContent
            }
          >
            {assistidos[item.cod_video] != undefined && (
              <View
                style={{
                  position: "absolute",
                  bottom: 5,
                  left: 5,
                }}
              >
                <MaterialCommunityIcons
                  name="checkbox-marked-circle"
                  size={24}
                  color="green"
                />
              </View>
            )}
          </FastImage>
          <View style={{ width: wp("45"), paddingLeft: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View style={[Styles.subtituloFonte, { right: 2 }]}>
                  <CustomText style={Styles.subtituloFonteText}>
                    {item.subtitulo_video}
                  </CustomText>
                </View>
                <MinhaListaButton cod_video={item.cod_video} changeMinhaLista={changeMinhaLista}/>
              </View>

              <View style={[{ marginLeft: 5 }]}>
                <DownloadButton
                  color={"#707070"}
                  hls={item.mp4}
                  item={item}
                  pagina_origem={"SinopseTrilhaDrawer"}
                  relacionados={[]}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View>
                <CustomText
                  numberOfLines={2}
                  textType="bold"
                  style={[
                    isTablet
                      ? StylesTablet.textoRodaPeCard
                      : Styles.textoRodaPeCard,
                    { color: CustomDefaultTheme.colors.preto },
                  ]}
                >
                  {item.titulo_video}
                </CustomText>
                <CustomText
                  numberOfLines={3}
                  textType="light"
                  style={[
                    isTablet
                      ? StylesTablet.textoRodaPeCard
                      : Styles.textoRodaPeCard,
                    { fontSize: 10, color: CustomDefaultTheme.colors.preto },
                  ]}
                >
                  {item.subtitulo_video}
                </CustomText>
              </View>
            </View>

            <COMPONENTECATEGORIAS />
          </View>
        </View>
      </TouchableOpacity>

      {isLoading && <Loading />}
    </>
  );
};
export default VideoRelacionadoCardItemHorizontal;
