import React, { useRef, useState, useEffect, useContext } from "react";
import {
  View,
  Dimensions,
  TouchableOpacity,
  Platform,
  ScrollView,
  TextInput
} from "react-native";
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import FastImage from "react-native-fast-image";
import * as ScreenOrientation from "expo-screen-orientation";
import { useRemoteMediaClient } from "react-native-google-cast";
import { AntDesign, Entypo, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { setStatusBarHidden } from "expo-status-bar";
import { useNavigation, useIsFocused } from "@react-navigation/native";

// Componentes
import CustomText from "../../componentes/componentes/customText";
import { montaJsonVideo } from "../../configuracoes/utils/utils";
import PageHeader from "../../componentes/header";
import PlayerV2 from "../../componentes/v2/playerV2";

// Configuracoes
import Styles from "./Styles";
import StylesTablet from "./StylesTablet";
import { CustomDefaultTheme } from "../../configuracoes/styles/Theme";
import { UtilContext } from "../../configuracoes/contexts/UtilContext";
import { ActivityIndicator, Button } from "react-native-paper";
import AoVivoRelacionados from "../../componentes/body/aoVivoRelacionados";
import CastButtom from "../../componentes/botoes/castButton";
import { useAuth } from "../../configuracoes/hooks/auth";
import InputSecundarioMensagem from "../../componentes/InputSecundarioMensagem";
import { postData } from "../../configuracoes/services/request";

interface videoProps {
  cod_video: string;
  cod_cliente: string;
  hash_video: string;
  titulo_video: string;
  descricao_video: string;
  id_cdn_video: string;
  hls_path: string;
  data_upload_video: string;
  data_liberacao_video: string;
  data_remocao_video: string;
  url_thumb_video: string;
  url_thumb_vertical_video: string;
  url_hover_vertical_video: string;
  duracao_video: string;
  json_video: string;
  url_tmp_video: string;
  tags_video: string;
  versao_streaming: string;
  ordem_video: string;
  status_video: string;
  cod_categoria: string;
  seek_video: any;
  imagem_logo_tv: any;
}

const AoVivoPage: React.FC<any> = (props) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const client = useRemoteMediaClient();
  const { aoVivo, isTablet, pip } = useContext(UtilContext);
  const { item, isFullScreen, titulo } =
    props.route.params != undefined ? props.route.params : "";
  const [isCast, setIsCast] = useState(false);

  if (Object.values(aoVivo).length == 0) {
    return <></>;
  }

  const { user } = useAuth();
  const mensagemInputRef = useRef<TextInput>(null);
  const formRef = useRef<FormHandles>(null);

  const [mensagemEnviada, setMensagemEnviada] = useState<boolean>(false);
  const [isLoadingRequestMessage, setIsloadingRequestMessage] = useState<boolean>(false);
  const [subTitulo, setSubTitulo] = useState<any>([]);
  //flag para orientacao vertical nao ficar em loop infinito
  const [verticalDisparo, setVerticalDisparo] = useState(false);
  const [flagVerificaOrientacao, setFlagVerificaOrientacao] = useState(true);
  const [largura, setLargura] = useState(Dimensions.get("screen").width);
  const [altura, setAltura] = useState(Dimensions.get("screen").height);
  const [orientacao, setOrientacao] = useState("PORTRAIT");
  const [headerHide, setHeaderHide] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  const [video, setVideo] = useState<videoProps>(
    item != undefined
      ? item
      : montaJsonVideo(Object.values(aoVivo)[0], "aovivo")
  );
  const [showVideoTag, setShowVideoTag] = useState(false);
  const scrollRelacionadosRef = useRef() as any;

  const handleOrientacao = () => {
    try {
      !headerHide ? PlayerNaHorizontal() : PlayerVertical();
    } catch (error) {
      console.log(error);
    }
  };

  const PlayerVertical = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );

    setStatusBarHidden(false, "fade");
    setHeaderHide(false);
    setSubTitulo([]);
    setVerticalDisparo(false);
    setOrientacao("PORTRAIT");
    console.log("verticall");
  };

  const PlayerNaHorizontal = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
    );
    setStatusBarHidden(true, "fade");
    setHeaderHide(true);
    setOrientacao("landscape");
  };

  const adicionarNovaMensagem = async (data: any) => {
    setIsloadingRequestMessage(true);
    try {
      if (data.mensagem == "") {
        return;
      }

      let parametros = {
        rota: `/salas/sendchatmsg/${video.cod_video}`,
        parametros: {
          token: user.token,
          msg: data.mensagem,
        },
        showNotification: false,
        showLogError: true,
      };

      const response = (await postData(parametros)) as any;
      //console.log("msg enviada", response.data.data);
      setMensagemEnviada(true);
      setIsloadingRequestMessage(false);

      formRef.current?.reset();
    } catch (error) {
      console.log(error);
      setIsloadingRequestMessage(false);
    }
  };

  if (client) {
    if (!isCast) {
      setTimeout(() => {
        setIsCast(true);
      }, 100);
    }
  } else {
    if (isCast) {
      setTimeout(() => {
        setIsCast(false);
      }, 100);
    }
  }

  useEffect(() => {
    if (isFocused) {
      if (item != undefined && item.cod_video != video.cod_video) {
        setVideo(item);
      }
      setVerticalDisparo(true);
      setTimeout(() => setShowVideoTag(true), 300);
      scrollRelacionadosRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
    } else {
      if (verticalDisparo) {
        PlayerVertical();

        setShowVideoTag(false);
      }

      if (!flagVerificaOrientacao) {
        setFlagVerificaOrientacao(true);
      }
    }

    return () => {
      setIsloading(false);
    };
  }, [
    isFocused,
    subTitulo,
    verticalDisparo,
    flagVerificaOrientacao,
    largura,
    altura,
    orientacao,
    headerHide,
    isLoading,
    video,
    item,
  ]);

  const COMPONENTELABEL = (props) => {
    return (
      <>
        <View
          style={{
            borderBottomColor: CustomDefaultTheme.colors.labelCor,
            borderBottomWidth: 0.4,
            width: wp("100"),
            marginTop: 10,
          }}
        >
          <View
            style={{
              borderBottomWidth: 1.5,
              borderBottomColor: CustomDefaultTheme.colors.labelCor,
              width: "45%",
              marginLeft: wp("5"),
              paddingBottom: 10,
              //backgroundColor: '#FF0'
            }}
          >
            <CustomText textType="bold" style={{ color: "#000", fontSize: 17 }}>
              {props.label}
            </CustomText>
          </View>
        </View>
      </>
    );
  };

  const COMPONENTEHEADER = () => {
    return (
      <PageHeader
        backgroundTransparent={true}
        headerLeft={
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
             
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
                right: 0,
                marginTop: -5,
              }}
            >
              <TouchableOpacity>
                <Entypo
                  name="share"
                  size={30}
                  color={CustomDefaultTheme.colors.iconsPrimaryColor}
                />
              </TouchableOpacity>
            </View>
          </View>
        }
      />
    );
  };

  const COMPONENTEAOVIVO = () => {
    return (
      <View style={[Styles.textInputContent]}>
        <View
          style={{
            width: "95%",
            backgroundColor: CustomDefaultTheme.colors.iconsPrimaryColor,
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            borderRadius: 10,
          }}
        >
          <View
            style={{
              width: "100%",
            }}
          >
            <Form
              ref={formRef}
              onSubmit={adicionarNovaMensagem}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <InputSecundarioMensagem
                container2={true}
                multiline
                autoCapitalize="none"
                name="mensagem"
                icon="message-square"
                placeholder="Escreva mensagem..."
                returnKeyType="next"
                onSubmitEditing={() => mensagemInputRef.current?.focus()}
                //value="seducplay@zoeplay.com.br"
              />
              <Button
                theme={CustomDefaultTheme}
                style={{
                  marginTop: 10,
                  backgroundColor: CustomDefaultTheme.colors.buttonPrimary,
                  width: "100%",
                  borderRadius: 10,
                }}
                uppercase={false}
                onPress={() => formRef.current?.submitForm()}
              >
                <CustomText style={{ color: "#FFF" }}>
                  ENVIAR MENSAGEM
                </CustomText>
              </Button>
            </Form>
          </View>
        </View>
      </View>
    );
  };

  const COMPONENTEAOVIVOENVIADO = () => {
    return (
      <View style={[Styles.textInputContent]}>
        <View
          style={{
            width: "95%",
            //backgroundColor: CustomDefaultTheme.colors.iconsPrimaryColor,
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            borderRadius: 10,
          }}
        >
          <View
            style={{
              width: "100%",
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <AntDesign name="checkcircle" size={100} color={CustomDefaultTheme.colors.iconsPrimaryColor} />
            <View
              style={{
                backgroundColor: CustomDefaultTheme.colors.iconsPrimaryColor,
                marginTop: 10,
                width: "100%",
                borderRadius: 10,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <CustomText style={{color: '#FFF'}}>MENSAGEM ENVIADA</CustomText>
            </View>
            <Button
              theme={CustomDefaultTheme}
              style={{
                marginTop: 10,
                backgroundColor: CustomDefaultTheme.colors.buttonPrimary,
                width: "100%",
                borderRadius: 10,
              }}
              uppercase={false}
              onPress={() => setMensagemEnviada(false)}
            >
              <CustomText style={{ color: "#FFF" }}>ENVIAR OUTRA MENSAGEM</CustomText>
            </Button>
          </View>
        </View>
      </View>
    );
  };
  
  const COMPONENTEAOVIVOLOADINGMENSAGEM = () => {
    return (
      <View style={[Styles.textInputContent]}>
        <View
          style={{
            width: "95%",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            borderRadius: 10,
          }}
        >
          <View
            style={{
              width: "100%",
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <ActivityIndicator size={100} color={CustomDefaultTheme.colors.iconsPrimaryColor} />
            <CustomText>ENVIANDO....</CustomText>
          </View>
        </View>
      </View>
    );
  };

  if (!isFocused) {
    return <></>;
  }

  return (
    <View
      style={{
        backgroundColor: headerHide
          ? CustomDefaultTheme.colors.preto
          : "transparent",
        height: hp("100"),
      }}
    >
       {!pip && !headerHide && (
        <>
          <COMPONENTEHEADER />
          <View style={{ height: Platform.OS == "ios" ? hp("2") : hp("13") }} />
        </>
      )}

      {showVideoTag ? (
         <View
         style={{
           marginTop: !headerHide ? 90 : 0,
         }}
       >
        <PlayerV2
          isCast={isCast}
          playlist={[]}
          seek_video={video.seek_video != undefined ? video.seek_video : 0}
          aovivo={true}
          orientacao={orientacao}
          item={video}
          width={headerHide ? altura : largura}
          height={headerHide ? largura : altura}
          titulo={video.titulo_video}
          ChromeCastButton={
            <>
              <TouchableOpacity
                onPress={() => {
                  setFlagVerificaOrientacao(false);
                  handleOrientacao();
                }}
                style={[
                  {},
                  Platform.OS == "ios"
                    ? Styles.orientacaoBtnIos
                    : Styles.orientacaoBtnAndroid,
                ]}
              >
                <CastButtom item={video} />
              </TouchableOpacity>
            </>
          }
          backButton={
            <>
              <TouchableOpacity
                //onPress={isFullScreen ? handleGoback : handleOrientacao}
                onPress={() => {
                  setFlagVerificaOrientacao(false);
                  handleOrientacao();
                }}
                style={[
                  {},
                  Platform.OS == "ios"
                    ? Styles.orientacaoBtnIos
                    : Styles.orientacaoBtnAndroid,
                ]}
              >
                {false ? (
                  <MaterialCommunityIcons
                    name={"keyboard-backspace"}
                    size={30}
                    color="#FFF"
                  />
                ) : (
                  <MaterialCommunityIcons
                    name={!headerHide ? "fullscreen" : "fullscreen-exit"}
                    size={30}
                    color="#FFF"
                  />
                )}
              </TouchableOpacity>
            </>
          }
          backButtonLeft={
            <>
              <TouchableOpacity
                onPress={() => {
                  setFlagVerificaOrientacao(false);
                  handleOrientacao();
                }}
                style={[
                  {},
                  Platform.OS == "ios"
                    ? Styles.orientacaoBtnIos
                    : Styles.orientacaoBtnAndroid,
                ]}
              >
                <FontAwesome
                  name="angle-left"
                  size={40}
                  color={CustomDefaultTheme.colors.buttonPrimary}
                />
              </TouchableOpacity>
            </>
          }
        />
        </View>
      ) : (
        <View>
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            source={{ uri: video.url_thumb_video }}
            style={{
              marginTop: Platform.OS == "ios" ? 100 : 0,
              height: hp("30"),
              width: wp("100"),
            }}
          />
          <View
            style={{
              marginTop: Platform.OS == "ios" ? hp("0") : hp("14"),
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <View style={{}}>
              <ActivityIndicator
                color={CustomDefaultTheme.colors.buttonPrimary}
                size={40}
              />
              <CustomText
                textType="bold"
                style={{
                  color: CustomDefaultTheme.colors.buttonPrimary,
                  fontSize: 20,
                }}
              >
                Carregando ....
              </CustomText>
            </View>
          </View>
        </View>
      )}

      {!headerHide && showVideoTag && (
        <>
          <View
            style={
              isTablet ? StylesTablet.blocoInformacoes : Styles.blocoInformacoes
            }
          >
            <View>
              <CustomText
                textType="bold"
                color={"#FFF"}
                style={[Styles.font, { maxWidth: wp("100") }]}
              >
                {video.titulo_video}
              </CustomText>
              <CustomText
                textType="light"
                color={"#FFF"}
                style={[{ maxWidth: wp("100"), fontSize: 15 }]}
              >
                Exibição Agora
              </CustomText>
            </View>
          </View>
          <ScrollView
            style={
              isTablet
                ? StylesTablet.scrollRelacionados
                : Styles.scrollRelacionados
            }
          >
           
              <>
                <COMPONENTELABEL label="Envie sua mensagem" />
                {
                  !isLoadingRequestMessage ? mensagemEnviada ? <COMPONENTEAOVIVOENVIADO /> : <COMPONENTEAOVIVO /> : <COMPONENTEAOVIVOLOADINGMENSAGEM />
                }
                
              </>
            
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default AoVivoPage;
