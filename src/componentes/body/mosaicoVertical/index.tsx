import React, { useEffect, useState } from "react";
import { StyleProp, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import FastImage from "react-native-fast-image";
import { ActivityIndicator } from "react-native-paper";
import CustomText from "../../componentes/customText";

import Styles from "./styles";

type MosaicoVerticalProps = {
  style?: StyleProp | StyleProp[];
  item: any;
  //array: any;
  tipo: string;
};

export const STYLEFLATLIST = {
  paddingTop: 15,
  paddingBottom: 150,
  paddingHorizontal: '4.2%',
  
}

const MosaicoVertical: React.FunctionComponent<MosaicoVerticalProps> = ({
  style,
  item,
  tipo,
}) => {
  const navigation = useNavigation() as any;
  const columns = 2;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>([]);

  function createRows(data, columns) {
    const rows = Math.floor(data.length / columns); // [A]
    let lastRowElements = data.length - rows * columns; // [B]
    while (lastRowElements !== columns) {
      data.push({
        id: `empty-${lastRowElements}`,
        name: `empty-${lastRowElements}`,
        empty: true,
      });
      lastRowElements += 1; // [E]
    }
    return data; // [F]
  }

  const MONTAARRAY = (dado: any) => {
    let ARRAY = [] as any;
    dado.map((_, i) => {
      switch (tipo) {
        case "programas":
          ARRAY.push({
            page: "SinopseSerieDrawer",
            codigo: _.cod_serie,
            imagem: _.imagem_v_serie,
            nome: _.nome_serie,
            array: _,
          });
         
          break;
        case "biblioteca_digital":
          ARRAY.push({
            page: "SinopseLivroDrawer",
            array: _,
          });
          break;
      }
    });

    return ARRAY;
  };

  const handleOpenUrl = (item) => {
    //console.log(item.cod_categoria); return
    if (tipo == "programas") {
      //console.log(item.array); return ;
      navigation.navigate("FiltroTemporadaDrawer", {
        //SinopseSerieDrawer
        item: item.array,
        relacionados: [],
        categoria: item.array,
      });
    } else {
      navigation.navigate(item.page, { item: item.array });
    }
  };

  useEffect(() => {
    return () => {};
  }, [data]);

  if (data.length == 0) {
    switch (tipo) {
      case "programas":
        const programas = MONTAARRAY(item);
        setTimeout(() => setData(programas), 100);
        break;
      case "biblioteca_digital":
        const biblioteca_digital = MONTAARRAY(item);
        setTimeout(() => setData(biblioteca_digital), 100);
        break;
    }
  }

  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  return (
    <View style={{}}>
      {!isLoading ? (
        data.length > 0 && (
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{}}
            contentContainerStyle={STYLEFLATLIST}
            data={createRows(data, columns)}
            keyExtractor={(item, index) => `${index}`}
            numColumns={columns}
            renderItem={({ item, index }) => {
              if (item.empty) {
                return <></>;
              }
              return (
                <TouchableOpacity
                  style={{
                    //paddingHorizontal: 5
                  }}
                >
                  <View style={[Styles.thumbContent]}>
                    <TouchableOpacity
                      //onPress={() => navigation.navigate(item.page, { item: item.array })}
                      onPress={() => handleOpenUrl(item)}
                    >
                      <FastImage
                        resizeMode={FastImage.resizeMode.cover}
                        source={{
                          uri:
                            tipo == "biblioteca_digital"
                              ? item.array.capa_biblioteca
                              : item.array.url_foto_v_categoria,
                        }}
                        style={[Styles.imgThumbContent, { ...passedStyles }]}
                      >
                        <CustomText
                          textType="montserratBold"
                          style={{
                            textAlign: "center",
                            color: CustomDefaultTheme.colors.branco,
                          }}
                        >
                          {
                            ""
                            //item.array.nome_categoria
                          }
                        </CustomText>
                      </FastImage>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )
      ) : (
        <ActivityIndicator
          animating={true}
          color={CustomDefaultTheme.colors.bgcarrossel}
          size={wp("30%")}
          style={{ top: hp("30%") }}
        />
      )}
    </View>
  );
};

export default MosaicoVertical;
