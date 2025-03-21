import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image";

import { useAuth } from "../../../configuracoes/hooks/auth";

import { postData } from "../../../configuracoes/services/request";
import { UtilContext } from "../../../configuracoes/contexts/UtilContext";
import Styles from "./Styles";
import CustomText from "../../componentes/customText";
import Loading from "../../funcionalidade/Loading";
import apiTv from "../../../configuracoes/services/apiTv";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

interface CardEmpresaProps {
  item: any;
}

const CardEmpresa: React.FC<CardEmpresaProps | any> = ({ item }) => {
  const navigation = useNavigation() as any;
  const { cliente, arrayEmpresasUsuario, montaSessaoEmpresaUsuario } = useAuth();
  const { setHome, setDestaques, setCategorias, setAoVivo, setBiblioteca, setBase } = useContext(UtilContext);
  const [isLoad, setIsLoad] = useState(false);

  const buscaHomeEmpresa = useCallback(async () => { 
    try {
      setIsLoad(true);

      let parametros = {
        rota: "/theme",
        parametros: {
          apikey: item.cliente.token,
        },
        showNotification: false,
        showLogError: true,
        showLog: true,
      };
      
      const response = await apiTv.post(parametros.rota, parametros.parametros);

      let parametrosBase = {
        rota: "/base/",
        parametros: {
          cod_cliente: item.cliente.cod_cliente,
        },
        showNotification: false,
        showLogError: true,
        showLog: true,
      };
      
      const responseHomeBase = (await postData(parametrosBase)) as any;

      let parametrosHome = {
        rota: "/home",
        parametros: {
          token_cliente: item.cliente.token
        },
        showNotification: false,
        showLogError: true,
        showLog: true,
      };

      const responseHomeEmpresa = (await postData(parametrosHome)) as any;

      let parametrosAOVIVO = {
        rota: "/salas",
        parametros: {
          token_cliente: item.cliente.token
        },
        showNotification: false,
        showLogError: true,
      };

      const responseAOVIVO = (await postData(parametrosAOVIVO)) as any;

      let parametrosBiblioteca = {
        rota: "/biblioteca",
        parametros: {
          token: item.usuario.token,
        },
        showNotification: false,
        showLogError: true,
      };
      const responseBiblioteca = (await postData(parametrosBiblioteca)) as any;

      //setHome(responseHomeEmpresa.data.data)
      setHome(responseHomeEmpresa.data.data);
      setDestaques(responseHomeEmpresa.data.data.destaques);
      setCategorias(responseHomeEmpresa.data.data.categorias);
      setAoVivo(responseAOVIVO.data.data);
      setBiblioteca(responseBiblioteca.data.data);
      setBase(responseHomeBase.data.data);

      let trata = item;
      trata['layout'] = response.data.data;
      trata['url_logo'] = item.cliente.url_logo;
      
      await montaSessaoEmpresaUsuario(arrayEmpresasUsuario, trata);
      setIsLoad(false);
      navigation.navigate('HomeDrawer');
     

    } catch (error) {
      console.log(error, '--> monta empresa');
      setIsLoad(false);
    }
  },[isLoad]);

  useEffect(() => {
  },[cliente])

  return (
    <>
      <TouchableOpacity onPress={buscaHomeEmpresa}>
        <View style={[Styles.container,item.cliente.cod_cliente == cliente.cod_cliente  && {backgroundColor: item.cliente.bg}]}>
          <FastImage
            source={{
              uri: item.cliente.url_logo,
            }}
            style={{
              height: 300,
              width: "100%",
              backgroundColor: CustomDefaultTheme.colors.background,//item.cliente.bg,
              borderRadius: 20,
            }}
            resizeMode="contain"
          />
          <CustomText
            style={[item.cliente.cod_cliente == cliente.cod_cliente && Styles.font]}
          >
            {item.cliente.dominio}
          </CustomText>
          <CustomText
            style={[item.cliente.cod_cliente == cliente.cod_cliente && Styles.font]}
          >
            {item.cliente.nome}
          </CustomText>
        </View>
      </TouchableOpacity>

      {isLoad && <Loading />}
    </>
  );
};
export default CardEmpresa;
