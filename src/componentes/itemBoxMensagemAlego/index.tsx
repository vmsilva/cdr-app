import React, { } from "react";
import { View, ViewStyle } from "react-native";

//import CustomText from "../../componentes/customText";
import CustomText from "../componentes/customText";
import Styles from "./styles";
import { Avatar } from "react-native-paper";
import { useAuth } from "../../configuracoes/hooks/auth";

type ItemBoxMensagemAlegoProps = {
  style?: ViewStyle | ViewStyle[];
  mensagem: any;
  usuarios: any;
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

const ItemBoxMensagemAlego: React.FC<ItemBoxMensagemAlegoProps> = ({
  style,
  mensagem,
  usuarios,
}) => {
  const { user } = useAuth();

  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  const trataString = (data) => {
    return data;
  };

  return (
    <>
      <View style={[Styles.balaoContent]}>
        <View style={[Styles.balaoHeaderContent]}>
          <>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  //backgroundColor: '#F00',
                }}
              >
                <Avatar.Image
                  source={{ uri: usuarios[`${mensagem.cod_usuario}`].avatar }}
                  size={25}
                  style={{ marginTop: 10 }}
                />
              </View>
                
              <View
                style={{
                  left: 20,
                  width: '90%'
                }}
              >
                <CustomText
                  textType="bold"
                  style={{ maxWidth: "90%", letterSpacing: 0.9 }}
                >
                  {`${usuarios[`${mensagem.cod_usuario}`].nome}  `}
                </CustomText>
                <CustomText
                    textType="light"
                    style={{
                      fontSize: 12,
                      width: "90%", letterSpacing: 0.9, // backgroundColor: '#0F0'
                    }}
                  >
                    {mensagem.mensagem}
                  </CustomText>
              </View>
            </View>
          </>
        </View>
      </View>
    </>
  );
};

export default ItemBoxMensagemAlego;
