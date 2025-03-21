import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSharedValue } from "react-native-reanimated";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ActivityIndicator, Button } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import * as Yup from "yup";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";

//Configuracoes
import Styles from "./Styles";
import {
  CustomDarkTheme,
  CustomDefaultTheme,
} from "../../configuracoes/styles/Theme";
import getValidationErrors from "../../configuracoes/utils/getValidationErros";

//Componentes
import Header from "../../componentes/header";
import CustomText from "../../componentes/componentes/customText";
import InputTextPaper from "../../componentes/InputTextPaper";
import { EMPRESA } from "../../configuracoes/utils/constants/empresa";
import { postData } from "../../configuracoes/services/request";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { AlertNotfier } from "../../configuracoes/services/funcoes";

interface MensagemFormData {
  nome: string;
  assunto: string;
  mensagem: string;
}

const FaleConoscoPage: React.FC<any> = (props) => {
  const navigation = useNavigation() as any;
  const isFocused = useIsFocused();
  const scrollY = useSharedValue(0);
  // formulario informacões
  const formRef = useRef<FormHandles>(null);
  const nomeInputRef = useRef<any>(null);
  const assuntoInputRef = useRef<TextInput>(null);
  const mensagemInputRef = useRef<TextInput>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleForm = useCallback(
    async (data: MensagemFormData) => {
      Keyboard.dismiss();
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          nome: Yup.string().required("Nome obrigatório"),
          assunto: Yup.string().required("Assunto obrigatorio"),
          mensagem: Yup.string()
            .min(10)
            .required(
              "Mensagem obrigatório e deve conter mais de 20 caracteres!"
            ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        let parametros = {
          rota: "/cliente/sendgenericmessage",
          parametros: {
            apikey_cliente: EMPRESA.token_cliente,
            nome: data.nome,
            assunto: data.assunto,
            mensagem: data.mensagem,
          },
          showNotification: false,
          showLogError: true,
        };

        const response = (await postData(parametros)) as any;

        if (response.error) {
          AlertNotfier({ tipo: "error", msg: response.response.msg });
        }

        AlertNotfier({ tipo: "success", msg: response.data.data.msg });
        formRef.current.reset();
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          let msg = "";
          error.inner.forEach((inner) => (msg += inner.message + "\n"));

          formRef.current?.setErrors(errors);
          AlertNotfier({ tipo: "error", msg: msg });
          return;
        }
      }
    },
    [navigation]
  );

  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardOpen(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleContainerPress = () => { //alert('fora')
    //console.log("Container press detected");
    dismissKeyboard();
  };

  return (
    <>
      <Header
        style={{ backgroundColor: CustomDefaultTheme.colors.background }}
        headerLeft={
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}
          >
            <FontAwesome name="angle-left" size={27} color={CustomDefaultTheme.colors.branco} />
          </TouchableOpacity>
        }
        titulo={"Envie sua Denúncia"}
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
                width: 26
              }}
            />
            <View
              style={{
                right: 10,
                width: 26
              }}
            />
          </View>
        }
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={Styles.container}
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback style={{flex: 1}} onPress={handleContainerPress}>
          <View>
            {!isLoading ? (
              <View
                style={[
                  {
                    marginTop: 10,
                    padding: wp("5"),
                    marginBottom: isKeyboardOpen ? wp("10") : 0,
                  },
                ]}
              >
                <View
                  style={{
                    display: isKeyboardOpen ? "none" : "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Entypo
                    name="megaphone"
                    size={70}
                    color={CustomDefaultTheme.colors.textFundoEscuro}
                  />
                  <CustomText
                    textType="bold"
                    style={{ fontSize: 20, maxWidth: wp("30"), marginLeft: 20 }}
                  >
                    ENVIE SUA DENÚNCIA
                  </CustomText>
                </View>
                <Form
                  style={{ marginTop: isKeyboardOpen ? 100 : 20 }}
                  ref={formRef}
                  onSubmit={handleForm}
                >
                  <InputTextPaper
                    style={[Styles.textoInput]}
                    ref={nomeInputRef}
                    mode="outlined"
                    name="nome"
                    label={"Nome"}
                    placeholder="Nome"
                  />
                  <InputTextPaper
                    style={[Styles.textoInput]}
                    ref={assuntoInputRef}
                    mode="outlined"
                    name="assunto"
                    label={"Assunto"}
                    placeholder="Assunto"
                  />

                  <InputTextPaper
                    ref={mensagemInputRef}
                    style={[Styles.textoInput, { height: wp("30") }]}
                    textStyle={{
                      height: wp("30"),
                    }}
                    mode="outlined"
                    multiline
                    label={<CustomText textType="light"> Mensagem</CustomText>}
                    right={<CustomText textType="light"> Mensagem</CustomText>}
                    theme={CustomDarkTheme}
                    name="mensagem"
                  />

                  <Button
                    style={{
                      marginTop: 10,
                    }}
                    contentStyle={{ backgroundColor: "#FFF" }}
                    mode="contained"
                    onPress={() => formRef.current?.submitForm()}
                  >
                    <CustomText
                      style={{ color: CustomDefaultTheme.colors.preto }}
                    >
                      Enviar
                    </CustomText>
                  </Button>
                </Form>
              </View>
            ) : (
              <ActivityIndicator
                animating={true}
                color={CustomDefaultTheme.colors.bgcarrossel}
                size={wp("30%")}
                style={{ top: hp("30%") }}
              />
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default FaleConoscoPage;
