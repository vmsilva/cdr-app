import React, { ReactNode, useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import FastImage from "react-native-fast-image";
import { useNavigation } from "@react-navigation/native";

// Configuracao
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

// Componentes
import CustomText from "../../componentes/customText";

interface SerieProps {
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
  orientacao_conteudos_home: any;
  status_serie: any;
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
  dadosSerie: SerieProps;
}

interface CardItemBuscaHorizontalProps {
  item: videoProps;
  isFullScreen: boolean;
  aovivo: boolean;
  pagina_origem: any;
}

const CardItemBuscaHorizontal: React.FC<CardItemBuscaHorizontalProps | any> = ({
  item,
  isFullScreen,
  aovivo,
  pagina_origem,
}) => {
  const navigation = useNavigation() as any;

  const handleOpenUrl = () => {
    navigation.navigate("PlayerDrawer", {
      item: item,
      relacionados: [],
      aovivo: aovivo,
      isFullScreen: isFullScreen,
      titulo: item.titulo_video,
      pagina_origem: pagina_origem,
    });
  };
  return (
    <View
      key={Math.floor(Math.random() * 90000) + 10000}
      style={{
        marginBottom: 20,
        marginLeft: wp("1"),
        marginRight: wp("1"),
      }}
    >
      <TouchableOpacity
        style={[
          {
            width: wp("47"),
            height: wp("32"),
          },
        ]}
        onPress={handleOpenUrl}
      >
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          source={{ uri: item.imagem_h_video }}
          style={{
            height: wp("26"),
            borderRadius: 15,
            backgroundColor: CustomDefaultTheme.colors.backgroundCards
          }}
        ></FastImage>
        <View style={{ marginTop: 0, marginRight: 10 }}>
          <CustomText
            numberOfLines={2}
            textType={"regular"}
            style={{
              marginLeft: wp("2"),
              color: CustomDefaultTheme.colors.textFundoEscuro,
              fontSize: 12,
              maxHeight: 40,
              width: wp("42"),
            }}
          >
            {item.titulo_video}
          </CustomText>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CardItemBuscaHorizontal;
