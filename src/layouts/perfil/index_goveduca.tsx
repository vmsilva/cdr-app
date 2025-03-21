import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  useContext,
} from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Form } from "@unform/mobile";
import { AntDesign, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { FormHandles } from "@unform/core";
import { ActivityIndicator, Avatar, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as ImagePicker from "expo-image-picker";
import Animated from "react-native-reanimated";

// Config
import Styles, {
  Container,
  AvatarContainer,
  EditAvatarButton,
  EditAvatarIcon,
} from "./styles";
import api from "../../configuracoes/services/api";
import { useAuth } from "../../configuracoes/hooks/auth";
import { useIsFocused } from "@react-navigation/native";
import { CustomDefaultTheme } from "../../configuracoes/styles/Theme";

// Components
import PageHeader from "../../componentes/header";
import { postData, postDataUpload } from "../../configuracoes/services/request";
import CustomText from "../../componentes/componentes/customText";
import { AlertNotfier } from "../../configuracoes/utils/utils";
import Loading from "../../componentes/funcionalidade/Loading";
import AccordionGenerico from "../../componentes/body/accordionGenerico";
import InputTextPerfil from "../../componentes/funcionalidade/inputTextPerfil";
import OpenUrl from "../../componentes/body/openUrl";
import { UtilContext } from "../../configuracoes/contexts/UtilContext";

interface UpdateProfileFormData {
  nome: string;
  email: string;
  senha?: string;
  contato?: string;
}

const Profile: React.FC<any> = (props) => {
  const navigation = useNavigation() as any;
  const isFocused = useIsFocused();
  const { base } = useContext(UtilContext);
  const { user, updateUser, signOut } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const nomeInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const senhaInputRef = useRef<TextInput>(null);
  const contatoInputRef = useRef<TextInput>(null);
  const [loading, setLoading] = useState(false);
  const [file_, setFile_] = useState<FileList | null>();
  const [progresso, setProgresso] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userAvatar, setUserAvatar] = React.useState("");
  const [url_avatar, setUrl_Avatar] = useState<any>(
    user != undefined
      ? user.url_avatar != undefined
        ? user.url_avatar
        : ""
      : ""
  );
  const [isLoadingAvatar, setIsLoadingAvatar] = useState<boolean>(false);

  // Dialog Excluir
  const [visible, setVisible] = React.useState(false);
  const hideDialog = () => setVisible(false);

  const handleShowCameraRoll = useCallback(async () => {
    setIsLoadingAvatar(true);
    let result = (await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
    })) as any;

    if (result.cancelled) {
      return;
    }

    setUserAvatar(result.uri);

    try {
      let localUri = result.uri;

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
    } catch (error) {
      console.log(error);
      setIsLoadingAvatar(false);
    }
  }, [isLoadingAvatar]);

  const handleUpdateProfile = useCallback(
    async (data: UpdateProfileFormData) => {
      setIsLoading(true);
      try {
        let trataData = {
          token: user.token,
          nome: data.nome,
          email: data.email,
          senha1: data.senha,
          senha2: data.senha,
          json_contato: data.contato,
        } as any;

        const _FORMDATA = new FormData();
        //_FORMDATA.append("token", `${EMPRESA.EMPRESA.token_cliente}`);
        _FORMDATA.append("token", `${user.token}`);
        _FORMDATA.append("nome", data.nome);
        _FORMDATA.append("email", data.email);
        _FORMDATA.append("senha1", data.senha);
        _FORMDATA.append("senha2", data.senha);
        _FORMDATA.append("json_contato", data.contato);
        _FORMDATA.append("avatar", file_);

        let parametros = {
          rota: "acessos/minhaconta",
          parametros: _FORMDATA,
          showNotification: false,
          showLogError: true,
        };

        console.log(_FORMDATA);
        const response = (await postDataUpload(parametros)) as any;

        const meusdadosresposta = (await buscaMeusDados()) as any;

        const userNEW = {
          nome: meusdadosresposta.nome,
          cod_usuario: meusdadosresposta.cod_usuario,
          email: meusdadosresposta.email,
          token: user.token,
          departamentos: meusdadosresposta.departamentos,
          url_avatar: meusdadosresposta.url_avatar,
          contato: meusdadosresposta.json.contato,
        };

        await updateUser(userNEW);

        setIsLoading(false);
        AlertNotfier({
          tipo: "sucess",
          msg: "Meu Perfil Atualizado com sucesso.",
        });
      } catch (error) {
        AlertNotfier({
          tipo: "sucess",
          msg: `Erro ao atualizar status ${error.data}`,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [url_avatar, file_, isLoading]
  );

  const handleRemoveUser = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.post("me/excluir/", { token: user.token });

      setVisible(false);
      signOut();
      navigation.navigate("DashboardStack");
      setLoading(false);
    } catch (error) {
      AlertNotfier({
        tipo: "sucess",
        msg: `Erro ao excluir conta ${error.data}`,
      });
    } finally {
      setLoading(false);
    }
  }, [visible]);

  const buscaProgresso = async () => {
    console.log("busca progresso");
    setIsLoading(true);
    try {
      let parametros = {
        rota: "acessos/meuprogresso",
        parametros: {
          token: user.token,
        },
        showNotification: false,
        showLogError: true,
      };

      const resp = (await postData(parametros)) as any;

      setProgresso(resp.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const buscaMeusDados = async () => {
    try {
      let parametros = {
        rota: "acessos/me",
        parametros: {
          token: user.token,
        },
        showNotification: false,
        showLogError: true,
      };

      const resp = (await postData(parametros)) as any;

      return resp.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      buscaProgresso();
    }

    return () => {};
  }, [isFocused, user]);

  const COMPONENTEHEADER = () => {
    return (
      <PageHeader
        headerLeft={
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
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
                right: 10,
                marginTop: -5,
              }}
            ></View>
          </View>
        }
      />
    );
  };

  const SEGUNDOSPARAHORAS = (segundos: any) => {
    let calculo = (60 * (segundos / 3600)) as number;

    if (calculo > 60) {
      return `${parseFloat(calculo / 60).toFixed(1)} h assistidas`;
    } else {
      return `${parseInt(calculo)} m assistidos`;
    }

    //return (calculo * 60);

    //parseInt(progresso.segundos_assistidos / 3600)
  };

  //console.log((base.FLG_BOLETIM != undefined && base.FLG_BOLETIM) && true)

  return (
    <>
      <Animated.ScrollView
        scrollEventThrottle={200}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <COMPONENTEHEADER />
        <View style={[Styles.bannerContainer]}>
          <View style={[Styles.b2]}>
            <Container>
              <View style={[Styles.logoView]}>
                <AvatarContainer>
                  {isLoadingAvatar ? (
                    <ActivityIndicator size={120} color={"#FFF"} />
                  ) : (
                    <>
                      {url_avatar ? (
                        <Avatar.Image
                          source={{ uri: url_avatar }}
                          size={120}
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
                          size={120}
                          style={{
                            marginTop: 0,
                            backgroundColor: "transparent",
                            borderWidth: 1,
                            borderColor: "#FFF",
                          }}
                        />
                      )}
                    </>
                  )}
                  {true && (
                    <EditAvatarButton onPress={handleShowCameraRoll}>
                      <EditAvatarIcon />
                    </EditAvatarButton>
                  )}
                </AvatarContainer>
              </View>
              <View style={[Styles.progressBar]}>
                <CustomText
                  style={{ color: "#FFF", fontSize: 20, width: "100%" }}
                >
                  {user.nome}
                </CustomText>
                <View style={[Styles.iconStyle]}>
                  <View style={[Styles.iconStyleFilho, { width: "30%" }]}>
                    <AntDesign name="videocamera" size={20} color="#FFF" />
                    <CustomText style={[Styles.fontFilho]}>
                      {progresso.videos_assistidos != undefined &&
                        progresso.videos_assistidos.length}{" "}
                      Videos
                    </CustomText>
                  </View>
                  <View style={[Styles.iconStyleFilho, { width: "30%" }]}>
                    <AntDesign name="clockcircleo" size={20} color="#FFF" />
                    <CustomText style={[Styles.fontFilho]}>
                      {progresso.videos_assistidos != undefined &&
                        `${SEGUNDOSPARAHORAS(progresso.segundos_assistidos)} `}
                    </CustomText>
                  </View>
                </View>
              </View>
            </Container>
          </View>
        </View>
        <KeyboardAvoidingView>
          <Animated.View style={[Styles.linha, { marginTop: 10 }]}>
            <View
              style={{
                width: "100%",
              }}
            >
              <AccordionGenerico
                icone={"account"}
                background={CustomDefaultTheme.colors.cinza}
                isExpanded={true}
                titulo={"Minha Conta"}
                isFullScreen={false}
                children={
                  <>
                    <Form
                      ref={formRef}
                      onSubmit={handleUpdateProfile}
                      initialData={user}
                    >
                      <View style={[Styles.inputView]}>
                        <InputTextPerfil
                          label={"E-mail:"}
                          autoCorrect={false}
                          autoCapitalize="none"
                          keyboardType="words"
                          name="email"
                          icon="mail"
                          placeholder="E-mail"
                          returnKeyType="next"
                          onSubmitEditing={() => nomeInputRef.current?.focus()}
                          //value="seducplay@zoeplay.com.br"
                        />
                      </View>

                      <View style={[Styles.inputView]}>
                        <InputTextPerfil
                          label={"Nome:"}
                          autoCorrect={false}
                          autoCapitalize="none"
                          keyboardType="words"
                          name="nome"
                          icon="mail"
                          placeholder="Nome"
                          returnKeyType="next"
                          //onSubmitEditing={() => emailInputRef.current?.focus()}
                        />
                      </View>

                      <View style={[Styles.inputView]}>
                        <InputTextPerfil
                          secureTextEntry
                          label={"Senha:"}
                          autoCorrect={false}
                          autoCapitalize="none"
                          keyboardType="email-address"
                          name="senha"
                          icon="password"
                          placeholder="Senha"
                          returnKeyType="next"
                          onSubmitEditing={() =>
                            contatoInputRef.current?.focus()
                          }
                        />
                      </View>
                      <View style={[Styles.inputView]}>
                        <InputTextPerfil
                          label={"Contato:"}
                          autoCorrect={false}
                          autoCapitalize="none"
                          keyboardType="numeric"
                          name="contato"
                          icon="phone"
                          placeholder="Contato"
                          returnKeyType="next"
                          //onSubmitEditing={() => senhaInputRef.current?.focus()}
                          //value="seducplay@zoeplay.com.br"
                        />
                      </View>
                      <View
                        style={[
                          Styles.inputView,
                          { paddingVertical: 5, height: 70 },
                        ]}
                      >
                        <Button
                          loading={isLoading}
                          style={{
                            backgroundColor:
                              CustomDefaultTheme.colors.iconsPrimaryColor,
                            marginTop: 10,
                          }}
                          uppercase={false}
                          //onPress={() => navigation.navigate("CadastrarDrawer")}
                          onPress={() => formRef.current?.submitForm()}
                        >
                          <CustomText style={{ color: "#FFF" }}>
                            Atualizar
                          </CustomText>
                        </Button>
                      </View>
                    </Form>
                  </>
                }
                iconColor={CustomDefaultTheme.colors.cinzaEscuro}
              />
              <OpenUrl
                background={CustomDefaultTheme.colors.cinza}
                titulo={"Minha Lista"}
                icone={"book"}
                pagina_origem={"PerfilTab"}
                pagina_destino={"MinhaListaTab"}
                iconColor={CustomDefaultTheme.colors.cinzaEscuro}
              />
              <OpenUrl
                background={CustomDefaultTheme.colors.cinza}
                titulo={"Mensagens"}
                icone={"chat"}
                pagina_origem={"PerfilTab"}
                pagina_destino={"MensagemDrawer"}
                iconColor={CustomDefaultTheme.colors.cinzaEscuro}
              />

              {base.FLG_BOLETIM != undefined && base.FLG_BOLETIM == 1 && (
                <OpenUrl
                  background={CustomDefaultTheme.colors.cinza}
                  titulo={"Boletim"}
                  icone={"format-list-bulleted"}
                  pagina_origem={"PerfilTab"}
                  pagina_destino={"BoletimDrawer"}
                  iconColor={CustomDefaultTheme.colors.cinzaEscuro}
                />
              )}

              {base.FLG_FREQUENCIA != undefined && base.FLG_FREQUENCIA == 1 && (
                <OpenUrl
                  background={CustomDefaultTheme.colors.cinza}
                  titulo={"Frequência"}
                  icone={"format-list-bulleted"}
                  pagina_origem={"PerfilTab"}
                  pagina_destino={"FrequenciaDrawer"}
                  iconColor={CustomDefaultTheme.colors.cinzaEscuro}
                />
              )}

              <View style={[Styles.inputView]}>
                <Button
                  style={{
                    backgroundColor: CustomDefaultTheme.colors.cinza,
                    marginTop: 10,
                  }}
                  uppercase={false}
                  onPress={() => signOut()}
                >
                  <CustomText
                    style={{ color: CustomDefaultTheme.colors.fontPrimaria }}
                  >
                    Sair
                  </CustomText>
                </Button>
              </View>
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
      </Animated.ScrollView>
      {isLoading && <Loading />}
    </>
  );
};

export default Profile;
