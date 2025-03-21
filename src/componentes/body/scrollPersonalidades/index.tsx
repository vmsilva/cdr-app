import React, { useEffect, useContext } from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import FastImage from "react-native-fast-image";

// Configuracões
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";
import styles from "./Styles";
import stylesTablet from "./StylesTablet";
import { UtilContext } from "../../../configuracoes/contexts/UtilContext";

interface personalidadeProps {
  cod_personalidade: any;
  cod_cliente: any;
  cod_personalidade_grupo: any;
  nome_personalidade: any;
  subtitulo_personalidade: any;
  descricao_personalidade: any;
  imagem_h_personalidade: any;
  imagem_fhd_personalidade: any;
  imagem_capa_app_personalidade: any;
  imagem_capa_contato_personalidade: any;
  imagem_banner_contato_personalidade: any;
  redes_sociais_personalidade: any;
  ordem_personalidade: any;
  status_personalidade: any;
  slug: any;
}

interface CapaVerticalProps {
  capaVertical: personalidadeProps[];
  cod_personalidade_grupo: string;
  tabIndex: any;
}

const ScrollPersonalidades: React.FC<CapaVerticalProps> = ({
  capaVertical,
  cod_personalidade_grupo,
  tabIndex,
}) => {
  const navigation = useNavigation() as any;
  const { isTablet } = useContext(UtilContext);

  useEffect(() => {}, []);
  //console.log(cod_personalidade_grupo)
  return (
    <>
      <View
        //style={styles.container}
        style={isTablet ? stylesTablet.container : styles.container}
      >
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          removeClippedSubviews={true}
        >
          {capaVertical != undefined &&
            capaVertical.map((_: any, i: any) => {
              return (
                <TouchableOpacity
                  key={_.cod_personalidade + _.imagem_h_personalidade}
                  onPress={() =>
                    navigation.navigate("PersonalidadesDrawer", {
                      item: _,
                      tabIndex: tabIndex,
                    })
                  }
                >
                  <View
                    //style={cod_personalidade_grupo == '2' ? styles.thumbContent : styles.thumbContentFaleConosco}
                    style={
                      cod_personalidade_grupo == "2"
                        ? isTablet
                          ? stylesTablet.thumbContent
                          : styles.thumbContent
                        : isTablet
                        ? stylesTablet.thumbContentFaleConosco
                        : styles.thumbContentFaleConosco
                    }

                    //style={isTablet ? stylesTablet.container : styles.container}
                  >
                    <FastImage
                      source={{
                        uri:
                          cod_personalidade_grupo == "2"
                            ? _.imagem_h_personalidade
                            : _.imagem_capa_contato_personalidade,
                        priority: FastImage.priority.high,
                        cache: FastImage.cacheControl.immutable,
                      }}
                      style={[
                        cod_personalidade_grupo == "2"
                          ? isTablet
                            ? stylesTablet.imgThumbContent
                            : styles.imgThumbContent
                          : isTablet
                          ? stylesTablet.imgThumbContentFaleConosco
                          : styles.imgThumbContentFaleConosco,
                        {
                          backgroundColor:
                            CustomDefaultTheme.colors.cinzaSecundario,
                        },
                      ]}
                    ></FastImage>
                  </View>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </View>
    </>
  );
};

export default ScrollPersonalidades;
