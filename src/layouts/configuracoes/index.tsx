import React, { useContext } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import FastImage from "react-native-fast-image";
import { View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// imagens
import LOGOHEADER from "../../assets/logo.png";
// component
import PageHeader from "../../componentes/header";
import VersoesApp from "../../componentes/versaoApp";
import { UtilContext } from "../../configuracoes/contexts/UtilContext";

import Styles from "./Styles";
import StylesTablet from "./StylesTablet";
import OpenUrl from "../../componentes/body/openUrl";
import { CustomDefaultTheme } from "../../configuracoes/styles/Theme";
import { useAuth } from "../../configuracoes/hooks/auth";

const Configruacoes: React.FC<any> = (props) => {
  const navigation = useNavigation() as any;
  const { isTablet } = useContext(UtilContext);
  const { arrayEmpresasUsuario } = useAuth();

  const COMPONENTEHEADER = () => {
    return (
      <PageHeader
        backgroundTransparent={true}
        headerLeft={
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("HomeDrawer");
            }}
          >
            <View
              style={{
                backgroundColor: "#0000006b",
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                borderRadius: 199,
                paddingRight: 3,
              }}
            >
              <FontAwesome name="angle-left" size={27} color={CustomDefaultTheme.colors.branco} />
            </View>
          </TouchableOpacity>
        }
        titulo={"Configuracões"}
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
            ></View>
          </View>
        }
      />
    );
  };

  return (
    <>
      <COMPONENTEHEADER />
      <View
        style={{
          padding: 20,
          backgroundColor: "transparent",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <View
          style={{
            width: wp("100"),
            padding: 20,
            top: hp("15"),
            position: "absolute",
            justifyContent: "center",
            flexDirection: "row",
            flex: 1,
            display: arrayEmpresasUsuario.length > 1 ? 'flex' : 'none'
          }}
        >
          <OpenUrl
            background={CustomDefaultTheme.colors.cinza}
            titulo={"Selecionar Cliente"}
            icone={"database"}
            pagina_origem={"ConfigDrawer"}
            pagina_destino={"EmpresaDrawer"}
            iconColor={CustomDefaultTheme.colors.cinzaEscuro}
          />
        </View>
        <View
          style={{
            width: wp("100"),
            //padding: 20,
            bottom: hp("10"),
            position: "absolute",
            justifyContent: "center",
            flexDirection: "row",
            flex: 1,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FastImage
              source={LOGOHEADER}
              style={
                isTablet
                  ? StylesTablet.headerImgTamanho
                  : Styles.headerImgTamanho
              }
              resizeMode="contain"
            />
            <VersoesApp />
          </View>
        </View>
      </View>
    </>
  );
};

export default Configruacoes;
