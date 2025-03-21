import React, { useContext, useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import { View, TouchableOpacity, ScrollView } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// imagens
import LOGOHEADER from "../../assets/logo.png";
// component
import PageHeader from "../../componentes/header";
import { UtilContext } from "../../configuracoes/contexts/UtilContext";

import Styles from "./Styles";
import StylesTablet from "./StylesTablet";
import { CustomDefaultTheme } from "../../configuracoes/styles/Theme";
import CardEmpresa from "../../componentes/body/cardEmpresa";
import Loading from "../../componentes/funcionalidade/Loading";
import { useAuth } from "../../configuracoes/hooks/auth";

const Empresa: React.FC<any> = (props) => {
  const { arrayEmpresasUsuario } = useAuth();
  const navigation = useNavigation() as any;
  const { isTablet } = useContext(UtilContext);
  const isFocused = useIsFocused();
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
   
    return () => {
      setIsLoad(false);
    };
  }, [isFocused]);

  const COMPONENTEHEADER = () => {
    return (
      <PageHeader
        backgroundTransparent={true}
        style={{backgroundColor: CustomDefaultTheme.colors.background}}
        headerLeft={
          <>
            <TouchableOpacity
              style={{
                left: wp("15%"),
              }}
            >
              <FastImage
                source={LOGOHEADER}
                style={
                  isTablet
                    ? StylesTablet.headerImgTamanho
                    : Styles.headerImgTamanho
                }
                resizeMode={FastImage.resizeMode.contain}
              />
            </TouchableOpacity>
          </>
        }
        titulo={""}
        headerRight={
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                right: 10,
                marginRight: 10,
              }}
            ></View>
            <View
              style={{
                right: 0,
                marginTop: -5,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.toggleDrawer()}
                style={
                  {
                    //marginRight: 20,
                  }
                }
              >
                <FontAwesome
                  name="bars"
                  size={isTablet ? 30 : 26}
                  color={CustomDefaultTheme.colors.iconsPrimaryColor}
                />
              </TouchableOpacity>
            </View>
          </View>
        }
      />
    );
  };

  const COMPONENTEEMPRESA = () => {
    //console.log(Object.values(empresa), 'victor');
    if (arrayEmpresasUsuario != undefined)
      if (arrayEmpresasUsuario.length > 0) {
        return (arrayEmpresasUsuario.map((_: any, index: any) => {
          return (<CardEmpresa key={_.cliente.cod_cliente} item={_} />);
        }));
      }
  };

  return (
    <>
      <COMPONENTEHEADER />     
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          paddingTop: hp('13%'),
          padding: wp('10'),
        }}
      >
        <COMPONENTEEMPRESA />

        <View style={{height: 200}}/>
      </ScrollView>

      {isLoad && <Loading />}
    </>
  );
};

export default Empresa;
