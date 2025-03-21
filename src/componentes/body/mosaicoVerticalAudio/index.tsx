import React, { useContext, useEffect, useState } from "react";
import { StyleProp, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import FastImage from "react-native-fast-image";import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Styles from "./styles";
import CustomText from "../../componentes/customText";
import { getData } from "../../../configuracoes/services/request";
import { useAuth } from "../../../configuracoes/hooks/auth";
import { UtilContext } from "../../../configuracoes/contexts/UtilContext";
import { montaArrayContinuarAssistindoAudio } from "../../../configuracoes/utils/utils";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";
import { STYLEFLATLIST } from "../mosaicoVertical";

type MosaicoVerticalAudioProps = {
  style?: StyleProp | StyleProp[];
  item: any;
  array: any;
  numberOfLines: any;
  tipo: string;
};

const MosaicoVerticalAudio: React.FunctionComponent<MosaicoVerticalAudioProps> = ({
  style,
  item,
  tipo,
  numberOfLines,
}) => {
  const { user } = useAuth();
  const { setContinuarAssistindoAudio } = useContext(UtilContext);
  const navigation = useNavigation() as any;
  const columns = 2;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>([]);

  const buscaContinuarAssistindoAudio = async () => {
    //return;
    try {
      let parametros = {
        rota: "/playlists/continuarassistindo",
        parametros: `token=${user.token}`,
        showNotification: false,
        showLogError: true,
      };

      const response = (await getData(parametros)) as any;

      const ret = (await montaArrayContinuarAssistindoAudio(
        response.data.data
      )) as any;

      setContinuarAssistindoAudio(ret);
    } catch (error) {
      console.log(error, "--> continuar assistindo");
    }
  };

  const buscaPlaylist = async (cod_playlist: any) => {
    try {
      let parametros = {
        rota: `/playlists/audios/${cod_playlist}`,
        parametros: `token=${user.token}`,
        showNotification: false,
        showLogError: true,
      };
      const response = (await getData(parametros)) as any;

      return response.data.data;
    } catch (error) {
      console.log(error, "Erro ao buscar categoria");
    }
  };

  const handleOpenUrl = async (playlist) => {
    try {
      setIsLoading(true);

      await buscaContinuarAssistindoAudio();

      let retornorPlaylistAudios = await buscaPlaylist(playlist.cod_playlist);

      console.log(retornorPlaylistAudios);

      setIsLoading(false);
      navigation.navigate("SinopseAudioDrawer", {
        playlist: playlist,
        audios: retornorPlaylistAudios,
      });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

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
        case "podcast_tab":
          ARRAY.push({
            page: "SinopseLivroDrawer",
            array: _,
          });
          break;
      }
    });

    return ARRAY;
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
      case "podcast_tab":
        const podcast = MONTAARRAY(item);
        setTimeout(() => setData(podcast), 100);
        break;
    }
  }

  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  return (
    <>
      {data.length > 0 && (
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

            return (<>
              <View style={[Styles.thumbContent]}>
                <TouchableOpacity onPress={() => handleOpenUrl(item.array)}>
                  <View>
                    <FastImage
                      source={{ uri: item.array.url_foto_playlist }}
                      style={Styles.imgThumbContent}
                      resizeMode="stretch"
                    />
                    {/*<View
                      style={{
                        left: 10,
                        marginTop: 1,
                        paddingHorizontal: 5,
                      }}
                    >
                      <CustomText
                        textType="montserratRegular"
                        style={{
                          color: CustomDefaultTheme.colors.text,
                          fontSize: 10,
                          letterSpacing: 0.95,
                        }}
                        numberOfLines={numberOfLines}
                      >
                        {item.array.nome_playlist}
                      </CustomText>
                    </View>*/}
                  </View>
                </TouchableOpacity>
              </View>
              
            </>);
          }}
        />
      )}
    </>
  );
};

export default MosaicoVerticalAudio;
