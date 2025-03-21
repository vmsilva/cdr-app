import React, { useCallback, useMemo, useRef, useState } from "react";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { ScrollView, View, TextInput, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";
// component
import PageHeader from "../../componentes/header";
import CustomText from "../../componentes/componentes/customText";

import Styles from "./Styles";
import StylesBoletim from "../boletim/Styles";
import { CustomDefaultTheme } from "../../configuracoes/styles/Theme";
import { Avatar, Button } from "react-native-paper";
import { useAuth } from "../../configuracoes/hooks/auth";
import InputSecundarioMensagem from "../../componentes/InputSecundarioMensagem";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { getData } from "../../configuracoes/services/request";
import { trataDataComHora } from "../../configuracoes/utils/utils";

const TEMPOWATHING = 10;

const MensagemPage: React.FC<any> = (props) => {
  const { user, cliente } = useAuth();
  const navigation = useNavigation() as any;
  const isFocused = useIsFocused();
  const mensagemInputRef = useRef<TextInput>(null);
  const formRef = useRef<FormHandles>(null);
  const [mensagens, setMensagens] = useState<any>([]);

  const adicionarNovaMensagem = async (data: any) => {
    try {
      if (data.mensagem == "") {
        return;
      }

      let parametros = {
        rota: "/eadchat/send",
        parametros: `token=${user.token}&mensagem=${data.mensagem}`,
        showNotification: false,
        showLogError: true,
      };

      const response = (await getData(parametros)) as any;

      buscaMensagens();
      formRef.current?.reset();
    } catch (error) {
      console.log(error);
    }
  };

  const buscaMensagens = useCallback(async () => {
    try {
      console.log("busca mensagem cliente -->:", cliente.cod_cliente);
      let parametros = {
        rota: "/eadchat/all",
        parametros: `token=${user.token}`,
        showNotification: false,
        showLogError: true,
      };
      const response = (await getData(parametros)) as any;
      setMensagens(response.data.data);

      //setTimeout(() => buscaMensagens(),10000)
    } catch (error) {
      console.log(error);
    }
  }, [mensagens, cliente]);

  const COMPONENTEHEADER = () => {
    return (
      <PageHeader
        backgroundTransparent={false}
        headerLeft={
          <TouchableOpacity
            onPress={() => {
              //props.navigation.goBack();
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
        titulo={"Mensagem"}
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

  const COMPONENTEAVATAROLD = (props) => {
    return (
      <View style={[Styles.balaoHeaderContent]}>
        {props.array.cod_usuario_remetente == user.cod_usuario ? (
          //{props.array.flg_remetente ? (
          <>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <CustomText
                style={{
                  color: CustomDefaultTheme.colors.branco,
                  marginLeft: "20%",
                }}
              >
                {trataDataComHora(props.array.data)}
              </CustomText>
            </View>
            <View
              style={{
                //backgroundColor: '#FF0',
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CustomText style={{ right: 10 }}>{props.user.nome}</CustomText>
              {user.url_avatar ? (
                <Avatar.Image
                  source={{ uri: props.user.url_avatar }}
                  size={60}
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
                //backgroundColor: '#FF0',
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {false ? (
                <Avatar.Image
                  source={{ uri: props.user.url_avatar }}
                  size={60}
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
              <CustomText style={{ left: 10 }}>{cliente.nome}</CustomText>
            </View>
            <View
              style={{
                //backgroundColor: '#90F',
                flexDirection: "row",
              }}
            >
              <CustomText
                style={{
                  color: CustomDefaultTheme.colors.branco,
                  marginLeft: "20%",
                }}
              >
                {trataDataComHora(props.array.data)}
              </CustomText>
            </View>
          </>
        )}
      </View>
    );
  };

  const COMPONENTEAVATARBASE = (props) => {
    return (
      <View style={[Styles.balaoHeaderContent]}>
        {props.array.cod_usuario_remetente == user.cod_usuario ? (
          //{props.array.flg_remetente ? (
          <>
            <View
              style={{
                //backgroundColor: '#FF0',
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CustomText style={{ right: 10 }}>{props.user.nome}</CustomText>
              {user.url_avatar ? (
                <Avatar.Image
                  source={{ uri: props.user.url_avatar }}
                  size={60}
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
                //backgroundColor: '#FF0',
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {false ? (
                <Avatar.Image
                  source={{ uri: props.user.url_avatar }}
                  size={60}
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
              <CustomText style={{ left: 10 }}>{cliente.nome}</CustomText>
            </View>
          </>
        )}
      </View>
    );
  };

  const COMPONENTEAVATAR = (props) => {
    //console.log(props.url, "array <<-----");
    return (
      <>
        {props.url ? (
          <Avatar.Image
            style={{
              marginTop: 0,
              backgroundColor: "#000",
              //borderWidth: 1,
              borderColor: "#FFF",
              top: -29,
              position: "absolute",
              left: 5,
            }}
            source={{ uri: props.url }}
            size={45}
            //style={{ marginTop: 100 }}
          />
        ) : (
          <Avatar.Icon
            icon={() => <FontAwesome5 name="user-alt" size={30} color="#FFF" />}
            size={45}
            style={{
              marginTop: 0,
              backgroundColor: "#000",
              borderWidth: 1,
              borderColor: "#FFF",
              top: -29,
              position: "absolute",
              right: 5,
            }}
          />
        )}
      </>
    );
  };

  const COMPONENTERODAPE = (props) => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          marginTop: 5
        }}
      >
        <CustomText textType="montserratBold" style={{color: CustomDefaultTheme.colors.text}}>{props.nome}</CustomText>
        <CustomText
          textType="montserratLight"
          style={{ left: 10, fontSize: 10 }}
        >
          Escreveu em {trataDataComHora(props.data)}
        </CustomText>
      </View>
    );
  };

  const COMPONENTEMSGREMETENTE = (props) => {
    //return <></>;

    return (
      <>
        <View style={[Styles.balaoContent]}>
          <View
            style={[
              Styles.sombra,
              Styles.balao,
              props.array.cod_usuario_remetente == user.cod_usuario
                ? Styles.remetente
                : Styles.sender,
              { flexDirection: "row", width: "100%" },
            ]}
          >
            {props.array.cod_usuario_remetente == user.cod_usuario && (
              <View
                style={[Styles.avatarBloco]}
              >
                <COMPONENTEAVATAR url={user.url_avatar} />
              </View>
            )}

            <View
              style={{
                //backgroundColor: '#FF0',
                width: "83%",
                //justifyContent: 'center'
              }}
            >
              <CustomText
                textType="montserratLight"
                style={{
                  color: props.array.cod_usuario_remetente == user.cod_usuario
                  ? CustomDefaultTheme.colors.text : CustomDefaultTheme.colors.branco,
                  //backgroundColor: "#FF0",
                  //maxWidth: "100%",
                }}
              >
                {props.array.mensagem}
              </CustomText>

              {props.array.cod_usuario_remetente == user.cod_usuario ? (
                <COMPONENTERODAPE
                  nome={props.user.nome}
                  data={props.array.data}
                />
              ) : (
                <COMPONENTERODAPE nome={cliente.nome} data={props.array.data} />
              )}
            </View>

            {props.array.cod_usuario_remetente != user.cod_usuario && (
              <View
                style={[Styles.avatarBloco]}
              >
                <COMPONENTEAVATAR url={undefined} />
              </View>
            )}
          </View>
        </View>
      </>
    );
  };

  const COMPONENTEMSGMEMO = useMemo(() => {
    return (
      <>
        {mensagens.mensagens != undefined &&
          mensagens.mensagens.map((_: any, index) => {
            //console.log(_, 'teste victor -->>',mensagens)
            return (
              <View 
                key={_.cod_ead_chat}
              >
                <View style={{height: 20}} />
                <COMPONENTEMSGREMETENTE
                  array={_}
                  user={user}
                />
              </View>
            );
          })}
      </>
    );
  }, [mensagens]);

  // tracker

  const [tracker, setTracker] = useState(true);
  React.useEffect(() => {
    const timeoutID = window.setTimeout(() => {
      setTracker(!tracker);
      if (isFocused) {
        buscaMensagens();
      }
    }, TEMPOWATHING * 1000);

    return () => window.clearTimeout(timeoutID);
  }, [tracker, isFocused]);

  React.useEffect(() => {
    if (isFocused) {
      buscaMensagens();
    }
  }, [isFocused]);

  return (
    <>
      <View style={[StylesBoletim.headerContent]}>
        <COMPONENTEHEADER />
      </View>

      <View style={[Styles.textInputContent]}>
        <View
          style={{
            width: "85%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "100%",
            }}
          >
            <CustomText
              textType="montserratBold"
              style={{
                fontSize: 15,
              }}
            >
              Qual é a sua dúvida?
            </CustomText>
          </View>

          <View
            style={{
              marginTop: 10,
              width: "100%",
            }}
          >
            <Form ref={formRef} onSubmit={adicionarNovaMensagem}>
              <InputSecundarioMensagem
                multiline
                autoCapitalize="none"
                name="mensagem"
                icon="message-square"
                placeholder="Digite sua dúvida aqui..."
                returnKeyType="next"
                onSubmitEditing={() => mensagemInputRef.current?.focus()}
              />
              <Button
                theme={CustomDefaultTheme}
                style={{
                  marginTop: -2,
                  backgroundColor: CustomDefaultTheme.colors.primaryButton,
                  width: "100%",
                  borderRadius: 10,
                }}
                uppercase={false}
                onPress={() => formRef.current?.submitForm()}
              >
                <CustomText textType="montserratBold" style={Styles.texto}>
                  Enviar
                </CustomText>
              </Button>
            </Form>
          </View>
        </View>
      </View>

      <ScrollView
        scrollEventThrottle={200}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        style={{
          paddingTop: 20,
          flex: 1,
          padding: "5%",
        }}
      >
        {COMPONENTEMSGMEMO}

        <View style={{ height: 100 }} />
      </ScrollView>
    </>
  );
};

export default MensagemPage;

