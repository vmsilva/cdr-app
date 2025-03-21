import React, { useContext, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import FastImage from "react-native-fast-image";

import { useAuth } from "../../../configuracoes/hooks/auth";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

import Styles from "./Styles";
import CustomText from "../../componentes/customText";
import Loading from "../../funcionalidade/Loading";
import { FontAwesome } from "@expo/vector-icons";
import { postData } from "../../../configuracoes/services/request";
import { EMPRESA } from "../../../configuracoes/utils/constants/empresa";
import { UtilContext } from "../../../configuracoes/contexts/UtilContext";

interface CardEmpresaProps {
  item: any;
}

const CardEmpresa: React.FC<CardEmpresaProps | any> = ({ item }) => {
  const navigation = useNavigation() as any;
  const { user } = useAuth();
  const { setHome, setEmpresa } = useContext(UtilContext);
  const [isLoad, setIsLoad] = useState(false);

  const buscaHomeEmpresa = async () => {
    //console.log(item); return;
    setIsLoad(true)
    try {
      let parametros = {
        rota: "/empresas/home",
        parametros: {
          token: user.token,
          cod_empresa: item.cod_empresa
        },
        showNotification: false,
        showLogError: true,
        showLog: true,
      };

      const response = (await postData(parametros)) as any;

      setHome(response.data.data)
      setEmpresa(item);
      navigation.navigate('HomeDrawer');
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoad(false)
    }
  };

  return (
    <>
      <View style={Styles.container}>
        <TouchableOpacity 
          onPress={buscaHomeEmpresa}
        >
          <FastImage
            source={{
              uri: item.logo_empresa,
            }}
            style={{
              height: 300,
              width: "100%",
              backgroundColor: "#FFF",
              borderRadius: 20,
            }}
            resizeMode="cover"
          />
          <CustomText
            numberOflines={1}
            textType="bold"
            style={{ fontSize: 30, letterSpacing: -2 }}
          >
            {item.nome_empresa}
          </CustomText>
          <CustomText
            numberOflines={1}
            textType="regular"
            style={{ fontSize: 14, letterSpacing: -1 }}
          >
            {item.descricao_empresa}
          </CustomText>

          <TouchableOpacity style={{display: 'none'}} onPress={buscaHomeEmpresa}>
            <Button
              contentStyle={{
                borderRadius: 30,
                height: 50,
                padding: 1,
                width: "100%",
                backgroundColor: CustomDefaultTheme.colors.buttonPrimary,
              }}
              icon={() => <FontAwesome name="sign-in" size={24} color="#FFF" />}
            >
              <CustomText
                textType="bold"
                style={{
                  marginBottom: 10,
                  textAlign: "center",
                  color: CustomDefaultTheme.colors.branco,
                }}
              >
                ACESSAR
              </CustomText>
            </Button>
          </TouchableOpacity>

        </TouchableOpacity>
      </View>

      {isLoad && <Loading />}
    </>
  );
};
export default CardEmpresa;
