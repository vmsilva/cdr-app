import React, { ReactNode, useEffect, useState } from "react";
import { View, ViewStyle } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import CustomText from "../../componentes/customText";
import Styles from "./styles";
import {
  trataString,
} from "../../../configuracoes/utils/utils";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";
import { Avatar } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import { useAuth } from "../../../configuracoes/hooks/auth";

type ItemBoxMensagemProps = {
  style?: ViewStyle | ViewStyle[];
  mensagem: any;
};

/*
i = sequencial
t = hora
n = nome base64
m = mensagem nome base64
a = url do avatar
u = codigo do usuario
p = Grupo do usuario
*/

const ItemBoxMensagem: React.FC<ItemBoxMensagemProps> = ({
  style,
  mensagem,
}) => {
  const { user } = useAuth();

  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  return (
    <>
      <View style={[Styles.balaoContent]}>
        <View style={[Styles.balaoHeaderContent]}>
          {mensagem.u == user.cod_usuario ? (
            <>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <CustomText
                  textType="montserratBold"
                  style={{
                    color: CustomDefaultTheme.colors.text,
                    marginLeft: "20%",
                  }}
                >
                  {mensagem.t}
                </CustomText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <CustomText textType="montserratBold" style={{ right: 10 }}>{user.nome}</CustomText>
                {user.url_avatar ? (
                  <Avatar.Image
                    source={{ uri: user.url_avatar }}
                    size={40}
                    style={{ marginTop: 10 }}
                  />
                ) : (
                  <Avatar.Icon
                    icon={() => (
                      <FontAwesome5
                        name="user-alt"
                        size={wp("20%")}
                        color="#FFF"
                      />
                    )}
                    size={80}
                    style={{
                      marginTop: 0,
                      backgroundColor: "transparent",
                      borderWidth: 1,
                      borderColor: "#FFF",
                    }}
                  />
                )}
              </View>
            </>
          ) : (
            <>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {true ? (
                  <Avatar.Image
                    source={{ uri: mensagem.a }}
                    size={40}
                    style={{ marginTop: 10 }}
                  />
                ) : (
                  <Avatar.Icon
                    icon={() => (
                      <FontAwesome5 name="user-alt" color="#FFF" size={25} />
                    )}
                    //size={60}
                    style={{
                      marginTop: 0,
                      backgroundColor: CustomDefaultTheme.colors.primary,
                      borderWidth: 1,
                      //borderColor: "#000",
                    }}
                  />
                )}
                <CustomText style={{ left: 10 }}>
                  {trataString(mensagem.n)}
                </CustomText>
              </View>
              <View
                style={{
                  //backgroundColor: '#90F',
                  flexDirection: "row",
                }}
              >
                <CustomText
                  textType="montserratBold"
                  style={{
                    color: CustomDefaultTheme.colors.text,
                    marginLeft: "10%",
                  }}
                >
                  {mensagem.t}
                </CustomText>
              </View>
            </>
          )}
        </View>

        <View
          style={[
            Styles.sombra,
            Styles.balao,
            mensagem.u == user.cod_usuario ? Styles.remetente : Styles.sender,
          ]}
        >
          <CustomText textType="montserratLight" style={{ letterSpacing: .6,  color: CustomDefaultTheme.colors.text }}>
            {trataString(mensagem.m)}
          </CustomText>
        </View>
      </View>
    </>
  );
};

export default ItemBoxMensagem;
