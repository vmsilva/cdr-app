import React from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image";

// Configuracões
import styles from "./Styles";
import { SCROLLSTYLEGERAL } from "../../../configuracoes/utils/constants/style";

interface CapaVerticalProps {
  array: any[];
  tipo: string; // audio ou video
}

const ScrollVertical: React.FC<CapaVerticalProps> = ({ array, tipo }) => {
  const navigation = useNavigation() as any;

  const handleOpenUrl = (item: any) => {
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
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={array}
      style={[SCROLLSTYLEGERAL]}
      renderItem={(_, index) => {
        return (
          <TouchableOpacity
            key={
              tipo == "programas" ? _.item.cod_categoria : _.item.cod_biblioteca
            }
            onPress={() => handleOpenUrl(_.item)}
          >
            <View
              style={
                tipo == "biblioteca_digital"
                  ? styles.thumbContentMenor
                  : styles.thumbContent
              }
            >
              <FastImage
                source={{
                  uri:
                    tipo == "programas"
                      ? _.item.url_foto_v_categoria
                      : _.item.capa_biblioteca,
                  priority: FastImage.priority.high,
                }}
                style={
                  tipo == "biblioteca_digital"
                    ? styles.imgThumbContentMenor
                    : styles.imgThumbContent
                }
              />
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};
export default ScrollVertical;
