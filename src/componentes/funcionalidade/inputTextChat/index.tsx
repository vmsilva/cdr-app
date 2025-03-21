import React, { useCallback, useRef, useState } from "react";
import {
  View,
  ViewStyle,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Platform,
} from "react-native";
//import { TextInput } from "react-native-paper";
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";

import Sytles from "./styles";
import Input from "../../Input";

import styles from "./styles";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";
import { FontAwesome } from "@expo/vector-icons";
import { useAuth } from "../../../configuracoes/hooks/auth";
import { getData, postData } from "../../../configuracoes/services/request";

type InputTextChatProps = {
  style?: ViewStyle | ViewStyle[];
  cod_video: any;
  avatar: any;
  mensagensCarrega: any;
};

const InputTextChat: React.FC<InputTextChatProps> = ({
  style,
  cod_video,
  avatar,
  mensagensCarrega,
}) => {
  const { user } = useAuth();
  const textInputChat = useRef<TextInput>(null);
  const formRef = useRef<FormHandles>(null);
  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;
  const [mensagem, onChangeMensagem] = React.useState("");
  const [keyBoardIsOpen, setKeyBoardIsOpen] = useState<boolean>(false);

  const buscaMensagens = useCallback(async () => {
    try {
      let parametros = {
        rota: `/salas/chat/${cod_video}`,
        parametros: `token=${user.token}`,
        showNotification: false,
        showLogError: true,
      };

      const response = (await getData(parametros)) as any;

      mensagensCarrega(response.data.data);
    } catch (error) {
      console.log("carrega mensagens", error);
    }
  }, []);

  const handleEnviaMensagem = useCallback(async () => {
    try {
      console.log(mensagem);
      if (mensagem == "") {
        return;
      }

      let parametros = {
        rota: `/salas/sendchatmsg/${cod_video}`,
        parametros: {
          token: user.token,
          msg: mensagem,
        },
        showNotification: false,
        showLogError: true,
      };

      onChangeMensagem("");

      const response = (await postData(parametros)) as any;
      mensagensCarrega({
        a:
          "https://cdnc.goveduca.com.br/storage/avatar/1280/2023-11-21_12-06-02_yN86BZyw.jpg",
        i: `victor${Math.random()}`,
        m: `teste victor 222222 ${mensagem}`,
        n: "R09WJTIwRURVQ0E=",
        p: "10",
        t: "17h56",
        u: "263402",
      });
    } catch (error) {
      console.log(error);
    }
  }, [mensagem]);

  const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () => {
    //console.log("Keyboard is open");
    setKeyBoardIsOpen(true);
  });
  const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
    //console.log("Keyboard is closed");
    setKeyBoardIsOpen(false);
  });

  return (
    <>
      <View
        style={[
          Sytles.container,
          passedStyles,
          { width: "100%" },
          //{ width: width, height: height, zIndex: 99 },
        ]}
      >
        <View style={[styles.inputButtonsView]}>
          <Image
            style={{
              borderRadius: 99,
              width: 40,
              height: 40,
            }}
            source={{ uri: avatar }}
          />
        </View>
        <View
          style={{
            width: "70%",
            backgroundColor: CustomDefaultTheme.colors.backgroundInputBusca,
          }}
        >
          <Form ref={formRef} onSubmit={handleEnviaMensagem}>
            <TextInput
              blurOnSubmit
              onChangeText={onChangeMensagem}
              placeholder="Escreva mensagem...."
              placeholderTextColor={CustomDefaultTheme.colors.textInputChatAoVivo}
              ref={textInputChat}
              returnKeyType={"send"}
              style={{
                height: "100%",
                borderWidth: 0.3,
                borderColor: CustomDefaultTheme.colors.textInputChatAoVivo,
                color: CustomDefaultTheme.colors.textInputChatAoVivo,
                paddingHorizontal: 10,
              }}
              value={mensagem}
            />
          </Form>
        </View>
        <View style={[styles.inputButtonsView]}>
          <TouchableOpacity
            style={{
              borderRadius: 99,
              backgroundColor: CustomDefaultTheme.colors.buttonPrimary,
              width: 40,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handleEnviaMensagem}
          >
            <FontAwesome
              name="send"
              size={24}
              color={CustomDefaultTheme.colors.text}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          backgroundColor: CustomDefaultTheme.colors.bottomTab,
          height: 20,
          display: keyBoardIsOpen  ? "none" : Platform.OS == "android" ? "none" : "flex",
          //top: -1
        }}
      />
    </>
  );
};

export default InputTextChat;
