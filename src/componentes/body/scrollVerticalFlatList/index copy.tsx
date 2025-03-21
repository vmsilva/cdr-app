import React, { useEffect } from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import FastImage from "react-native-fast-image";

// Configuracões
import styles from "./Styles";
import CustomImage from "../../componentes/CustomImage";
import LinearGradient from "react-native-linear-gradient";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

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
  array: any[];
  tipo: string; // audio ou video
}

const ScrollVerticalFlatList: React.FC<CapaVerticalProps> = ({
  array,
  tipo,
}) => {
  const navigation = useNavigation() as any;

  const handleOpenUrl = (item: any) => {
    //console.log(item.cod_categoria); return
    if (tipo == "programas") {
      navigation.navigate("SinopseSerieDrawer", {
        item: item,
        relacionados: [],
        categoria: item,
      });
    } else {
      navigation.navigate("SinopseLivroDrawer", { item: item });
    }
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{
            paddingHorizontal: 10,
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={array != undefined ? array : [1]}
          horizontal={true} // Define a lista como horizontal
          renderItem={({ item, index }) => {
            console.log(
              tipo == "programas"
                ? item.url_foto_v_categoria
                : item.capa_biblioteca
            );
            return (
              <TouchableOpacity onPress={() => handleOpenUrl(item)}>
                <View style={styles.thumbContent}>
                  <CustomImage
                    source={{
                      uri:
                        tipo == "programas"
                          ? item.url_foto_v_categoria
                          : item.capa_biblioteca,
                    }}
                    style={styles.imgThumbContent}
                    children={
                      <>
                        <LinearGradient
                          colors={["transparent", CustomDefaultTheme.colors.bottomTab]}
                          start={{ x: 0, y: 0 }}
                          end={{
                            x: 0,
                            y: 0.9, //Platform.OS == "ios" ? 0.9 : 0.8,
                          }}
                          style={{
                            backgroundColor:  CustomDefaultTheme.colors.transparent,
                            height: "100%",
                            width: "100%",
                            borderRadius: 10
                          }}
                        ></LinearGradient>
                      </>
                    }
                  />
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </>
  );
};
export default ScrollVerticalFlatList;
