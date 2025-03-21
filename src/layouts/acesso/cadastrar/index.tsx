import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
  useMemo,
} from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import {
  Button,
  Avatar,
  ActivityIndicator,
  Checkbox,
} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as Yup from "yup";
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";
import LinearGradient from "react-native-linear-gradient";
import {
  SimpleLineIcons as SIcon,
  FontAwesome5,
  FontAwesome,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import BottomSheet from "@gorhom/bottom-sheet";
import getValidationErrors from "../../../configuracoes/utils/getValidationErros";

// Config
import api from "../../../configuracoes/services/api";
import Styles, {
  AvatarContainer,
  Container,
  EditAvatarButton,
  EditAvatarIcon,
} from "./styles";
import { UtilContext } from "../../../configuracoes/contexts/UtilContext";
import { EMPRESA } from "../../../configuracoes/utils/constants/empresa";
import { useAuth } from "../../../configuracoes/hooks/auth";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

// Components
import Input from "../../../componentes/Input";
import PagePoliticaPrivacidade from "../../../componentes/politicaPrivacidade";

// Imagens
import LOGO from "../../../assets/logoAuth.png";
import { AlertNotfier } from "../../../configuracoes/utils/utils";
import CustomText from "../../../componentes/componentes/customText";
import { postDataUpload } from "../../../configuracoes/services/request";
import InputSecundario from "../../../componentes/InputSecundario";

interface cadastroFormData {
  nome: string;
  email: string;
  senha: string;
  cargo: string;
  contato: string;
}

const Cadastrar: React.FC = (props) => {
  const formRef = useRef<FormHandles>(null);
  const nomeInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const senhaInputRef = useRef<TextInput>(null);
  const contatoInputRef = useRef<TextInput>(null);
  const cargoInputRef = useRef<TextInput>(null);
  const navigation = useNavigation() as any;
  const [loading, setLoading] = useState(false);
  const [resettingPassword, setResettingPassword] = useState(false);
  const [file_, setFile_] = useState<FileList | null>();
  const [userAvatar, setUserAvatar] = React.useState("");
  const [url_avatar, setUrl_Avatar] = useState<any>("");
  const [isLoadingAvatar, setIsLoadingAvatar] = useState<boolean>(false);
  const [checkedPoliticas, setCheckedPoliticas] = React.useState(false);

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["1%", "40%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleShowCameraRoll = useCallback(async () => {
    setIsLoadingAvatar(true);

    try {
      let result = (await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
      })) as any;

      if (result.cancelled) {
        return;
      }

      setUserAvatar(result.assets[0].uri);

      let localUri = result.assets[0].uri;
      //console.log(result.assets[0]); return;

      let filename = localUri.split("/").pop();

      if (!filename) {
        throw new Error("Empty filename.");
      }

      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      let formData = new FormData();

      let photo = {
        uri: localUri,
        name: filename,
        type,
      } as any;

      setUrl_Avatar(photo.uri);
      setFile_(photo);
      setIsLoadingAvatar(false);

      //formRef.current?.submitForm()
    } catch (error) {
      console.log(error);
      setIsLoadingAvatar(false);
    }
  }, [isLoadingAvatar]);

  const hanldeCadastrar = useCallback(
    async (data: cadastroFormData, avatarFile: any) => {
      try {

        if(!checkedPoliticas){
          alert('Você precisa aceitar os termos e politica de privacidade')
          return
        }

        const schema = Yup.object().shape({
          nome: Yup.string().required("Nome obrigatório"),
          email: Yup.string()
            .email("Digite um e-mail válido")
            .required("Email obrigatório"),
          senha: Yup.string().required("Senha obrigatório"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });


        const _FORMDATA = new FormData();
        _FORMDATA.append("token", `${EMPRESA.token_cliente}`);
        _FORMDATA.append("nome", data.nome);
        _FORMDATA.append("email", data.email);
        //_FORMDATA.append("cargo", data.cargo);
        _FORMDATA.append("contato", data.contato);
        _FORMDATA.append("senha1", data.senha);
        _FORMDATA.append("senha2", data.senha);
        _FORMDATA.append("avatar", avatarFile);

        let parametros = {
          rota: "acessos/cadastro",
          parametros: _FORMDATA,
          showNotification: false,
          showLogError: true,
        };

        const response = (await postDataUpload(parametros)) as any;

        console.log(response);

        if (response.data?.error) {
          AlertNotfier({
            tipo: "error",
            msg: response.data.error,
          });
          return false;
        }

        AlertNotfier({
          tipo: "success",
          msg: "Cadastrado com Sucesso!",
        });

        setUserAvatar("");
        formRef.current.reset();
        navigation.goBack();
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          let msg = "";
          error.inner.forEach((inner) => (msg += inner.message + "\n"));

          console.log(errors);
          AlertNotfier({ tipo: "error", msg: msg });

          return;
        }

        AlertNotfier({ tipo: "error", msg: error.response.data.error });
      } finally {
        setResettingPassword(false);
      }
    },
    [file_, checkedPoliticas]
  );

  const submitFormWithFile = (file) => {
    const data = formRef.current?.getData() as any; // Obtenha os dados atuais do formulário
    if (data) {
      hanldeCadastrar(data, file); // Chame a função com os dados do formulário e o arquivo
    }
  };

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, [loading]);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: CustomDefaultTheme.colors.background }}
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
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: 40,
              height: 40,
              marginTop: 50,
              marginLeft: 20,
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

          <Container>
            <View style={Styles.logoView}>
              <AvatarContainer>
                {isLoadingAvatar ? (
                  <ActivityIndicator size={120} />
                ) : (
                  <>
                    {userAvatar ? (
                      <Avatar.Image
                        source={{ uri: userAvatar }}
                        size={150}
                        style={{ marginTop: 10 }}
                      />
                    ) : (
                      <Avatar.Icon
                        icon={() => (
                          <FontAwesome5
                            name="user-alt"
                            size={wp("20%")}
                            color={CustomDefaultTheme.colors.iconsPrimaryColor}
                          />
                        )}
                        size={150}
                        style={{
                          backgroundColor: "transparent",
                          borderWidth: 1,
                          borderColor:
                            CustomDefaultTheme.colors.iconsPrimaryColor,
                        }}
                      />
                    )}
                  </>
                )}
                <EditAvatarButton onPress={handleShowCameraRoll}>
                  <EditAvatarIcon />
                </EditAvatarButton>
              </AvatarContainer>
            </View>

            <View
              style={{
                bottom: 10,
                //borderBottomWidth: 0.5,
                borderBottomColor: CustomDefaultTheme.colors.primary,
                width: wp("85"),
                justifyContent: "center",
              }}
            >
              <CustomText
                textType="bold"
                style={{
                  textAlign: "center",
                  //color: CustomDefaultTheme.colors.cinza,
                  bottom: 5,
                  letterSpacing: 3,
                }}
              >
                Nova Conta
              </CustomText>
            </View>

            {
              <>
                <Form ref={formRef} onSubmit={hanldeCadastrar}>
                  <InputSecundario
                    label={'Nome'}
                    ref={nomeInputRef}
                    autoCapitalize="none"
                    keyboardType="words"
                    name="nome"
                    icon="edit-2"
                    placeholder="Nome"
                    returnKeyType="send"
                    onSubmitEditing={() => emailInputRef.current?.()}
                  />
                  <InputSecundario
                    label={'E-mail'}
                    ref={emailInputRef}
                    autoCapitalize="none"
                    keyboardType="words"
                    name="email"
                    icon="mail"
                    placeholder="E-mail"
                    returnKeyType="send"
                    onSubmitEditing={() => cargoInputRef.current?.()}
                  />
                   <InputSecundario
                    mask="phone"
                    label={'Contato'}
                    ref={contatoInputRef}
                    autoCapitalize="none"
                    keyboardType="numeric"
                    name="contato"
                    icon="phone"
                    placeholder="Contato"
                    onSubmitEditing={() => senhaInputRef.submitForm?.()}
                  />
                  {/* <InputSecundario
                    label={'Cargo na Secretaria de Saúde'}
                    ref={cargoInputRef}
                    autoCapitalize="none"
                    keyboardType="words"
                    name="cargo"
                    icon="user"
                    placeholder="Cargo na Secretaria de Saúde"
                    returnKeyType="send"
                    onSubmitEditing={() => senhaInputRef.submitForm?.()}
                  />*/}
                  <InputSecundario
                    label={'Senha'}
                    ref={senhaInputRef}
                    name="senha"
                    icon="lock"
                    placeholder="Senha"
                    secureTextEntry
                    textContentType="newPassword"
                    returnKeyType="send"
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
                    <View style={{ flexDirection: "row" }}>
                      <Checkbox.Android
                        tintColors={{ true: "#F15927", false: "black" }}
                        theme={CustomDefaultTheme}
                        status={checkedPoliticas ? "checked" : "unchecked"}
                        //style={{top:1}}
                        onPress={() => {
                          setCheckedPoliticas(!checkedPoliticas);
                        }}
                        color={CustomDefaultTheme.colors.cinzaEscuro}
                        uncheckedColor={CustomDefaultTheme.colors.cinzaEscuro}
                      />

                      <TouchableOpacity
                        onPress={() => setCheckedPoliticas(!checkedPoliticas)}
                      >
                        <CustomText
                          style={{
                            color: CustomDefaultTheme.colors.cinzaEscuro,
                            top: hp("1%"),
                          }}
                        >
                          Aceito os termos e politica
                        </CustomText>
                      </TouchableOpacity>
                    </View>
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
                    contentStyle={{ borderRadius: 30, height: 50, padding: 1 }}
                    mode="contained"
                    //onPress={() => formRef.current?.submitForm()}
                    onPress={() => submitFormWithFile(file_)}
                    //uppercase={false}
                  >
                    <CustomText
                      style={{
                        color: CustomDefaultTheme.colors.branco,
                      }}
                    >
                      Concluir Cadastro
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
              </>
            }
          </Container>
        </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingView>
    </>
  );
};

export default Cadastrar;
