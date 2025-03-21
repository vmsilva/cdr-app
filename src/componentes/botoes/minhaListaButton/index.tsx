import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

//Config
import { postData, getData } from "../../../configuracoes/services/request";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";
import { UtilContext } from "../../../configuracoes/contexts/UtilContext";
import { useAuth } from "../../../configuracoes/hooks/auth";
import { ActivityIndicator, Button } from "react-native-paper";
import CustomText from "../../componentes/customText";

const MinhaListaButton: React.FC<any> = ({ cod_video, changeMinhaLista, background }) => {
  const { user } = useAuth();
  const { minhaLista, setMinhaLista } = useContext(UtilContext);
  const [isLoading, setIsloading] = useState(false);

  const buscaMinhaLista = async () => {
    let parametros = {
      rota: "/minhalista",
      parametros: `token=${user.token}`,
      showNotification: false,
      showLogError: true,
    };
    const response = (await getData(parametros)) as any;
    setMinhaLista(response.data.data);

    //console.log(response.data.data);
    setIsloading(false);
  };

  useEffect(() => {
    return () => {};
  }, [minhaLista, isLoading, cod_video]);

  const handleAdd = async () => {
    let parametros = {
      rota: "minhalista/add",
      parametros: {
        token: user.token,
        cod_video: cod_video,
      },
      showNotification: false,
      showLogError: true,
    };
    const response = await postData(parametros);
    changeMinhaLista('atualiza_video')
    buscaMinhaLista();
  };

  const handleRemove = async () => {
    let parametros = {
      rota: "minhalista/del",
      parametros: {
        token: user.token,
        cod_video: cod_video,
      },
      showNotification: false,
      showLogError: true,
    };
    const response = await postData(parametros);
    changeMinhaLista('atualiza_video')
    buscaMinhaLista();
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setIsloading(true);
          if (minhaLista[cod_video] == undefined) {
            handleAdd();
          } else {
            handleRemove();
          }
        }}
      >
        <View
          style={{
            padding:2,
            borderRadius: 99,
            width: 30,
            height: 30,
            backgroundColor: background ? background: CustomDefaultTheme.colors.backgroundIconsButton,
            /*backgroundColor: minhaLista[cod_video] != undefined
            ? CustomDefaultTheme.colors.buttonRemove
            : CustomDefaultTheme.colors.primaryButton,*/
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row'
          }}
        >
          {
            !isLoading ? 
              <Ionicons
                name={
                  minhaLista[cod_video] != undefined ? "bookmark" : "bookmark-outline"
                }
                size={20}
                color={CustomDefaultTheme.colors.branco}
              />
            : 
              <ActivityIndicator color={CustomDefaultTheme.colors.branco} size={20} />
          }
         
        </View>
      </TouchableOpacity>
    </>
  );

};

export default MinhaListaButton;
