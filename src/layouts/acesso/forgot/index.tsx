import React, { useCallback, useRef, useState, useMemo } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
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
import { SimpleLineIcons as SIcon, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import BottomSheet from "@gorhom/bottom-sheet";
import getValidationErrors from "../../../configuracoes/utils/getValidationErros";

// Config
import Styles, { Container } from "./styles";
import { useAuth } from "../../../configuracoes/hooks/auth";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

// Components
import Input from "../../../componentes/Input";
import PagePoliticaPrivacidade from "../../../componentes/politicaPrivacidade";

// Imagens
import LOGO from "../../../assets/logo.png";
import { AlertNotfier } from "../../../configuracoes/utils/utils";
import CustomText from "../../../componentes/componentes/customText";
import { postData } from "../../../configuracoes/services/request";
import Loading from "../../../componentes/funcionalidade/Loading";
import LinearGradient from "react-native-linear-gradient";
import { EMPRESA } from "../../../configuracoes/utils/constants";
import { STYLESFORM } from "../login";

interface ResetPasswordFormData {
  email: string;
}

const Forgot: React.FC = (props) => {
  const { signInPlataforma } = useAuth();
  const sheetRef = useRef<any>(null);
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const resetPasswordFormRef = useRef<FormHandles>(null);
  const navigation = useNavigation() as any;
  const [loading, setLoading] = useState(false);
  const [resettingPassword, setResettingPassword] = useState(false);

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["1%", "40%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  //useEffect(() => { return () => { setLoading(false); };  }, [loading]);

  const handleResetPassword = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        resetPasswordFormRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email("Digite um e-mail válido")
            .required("Email obrigatório"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        setLoading(true);
        setResettingPassword(true);

        //console.log(data)
        let parametros = {
          rota: `/acessos/recuperarsenha`,
          parametros: {
            email: data.email,
            cod_cliente: EMPRESA.EMPRESA.cod_cliente,
          },
          showNotification: false,
          showLogError: true,
          showLog: true,
        };

        const response = (await postData(parametros)) as any;
        setLoading(false);

        if (response.response != undefined) {
          AlertNotfier({
            tipo: "error",
            msg: JSON.parse(response.response).error,
          });
          return;
        }

        AlertNotfier({
          tipo: "success",
          msg:
            "Sucesso, um email para redefinir a senha foi enviado para sua caixa postal!",
        });
        formRef.current.reset();
        navigation.goBack();
      } catch (error) {
        setLoading(false);
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          console.log(errors);
          AlertNotfier({ tipo: "error", msg: errors.email });

          resetPasswordFormRef.current?.setErrors(errors);
          return;
        }

        AlertNotfier({ tipo: "error", msg: error.response.data.error });
      } finally {
        setResettingPassword(false);
      }
    },
    [loading]
  );

  return (
    <>
      <View style={{ height: hp("10%"), display: "none" }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            marginTop: hp("6%"),
            marginLeft: wp("7%"),
          }}
        >
          <FontAwesome5
            name="angle-left"
            size={hp("4.1%")}
            color={CustomDefaultTheme.colors.primary}
          />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "#FFF" }}
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
            CustomDefaultTheme.colors.gradiente2,
          ]}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              height: "100%",
            }}
          >
            <Container>
              <View style={Styles.logoView}>
                <FastImage
                  style={Styles.logo}
                  source={LOGO}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </View>
              <View
                style={{
                  bottom: 10,
                  borderBottomColor: CustomDefaultTheme.colors.primary,
                  width: wp("85"),
                  justifyContent: "center",
                }}
              >
                <CustomText
                  textType="bold"
                  style={{
                    textAlign: "center",
                    bottom: 5,
                    letterSpacing: 3,
                  }}
                >
                  INSIRA SEU EMAIL
                </CustomText>
              </View>
              <View style={[STYLESFORM]}>
                <Form ref={formRef} onSubmit={handleResetPassword}>
                  <Input
                    autoCapitalize="none"
                    keyboardType="email-address"
                    name="email"
                    icon="mail"
                    placeholder="E-mail"
                    returnKeyType="send"
                    onSubmitEditing={() =>
                      resetPasswordFormRef.current?.submitForm()
                    }
                  />
                  <View
                    style={{
                      marginTop: -5,
                      justifyContent: "center",
                      alignContent: "center",
                      flexDirection: "row",
                      marginBottom: 20,
                    }}
                  >
                    <CustomText style={Styles.texto}>
                      Um email de recuperação de senha será enviado
                    </CustomText>
                  </View>
                  <Button
                    loading={loading}
                    disabled={loading}
                    style={{
                      backgroundColor: CustomDefaultTheme.colors.buttonPrimary,
                      height: 50,
                      justifyContent: "center",
                      borderRadius: 10,
                    }}
                    contentStyle={{
                      borderRadius: 30,
                      height: 50,
                      padding: 1,
                    }}
                    mode="contained"
                    onPress={() => formRef.current?.submitForm()}
                  >
                    <CustomText
                      style={{
                        color: CustomDefaultTheme.colors.branco,
                      }}
                    >
                      Enviar
                    </CustomText>
                  </Button>
                </Form>
                <Button
                  theme={CustomDefaultTheme}
                  style={{ marginTop: -2 }}
                  uppercase={false}
                  //onPress={() => sheetRef.current.snapTo(1)}
                  onPress={() => navigation.navigate("loginAuth", {})}
                >
                  <CustomText style={Styles.texto}>
                    Voltar para Login!
                  </CustomText>
                </Button>
                <PagePoliticaPrivacidade />
              </View>
            </Container>
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingView>

      {loading && <Loading />}
    </>
  );
};

export default Forgot;
