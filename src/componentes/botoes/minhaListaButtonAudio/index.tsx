import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

//Config
import { postData, getData } from "../../../configuracoes/services/request";
import { UtilContext } from "../../../configuracoes/contexts/UtilContext";
import { useAuth } from "../../../configuracoes/hooks/auth";
import { ActivityIndicator } from "react-native-paper";
import { montaArrayMinhaLista } from "../../../configuracoes/utils/utils";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";
import styles from "./styles";

const MinhaListaButtonAudio: React.FC<any> = ({
  cod_playlist_audio,
  color,
  background
}) => {
  const { user } = useAuth();
  const {
    setMinhaListaAudio,
    meusAudios,
    setMeusAudios,
  } = useContext(UtilContext);
  const [isLoading, setIsloading] = useState(false);

  const buscaMinhaLista = async () => {
    try {
      //return
      let parametros = {
        rota: "/minhalista/playlistaudio",
        parametros: `token=${user.token}`,
        showNotification: false,
        showLogError: true,
      };
      const response = (await getData(parametros)) as any;
      setMinhaListaAudio(response.data.data);

      let montaarray = await montaArrayMinhaLista([
        response.data.data,
        "audio",
      ]);
      setMeusAudios(montaarray);
    } catch (error) {
      console.log(error, "<--- minha lista");
    }
  };

  const handleAdd = async () => {
    try {
      setIsloading(true);
      let parametros = {
        rota: "minhalista/addplaylistaudio",
        parametros: {
          token: user.token,
          cod_playlist_audio: cod_playlist_audio,
        },
        showNotification: false,
        showLogError: true,
      };
      (await postData(parametros)) as any;

      await buscaMinhaLista();

      setIsloading(false);
    } catch (error) {
      console.log(error, "<-- handle add");
      setIsloading(false);
    }
  };

  const handleRemove = async () => {
    try {
      setIsloading(true);
      let parametros = {
        rota: "/minhalista/delplaylistaudio",
        parametros: {
          token: user.token,
          cod_playlist_audio: cod_playlist_audio,
        },
        showNotification: false,
        showLogError: true,
      };
      await postData(parametros);
      //changeMinhaLista("atualiza_audio");
      await buscaMinhaLista();
      setIsloading(false);
    } catch (error) {
      console.log(error, "<-- handle remove ");
      setIsloading(false);
    }
  };

  useEffect(() => {
    return () => {};
  }, [meusAudios, isLoading, cod_playlist_audio]);

  if(meusAudios == undefined){
    return<></>;
  }
  
  return (
    <View
      style={{
        backgroundColor: background != undefined ? background : CustomDefaultTheme.colors.sliderTrackplayer,
        padding: 1,
        borderRadius: 99,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {isLoading ? (
        <ActivityIndicator
          size={22}
          color={color == undefined ? CustomDefaultTheme.colors.primary : color}
        />
      ) : (
        <TouchableOpacity
          onPress={() => {
            setIsloading(true);
            if (meusAudios[cod_playlist_audio] == undefined) {
              handleAdd();
            } else {
              handleRemove();
            }
          }}
          style={[meusAudios[cod_playlist_audio] == undefined
            ? {} : styles.containerIcons, background != undefined && {backgroundColor: background}]}
        >
          <Ionicons
            name={
              meusAudios[cod_playlist_audio] == undefined
              ? "bookmark" : "bookmark-outline"
            }
            size={22}
            color={
              meusAudios[cod_playlist_audio] == undefined
                ? color == undefined
                  ? "black"
                  : color
                : CustomDefaultTheme.colors.branco
            }
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MinhaListaButtonAudio;
