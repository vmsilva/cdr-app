import React, { useContext, useEffect } from "react";
import { View, Dimensions, Platform, TouchableOpacity } from "react-native";

// Components
import CustomText from "../../componentes/customText";

// config
import styles from "./Styles";
import stylesTablet from "./StylesTablet";
import { UtilContext } from "../../../configuracoes/contexts/UtilContext";
import AssistirButton from "../../botoes/assistirButton";
import LinearGradient from "react-native-linear-gradient";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

import FastImage from "react-native-fast-image";

export const SLIDER_WIDTH = Dimensions.get("window").width;
export const SLIDER_HEIGHT = Dimensions.get("window").height;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.65);
export const ITEM_WIDTH_TABLET = Math.round(SLIDER_WIDTH * 0.89);

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

// cod_tipo_conteudo 1 - video | 2 - audio | 3 - programa | 4 - radios | 5 - personalidade
/*
1 => VÍDEO
2 => ÁUDIO
3 => PROGRAMA
5 => PERSONALIDADE
6 => TV/AO VIVO
*/

interface destaquesProps {
  cod_destaque: any;
  cod_cliente: any;
  titulo_destaque: any;
  chamada_destaque: any;
  imagem_h_destaque: any;
  imagem_v_destaque: any;
  cod_tipo_conteudo: "1" | "2" | "3" | "4" | "5" | "6";
  label: any;
  url_link_destaque: any;
  video: videoProps;
  flg_abrir_nova_aba: any;
  flg_mostrar_textos: any;
  ordem_destaque: any;
}

interface CarroselCadProps {
  child: React.ReactNode;
  array: destaquesProps;
  activeIndex: any;
  index_item: any;
}

const CarrosselCards: React.FC<CarroselCadProps | any> = ({ array }) => {
  const { isTablet } = useContext(UtilContext);

  const handleLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    console.log(`Item : width: ${width}, height: ${height}`);
    // Aqui você pode armazenar essas dimensões no estado ou usá-las como preferir
  };

  useEffect(() => {
    /*console.log(
      //array.cod_destaque == 444 &&
        array,
      "--->> arrayyyyy"
    );*/
  }, []);

  return (
    <View
      style={
        isTablet
          ? Platform.OS == "android"
            ? stylesTablet.containerAndroid
            : stylesTablet.container
          : Platform.OS == "android"
          ? styles.containerAndroid
          : styles.container
      }
    >
      <FastImage
        source={{ uri: array.url_banner_mobile }}
        //source={IMAGEMTESTECARROSSEL}
        style={[
          isTablet ? stylesTablet.imgCardCarrossel : styles.imgCardCarrossel,
        ]}
        resizeMode="cover"
      >
        <LinearGradient
          style={[styles.gradientImgThumbContent]}
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
            CustomDefaultTheme.colors.corsombradestaque,
          ]}
        >
          <View
            style={{
              display: "none",
              width: "100%",
              position: "absolute",
              top: 30,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 20,
            }}
          >
            {array.show_textos_destaque && (
              <>
                <View
                  style={[
                    isTablet ? stylesTablet.blocoTexto : styles.blocoTexto,
                  ]}
                >
                  <CustomText
                    textType={"montserratBold"}
                    numberOfLines={2}
                    style={
                      isTablet
                        ? stylesTablet.textoDestaqueTitle
                        : styles.textoDestaqueTitle
                    }
                  >
                    {array.titulo_destaque}
                  </CustomText>
                </View>
              </>
            )}
          </View>
          <View
            style={isTablet ? stylesTablet.blocoItemBtn : styles.blocoItemBtn}
          >
            {array.tag_destaque != "" && (
              <View
                style={{
                  top: -20,
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  borderRadius: 99,
                  borderWidth: 1,
                  borderColor: CustomDefaultTheme.colors.borderColorTags,
                  backgroundColor: CustomDefaultTheme.colors.backgroundTags,
                }}
              >
                <CustomText
                  numberOfLines={2}
                  textType={"montserratRegular"}
                  style={{
                    color: "#FFF",
                  }}
                >
                  {array.tag_destaque}
                </CustomText>
              </View>
            )}

            {array.show_textos_destaque && (
              <>
                <View
                  style={[
                    isTablet ? stylesTablet.blocoTexto : styles.blocoTexto,
                    { display: "flex" },
                  ]}
                >
                  <CustomText
                    textType={"montserratBold"}
                    numberOfLines={2}
                    style={
                      isTablet
                        ? stylesTablet.textoDestaqueTitle
                        : styles.textoDestaqueTitle
                    }
                  >
                    {array.titulo_destaque}
                  </CustomText>
                </View>
                <View
                  style={isTablet ? stylesTablet.blocoTexto : styles.blocoTexto}
                >
                  <CustomText
                    numberOfLines={2}
                    textType={"montserratBold"}
                    style={
                      isTablet
                        ? stylesTablet.textoDestaque
                        : styles.textoDestaque
                    }
                  >
                    {array.chamada_destaque}
                  </CustomText>
                </View>
                <View
                  style={{
                    display: array.show_btn_destaque ? "flex" : "none",
                  }}
                >
                  {/*<BTNCOMPONENTE />*/}

                  {array.cod_aovivo > 0 && (
                    <View style={[styles.buttonAssistir]}>
                      <TouchableOpacity>
                        <AssistirButton item={array} tipo="aovivo" />
                      </TouchableOpacity>
                    </View>
                  )}

                  {array.cod_video > 0 && (
                    <View style={[styles.buttonAssistir]}>
                      <TouchableOpacity>
                        <AssistirButton item={array} tipo="video" />
                      </TouchableOpacity>
                    </View>
                  )}

                  {array.cod_video == 0 &&
                    array.cod_aovivo == 0 &&
                    array.cod_categoria > 0 && (
                      <View style={[styles.buttonAssistir]}>
                        <TouchableOpacity>
                          <AssistirButton item={array} tipo="categoria" />
                        </TouchableOpacity>
                      </View>
                    )}

                  {array.cod_video == 0 &&
                    array.custom_url &&
                    array.cod_categoria == 0 && (
                      <View style={[styles.buttonAssistir]}>
                        <TouchableOpacity>
                          <AssistirButton item={array} tipo="link" />
                        </TouchableOpacity>
                      </View>
                    )}

                  {array.cod_video == 0 &&
                    array.custom_url == "" &&
                    array.cod_categoria == 0 &&
                    array.cod_playlist > 0 &&  (
                      <View style={[styles.buttonAssistir]}>
                        <TouchableOpacity>
                          <AssistirButton item={array} tipo="playlist" />
                        </TouchableOpacity>
                      </View>
                    )}

                    {
                      array.url_interna !== '' && array.url_interna == "biblioteca" && (<View style={[styles.buttonAssistir]}>
                        <TouchableOpacity>
                          <AssistirButton item={array} tipo="biblioteca" />
                        </TouchableOpacity>
                      </View>)
                    }
                </View>
              </>
            )}
          </View>
        </LinearGradient>
      </FastImage>
    </View>
  );
};

export default CarrosselCards;
