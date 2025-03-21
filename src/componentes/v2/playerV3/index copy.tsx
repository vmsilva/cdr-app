import React, { useEffect, useState, useMemo, useContext } from "react";
import { View, Pressable, Platform } from "react-native";
import Video, { ResizeMode, VideoRef, TextTrackType } from "react-native-video";

import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import { useRemoteMediaClient } from "react-native-google-cast";
import Slider from "@react-native-community/slider";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

//Config
import api from "../../../configuracoes/services/api";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";
import { useAuth } from "../../../configuracoes/hooks/auth";

//Estilos
import Styles from "./Styles";
import { UtilContext } from "../../../configuracoes/contexts/UtilContext";
import {
  encontrarPosicaoPorCodVideo,
  montaJsonVideo,
} from "../../../configuracoes/utils/utils";
import { postData } from "../../../configuracoes/services/request";

// interface
import { VideoPropsComponent } from "./videoInterfaces";
import Controls_16_9 from "./Controls_16_9";
import FullScreenControls from "./FullScreenControls";
import LegendasContent from "../../funcionalidade/Legendas/legendaContent";

const TAMANHO_16X_16 = wp("57");

const TEMPOWATHING = 10;
const PlayerV3: React.FC<VideoPropsComponent | any> = ({
  backButton,
  width,
  height,
  item,
  seek_video,
  pagina_origem,
  aovivo,
  playlist,
  categoria,
  reloadCategoria,
  //cod_categoria_temporada
  legenda_video
}) => {
  //let LOADINGCAST = false;
  const navigation = useNavigation() as any;
  const { user } = useAuth();
  const { isTablet, pip } = useContext(UtilContext);
  const [carregaCast, setCarregaCast] = useState(false);
  const client = useRemoteMediaClient();
  const video = React.useRef<VideoRef>(null);
  const isFocused = useIsFocused();
  const [infos, setInfos] = useState<any>({});
  const [isLoading, setIsloading] = React.useState<boolean>(false);
  const [status, setStatus] = React.useState<any>({});
  const [statusPropaganda, setStatusPropaganda] = React.useState<any>({});
  const [showControll, setShowControll] = useState(false);
  const [enviarTracker, setEnviarTracker] = useState(true);
  const [pause, setPause] = useState(false);
  const [finalizado, setFinalizado] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [isPreloading, setIsPreloading] = useState(true);
  const [onSliding, setOnSliding] = useState(false);
  const [reload, setReload] = useState<boolean>(false);
  const [rateNumber, setRateNumber] = useState(1);
  const [settingsBoolean, setSettingsBoolean] = useState<boolean>(false);
  const [posicaoEncontrada, setPosicaoEncontrada] = useState<number>(0);
  //const [subtitulos, setSubtitulos] = useState<any>({});
  const [subtituloBoolean, setSubtituloBoolean] = useState<boolean>(false);
  const [subtituloSelecionado, setSubtituloSelecionado] = useState<any>(null);
  const [subtitulosList, setSubtitulosList] = useState<any>([]);
  const [HLSERROR, setHLSERROR] = useState<boolean>(false);

  // legendas
  const [showLegenda, setShowLegenda] = useState<boolean>(false);

  const seekTime = {
    display: aovivo ? "none" : "flex",
  } as any;

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
        : CustomDefaultTheme.colors.background,
  };

  const STYLEVIDEO = {
    marginTop: isTablet && width < height ? -50 : 0,
    left: width > height && Platform.OS == "android" ? wp("-6") : 0,
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
        : CustomDefaultTheme.colors.background,
  };

  const STYLEVIDEOPIP = {
    position: "absolute",
    width: "100%",
    height: "100%",
  };

  const handleOpenUrl = (playlistItem, playlist) => {
    setShowControll(false);
    if (playlistItem == undefined) {
      return;
    }

    if (Platform.OS == "android") {
      //stopPlayer();
    }

    playlistItem[`progresso_sec`] = 0;
    let MONTAJSON = montaJsonVideo(playlistItem, "videozoeplay") as any;

    categoria["videos"] = playlist;

    //onSlidingPlayer(0);

    navigation.navigate("PlayerDrawer", {
      item: MONTAJSON,
      relacionados: playlist,
      aovivo: false,
      pagina_origem: pagina_origem,
      materia: [],
      categoria: categoria,
      cod_categoria_temporada: playlist[0].cod_categoria_temporada_especifica, // cod_categoria_temporada
    });
    //handlePlay();
    handleReload();
  };

  const trackerSendOtt = async (st: any) => {
    //return

    try {
      let parametros = {
        rota: "/rt/videowatching",
        parametros: {
          token: user.token,
          cod_video: item.cod_video,
          assistido: `${parseInt(status.currentTime)}`,
          duracao: `${parseInt(infos.duration)}`,
          play: 1,
          device: "app",
          subdevice: Platform.OS,
        },
        showNotification: false,
        showLogError: false,
      };
      const response = (await postData(parametros)) as any;

      if (response.error) {
        return;
      }

      //reloadCategoria(true);
      console.log("Enviado!");
    } catch (error) {
      console.log(`Tracker no video erro ${error}`);
    }
  };

  const trackerSend = async () => {
    return;
    //alert('envia track'); return;
    try {
      const response = await api.post(
        `/stats/aovivo`,
        user
          ? {
              token: user.token,
              device: "app",
            }
          : {
              device: "app",
            }
      );

      console.log(
        "Tracker envia tempo assistido ao viooooo",
        response.data.data,
        Platform.OS
      );
    } catch (error) {
      console.log(error, "tracker error ao vivo");
    }

    return;
  };

  //useKeepAwake();
  useEffect(() => {
    return () => {};
  }, [
    isFocused,
    statusPropaganda,
    pause,
    height,
    width,
    isPreloading,
    onSliding,
    carregaCast,
  ]);

  useEffect(() => {
    const posicao = encontrarPosicaoPorCodVideo(playlist, item.cod_video);
    setPosicaoEncontrada(posicao);

    return () => {};
  }, [item, playlist]);

  // tracker
  React.useEffect(() => {
    const timeoutID = window.setTimeout(() => {
      setEnviarTracker(!enviarTracker);

      if (aovivo && aovivo != undefined) {
        trackerSend();
      } else {
        trackerSendOtt(status);
      }
    }, TEMPOWATHING * 1000);

    return () => window.clearTimeout(timeoutID);
  }, [enviarTracker]);

  const onProgress = (data) => {
    // 'data' contém informações sobre o progresso do vídeo, como currentTime, playableDuration, etc.
    //console.log("Progresso atual: ", parseInt(data.currentTime) * 1000, data);
    setStatus(data);
  };

  const handleShowControlls = () => {
    //Minimizer.minimize();  return;

    setShowControll(true);
    setTimeout(() => setShowControll(false), 5000);
  };

  const handleReload = () => {
    //alert('reload'); return
    seek(0);
    setTimeout(() => {
      setReload(false);
      setPause(false);
      handlePlay();
    }, 100);
  };

  const handlePlay = async () => {
    try {
      await video.current.resume();
      setPause(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePause = async () => {
    try {
      await video.current.pause();
      setPause(true);
    } catch (error) {
      console.log(error);
    }
  };

  const seek = async (millis) => {
    try {
      await video.current.seek(millis);

      await video.current.resume();
      setReload(false);
      setTimeout(() => setPause(false), 10);
    } catch (error) {
      console.log(error);
    }
  };

  const settingsOpenBoolean = (data) => {
    setSettingsBoolean(data);
  };

  const subtituloOpenBoolean = (data) => {
    setSubtituloBoolean(data);
  };

  const handleRate = (data) => {
    //console.log(data)
    setRateNumber(data);
  };

  const handleSubtitulo = (data) => {
    console.log(data, "subtitulooo");
    setSubtituloSelecionado(data);

    /*
    if (!data) {
      setSubtituloSelecionado(null);
    } else {
      setSubtituloSelecionado(data);
    }*/
  };

  const LOADINGCOMPONENTE = useMemo(() => {
    return (
      <View style={[Styles.loadView]}>
        <View style={[Styles.loadViewFilho]}>
          <ActivityIndicator
            animating={true}
            color={CustomDefaultTheme.colors.progressoSlider}
            size={40}
          />
        </View>
      </View>
    );
  }, [isLoading, width, height]);

  // ativa pip mode
  const controles = useMemo(() => {
    let SIZEICON = width > height ? 50 : 35;
    return (
      <>
        <View style={[Styles.seekTime]}>
          <TouchableOpacity
            style={{
              display: playlist.length == 0 ? "none" : "flex",
            }}
            disabled={posicaoEncontrada == 0 ? true : false}
            onPress={() => {
              handleOpenUrl(playlist[posicaoEncontrada - 1], playlist);
            }}
          >
            <AntDesign
              name={"stepbackward"}
              size={SIZEICON}
              color={
                posicaoEncontrada == 0
                  ? CustomDefaultTheme.colors.cinzaEscuro
                  : "#FFF"
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[seekTime]}
            onPress={() => {
              seek(parseFloat(status.currentTime) - 10);
            }}
          >
            <MaterialIcons name="replay-10" size={SIZEICON} color="#FFF" />
          </TouchableOpacity>
        </View>

        {reload ? (
          <>
            <TouchableOpacity onPress={handleReload}>
              <Entypo name={"reply"} size={SIZEICON} color="#FFF" />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={!pause ? handlePause : handlePlay}>
              <Entypo
                name={!pause ? "controller-paus" : "controller-play"}
                size={SIZEICON}
                color="#FFF"
              />
            </TouchableOpacity>
          </>
        )}

        <View style={[Styles.seekTime]}>
          <TouchableOpacity
            style={[seekTime]}
            onPress={() => {
              seek(parseFloat(status.currentTime) + 10);
            }}
          >
            <MaterialIcons name="forward-10" size={SIZEICON} color={"#FFF"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              display: playlist.length == 0 ? "none" : "flex",
            }}
            disabled={posicaoEncontrada + 1 == playlist.length ? true : false}
            onPress={() => {
              handleOpenUrl(playlist[posicaoEncontrada + 1], playlist);
            }}
          >
            <AntDesign
              name={"stepforward"}
              size={SIZEICON}
              color={
                posicaoEncontrada + 1 == playlist.length
                  ? CustomDefaultTheme.colors.cinzaEscuro
                  : "#FFF"
              }
            />
          </TouchableOpacity>
        </View>
      </>
    );
  }, [pause, finalizado, status, reload, width, height]);

  // No seu componente PlayerV3
  const controllFullscreen = useMemo(() => {
    if (pip) {
      return <></>;
    }

    return (
      <FullScreenControls
        subtituloOpen={subtituloOpenBoolean}
        //subtitulos={item.legenda_video.length > 0 ? item.legenda_video : []}
        subtitulos={legenda_video != undefined ? legenda_video : []}
        subtituloSelecionado={subtituloSelecionado}
        aovivo={aovivo}
        backButton={backButton}
        status={status}
        item={item}
        infos={infos}
        controles={controles}
        handleRate={handleRate}
        handleSubtitulo={handleSubtitulo}
        rateNumber={rateNumber}
        handleShowControlls={handleShowControlls}
        slider={
          <>
            <Slider
              style={[Styles.controllSliderFullScreen]}
              thumbTintColor={CustomDefaultTheme.colors.transparent}
              minimumValue={0}
              maximumValue={
                infos.duration != undefined ? parseInt(infos.duration) : 0
              }
              minimumTrackTintColor={CustomDefaultTheme.colors.bgcarrossel}
              maximumTrackTintColor="#FFF"
              value={
                status.currentTime == undefined
                  ? 0
                  : onSliding
                  ? 0
                  : parseInt(status.currentTime)
              }
              lowerLimit={10}
              onSlidingStart={(e) => {
                setOnSliding(true);
                console.log("start");
              }}
              onSlidingComplete={(e: any) => {
                seek(parseInt(e));
                setTimeout(() => {
                  setOnSliding(false);
                  if (aovivo && aovivo != undefined) {
                    trackerSend();
                  } else {
                    trackerSendOtt(status);
                  }
                }, 100);
              }}
            />
          </>
        }
      />
    );
  }, [pause, finalizado, width, status, reload, pip, subtituloSelecionado]);

  // No seu componente PlayerV3
  const controll16x9 = useMemo(() => {
    if (pip) {
      return <></>;
    }

    return (
      <Controls_16_9
        subtituloOpen={subtituloOpenBoolean}
        settingsOpen={settingsOpenBoolean}
        //subtitulos={item.legenda_video.length > 0 ? item.legenda_video : []}
        subtitulos={legenda_video != undefined ? legenda_video : []}
        subtituloSelecionado={subtituloSelecionado}
        aovivo={aovivo}
        backButton={backButton}
        status={status}
        item={item}
        infos={infos}
        controles={controles}
        handleRate={handleRate}
        handleSubtitulo={handleSubtitulo}
        rateNumber={rateNumber}
        handleShowControlls={handleShowControlls}
        slider={
          <>
            <Slider
              style={Styles.slider}
              thumbTintColor={CustomDefaultTheme.colors.transparent}
              minimumValue={0}
              maximumValue={infos.duration ? parseInt(infos.duration) : 0}
              minimumTrackTintColor={CustomDefaultTheme.colors.bgcarrossel}
              maximumTrackTintColor="#FFF"
              value={
                status.currentTime
                  ? onSliding
                    ? 0
                    : parseInt(status.currentTime)
                  : 0
              }
              onSlidingStart={() => {
                setOnSliding(true);
                console.log("start");
              }}
              onSlidingComplete={(e) => {
                seek(parseInt(e));
                setTimeout(() => {
                  setOnSliding(false);
                  if (aovivo) {
                    trackerSend();
                  } else {
                    trackerSendOtt(status);
                  }
                }, 100);
              }}
            />
          </>
        }
      />
    );
  }, [
    pause,
    finalizado,
    width,
    status,
    pip,
    reload,
    subtituloSelecionado,
    item,
  ]);

  useEffect(() => {
    if (client) {
      handlePause();
    } else {
      handlePlay();
    }
  }, [client]);

  useEffect(() => {
    console.log(
      subtituloSelecionado,
      "selecionadoooooo--->>",
      item.legenda_video,
      item.legenda_video
    );
  }, [subtituloSelecionado, item, subtitulosList]);

  useEffect(() => {
    console.log(HLSERROR, ",,___HLSERROR");
  }, [HLSERROR]);
  
  //useEffect(() => {  console.log(status) },[status])

  return (
    <View style={[pip && Styles.pipView]}>
      {
        <Pressable
          onPress={handleShowControlls}
          style={[
            pip
              ? Styles.pipPressable
              : {
                  backgroundColor: "transparent",
                },
          ]}
        >
          {showControll || onSliding || settingsBoolean ? (
            width > height ? (
              controllFullscreen
            ) : (
              !client && controll16x9
            )
          ) : (
            <>{isLoad && LOADINGCOMPONENTE}</>
          )}

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
              position={status.currentTime}
              showLegenda={showLegenda}
              legendaSelecionada={subtituloSelecionado}
            />
          </View>

          {
            <Video
              ref={video}
              source={{
                uri: HLSERROR ? item.mp4 : item.hls, //'http://www.fookaijafoa.com/'//item.hls,
                //uri:'https://stream-akamai.castr.com/5b9352dbda7b8c769937e459/live_2361c920455111ea85db6911fe397b9e/index.fmp4.m3u8',//'http://www.fookaijafoa.com/'//item.hls,
              }}
              style={[
                pip ? STYLEVIDEOPIP : isTablet ? STYLETABLETVIDEO : STYLEVIDEO,
              ]}
              //poster={item.url_thumb_video}
              minLoadRetryCount={3}
              //controls
              playWhenInactive
              pictureInPicture={true}
              playInBackground={true}
              onProgress={onProgress}
              progressUpdateInterval={1000}
              rate={rateNumber}
              onLoadStart={(event) => {
                //setHLSERROR(false);
                setIsLoad(true);
                if (seek_video != "" && seek_video != undefined)
                  //seek(parseInt(seek_video));
                  console.log(event, "carrega player onloadddd");
              }}
              onBuffer={(event) => {
                console.log(event, "Buffering buffering buffering");
              }}
              onEnd={() => {
                setReload(true);

                if (posicaoEncontrada + 1 !== playlist.length) {
                  handleOpenUrl(playlist[posicaoEncontrada + 1], playlist);
                }
              }}
              onError={(event) => {
                alert(
                  aovivo
                    ? "Erro: Não estamos ao vivo no momento!"
                    : `Erro: HLS com problemas`
                );
                setHLSERROR(true);
                console.log("erro hls -->", event, item.hls);
              }}
              onLoad={(event) => {
                setInfos(event);
                setIsLoad(false);
              }}
              onPlaybackStateChanged={(event) =>
                console.log(event, "<----- status changeeeee")
              }
              resizeMode={pip ? ResizeMode.STRETCH : ResizeMode.CONTAIN}
              poster={{
                source: { uri: item.url_thumb_video },
                resizeMode: "cover",
                // ...
              }}
              /*textTracks={[{
                title: "Spanish Subtitles",
                language: "es",
                type: TextTrackType.SRT, // "application/x-subrip"
                uri: "https://durian.blender.org/wp-content/content/subtitles/sintel_es.srt"
              }]}*/

              //posterResizeMode={ResizeMode.COVER}
              //textTracks={item.legenda_video.length > 0 ? item.legenda_video : []}

              subtitleStyle={{ paddingBottom: 50, fontSize: 20 }}
              selectedTextTrack={subtituloSelecionado}
            />
          }
        </Pressable>
      }
    </View>
  );
};

export default PlayerV3;
