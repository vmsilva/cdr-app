import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
  useContext,
} from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Keyboard,
  Linking,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import FastImage from "react-native-fast-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as Yup from "yup";
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";
import { useNavigation } from "@react-navigation/native";
import getValidationErrors from "../../../configuracoes/utils/getValidationErros";

// Config
import Styles, { Container } from "./styles";
import { EMPRESA } from "../../../configuracoes/utils/constants/empresa";
import { useAuth } from "../../../configuracoes/hooks/auth";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

// Components
import PagePoliticaPrivacidade from "../../../componentes/politicaPrivacidade";
import VersoesApp from "../../../componentes/versaoApp";
import Loading from "../../../componentes/funcionalidade/Loading";

// Imagens
import LOGOAUTH from "../../../assets/logoAuth.png";
import {
  AlertNotfier,
  containsHtmlTags,
} from "../../../configuracoes/utils/utils";
import CustomText from "../../../componentes/componentes/customText";
import LinearGradient from "react-native-linear-gradient";
import GenericoRedesSociais from "../../../componentes/acesso/genericoRedesSociais";
import { UtilContext } from "../../../configuracoes/contexts/UtilContext";
import InputSecundario from "../../../componentes/InputSecundario";

interface SignInFormData {
  email: string;
  senha: string;
}

interface ResetPasswordFormData {
  email: string;
}

export const STYLESFORM = {
  width: wp('100%'),
  paddingHorizontal: '12%'
} as any;

const Login: React.FC<any> = (props) => {
  const {
    signInPlataforma,
    signInPlataformaSingle,
    signInPlataformaSingleCasaFolha,
  } = useAuth();
  const {
    FLG_BOTOES_REDES_SOCIAIS,
    FLG_BOTAO_ASSINE_AGORA,
    LINK_REDE_SOCIAL_LOGIN,
  } = useContext(UtilContext);
  const formRef = useRef<FormHandles>(null);
  const senhaInputRef = useRef<TextInput>(null);
  const { userInfo = {} } = props.route.params ?? {};
  const navigation = useNavigation() as any;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {};
  }, [loading]);

  useEffect(() => {
    console.log(LINK_REDE_SOCIAL_LOGIN);
  }, [LINK_REDE_SOCIAL_LOGIN]);

  useEffect(() => {
    if (userInfo.k1 != undefined) {
      handleSignInRedeSocial();
    }
    return () => {};
  }, [userInfo]);

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      Keyboard.dismiss();

      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email("Digite um e-mail válido")
            .required("Email obrigatório"),
          senha: Yup.string().required("Senha obrigatória"),
        });

        await schema.validate(data, { abortEarly: false });

        setLoading(true);

        const resp = (await signInPlataformaSingle({
          cod_cliente: EMPRESA.cod_cliente,
          email: data.email,
          senha: data.senha,
        })) as any;

        if (resp.data.error !== undefined) {
          if (containsHtmlTags(resp.data.error)) {
            navigation.navigate("errorPageAuth", { erro: resp.data.error });
          } else {
            AlertNotfier({ tipo: "error", msg: resp.data.error });
          }
          setLoading(false);
          return;
        }
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);

          Alert.alert("Atenção", "Dados de e-mail e senhas são obrigatórios.", [
            { text: "Fechar", onPress: () => console.log("OK Pressed") },
          ]);
          /*AlertNotfier({
            tipo: "error",
            msg: `${errors.email} ${errors.senha}`,
          });*/

          return;
        }
        AlertNotfier({ tipo: "error", msg: error.response.data.error });
      } finally {
        setLoading(false);
      }
    },
    [signInPlataformaSingle]
  );

  //casafolha
  const handleSignInRedeSocial = useCallback(async () => {
    try {
      setLoading(true);
      const resp = (await signInPlataformaSingleCasaFolha({
        userInfo: userInfo,
      })) as any;

      console.log(resp.error, "error ->>> error");

      if (resp.error !== undefined) {
        if (containsHtmlTags(resp.error)) {
          setLoading(false);
          navigation.navigate("errorPageAuth", { erro: resp.error });
        } else {
          AlertNotfier({ tipo: "error", msg: resp.error });
        }
        setLoading(false);
        return;
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [signInPlataforma, userInfo]);

  // Efeito para monitorar mudanças no estado de loading
  useEffect(() => {
    console.log("Loading state changed:", loading);
  }, [loading]);

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        enabled
      >
        <LinearGradient
          start={{
            x: 0,
            y: Platform.OS == "ios" ? 0.15 : 0,
          }}
          end={{
            x: 0,
            y: Platform.OS == "ios" ? 0.99 : 0.99,
          }}
          colors={[
            CustomDefaultTheme.colors.gradiente1,
            CustomDefaultTheme.colors.gradiente2,
            CustomDefaultTheme.colors.gradiente3,
          ]}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              //backgroundColor: '#FF0'
            }}
          >
            {/*<COMPONENTEHEADER /> */}
            <Container>
              <View style={Styles.logoView}>
                <FastImage
                  style={Styles.logo}
                  source={LOGOAUTH}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </View>

              <View
                style={[STYLESFORM]}
              >
                <Form ref={formRef} onSubmit={handleSignIn}>
                  <View
                    style={{
                      bottom: 10,
                      width: "100%",
                    }}
                  >
                    <CustomText
                      textType="montserratBold"
                      style={{
                        fontSize: 18,
                        color: CustomDefaultTheme.colors.labelInput,
                      }}
                    >
                      Entrar
                    </CustomText>
                  </View>
                  <InputSecundario
                    autoCorrect={false}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    name="email"
                    icon="mail"
                    placeholder="E-mail"
                    returnKeyType="next"
                    onSubmitEditing={() => senhaInputRef.current?.focus()}
                  />
                  <View style={{ height: 20 }} />
                  <InputSecundario
                    ref={senhaInputRef}
                    name="senha"
                    icon="lock"
                    placeholder="Senha"
                    textContentType="newPassword"
                    returnKeyType="send"
                    onSubmitEditing={() => formRef.current?.submitForm()}
                    secureTextEntry={true}
                  />
                  <View
                    style={{
                      top: 20,
                    }}
                  >
                    <Button
                      loading={loading}
                      disabled={loading}
                      style={{
                        backgroundColor:
                          CustomDefaultTheme.colors.buttonPrimary,
                        height: 50,
                        justifyContent: "center",
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: CustomDefaultTheme.colors.buttonPrimary,
                      }}
                      contentStyle={{
                        borderRadius: 10,
                        height: 50,
                        padding: 1,
                      }}
                      mode="contained"
                      onPress={() => formRef.current?.submitForm()}
                    >
                      <CustomText
                        textType="montserratBold"
                        style={{
                          color: CustomDefaultTheme.colors.branco,
                        }}
                      >
                        Entrar
                      </CustomText>
                    </Button>
                  </View>
                  <View
                    style={{
                      top: 20,
                      display: "none",
                    }}
                  >
                    <Button
                      loading={loading}
                      disabled={loading}
                      style={{
                        backgroundColor:
                          CustomDefaultTheme.colors.buttonPrimary,
                        height: 50,
                        justifyContent: "center",
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: CustomDefaultTheme.colors.buttonPrimary,
                      }}
                      contentStyle={{
                        borderRadius: 10,
                        height: 50,
                        padding: 1,
                      }}
                      mode="contained"
                      onPress={() =>
                        navigation.navigate("WebSeeAuth", {
                          url:
                            "https://educaejug.tjgo.jus.br/custom/special-login/ejug/",
                          titulo: "login",
                        })
                      }
                    >
                      <CustomText
                        textType="montserratBold"
                        style={{
                          color: CustomDefaultTheme.colors.branco,
                        }}
                      >
                        Entrar webview
                      </CustomText>
                    </Button>
                  </View>
                </Form>
                <Button
                  theme={CustomDefaultTheme}
                  style={{ marginTop: 15 }}
                  uppercase={false}
                  //onPress={() => sheetRef.current.snapTo(1)}
                  onPress={() => {
                    /*Linking.openURL(
                        "https://login.folha.com.br/send_password?done=https%3A%2F%2Fpaywall.folha.uol.com.br%2Ffolha%2Fretorno%3Fdone%3Dhttps%253A%252F%252Fwww.folha.uol.com.br%252F&service=portal"
                      )*/
                    navigation.navigate("forgotAuth");
                  }}
                >
                  <CustomText textType="montserratMedium" style={Styles.texto}>
                    Esqueceu sua senha?
                  </CustomText>
                </Button>

                <Button
                  style={{
                    display: "none",
                    backgroundColor: "transparent",
                    marginTop: 10,
                  }}
                  uppercase={false}
                  onPress={() => navigation.navigate("cadastrarAuth")}
                >
                  <CustomText style={Styles.texto}>
                    Ainda não tem conta? Cadastre-se
                  </CustomText>
                </Button>
              </View>

              <View
                style={{
                  width: wp("100"),
                  paddingHorizontal: "7.5%",
                  paddingVertical: 2.8,
                  display: FLG_BOTOES_REDES_SOCIAIS == "1" ? "flex" : "none",
                }}
              >
                <GenericoRedesSociais
                  redesocial="facebook"
                  link={LINK_REDE_SOCIAL_LOGIN.facebook}
                  //link={'https://test2.casafolha.folha.com.br/custom/special-login/casafolha/?rede=facebook'}
                />
                <GenericoRedesSociais
                  redesocial="google"
                  link={LINK_REDE_SOCIAL_LOGIN.google}
                />

                <GenericoRedesSociais
                  redesocial="apple"
                  link={LINK_REDE_SOCIAL_LOGIN.apple}
                  //link="https://test2.casafolha.folha.com.br/custom/special-login/casafolha/?rede=apple"
                />
              </View>

              <View
                style={{
                  top: 100,
                  width: wp("100"),
                  paddingHorizontal: "7.5%",
                  paddingVertical: 2.8,
                  display: "none",
                  //display: FLG_BOTAO_ASSINE_AGORA != "" ? "flex" : "none",
                }}
              >
                <CustomText
                  textType="montserratBold"
                  style={{
                    fontSize: 12,
                    textAlign: "center",
                    bottom: 10,
                    //letterSpacing: 5,
                  }}
                >
                  Ainda não tem acesso?
                </CustomText>
                <Button
                  onPress={() =>
                    FLG_BOTAO_ASSINE_AGORA != ""
                      ? Linking.openURL(FLG_BOTAO_ASSINE_AGORA)
                      : navigation.navigate("cadastrarAuth")
                  }
                  theme={CustomDefaultTheme}
                  style={{
                    backgroundColor: CustomDefaultTheme.colors.primaryButton,
                    height: 50,
                    justifyContent: "center",
                    borderRadius: 10,
                  }}
                  contentStyle={{
                    borderRadius: 10,
                    height: 50,
                    padding: 1,
                  }}
                  mode="contained"
                  uppercase={false}
                >
                  <CustomText textType="montserratBold" style={Styles.texto}>
                    Cadastre-se
                  </CustomText>
                </Button>
              </View>
            </Container>
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingView>
      <View
        style={{
          //backgroundColor: '#FF0',
          paddingHorizontal: 10,
          width: "100%",
          bottom: 40,
          //flexDirection: 'row'
          alignItems: "center",
        }}
      >
        <PagePoliticaPrivacidade url={undefined} />
        <View style={{ height: 5 }} />
        <VersoesApp style={{ bottom: 40 }} />
      </View>

      {loading && <Loading />}
    </>
  );
};

export default Login;
