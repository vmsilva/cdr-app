import React, { useContext, useState } from "react";
import { View, TouchableOpacity, Linking, Image } from "react-native";
import GoogleCast, { useRemoteMediaClient } from "react-native-google-cast";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

import styles from "./Styles";
import stylesTablet from "./StylesTablet";
import CustomText from "../../componentes/customText";
import { UtilContext } from "../../../configuracoes/contexts/UtilContext";
import Loading from "../../funcionalidade/Loading";
import PortalComponente from "../../funcionalidade/Portal";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { SCROLLSTYLEGERAL } from "../../../configuracoes/utils/constants/style";
import { montaJsonVideo } from "../../../configuracoes/utils/utils";
import FastImage from "react-native-fast-image";
import { EMPRESA } from "../../../configuracoes/utils/constants";
import { useAuth } from "../../../configuracoes/hooks/auth";
import { getData } from "../../../configuracoes/services/request";

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

const ScrollHorizontal: React.FC<any> = ({
  array,
  numberOfLines,
  isFullScreen,
  pagina_origem,
  serie,
  categoria,
  playlist,
  aovivo,
}) => {
  const navigation = useNavigation() as any;
  const {
    isTablet,
    TEXTO_PADRAO_COMPRA_PLANO_ANUAL,
    LINK_ASSINATURA,
  } = useContext(UtilContext);
  const client = useRemoteMediaClient() as any;
  const { assistidos } = useContext(UtilContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showBloq, setShowBloq] = useState<boolean>(false);
  const { user } = useAuth();

  const buscaCategoria = async (cod_categoria: any) => {
    try {
      let parametros = {
        rota: `/categorias/categoria/${cod_categoria}`,
        parametros: `token=${EMPRESA.EMPRESA.token_cliente}&token_usuario=${user.token}`,
        showNotification: false,
        showLogError: true,
      };
      const response = (await getData(parametros)) as any;
      //setCategoria(response.data.data);

      return response.data.data;
    } catch (error) {
      console.log(error, "Erro ao buscar categoria");
    }
  };

  const loadMedia = (media: any) => {
    console.log("loadingmedia chromecast");
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
  };

  const handleOpenUrl = async (video, relacionados = null as any) => { //console.log(categoria.categoria.cod_categoria); return;
    try {
      //console.log(montaJsonVideo(video, "videozoeplay")); return; aqui victor
      setIsLoading(true);
      
      const CAT  = categoria.categoria != undefined ?  await buscaCategoria(categoria.categoria.cod_categoria) : [];
      if (client) {
        loadMedia(montaJsonVideo(video, "videozoeplay"));
      } else {
        //return
        navigation.navigate("PlayerDrawer", {
          item: montaJsonVideo(video, "videozoeplay"),
          aovivo: aovivo,
          isFullScreen: isFullScreen,
          pagina_origem: pagina_origem,
          serie: serie,
          materia: categoria !== undefined ? categoria : [],
          playlist: playlist,
          categoria: CAT,
        });
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error, 'buscarrr');
    }
  };

  const COMPONENTEPORTAL = () => {
    return (
      <PortalComponente
        children={
          <>
            <View
              style={{
                position: "absolute",
                top: 60,
                right: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity onPress={() => setShowBloq(!showBloq)}>
                  <AntDesign name="closecircle" size={50} color="red" />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                backgroundColor: "#FFF",
                padding: 30,
              }}
            >
              <CustomText>{TEXTO_PADRAO_COMPRA_PLANO_ANUAL}</CustomText>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  paddingTop: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() => Linking.openURL(LINK_ASSINATURA)}
                >
                  <Button
                    style={{
                      backgroundColor: "#00e500",
                    }}
                  >
                    <CustomText style={{ color: "#FFF", letterSpacing: 1.2 }}>
                      CLIQUE AQUI PARA ASSINAR
                    </CustomText>
                  </Button>
                </TouchableOpacity>
              </View>
            </View>
          </>
        }
      />
    );
  };

  return (
    <>
      <View style={isTablet ? stylesTablet.container : styles.container}>
        <ScrollView
          horizontal={true}
          scrollEventThrottle={200}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          style={[SCROLLSTYLEGERAL]}
        >
          {array.length != undefined &&
            array.map((_: any, i: any) => {
              return (
                <TouchableOpacity
                  key={_.cod_video + Math.random()}
                  style={
                    isTablet ? stylesTablet.containerView : styles.containerView
                  }
                  onPress={() => {
                    handleOpenUrl(_);
                  }}
                >
                  <View style={styles.thumbContent}>
                    <FastImage
                      source={{
                        uri: _.url_thumb_video,
                      }}
                      style={
                        isTablet
                          ? stylesTablet.imgThumbContent
                          : styles.imgThumbContent
                      }
                      resizeMode="cover"
                    >
                      {assistidos[_.cod_video] != undefined && (
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
                    <View
                      style={{
                        left: 10,
                        marginTop: 1,
                      }}
                    >
                      <CustomText
                        textType="regular"
                        style={[
                          isTablet
                            ? stylesTablet.textoSubititulo
                            : styles.textoSubititulo,
                        ]}
                        numberOfLines={numberOfLines}
                      >
                        {_.titulo_video}
                      </CustomText>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          <View style={{ width: 15 }} />
        </ScrollView>
      </View>

      {isLoading && <Loading />}
      {showBloq && <COMPONENTEPORTAL />}
    </>
  );

  return (
    <>
      <View style={isTablet ? stylesTablet.container : styles.container}>
        <ScrollView
          horizontal={true}
          scrollEventThrottle={200}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          style={[SCROLLSTYLEGERAL]}
        >
          {array.length != undefined &&
            array.map((_: any, i: any) => {
              return (
                <TouchableOpacity
                  key={_.cod_categoria}
                  style={
                    isTablet ? stylesTablet.containerView : styles.containerView
                  }
                  onPress={() => {
                    handleOpenUrl(_);
                  }}
                >
                  <View style={styles.thumbContent}>
                    <Image
                      source={{
                        uri: _.url_foto_categoria,
                      }}
                      style={
                        isTablet
                          ? stylesTablet.imgThumbContent
                          : styles.imgThumbContent
                      }
                      resizeMode="cover"
                    />
                    <View
                      style={{
                        left: 10,
                        marginTop: 1,
                      }}
                    >
                      <CustomText
                        textType="regular"
                        style={[
                          isTablet
                            ? stylesTablet.textoSubititulo
                            : styles.textoSubititulo,
                        ]}
                        numberOfLines={numberOfLines}
                      >
                        {_.nome_categoria}
                      </CustomText>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          <View style={{ width: 15 }} />
        </ScrollView>
      </View>

      {isLoading && <Loading />}
      {showBloq && <COMPONENTEPORTAL />}
    </>
  );
};
export default ScrollHorizontal;
