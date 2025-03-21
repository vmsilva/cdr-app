import React, { useEffect, useState, useContext } from "react";
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
import { montaJsonVideo } from "../../../configuracoes/utils/utils";
import { UtilContext } from "../../../configuracoes/contexts/UtilContext";

type MosaicoHorizontalProps = {
  style?: StyleProp | StyleProp[];
  item: any;
  tipo: string;
  isFullScreen: boolean;
  pagina_origem: any;
  aovivo: any;
};

const MosaicoHorizontal: React.FunctionComponent<MosaicoHorizontalProps> = ({
  style,
  item,
  tipo,
  isFullScreen,
  pagina_origem,
  aovivo
}) => {
  const navigation = useNavigation() as any;
  const { tvsAoVivo } =  useContext(UtilContext)
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
        case "programa":
          ARRAY.push({
            page: "SinopseSerieDrawer",
            codigo: _.cod_video,
            imagem: _.imagem_h_video,
            nome: _.titulo_video,
            array: _,
          });
          break;
        case "aovivo":
          ARRAY.push({
            //page: "SinopseSerieDrawer",
            page: "AoVivoTab",
            codigo: _.cod_tv,
            imagem: _.imagem_h_tv,
            nome: _.nome_tv,
            array: _,
          });
          break;
      }
    });

    return ARRAY;
  };

  const handleUrl = (item: any) => {

    switch (tipo) {
      case "aovivo":
     
        let ITEMVIDEO = montaJsonVideo(item, item.flg_youtube == 1 ? 'aovivoYT' : 'aovivo')

        navigation.navigate(item.flg_youtube == 1 ? "AoVivoTab" : "AoVivoDrawer", {
          item: ITEMVIDEO,
          relacionados: tvsAoVivo,
          isFullScreen: isFullScreen,
          titulo: "AO VIVO",
          pagina_origem: pagina_origem,
          aovivo: aovivo
        });
        break;
      case "programa":
        navigation.navigate("PlayerDrawer", {
          item: item,
          relacionados: [],
          aovivo: false,
          isFullScreen: isFullScreen,
          titulo: item.titulo_video,
        });
        break;
    }
  };

  useEffect(() => {}, [data]);

  if (data.length == 0) {
    switch (tipo) {
      case "programa":
        const _ = MONTAARRAY(item);
        setTimeout(() => setData(_), 100);
        break;
      case "aovivo":
        const aovivo = MONTAARRAY(item);
        setTimeout(() => setData(aovivo), 100);
        break;
    }
  }

  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  return (
    <View>
      {!isLoading ? (
        data.length > 0 ? (
          <SafeAreaView>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={createRows(data, columns)}
              keyExtractor={(item, index) => `${index}`}
              numColumns={columns}
              renderItem={({ item, index }) => {
                if (item.empty) {
                  return <></>;
                }
                return (
                  <TouchableOpacity key={item.codigo}>
                    <View style={[Styles.thumbContent]}>
                      <TouchableOpacity onPress={() => handleUrl(item.array)}>
                        <FastImage
                          resizeMode={FastImage.resizeMode.contain}
                          source={{
                            uri: item.imagem,
                          }}
                          style={[Styles.imgThumbContent, { ...passedStyles }]}
                        />
                        <CustomText
                          style={{
                            textAlign: "center",
                            color: CustomDefaultTheme.colors.branco,
                          }}
                        >
                          {item.nome}
                        </CustomText>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </SafeAreaView>
        ) : (
          <></>
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

export default MosaicoHorizontal;
