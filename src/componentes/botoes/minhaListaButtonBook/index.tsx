import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

//Config
import { postData, getData } from "../../../configuracoes/services/request";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";
import { UtilContext } from "../../../configuracoes/contexts/UtilContext";
import { useAuth } from "../../../configuracoes/hooks/auth";
import { ActivityIndicator, Button } from "react-native-paper";

const MinhaListaButtonBook: React.FC<any> = ({ cod_biblioteca, size, background }) => {
  const { user } = useAuth();
  const { minhaListaBook, setMinhaListaBook } = useContext(
    UtilContext
  );
  const [isLoading, setIsloading] = useState(false);

  const buscaMinhaLista = async () => {
    let parametros = {
      rota: "/minhalista/biblioteca",
      parametros: `token=${user.token}`,
      showNotification: false,
      showLogError: true,
    };
    const response = await getData(parametros) as any;
    setMinhaListaBook(response.data.data);

    console.log(response.data.data)
    setIsloading(false);
  };

  const handleAdd = async () => {
    let parametros = {
      rota: "/minhalista/addbiblioteca",
      parametros: {
        token: user.token,
        cod_biblioteca: cod_biblioteca,
      },
      showNotification: false,
      showLogError: true,
    };
    const response = await postData(parametros) as any;
    console.log(response.data.data)
    buscaMinhaLista();
  };

  const handleRemove = async () => {
    let parametros = {
      rota: "/minhalista/delbiblioteca",
      parametros: {
        token: user.token,
        cod_biblioteca: cod_biblioteca,
      },
      showNotification: false,
      showLogError: true,
    };
    const response = await postData(parametros);
    buscaMinhaLista();
  };

  useEffect(() => {

    return () => {}
  }, [minhaListaBook, isLoading, cod_biblioteca]);

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setIsloading(true);
          if (minhaListaBook[cod_biblioteca] == undefined) {
            handleAdd();
          } else {
            handleRemove();
          }
        }}
      >
        <View
          style={{
            backgroundColor: background ? background : CustomDefaultTheme.colors.backgroundIconsButton,
            borderRadius: 99,
            width: size ? size + 15 : 38,
            height: size ? size + 15 : 38,
            justifyContent: 'center',
            alignItems: 'center',
            
          }}
        >
          {
            !isLoading ? 
              <Ionicons
                name={
                  minhaListaBook[cod_biblioteca] != undefined ? "bookmark" : "bookmark-outline"
                }
                size={size ? size : 20}
                color={CustomDefaultTheme.colors.iconsPrimaryColor}
              />
            : 
              <ActivityIndicator color={CustomDefaultTheme.colors.iconsPrimaryColor} size={size ? size : 20} />
          }
         
        </View>
      </TouchableOpacity>
    </>
  );

};

export default MinhaListaButtonBook;
