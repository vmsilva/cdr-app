import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  useContext,
  useMemo,
} from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
  Alert,
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
import {
  getData,
  postData,
  postDataUpload,
} from "../../configuracoes/services/request";
import CustomText from "../../componentes/componentes/customText";
import { AlertNotfier } from "../../configuracoes/utils/utils";
import Loading from "../../componentes/funcionalidade/Loading";
import InputTextPerfil from "../../componentes/funcionalidade/inputTextPerfil";
import { UtilContext } from "../../configuracoes/contexts/UtilContext";
import LinearGradient from "react-native-linear-gradient";
import MosaicoVertical from "../../componentes/body/mosaicoVertical";
import Certificado from "../../componentes/body/cetificado";

interface UpdateProfileFormData {
  nome: string;
  email: string;
  senha?: string;
  contato?: string;
}

const Profile: React.FC<any> = (props, {}) => {
  const navigation = useNavigation() as any;
  const isFocused = useIsFocused();
  const { categorias } = useContext(UtilContext);
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
  const [certificados, setCertificados] = useState<any>([]);
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
    } catch (error) {
      console.log(error);
      setIsLoadingAvatar(false);
    }
  }, [isLoadingAvatar]);

  const handleUpdateProfile = useCallback(
    async (data: UpdateProfileFormData) => {
      setIsLoading(true);
      try {
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

  const buscaCertificado = async () => {
    try {
      ///certificados
      let parametros = {
        rota: "/certificados",
        parametros: {
          token: user.token,
        },
        showNotification: false,
        showLogError: true,
      };

      const response = (await postData(parametros)) as any;

      console.log(response.data.data, "meus certificados", parametros);
      setCertificados(response.data.data);
    } catch (error) {
      console.log("certificado erro ->", error);
    }
  };

  const handleRemoveUser = useCallback(async () => {
    try {

      setLoading(true);
      let parametros = {
        rota: `/usuarios/delme/`, //https://app.goveduca.com.br/usuarios/delme/?
        parametros: `token=${user.token}`,
        showNotification: false,
        showLogError: true,
      };

      const resp = (await getData(parametros)) as any;

      setLoading(false);
      setVisible(false);
      signOut();
      navigation.navigate("DashboardStack");
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
              <FontAwesome name="angle-left" size={40} color="#FFF" />
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
  };

  const COMPONENTEOBJETOSCURRICULARES = useMemo(
    () => (
      <>
        <View>
          <MosaicoVertical item={categorias} tipo={"programas"} />
        </View>
      </>
    ),
    [categorias]
  );

  const COMPONENTEMEUSCERTIFICADOS = () => {


    return (  <View
      style={{
        width: "100%",
        paddingHorizontal: "3%",
        marginTop: 50,
      }}
    >
      <CustomText
        textType="montserratBold"
        style={{
          color: CustomDefaultTheme.colors.iconsPrimaryColor,
          fontSize: 14,
          lineHeight: 18,
        }}
      >
        Meus Certificados
      </CustomText>
      <View style={[Styles.blocoInputs]}>
      {certificados.map((_: any, index: any) => {
          return <Certificado key={_.cod_certificado} item={_} />;
        })}
      </View>
    </View>)
    return (
      <View
        style={{
          display: certificados.length > 0 ? "flex" : "none",
          backgroundColor: CustomDefaultTheme.colors.backgroundAulas,
        }}
      >
        <View
          style={{
            width: "100%",
            alignItems: "center",
            padding: 10,
          }}
        >
          <CustomText textType="bold" style={{ fontSize: 20 }}>
            Meus Certificados
          </CustomText>
        </View>
        {certificados.map((_: any, index: any) => {
          return <Certificado key={_.cod_certificado} item={_} />;
        })}
      </View>
    );
  };

  useEffect(() => {
    if (isFocused) {
      buscaCertificado();
    }

    return () => {};
  }, [isFocused, isLoading]);

  return (
    <>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={[1]}
        renderItem={(item) => {
          return (
            <>
              <COMPONENTEHEADER />
              <View style={[Styles.bannerContainer]}>
                <LinearGradient
                  //colors={["#5DA57D", "#244030"]}
                  colors={[
                    CustomDefaultTheme.colors.primary,
                    CustomDefaultTheme.colors.secondary,
                  ]}
                  start={{ x: 0.268, y: 0 }} // Calculado para 59 graus
                  end={{ x: 1, y: 0.809 }} // Calculado para 59 graus
                  style={[Styles.b2, { opacity: 0.98 }]}
                />
                <View
                  style={{
                    flexDirection: "row",
                    padding: 10,
                    top: -120,
                    justifyContent: "center",
                    width: "100%",
                    zIndex: 1000,
                  }}
                >
                  <View style={[Styles.logoView]}>
                    <AvatarContainer>
                      {isLoadingAvatar ? (
                        <View
                          style={{
                            width: 120,
                            height: 120,
                            justifyContent: "center",
                          }}
                        >
                          <ActivityIndicator size={30} color={"#FFF"} />
                        </View>
                      ) : (
                        <View
                          style={{
                            width: 120,
                            height: 120,
                            justifyContent: "center",
                          }}
                        >
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
                        </View>
                      )}
                      <EditAvatarButton onPress={handleShowCameraRoll}>
                        <EditAvatarIcon />
                      </EditAvatarButton>
                    </AvatarContainer>
                  </View>
                  <View style={[Styles.progressBar]}>
                    <CustomText
                      textType="montserratBold"
                      style={{
                        color: "#FFF",
                        fontSize: 18,
                        width: "100%",
                        letterSpacing: 0.27,
                      }}
                    >
                      {user.nome}
                    </CustomText>
                    <View style={[Styles.iconStyle]}>
                      <View style={[Styles.iconStyleFilho]}>
                        <AntDesign name="videocamera" size={20} color="#FFF" />
                        <CustomText
                          textType="montserratRegular"
                          style={[Styles.fontFilho]}
                        >
                          {progresso.videos_assistidos != undefined &&
                            progresso.videos_assistidos.length}{" "}
                          Videos
                        </CustomText>
                      </View>
                      <View style={[Styles.iconStyleFilho]}>
                        <AntDesign name="clockcircleo" size={20} color="#FFF" />
                        <CustomText style={[Styles.fontFilho]}>
                          {progresso.videos_assistidos != undefined &&
                            `${SEGUNDOSPARAHORAS(
                              progresso.segundos_assistidos
                            )} `}
                        </CustomText>
                      </View>
                    </View>
                  </View>
                </View>

                <Form
                  ref={formRef}
                  onSubmit={handleUpdateProfile}
                  initialData={user}
                  style={{
                    bottom: 100,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      paddingHorizontal: "3%",
                    }}
                  >
                    <CustomText
                      textType="montserratBold"
                      style={{
                        color: CustomDefaultTheme.colors.iconsPrimaryColor,
                        fontSize: 14,
                        lineHeight: 18,
                      }}
                    >
                      Meus dados
                    </CustomText>
                    <View style={[Styles.blocoInputs]}>
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
                        />
                      </View>
                      {/*
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
                      />
                    </View>
                      */}

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
                        />
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      width: "100%",
                      paddingHorizontal: "3%",
                      top: 25,
                    }}
                  >
                    <CustomText
                      textType="montserratBold"
                      style={{
                        color: CustomDefaultTheme.colors.iconsPrimaryColor,
                        fontSize: 14,
                        lineHeight: 18,
                      }}
                    >
                      Senha
                    </CustomText>
                    <View style={[Styles.blocoInputs]}>
                      <View style={[Styles.inputView]}>
                        <InputTextPerfil
                          secureTextEntry
                          label={""}
                          altura={36}
                          background={"#191919"}
                          autoCorrect={false}
                          autoCapitalize="none"
                          keyboardType="email-address"
                          name="senha"
                          icon="password"
                          placeholder=""
                          returnKeyType="next"
                          onSubmitEditing={() =>
                            contatoInputRef.current?.focus()
                          }
                        />
                      </View>

                      <View style={[{ paddingVertical: 5, height: 70 }]}>
                        <Button
                          loading={isLoading}
                          style={{
                            backgroundColor:
                              CustomDefaultTheme.colors.iconsPrimaryColor,
                            marginTop: 10,
                          }}
                          uppercase={false}
                          onPress={() => formRef.current?.submitForm()}
                        >
                          <CustomText style={{ color: "#FFF" }}>
                            Atualizar
                          </CustomText>
                        </Button>
                      </View>
                      <View style={[{ paddingVertical: 5 }]}>
                        <TouchableOpacity
                          onPress={() => {
                            Alert.alert(
                              "Atenção!",
                              "Tem certeza que deseja excluir sua conta?",
                              [
                                {
                                  text: "Cancelar",
                                  onPress: () => console.log("Cancel Pressed"),
                                  style: "cancel",
                                },
                                {
                                  text: "Excluir",
                                  onPress: () => handleRemoveUser(),
                                },
                              ]
                            );
                          }}
                        >
                          <Button
                            loading={loading}
                            disabled={loading}
                            style={{
                              backgroundColor:
                                CustomDefaultTheme.colors.vermelho,
                              justifyContent: "center",
                              borderRadius: 5,
                            }}
                            contentStyle={{
                              borderRadius: 30,
                              padding: 1,
                            }}
                            mode="contained"
                          >
                            <CustomText
                              style={{
                                color: CustomDefaultTheme.colors.branco,
                                fontWeight: "800",
                              }}
                            >
                              Excluir Conta
                            </CustomText>
                          </Button>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  <COMPONENTEMEUSCERTIFICADOS />
                </Form>
                <View
                  style={{
                    width: "100%",
                    paddingHorizontal: "3%",
                    bottom: 45,
                  }}
                >
                  <CustomText
                    textType="montserratBold"
                    style={{
                      color: CustomDefaultTheme.colors.iconsPrimaryColor,
                      fontSize: 14,
                      lineHeight: 18,
                    }}
                  >
                    Meus cursos
                  </CustomText>
                  {COMPONENTEOBJETOSCURRICULARES}
                </View>
              </View>
            </>
          );
        }}
      />
      {isLoading && <Loading />}
    </>
  );
};

export default Profile;
