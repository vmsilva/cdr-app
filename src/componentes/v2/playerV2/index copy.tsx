import React, {
  useEffect,
  useState,
  useMemo,
  ReactNode,
  useContext,
} from "react";
import {
  View,
  Pressable,
  Dimensions,
  Platform,
} from "react-native";
import {
  Video,
  Audio,
  InterruptionModeIOS,
  InterruptionModeAndroid,
} from "expo-av";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import { ActivityIndicator, Button } from "react-native-paper";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import LinearGradient from "react-native-linear-gradient";
//import { hideNavigationBar } from 'react-native-navigation-bar-color';
import Slider from "@react-native-community/slider";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

//Config
import { millisToMinutesSeconds } from "../../../configuracoes/utils/constants/utils";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

//Estilos
import Styles from "./Styles";
import StylesTablet from "./StylesTablet";
import CustomText from "../../componentes/customText";
import CastButtom from "../../botoes/castButton";
import CompartilharButton from "../../botoes/compartilharButton";
import { trataDataRetornoTexto } from "../../../configuracoes/utils/utils";
import CastBanner from "../../body/castBanner";
import { UtilContext } from "../../../configuracoes/contexts/UtilContext";
import { EMPRESA } from "../../../configuracoes/utils/constants/empresa";
import { postData } from "../../../configuracoes/services/request";
import { useAuth } from "../../../configuracoes/hooks/auth";
import Legendas from "../../funcionalidade/Legendas";
import { AlertNotfier } from "../../../configuracoes/services/funcoes";
import Settings from "../../botoes/settings";
import CopyRight from "../../funcionalidade/CopyRight";
import LegendasContent from "../../funcionalidade/Legendas/legendaContent";
import ButtonLegenda from "../../funcionalidade/Legendas/ButtonLegenda";

const TAMANHO_16X_16 = wp("57");

interface VideoProps {
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
  legenda_video: any[];
}

interface VideoPropsComponent {
  ChromeCastButton: ReactNode;
  backButtonLeft: ReactNode;
  backButton: ReactNode;
  width: any;
  height: any;
  hls: string;
  thumb: string;
  publicidade: any[];
  legenda_video: any;
  titulo: string;
  item: VideoProps[];
  seek_video: any;
  aovivo: boolean;
  isFullScreen: boolean;
  isCast: boolean;
  trailer_video: boolean;
}

const { width: width_, height: height_ } = Dimensions.get("window");

const TEMPOWATHING = 10;
const PlayerV2: React.FC<VideoPropsComponent | any> = ({
  backButtonLeft,
  backButton,
  width,
  height,
  item,
  seek_video,
  aovivo,
  ChromeCastButton,
  isCast,
  trailer_video,
  legenda_video,
}) => {
  if (isCast) {
    return <CastBanner width={width} height={height} item={[]} />;
  }
  const { isTablet } = useContext(UtilContext);
  const [carregaCast, setCarregaCast] = useState(false);
  const video = React.useRef<any>(null);
  const isFocused = useIsFocused();
  const { user } = useAuth();

  const [status, setStatus] = React.useState<any>({});
  const [showControll, setShowControll] = useState(false);
  const [enviarTracker, setEnviarTracker] = useState(true);
  const [pause, setPause] = useState(false);
  const [finalizado, setFinalizado] = useState(false);
  const [isPreloading, setIsPreloading] = useState(true);
  const [onSliding, setOnSliding] = useState(false);
  const [settingsBoolean, setSettingsBoolean] = useState<boolean>(false);
  const [rateNumber, setRateNumber] = useState(1);

  // legendas
  const [showLegenda, setShowLegenda] = useState<boolean>(false);
  const [legendaAtivo, setLegendaAtivo] = useState(false);
  const [legendaSelecionada, setLegendaSelecionada] = useState<any>({});

  const STYLETABLETVIDEO = {
    marginTop:
      width < height ? (Platform.OS == "ios" ? hp("-7") : hp("-9")) : 0,
    left: width > height && Platform.OS == "android" ? hp("0") : 0,
    top:
      width > height
        ? hp("0%")
        : Platform.OS == "android"
        ? hp("-11.2")
        : hp("-0.1"),
    width: width > height ? width : width,
    height: width > height ? height : width,
    backgroundColor:
      width > height
        ? CustomDefaultTheme.colors.preto
        : CustomDefaultTheme.colors.preto,
  };

  const STYLEVIDEO = {
    marginTop: isTablet && width < height ? -50 : 0,
    left: width > height && Platform.OS == "android" ? hp("0") : 0,
    top:
      width > height
        ? hp("0%")
        : Platform.OS == "android"
        ? hp("-11.2")
        : hp("-0.1"),
    width: width > height ? width : width,
    height: width > height ? height : TAMANHO_16X_16,
    backgroundColor:
      width > height
        ? CustomDefaultTheme.colors.preto
        : CustomDefaultTheme.colors.preto,
  };

  const handleRate = (data) => {
    //console.log(data)
    setRateNumber(data);
  };

  const COMPONENTERATE = () => {
    return <View></View>;
  };

  const linearGradienteColors = [
    CustomDefaultTheme.colors.disabled,
    "transparent",
    CustomDefaultTheme.colors.disabled,
    CustomDefaultTheme.colors.disabled,
  ];

  Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    staysActiveInBackground: true,
    interruptionModeIOS: InterruptionModeIOS.DuckOthers,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: true,
    interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
    playThroughEarpieceAndroid: false,
  });

  //velocidade e tom quando setado um rate diferente do normal
  React.useEffect(() => {
    video.current?.setStatusAsync({
      shouldCorrectPitch: true,
      pitchCorrectionQuality: Audio.PitchCorrectionQuality.High,
    });
  }, [video.current]);

  //Audio.PitchCorrectionQuality.High

  const trackerSendOtt = async (st: any) => {
    if (trailer_video || !user) return;

    try {
      let parametros = {
        rota: "/rt/videowatching",
        parametros: {
          token: user.token,
          cod_video: item.cod_video,
          assistido: `${parseInt(status.positionMillis / 1000)}`,
          duracao: `${parseInt(status.durationMillis / 1000)}`,
          play: 1,
        },
        showNotification: false,
        showLogError: false,
      };
      const response = (await postData(parametros)) as any;

      if (response.error) {
        console.log(JSON.parse(response.response).error, "-->", parametros);
        return;
      }

      console.log("Enviado!");
    } catch (error) {
      console.log(`Tracker no video erro ${error}`);
    }
  };

  const trackerSend = async (st: any) => {
    console.log("tracksend");
    return;
    if (video.cod_video == "") {
      return;
    }

    if (!isFocused || Object.values(status).length == 0) return;

    let parametros = {
      rota: "rt/liveaudiencia",
      parametros: {
        token_cliente: EMPRESA.token_cliente,
        cod_sala: item.cod_video,
      },
      showNotification: false,
      showLogError: true,
    };
    const response = await postData(parametros);

    console.log("Tracker envia tempo assistido", item.cod_video);
  };

  const settingsOpenBoolean = (data) => {
    //console.log(data); // victor
    setSettingsBoolean(data);
  };

  // recebe parametro do filho legenda
  const ButtonLegendaOpenBoolean = (data) => {
    setSettingsBoolean(data);
  };
  // item legenda selecionado
  const LegendaSelecionada = (data) => {
    if (data == null) {
      setShowLegenda(false);
      return;
    }

    setLegendaSelecionada(data);
    setShowControll(false);
  };
  const ConfiguracoesLegenda = (data) => {
    setLegendaSelecionada(data);
  };

  //useKeepAwake();
  useEffect(() => {
    if (isFocused) {
      status.didJustFinish ? (setFinalizado(true), setShowControll(true)) : "";
      video.current != null &&
      status.isPlaying != undefined &&
      !status.isPlaying &&
      !pause
        ? video.current.playAsync()
        : "";

      if (status.error != undefined) {
        AlertNotfier({
          tipo: "error",
          msg: `Não foi possivel reproduzir o video:  ${status.error}`,
        });
      }
    } else {
      Object.keys(status).length > 1 && video.current != null && status.isLoaded
        ? cleanPlayer()
        : "";

      if (!status.isLoaded) {
        stopPlayer();
      }
    }

    return () => {
      console.log("resetar video");
    };
  }, [
    isFocused,
    //status,
    pause,
    height,
    width,
    isPreloading,
    onSliding,
    carregaCast,
  ]);

  React.useEffect(() => {
    const timeoutID = window.setTimeout(() => {
      item.titulo_video == "AO VIVO"
        ? trackerSend(status)
        : trackerSendOtt(status);
      setEnviarTracker(!enviarTracker);
    }, TEMPOWATHING * 1000);

    return () => window.clearTimeout(timeoutID);
  }, [enviarTracker]);

  const handleShowControlls = () => {
    setShowControll(true);
    setTimeout(() => setShowControll(false), 5000);
  };

  const handleReplay = () => {
    setFinalizado(false);
    video.current.playFromPositionAsync(1);
    setPause(false);
    setShowControll(false);
  };

  const handlePlay = async () => {
    setPause(!pause);
    await video.current.playAsync();
  };

  const handlePause = async () => {
    setPause(!pause);
    await video.current.pauseAsync();
  };

  const cleanPlayer = async () => {
    try {
      setShowControll(false);
      if (status.isPlaying) {
        await video.current.stopAsync();
      }
    } catch (error) {
      console.log(`Error clean video principal -----  ${error}`);
    }
  };

  const stopPlayer = async () => {
    try {
      setStatus({});
      await video.current.unloadAsync();
    } catch (error) {
      console.log(`Error stop video principal -----  ${error}`);
    }
  };

  const onSlidingPlayer = async (e: any) => {
    try {
      setShowControll(false);
      await video.current.playFromPositionAsync(parseInt(e));
      setTimeout(() => {
        //if (status.isPlaying) setIsLoad(false);
      }, 100);
    } catch (error) {
      console.log(` ${error}`);
    }
    setOnSliding(false);
  };

  const controles = useMemo(() => {
    return (
      <>
        {status.didJustFinish && !status.isPlaying ? (
          <TouchableOpacity
            onPress={() => {
              handleReplay();
            }}
          >
            <Entypo name="ccw" size={50} color="#FFF" />
          </TouchableOpacity>
        ) : (
          <View
            style={{
              //backgroundColor: '#FF0',
              width: 50,
              height: 50,
            }}
          >
            <TouchableOpacity
              onPress={!pause && status.isPlaying ? handlePause : handlePlay}
            >
              <Entypo
                name={
                  pause && !status.isPlaying
                    ? "controller-play"
                    : "controller-paus"
                }
                size={50}
                color="#FFF"
              />
            </TouchableOpacity>
          </View>
        )}
      </>
    );
  }, [pause, finalizado, status]);

  const controll16x9 = useMemo(() => {
    return (
      <View
        style={
          isTablet
            ? StylesTablet.container16_9
            : {
                height: TAMANHO_16X_16,
                width: width,
                zIndex: 100,
                position: "absolute",
                backgroundColor:
                  CustomDefaultTheme.colors.backgroundControlPlayer,
                top: Platform.OS == "ios" ? wp("0") : -85,
              }
        }
      >
        <LinearGradient
          start={{
            x: 0,
            y: Platform.OS == "ios" ? 0.02 : 0.01,
          }}
          end={{
            x: 0,
            y: Platform.OS == "ios" ? 0.88 : 0.95,
          }}
          colors={linearGradienteColors}
          style={
            isTablet
              ? StylesTablet.linearGradientControle
              : {
                  height: "100%",
                  width: width,
                }
          }
        ></LinearGradient>
        <View style={Styles.linhaSuperior16x9}>
          <View
            style={{
              width: "50%",
              height: hp("5"),
              top: Platform.OS == "ios" ? "-9%" : "-9%",
              left: wp("7%"),
              borderRadius: 100,
            }}
          >
            <CustomText textType="medium" style={{ color: "#FFF" }}>
              {item.titulo_video}
            </CustomText>
          </View>

          <Button
            style={{
              backgroundColor: "transparent",
              top: Platform.OS == "android" ? hp("-9") : hp("-9.1"),
              right: wp("5"),
              textAlign: "center",
              width: wp("10"),
              height: hp("5"),
              display: "none",
            }}
            onPress={() => {}}
          >
            <CastButtom
              item={{
                hls_path: item.hls,
                url_thumb_video: item.url_thumb_video,
                titulo_video: item.titulo_video,
              }}
            />
            <CompartilharButton tipo={aovivo ? 2 : 4} array={item.cod_video} />
          </Button>
        </View>

        <View style={Styles.linhaControll16x9}>{controles}</View>

        <View
          style={
            isTablet ? StylesTablet.linhaSlider16x9 : Styles.linhaSlider16x9
          }
        >
          <Slider
            style={{
              width: "90%",
              bottom: Platform.OS == "ios" ? -15 : 0,
              height: 15,
            }}
            step={0.1}
            trackStyle={{ width: 999 }}
            thumbTintColor={CustomDefaultTheme.colors.transparent}
            minimumValue={0}
            maximumValue={status.durationMillis}
            minimumTrackTintColor={CustomDefaultTheme.colors.bgsliderplayer}
            maximumTrackTintColor="#FFF"
            value={onSliding ? 0 : status.positionMillis}
            lowerLimit={1000}
            onSlidingStart={(e) => {
              setOnSliding(true);
              setPause(!pause);
              video.current.pauseAsync();
              console.log("start");
            }}
            onSlidingComplete={(e: any) => {
              if (onSliding) {
                setTimeout(() => {
                  onSlidingPlayer(e);
                }, 100);
              }
            }}
          />
          <View style={Styles.linhaTempo16x9}>
            <View
              style={{
                backgroundColor: "transparent",
                flexDirection: "row",
                justifyContent: "flex-start",
                width: wp("45"),
              }}
            >
              {aovivo ? (
                <CustomText
                  style={{
                    backgroundColor: CustomDefaultTheme.colors.vermelho,
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingTop: 5,
                    textAlign: "center",
                  }}
                >
                  AGORA
                </CustomText>
              ) : (
                <>
                  <View
                    style={{
                      width: hp("45"),
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      paddingLeft: hp("1"),
                    }}
                  >
                    <CustomText style={{ color: "#FFF" }}>
                      {millisToMinutesSeconds(status.positionMillis)}
                      {aovivo
                        ? ""
                        : ` / ${millisToMinutesSeconds(status.durationMillis)}`}
                    </CustomText>
                  </View>
                </>
              )}
            </View>
            <View
              style={{
                backgroundColor: "transparent",
                flexDirection: "row",
                justifyContent: "flex-end",
                width: wp("45"),
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Settings
                  settingsOpen={settingsOpenBoolean}
                  children={<COMPONENTERATE />}
                  handleRate={handleRate}
                  rate={rateNumber}
                />
                <ButtonLegenda
                  width={width > height ? width : width}
                  height={width > height ? height : TAMANHO_16X_16}
                  ButtonLegendaOpen={ButtonLegendaOpenBoolean}
                  legendas={legenda_video}
                  legendaSelecionada={LegendaSelecionada}
                  configuracoesLegenda={ConfiguracoesLegenda}
                  legendaAtual={legendaSelecionada}
                  fullscreen={false}
                />
              </View>
              {backButton}
            </View>
          </View>
        </View>
      </View>
    );
  }, [pause, finalizado, status]);

  const controllFullscreen = useMemo(() => {
    return (
      <View
        style={{
          height: width,
          width: width,
          zIndex: 100,
          position: "absolute",
          left: Platform.OS == "android" ? 30 : 0,
          backgroundColor: CustomDefaultTheme.colors.backgroundControlPlayer,
        }}
      >
        <LinearGradient
          start={{
            x: 0,
            y: Platform.OS == "ios" ? 0.02 : 0.01,
          }}
          end={{
            x: 0,
            y: Platform.OS == "ios" ? 0.7 : 0.99,
          }}
          colors={linearGradienteColors}
          style={{
            height: width,
            width: width,
          }}
        ></LinearGradient>
        <View style={Styles.linhaSliderTopFull}>
          <View style={{ left: hp("5"), flexDirection: "row" }}>
            <View style={{ width: 30 }}>{backButtonLeft}</View>
            <View>
              <CustomText
                style={{ color: "#FFF", textAlign: "center", marginTop: 10 }}
              >
                {item.titulo_video}
              </CustomText>
              <CustomText
                style={{
                  color: CustomDefaultTheme.colors.cinza,
                  textAlign: "center",
                  display: "none",
                }}
              >
                {aovivo
                  ? ""
                  : item.data_video != "" && item.data_video != undefined
                  ? ` Exibição em ${trataDataRetornoTexto(item.data_video)}`
                  : ""}
              </CustomText>
            </View>
          </View>
          <View
            style={{
              width: wp("30"),
              flexDirection: "row",
            }}
          >
            <View style={{ top: 7, marginRight: 10 }}>{ChromeCastButton}</View>
            {/*!aovivo && (
              <View style={{ top: 2, marginRight: 10 }}>
                <LikeButton codigo={item.cod_video} />
              </View>
            )*/}
            <CompartilharButton tipo={aovivo ? 2 : 4} array={item} />
          </View>
        </View>

        <View style={Styles.controlesFull}>{controles}</View>

        <View style={Styles.linhaSliderFull}>
          <Slider
            style={{
              width: Platform.OS == "ios" ? hp("90%") : hp("95%"),
            }}
            thumbTintColor={
              aovivo ? "transparent" : CustomDefaultTheme.colors.transparent
            }
            thumbStyle={{ width: 10, height: 10 }}
            minimumValue={0}
            maximumValue={status.durationMillis}
            minimumTrackTintColor={CustomDefaultTheme.colors.bgsliderplayer}
            maximumTrackTintColor="#FFF"
            value={onSliding ? 0 : status.positionMillis}
            lowerLimit={1000}
            onSlidingStart={(e) => {
              setOnSliding(true);
              setPause(!pause);
              video.current.pauseAsync();
              console.log("start");
            }}
            onSlidingComplete={(e: any) => {
              if (onSliding) {
                setTimeout(() => {
                  onSlidingPlayer(e);
                }, 100);
              }
            }}
          />
          <View style={Styles.linhaTempoFull}>
            <View
              style={{
                width: hp("45"),
                flexDirection: "row",
                justifyContent: "flex-start",
                paddingLeft: hp("1"),
              }}
            >
              {aovivo ? (
                <CustomText
                  style={{
                    backgroundColor: CustomDefaultTheme.colors.vermelho,
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingTop: 5,
                    textAlign: "center",
                  }}
                >
                  AGORA
                </CustomText>
              ) : (
                <>
                  <View
                    style={{
                      width: hp("45"),
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      paddingLeft: hp("1"),
                    }}
                  >
                    <CustomText style={{ color: "#FFF" }}>
                      {millisToMinutesSeconds(status.positionMillis)}
                      {aovivo
                        ? ""
                        : ` / ${millisToMinutesSeconds(status.durationMillis)}`}
                    </CustomText>
                  </View>
                </>
              )}
            </View>

            <View
              style={{
                width: hp("45"),
                flexDirection: "row",
                justifyContent: "flex-end",
                paddingRight: wp("5"),
              }}
              //{backButton}
            >
              <Settings
                settingsOpen={settingsOpenBoolean}
                children={<COMPONENTERATE />}
                handleRate={handleRate}
                rate={rateNumber}
              />
              <ButtonLegenda
                width={width > height ? width : width}
                height={width > height ? height : TAMANHO_16X_16}
                ButtonLegendaOpen={ButtonLegendaOpenBoolean}
                legendas={legenda_video}
                legendaSelecionada={LegendaSelecionada}
                configuracoesLegenda={ConfiguracoesLegenda}
                legendaAtual={legendaSelecionada}
                fullscreen={true}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }, [pause, finalizado, width, status]);

  const LOADINGCOMPONENTE = () => {
    //  / Platform.OS == 'ios' && console.log(status)
    if (status?.error) {
      return (
        <View
          style={{
            height: width,
            width: height,
            zIndex: 100,
            position: "absolute",
          }}
        >
          <View
            style={{
              top: Platform.OS == "ios" ? hp("16") : wp("5%"),
              width: width,
              height: height,
              position: "absolute",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <CustomText style={{ fontSize: 20 }}>
              Streaming Indisponivel
            </CustomText>
          </View>
        </View>
      );
    }

    // player na vertical
    if (width < height) {
      if (
        (status?.error == undefined && isPreloading) ||
        !status.isLoaded ||
        (!status.isPlaying && !pause && !status.didJustFinish)
      ) {
        return (
          <>
            <View
              style={[
                {
                  height: "100%",
                  width: wp("100%"),
                  zIndex: 100,
                  alignItems: "center", // Center the ActivityIndicator horizontally
                  justifyContent: "center", // Center the ActivityIndicator vertically
                  position: "absolute",
                },
                Platform.OS == "android" && { marginTop: -100 },
              ]}
            >
              <ActivityIndicator
                animating={true}
                color={CustomDefaultTheme.colors.branco}
                size={40}
              />
            </View>
          </>
        );
      }
    }

    return (
      <>
        {((status?.error == undefined && isPreloading) ||
          !status.isLoaded ||
          (!status.isPlaying && !pause && !status.didJustFinish)) && (
          <View
            style={{
              height: wp("100"),
              width: hp("100"),
              zIndex: 100,
              position: "absolute",
              alignContent: "center",
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                zIndex: 100,
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
              }}
            >
              <ActivityIndicator
                animating={true}
                color={CustomDefaultTheme.colors.branco}
                size={40}
              />
            </View>
          </View>
        )}
      </>
    );
  };

  const onLayout = (event) => {
    const { x, y, height, width } = event.nativeEvent.layout;
  };

  const handleDataFromChild = (data: boolean) => {
    //console.log(data)
    setShowLegenda(data);
  };

  const handleDataFromChildButton = (data) => {
    setLegendaAtivo(data);
  };

  if (status.didJustFinish && showControll) {
    setShowControll(false);
  }

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      {
        <Pressable onPress={handleShowControlls}>
          {showControll || onSliding || settingsBoolean ? (
            //false  ?
            width > height ? (
              controllFullscreen
            ) : (
              controll16x9 //settingsBoolean
            )
          ) : (
            <>
              <LOADINGCOMPONENTE status={status} />
            </>
          )}

          <View
            style={[
              width > height
                ? Styles.legendaHorizontal
                : Styles.legendaVertical,
            ]}
          >
            <CopyRight
              width={width > height ? width : width}
              height={width > height ? height : TAMANHO_16X_16}
              email={user.email}
              nome={user.nome}
            />
          </View>
          <View
            style={[
              width > height
                ? Styles.legendaHorizontal
                : Styles.legendaVertical,
            ]}
          >
            <LegendasContent
              width={width > height ? width : width}
              height={width > height ? height : TAMANHO_16X_16}
              position={status.positionMillis}
              showLegenda={showLegenda}
              legendaSelecionada={legendaSelecionada}
            />
          </View>

          <LOADINGCOMPONENTE status={status} />
          {
            <Video
              //shouldCorrectPitch={true}
              shouldCorrectPitch={true}
              rate={rateNumber}
              isLooping
              onLayout={onLayout}
              posterSource={{ uri: item.url_thumb_video }}
              onLoadStart={() => {
                setIsPreloading(true);
                if (seek_video != "" && seek_video != undefined)
                  video.current.setPositionAsync(seek_video * 1000);
              }}
              onReadyForDisplay={() => setIsPreloading(false)}
              ref={video}
              source={{ uri: !trailer_video ? item.hls : item.trailer_video }}
              shouldPlay={true}
              style={isTablet ? STYLETABLETVIDEO : STYLEVIDEO}
              progressUpdateIntervalMillis={700}
              resizeMode={
                width > height
                  ? "contain"
                  : Platform.OS == "android"
                  ? "contain"
                  : ""
              }
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            >
              {Platform.OS == "ios" && (
                <>
                  <CopyRight
                    width={width > height ? width : width}
                    height={width > height ? height : TAMANHO_16X_16}
                    email={user.email}
                    nome={user.nome}
                  />
                  <LegendasContent
                    width={width > height ? width : width}
                    height={width > height ? height : TAMANHO_16X_16}
                    position={status.positionMillis}
                    showLegenda={showLegenda}
                    legendaSelecionada={legendaSelecionada}
                  />
                </>
              )}
            </Video>
          }
        </Pressable>
      }
    </View>
  );
};

export default PlayerV2;
