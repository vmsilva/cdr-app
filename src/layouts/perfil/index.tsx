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
  FlatList,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { Form } from "@unform/mobile";
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons as MDCIcon,
} from "@expo/vector-icons";
import { FormHandles } from "@unform/core";
import { ActivityIndicator, Avatar, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as ImagePicker from "expo-image-picker";

//SVG
//import SVG from "../../assets/svg/"

// Config
import Styles, {
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
import InputTextPerfil from "../../componentes/funcionalidade/inputTextPerfil";
import { UtilContext } from "../../configuracoes/contexts/UtilContext";
import LinearGradient from "react-native-linear-gradient";
import MosaicoVertical from "../../componentes/body/mosaicoVertical";
import InputTextPerfilPassword from "../../componentes/funcionalidade/inputTextPerfilPassword";
import { EMPRESA } from "../../configuracoes/utils/constants";
import Certificado from "../../componentes/body/cetificado";

interface UpdateProfileFormData {
  nome: string;
  email: string;
  senha?: string;
  contato?: string;
  cargo?: string;
}

const Profile: React.FC<any> = (props) => {
  const navigation = useNavigation() as any;
  const isFocused = useIsFocused();
  const { categorias } = useContext(UtilContext);
  const { user, updateUser, signOut } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const nomeInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const senhaInputRef = useRef<TextInput>(null);
  const contatoInputRef = useRef<TextInput>(null);
  const cargoInputRef = useRef<TextInput>(null);
  const [loading, setLoading] = useState(false);
  const [file_, setFile_] = useState<FileList | null>();
  const [progresso, setProgresso] = useState<any>([]);
  const [certificados, setCertificados] = useState<any>([]);
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
      submitFormWithFile(photo);

      //formRef.current?.submitForm()
    } catch (error) {
      console.log(error);
      setIsLoadingAvatar(false);
    }
  }, [isLoadingAvatar]);

  const handleUpdateProfile = useCallback(
    async (data: UpdateProfileFormData, avatarFile: any) => {
      setIsLoading(true);
      try {
        console.log(user);
        const _FORMDATA = new FormData();
        _FORMDATA.append("token", `${user.token}`);
        _FORMDATA.append("nome", data.nome);
        _FORMDATA.append(
          "email",
          data.email == ""
            ? `${user.cod_usuario}${EMPRESA.EMPRESA.appName}@email.com`
            : data.email
        );
        _FORMDATA.append("json_cargo", data.cargo);
        //_FORMDATA.append("email", '');
        _FORMDATA.append("senha1", data.senha);
        _FORMDATA.append("json_contato", data.contato);
        _FORMDATA.append("avatar", avatarFile);

        let parametros = {
          rota: "acessos/minhaconta",
          parametros: _FORMDATA,
          showNotification: false,
          showLogError: true,
        };

        //console.log(_FORMDATA, data); //return;
        const response = (await postDataUpload(parametros)) as any;

        if (response.error) {
          setIsLoading(false);
          console.log(response);
          alert(response.error + "retorno error");
          return;
        }

        const meusdadosresposta = (await buscaMeusDados()) as any;

        const userNEW = {
          nome: meusdadosresposta.nome,
          cod_usuario: meusdadosresposta.cod_usuario,
          email: meusdadosresposta.email,
          token: user.token,
          departamentos: meusdadosresposta.departamentos,
          url_avatar: meusdadosresposta.url_avatar,
          contato: meusdadosresposta.json.contato,
          cargo: meusdadosresposta.json.cargo
            ? meusdadosresposta.json.cargo
            : "",
        };

        await updateUser(userNEW);

        //console.log(meusdadosresposta, 'meus dados resposta'); return;

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

  const submitFormWithFile = (file) => {
    const data = formRef.current?.getData() as any; // Obtenha os dados atuais do formulário
    if (data) {
      handleUpdateProfile(data, file); // Chame a função com os dados do formulário e o arquivo
    }
  };

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

  const handleSignOut = useCallback(async () => {
    try {
      //setIsLoading(true)
      await signOut();

      navigation.navigate("HomeTab");

      //setTimeout(() => signOut(), 1);
    } catch (error) {
      //setIsLoading(false);
      console.log(error, "Logout");
    }
  }, []);

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

  const buscaCertificado = async () => {
    try {
      ///certificados
      let parametros = {
        rota: "/certificados",
        parametros: {
          token: '4c0450af-e4e0-4d7c-beda-8c38fa26e3e3'//user.token,
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

  useEffect(() => {
    if (isFocused) {
      //console.log(user)
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
              <FontAwesome
                name="angle-left"
                size={27}
                color={CustomDefaultTheme.colors.branco}
              />
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
                width: 26,
              }}
            />

            <TouchableOpacity style={{}} onPress={handleSignOut}>
              <MDCIcon name="exit-to-app" size={30} color={"#FFF"} />
            </TouchableOpacity>
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

  const COMPONENTEMEUSCERTIFICADOS = () => {
    return (
      <View
        style={{
          width: "100%",
          marginTop: 10,
        }}
      >
        <CustomText
          textType="montserratBold"
          style={{
            color: CustomDefaultTheme.colors.tituloCategoria,
            fontSize: 14,
            lineHeight: 18,
            marginTop: 10,
          }}
        >
          Meus Certificados
        </CustomText>
        <View style={[Styles.blocoInputs, {paddingHorizontal: 10}]}>
          <FlatList 
            data={certificados as any}
            renderItem={(_) => {
              return <Certificado item={_.item} />;
            }}
          />
        </View>
      </View>
    );
  };

  const COMPONENTEOBJETOSCURRICULARES = useMemo(
    () => (
      <View
        style={{
          alignItems: "center",
          height: 550,
        }}
      >
        <MosaicoVertical
          item={categorias}
          array={categorias}
          tipo={"programas"}
        />
      </View>
    ),
    [categorias]
  );

  useEffect(() => {
    if (isFocused) {
      buscaCertificado();
    }

    return () => {};
  }, [isFocused]);

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
                  colors={[
                    CustomDefaultTheme.colors.shadowPerfil,
                    CustomDefaultTheme.colors.shadowPerfil2,
                  ]}
                  start={{ x: 0.268, y: 0.8 }} // Calculado para 59 graus
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
                        fontSize: 14,
                        width: "100%",
                        letterSpacing: 0.27,
                      }}
                    >
                      {user.nome}
                    </CustomText>
                    <CustomText
                      textType="montserratLight"
                      style={{
                        color: "#FFF",
                        fontSize: 8,
                        width: "100%",
                        letterSpacing: 0.57,
                      }}
                    >
                      {user.email}
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
                        <CustomText
                          textType="montserratLight"
                          style={[Styles.fontFilho]}
                        >
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
                        color: CustomDefaultTheme.colors.tituloCategoria,
                        fontSize: 14,
                        lineHeight: 18,
                      }}
                    >
                      Meus dados
                    </CustomText>
                    <View style={[Styles.blocoInputs]}>
                      <View style={[{ display: "none" }, Styles.inputView]}>
                        <InputTextPerfil
                          label={"E-mail:"}
                          autoCorrect={false}
                          autoCapitalize="none"
                          keyboardType="words"
                          name="email"
                          icon="mail"
                          placeholder=""
                          returnKeyType="next"
                          onSubmitEditing={() => nomeInputRef.current?.focus()}
                        />
                      </View>
                      <View
                        style={[
                          Styles.inputView,
                          {
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                            width: "102%",
                          },
                        ]}
                      >
                        <InputTextPerfil
                          label={"Nome:"}
                          autoCorrect={false}
                          autoCapitalize="none"
                          keyboardType="words"
                          name="nome"
                          icon="perfil"
                          placeholder=""
                          returnKeyType="next"
                        />
                        <View
                          style={{
                            flexDirection: "row",
                          }}
                        >
                          <View
                            style={[
                              Styles.iconInput,
                              { backgroundColor: "transparent" },
                            ]}
                          />
                          <View style={{ width: 5 }} />
                          <TouchableWithoutFeedback>
                            <View style={[Styles.iconInput]}>
                              <FontAwesome5
                                name="pen"
                                size={15}
                                color={
                                  CustomDefaultTheme.colors.fontIndiceCardVideo
                                }
                              />
                            </View>
                          </TouchableWithoutFeedback>
                        </View>
                      </View>

                      <View style={[Styles.inputView, { display: "none" }]}>
                        <InputTextPerfil
                          label={"Cargo:"}
                          autoCorrect={false}
                          autoCapitalize="none"
                          keyboardType="numeric"
                          name="cargo"
                          icon="user"
                          placeholder=""
                          returnKeyType="next"
                        />
                      </View>
                      <View style={[Styles.inputView]}>
                        <InputTextPerfil
                          mask="phone"
                          label={"Contato:"}
                          autoCorrect={false}
                          autoCapitalize="none"
                          keyboardType="numeric"
                          name="contato"
                          icon="phone"
                          placeholder=""
                          returnKeyType="next"
                        />
                      </View>
                    </View>

                    <CustomText
                      textType="montserratBold"
                      style={{
                        color: CustomDefaultTheme.colors.tituloCategoria,
                        fontSize: 14,
                        lineHeight: 18,
                        marginTop: 10,
                        //display: 'none'
                      }}
                    >
                      Senha
                    </CustomText>
                    <View style={[Styles.blocoInputs, { display: "flex" }]}>
                      <InputTextPerfilPassword
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
                        /*onSubmitEditing={() =>
                          contatoInputRef.current?.focus()
                        }*/
                      />
                    </View>

                    <View>
                      <Button
                        loading={isLoading}
                        style={{
                          backgroundColor:
                            CustomDefaultTheme.colors.primaryButton,
                          marginTop: 10,
                        }}
                        uppercase={false}
                        onPress={() => submitFormWithFile(file_)}
                      >
                        <CustomText
                          textType="montserratBold"
                          style={{ color: "#FFF" }}
                        >
                          Atualizar
                        </CustomText>
                      </Button>
                    </View>

                    <COMPONENTEMEUSCERTIFICADOS />
                  </View>
                </Form>

                <View
                  style={{
                    marginTop: -95,
                  }}
                >
                  <CustomText
                    textType="montserratBold"
                    style={{
                      paddingHorizontal: "3%",
                      color: CustomDefaultTheme.colors.tituloCategoria,
                      fontSize: 14,
                      lineHeight: 18,
                      top: 10,
                    }}
                  >
                    Meus cursos
                  </CustomText>

                  {COMPONENTEOBJETOSCURRICULARES}
                </View>
                <View
                  style={{
                    width: "100%",
                    paddingHorizontal: "3%",
                    marginBottom: 30,
                  }}
                >
                  <Button
                    loading={isLoading}
                    style={{
                      backgroundColor: CustomDefaultTheme.colors.background,
                      marginTop: 10,
                      borderWidth: 1,
                      borderColor: CustomDefaultTheme.colors.vermelho,
                    }}
                    uppercase={false}
                    onPress={() => {
                      Alert.alert(
                        "Atenção",
                        "Ao excluir sua conta, todos os seus dados serão permanentemente apagados e não será possível recuperar ou reverter essa ação. Por favor, confirme se deseja prosseguir.",
                        [
                          {
                            text: "Excluir",
                            onPress: () => handleRemoveUser(),
                          },
                          {
                            text: "Cancelar",
                            onPress: () => {},
                          },
                        ]
                      );
                    }}
                  >
                    <CustomText
                      textType="montserratBold"
                      style={{ color: CustomDefaultTheme.colors.vermelho }}
                    >
                      Solicitar a exclusão da conta
                    </CustomText>
                  </Button>
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
