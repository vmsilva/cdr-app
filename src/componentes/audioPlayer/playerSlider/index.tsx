import React, {
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useMemo,
  useState,
} from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Animated,
  Platform,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  FontAwesome,
} from "@expo/vector-icons";
import TrackPlayer, {
  State,
  Event,
  useTrackPlayerEvents,
  useProgress,
} from "react-native-track-player";
import { useIsFocused } from "@react-navigation/native";
import BottomSheet from "@gorhom/bottom-sheet";
import FastImage from "react-native-fast-image";
import MarqueeText from "react-native-marquee";
import { ActivityIndicator } from "react-native-paper";
import Slider from "@react-native-community/slider";
import LinearGradient from "react-native-linear-gradient";

// componentes
import styles from "./styles";
import CustomText from "../../componentes/customText";

// Service
import { playbackService } from "../../../../trackPlayerServices";
import { PlayerContext } from "../../../configuracoes/contexts/PlayerContext";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";
import { msToHMS } from "../../../configuracoes/utils/utils";

import PortalComponente from "../../funcionalidade/Portal";
import CardAudioLista from "../cardAudioLista";
import MinhaListaButtonAudio from "../../botoes/minhaListaButtonAudio";
import DownloadButtonAudio from "../../botoes/downloadButtonAudio";
import CompartilharButton from "../../botoes/compartilharButton";
import { UtilContext } from "../../../configuracoes/contexts/UtilContext";
import { useAuth } from "../../../configuracoes/hooks/auth";
import { postData } from "../../../configuracoes/services/request";

//SVG
import SVGPLAY from "../../../assets/svg/icone-play.svg";
import SVGPAUSE from "../../../assets/svg/icone-pausar.svg";

interface PageHeaderProps {
  title: string;
  topButton: ReactNode;
  scroll: boolean;
}

const events = [Event.PlaybackState, Event.PlaybackError];

const screenHeight = Dimensions.get("screen").height;
TrackPlayer.registerPlaybackService(() => playbackService);
const TEMPOWATHING = 10;
const PlayerSlider: React.FC<PageHeaderProps | any> = ({ tab }) => {
  const isFocused = useIsFocused();
  const sheetRef = useRef<any>(null);
  const { user } = useAuth();
  const { position, duration } = useProgress();
  const { tocando, exibePlayer } = useContext(PlayerContext);
  const { setMinhaListaAudio, meusAudios, setMeusAudios } = useContext(
    UtilContext
  );
  const [enviarTracker, setEnviarTracker] = useState(true);
  const [portalListaOpen, setPortalListaOpen] = useState(false);
  // variables
  const snapPoints = useMemo(() => ["1%", "100%"], []);
  const [trackAtual, setTrackAtual] = useState<any>([]);
  const [playerState, setPlayerState] = useState(null);
  const [playerState2, setPlayerState2] = useState(null);
  const [queue, setQueue] = useState<any>([]);
  const [rate, setRate] = useState<number>(1);
  const [indicator, setIndicator] = useState<any>("down");
  const bottomPosition = useRef(new Animated.Value(10)).current;
  const bottomPositionIndicador = useRef(new Animated.Value(10)).current;

  const isPlaying = playerState === State.Playing;

  useTrackPlayerEvents(events, async (event) => {
    try {
      if (event.type === Event.PlaybackError) {
        console.warn(
          `An error occured while playing the current track.`,
          Event.PlaybackError
        );
      }
      if (event.type === Event.PlaybackState) {
        setPlayerState2(event.state);
      }
    } catch (error) {
      console.log(error, "--> erro events");
    }
  });

  useTrackPlayerEvents(events, async (event) => {
    if (event.type === Event.PlaybackError) {
      console.warn("An error occured while playing the current track.");
    }
    if (event.type === Event.PlaybackState) {
      setPlayerState(event.state);
    }
  });

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
    try {
      if (
        event.type === Event.PlaybackTrackChanged &&
        event.nextTrack != null
      ) {
        const track = await TrackPlayer.getTrack(event.nextTrack);
        const queue = await TrackPlayer.getQueue();

        setQueue(queue);
        setTrackAtual(track != null ? track : []);
      }
    } catch (error) {
      console.log(error), "<-- useTrackPlayerEvents";
    }
  });

  useTrackPlayerEvents([Event.PlaybackProgressUpdated], async (event) => {
    try {
      if (trackAtual.length == 0) {
        const queue = await TrackPlayer.getQueue();
        setTrackAtual(queue[event.track]);
        setQueue(queue);
      }
    } catch (error) {
      console.log(error, "<-- useTrackPlayerEvents");
    }
  });

  useEffect(() => {
    return () => {};
  }, [isPlaying, playerState, isFocused, exibePlayer]);

  const trackAnterior = async () => {
    try {
      await TrackPlayer.skipToPrevious();
    } catch (error) {
      console.log(error);
    }
  };

  const trackProxima = async () => {
    try {
      await TrackPlayer.skipToNext();
    } catch (error) {
      console.log(error);
    }
  };

  const renderHeader = () => (
    <View style={{ backgroundColor: "#FF0", height: 200 }}>
      {/* conteúdo do cabeçalho */}
    </View>
  );

  const play = async () => {
    try {
      await TrackPlayer.play();
    } catch (error) {
      console.log(error, "play error");
    }
  };

  const pause = async () => {
    try {
      await TrackPlayer.pause();
    } catch (error) {
      console.log(error, "pauseeeee error");
    }
  };

  const setRating = async (rate) => {
    try {
      await TrackPlayer.setRate(rate);
      setRate(rate);
    } catch (error) {
      console.log(error, "rateeeeee");
    }
  };

  const sliderSeek = async (POSICAO) => {
    try {
      await TrackPlayer.seekTo(POSICAO);
    } catch (error) {
      console.log(error);
    }
  };

  const startAnimationIndicadorUp = () => {
    Animated.timing(bottomPositionIndicador, {
      toValue: Platform.OS == "ios" ? 179 : 155,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const startAnimationIndicadorDown = () => {
    Animated.timing(bottomPositionIndicador, {
      toValue: Platform.OS == "ios" ? 115 : 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const startAnimationUp = () => {
    setIndicator("down");
    Animated.timing(bottomPosition, {
      toValue: Platform.OS == "ios" ? 90 : 60,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const startAnimationDown = () => {
    setIndicator("down");
    Animated.timing(bottomPosition, {
      toValue: Platform.OS == "ios" ? 25 : 5,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const startAnimationHide = () => {
    setIndicator("up");
    Animated.timing(bottomPosition, {
      toValue: -195,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const trackerSend = async () => {
    try {
      let parametros = {
        rota: `/rt/audiolistening`,
        parametros: {
          token: user.token,
          cod_playlist_audio: trackAtual.cod_playlist_audio,
          duracao: trackAtual.duration,
          assistido: parseInt(position),
          play: 1,
          device: "app",
        },
        showNotification: false,
        showLogError: true,
      };

      (await postData(parametros)) as any;

      console.log("hit audioplayer");
      return;
    } catch (error) {
      console.log(error, "tracksend ->> audio");
    }
  };

  useEffect(() => {
    if (tocando != "") {
      startAnimationHide();
    } else {
      if (tab) {
        startAnimationUp();
        startAnimationIndicadorUp();
      } else {
        startAnimationDown();
        startAnimationIndicadorDown();
      }
    }
  }, [tab, tocando]);

  React.useEffect(() => {
    const timeoutID = window.setTimeout(() => {
      setEnviarTracker(!enviarTracker);
      trackerSend();
    }, TEMPOWATHING * 1000);

    return () => window.clearTimeout(timeoutID);
  }, [enviarTracker]);

  const COMPONENTEPORTAL = useMemo(() => {
    return (
      <PortalComponente
        children={
          <View
            style={{
              backgroundColor: CustomDefaultTheme.colors.background,
            }}
          >
            <View
              style={{
                paddingHorizontal: "5%",
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                position: "absolute",
                top: "5%",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setPortalListaOpen(false);
                }}
              >
                <View
                  style={{
                    backgroundColor: CustomDefaultTheme.colors.transparent,
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
              <CustomText style={{ color: CustomDefaultTheme.colors.text }}>
                Playlist
              </CustomText>
              <View style={{ width: 40, height: 40 }} />
            </View>

            <View
              style={{
                top: "12%",
                flex: 1,
              }}
            >
              <View
                style={{
                  width: wp("100"),
                  paddingHorizontal: "5%",
                }}
              >
                <CustomText
                  textType="bold"
                  style={{
                    fontSize: 17,
                    color: CustomDefaultTheme.colors.text,
                  }}
                >
                  Tocando Agora
                </CustomText>
                <CardAudioLista
                  item={trackAtual}
                  botaominhaListaFilho={<></>}
                />

                <CustomText
                  textType="bold"
                  style={{
                    marginTop: 30,
                    fontSize: 17,
                    color: CustomDefaultTheme.colors.text,
                  }}
                >
                  Próximo a Tocar
                </CustomText>
              </View>

              <FlatList
                contentContainerStyle={{
                  paddingBottom: 200,
                  width: wp("100%"),
                  paddingHorizontal: "5%",
                }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={queue}
                horizontal={false} // Define a lista como horizontal
                renderItem={({ item, index }) => {
                  return (
                    <CardAudioLista
                      item={item}
                      index={index}
                      queue={queue}
                      botaominhaListaFilho={<></>}
                    />
                  );
                }}
              />
            </View>
          </View>
        }
      />
    );
  }, [trackAtual, queue]);

  const COMPONENTEMEMOMARQUEE = useMemo(() => {
    return (
      <>
        <View
          style={{
            top: wp("5"),
            width: "95%",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                width: "90%",
              }}
            >
              <MarqueeText
                speed={0.1}
                marqueeOnStart={true}
                loop={true}
                delay={100}
              >
                <CustomText
                  textType="montserratBold"
                  style={{
                    fontSize: 18,
                    letterSpacing: 0.36,
                    lineHeight: 22,
                    color: CustomDefaultTheme.colors.textBottomsheetPlayerAudio,
                  }}
                >
                  {trackAtual.title}
                </CustomText>
              </MarqueeText>
              <MarqueeText
                speed={0.1}
                marqueeOnStart={true}
                loop={true}
                delay={100}
              >
                <CustomText
                  textType="montserratRegular"
                  style={{ fontSize: 14, letterSpacing: 0.14, lineHeight: 18 }}
                >
                  {trackAtual.genre}
                </CustomText>
              </MarqueeText>
            </View>
            <View
              style={{
                width: "10%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <DownloadButtonAudio
                hls={trackAtual.url}
                item={trackAtual}
                background={CustomDefaultTheme.colors.buttonPrimary}
              />
              {/*<MinhaListaButtonAudio
                cod_playlist_audio={trackAtual.cod_playlist_audio}
                color={'#FFF'}
            />*/}
            </View>
          </View>
        </View>
      </>
    );
  }, [trackAtual, queue]);

  const MARQUEECOMPONENTESLIDER = useMemo(() => {
    return (
      <>
        <View
          style={{
            paddingHorizontal: 15,
            width: "85%",
          }}
        >
          <MarqueeText
            speed={0.1}
            marqueeOnStart={true}
            loop={true}
            delay={100}
          >
            <CustomText
              textType="bold"
              style={{
                fontSize: 10,
                color: CustomDefaultTheme.colors.primaryButton,
              }}
              numberOfLines={2}
            >
              {trackAtual.title}
            </CustomText>
          </MarqueeText>
          <MarqueeText
            speed={0.1}
            marqueeOnStart={true}
            loop={true}
            delay={100}
          >
            <CustomText
              numberOfLines={2}
              textType="bold"
              style={{
                top: 2,
                fontSize: 15,
                color: CustomDefaultTheme.colors.branco,
                letterSpacing: 0.23,
              }}
            >
              {trackAtual.title}
            </CustomText>
          </MarqueeText>
        </View>
      </>
    );
  }, [trackAtual]);

  const COMPONENTEMEMOBOTTOMSHEET = useMemo(() => {
    return (
      <>
        <BottomSheet
          containerHeight={hp("100%")}
          backgroundComponent={renderHeader}
          ref={sheetRef}
          snapPoints={snapPoints}
          topInset={-25}
          handleIndicatorStyle={{ backgroundColor: "transparent" }}
        >
          <LinearGradient
            colors={[
              CustomDefaultTheme.colors.background,
              CustomDefaultTheme.colors.background,
              //"transparent",
              //CustomDefaultTheme.colors.background,
            ]}
            start={{ x: 0, y: 0 }}
            end={{
              x: 0,
              y: 0.9, //Platform.OS == "ios" ? 0.9 : 0.8,
            }}
            style={{
              backgroundColor: CustomDefaultTheme.colors.background,
              height: "100%",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                paddingHorizontal: "5%",
                marginTop: "15%",
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={{
                  width: 40,
                  height: 40,
                }}
                onPress={() => {
                  sheetRef.current.collapse();
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    borderRadius: 199,
                    paddingRight: 3,
                  }}
                >
                  <MaterialCommunityIcons
                    name="chevron-down"
                    size={40}
                    color={CustomDefaultTheme.colors.cinzaEscuro}
                  />
                </View>
              </TouchableOpacity>
              <View
                style={{
                  width: "80%",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  paddingRight: 3,
                }}
              >
                <CustomText
                  style={{
                    color: CustomDefaultTheme.colors.text,
                  }}
                >
                  {trackAtual.title}
                </CustomText>
              </View>

              <View style={{ width: 40, height: 40 }} />
            </View>
            <View
              style={{
                flex: 1,
                paddingTop: "5%",
              }}
            >
              <View
                style={{
                  padding: 16,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View
                  style={[
                    {
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 2,
                    },
                    Platform.OS == "ios"
                      ? styles.sombraIos
                      : styles.sombraAndroid,
                  ]}
                >
                  <FastImage
                    style={{
                      backgroundColor: CustomDefaultTheme.colors.cinza,
                      borderRadius: 10,
                      width: 365, //screenHeight < 750 ? wp("90") : wp("90"),
                      height: 366, //screenHeight < 750 ? ("80%") : ("100%"),
                    }}
                    source={{ uri: trackAtual.artwork }}
                    resizeMode={
                      screenHeight < 750
                        ? FastImage.resizeMode.cover
                        : FastImage.resizeMode.cover
                    }
                  ></FastImage>
                </View>

                {COMPONENTEMEMOMARQUEE}

                <View
                  style={{
                    width: "95%",
                    top: 40,
                  }}
                >
                  <Slider
                    style={{ width: "100%", height: 30 }}
                    minimumValue={0}
                    maximumValue={duration}
                    value={position}
                    minimumTrackTintColor={
                      CustomDefaultTheme.colors.primaryButton
                    }
                    maximumTrackTintColor={CustomDefaultTheme.colors.cinza}
                    thumbTintColor={CustomDefaultTheme.colors.primaryButton}
                    onSlidingComplete={(e) => {
                      sliderSeek(e);

                      if (playerState == "paused" || playerState == "ready") {
                        TrackPlayer.play();
                      }
                    }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <CustomText
                      textType="montserratRegular"
                      style={{
                        color: CustomDefaultTheme.colors.text,
                        fontSize: 13,
                        letterSpacing: 0.13,
                        lineHeight: 16,
                      }}
                    >
                      {msToHMS(position * 1000)}
                    </CustomText>
                    <CustomText
                      textType="montserratRegular"
                      style={{
                        color: CustomDefaultTheme.colors.text,
                        fontSize: 13,
                        letterSpacing: 0.13,
                        lineHeight: 16,
                      }}
                    >
                      {msToHMS(duration * 1000)}
                    </CustomText>
                  </View>
                </View>

                <View
                  style={{
                    width: "95%",
                    top: 70,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: 35,
                        height: 35,
                        backgroundColor:
                          CustomDefaultTheme.colors.buttonPrimary,
                        borderRadius: 99,
                      }}
                    >
                      <TouchableOpacity
                        style={{}}
                        onPress={() => {
                          if (rate == 1) {
                            setRating(1.5);
                          }
                          if (rate == 1.5) {
                            setRating(2);
                          }

                          if (rate == 2) {
                            setRating(0.5);
                          }

                          if (rate == 0.5) {
                            setRating(1);
                          }
                        }}
                      >
                        <CustomText
                          textType="montserratBold"
                          style={{
                            color: CustomDefaultTheme.colors.branco,
                            fontSize: 14,
                          }}
                        >
                          {`${rate}x`}
                        </CustomText>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      onPress={() => {
                        sliderSeek(position > 10 ? position - 10 : 0);
                      }}
                    >
                      <MaterialCommunityIcons
                        name="rewind-10"
                        size={22}
                        color={CustomDefaultTheme.colors.cinzaEscuro}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        trackAnterior();
                      }}
                    >
                      <MaterialCommunityIcons
                        name="skip-previous"
                        size={45}
                        color={CustomDefaultTheme.colors.cinzaEscuro}
                      />
                    </TouchableOpacity>

                    {playerState2 == null ||
                    playerState2 == "connecting" ||
                    playerState2 == "buffering" ||
                    playerState2 == "ready" ? (
                      <ActivityIndicator
                        size={65}
                        color={CustomDefaultTheme.colors.primary}
                      />
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          if (isPlaying) {
                            pause();
                          } else {
                            play();
                          }
                        }}
                        style={{
                          width: 65,
                          height: 65,
                          backgroundColor:
                            CustomDefaultTheme.colors.primaryButton,
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 99,
                          paddingLeft: 1,
                        }}
                      >
                        {isPlaying ? (
                          <SVGPAUSE width={30} height={30} />
                        ) : (
                          <SVGPLAY width={30} height={30} />
                        )}
                      </TouchableOpacity>
                    )}

                    <TouchableOpacity
                      onPress={() => {
                        trackProxima();
                        //sliderSeek(position > 15 ? position - 15 : 0);
                      }}
                    >
                      <MaterialCommunityIcons
                        name="skip-next"
                        size={45}
                        color={CustomDefaultTheme.colors.cinzaEscuro}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        sliderSeek(position + 10);
                      }}
                    >
                      <MaterialCommunityIcons
                        name="fast-forward-10"
                        size={22}
                        color={CustomDefaultTheme.colors.cinzaEscuro}
                      />
                    </TouchableOpacity>
                    <View style={{ width: 35 }} />
                  </View>
                </View>

                <View
                  style={{
                    width: "95%",
                    marginTop: 120,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View />

                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <CompartilharButton array={trackAtual} tipo={101} />
                      <View style={{ width: 20 }} />
                      <TouchableOpacity style={[styles.containerIcons]}>
                        <TouchableOpacity
                          onPress={() => {
                            setTrackAtual(trackAtual);
                            setPortalListaOpen(true);
                          }}
                        >
                          <FontAwesome5 name="bars" size={18} color="#FFF" />
                        </TouchableOpacity>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </LinearGradient>
        </BottomSheet>
      </>
    );
  }, [isPlaying, playerState2, position, duration, trackAtual]);

  const COMPONENTESLIDERBOTOESCOMPONENTE = useMemo(() => {
    return (
      <>
        <Animated.View
          style={{
            backgroundColor: CustomDefaultTheme.colors.sliderTrackplayer,
            height: 30,
            width: 30,
            position: "absolute",
            bottom: bottomPositionIndicador,
            right: "4.3%",
            borderRadius: 10,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              let posicao = Number.parseInt(JSON.stringify(bottomPosition));

              if (posicao == -195) {
                //if (tocando == "") {
                if (tab) {
                  startAnimationUp();
                } else {
                  startAnimationDown();
                }
              } else {
                startAnimationHide();
              }
            }}
          >
            <MaterialCommunityIcons
              name={indicator == "up" ? "chevron-up" : "chevron-down"}
              size={25}
              color="#FFF"
            />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[
            {
              width: wp("100"),
              paddingHorizontal: "2.5%",
              position: "absolute",
              bottom: bottomPosition,
            },
          ]}
        >
          <TouchableOpacity onPress={() => sheetRef.current?.expand()}>
            <View
              style={{
                paddingHorizontal: 15,
                backgroundColor: CustomDefaultTheme.colors.sliderTrackplayer,
                borderRadius: 10,
                paddingVertical: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    width: "60%",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        width: 61,
                        height: 63,
                      }}
                    >
                      <View style={[]}>
                        <FastImage
                          resizeMode="cover"
                          source={{ uri: trackAtual.artwork }}
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 10,
                            backgroundColor: CustomDefaultTheme.colors.cinza,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {playerState2 == null ||
                            playerState2 == "connecting" ||
                            playerState2 == "buffering" ||
                            (playerState2 == "ready" && ( //!isPlayingReady ?
                              <ActivityIndicator size={20} color="#FFF" />
                            ))}
                        </FastImage>
                      </View>
                    </View>
                    {MARQUEECOMPONENTESLIDER}
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "30%",
                  }}
                >
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <MinhaListaButtonAudio
                        cod_playlist_audio={trackAtual.cod_playlist_audio}
                        color={"#FFF"}
                        background={"#1b305c"}
                      />
                      <View style={{ width: 10 }} />
                      <TouchableOpacity style={[styles.containerIcons]}>
                        <DownloadButtonAudio
                          background={"#1b305c"}
                          color={CustomDefaultTheme.colors.buttonPrimary}
                          hls={trackAtual.url}
                          item={trackAtual}
                        />
                      </TouchableOpacity>
                      <View style={{ width: 10 }} />

                      {playerState2 == null ||
                      playerState2 == "connecting" ||
                      playerState2 == "buffering" ||
                      playerState2 == "ready" ? ( //!isPlayingReady ?
                        <View
                          style={{
                            width: 35,
                          }}
                        >
                          <ActivityIndicator size={20} color="#FFF" />
                        </View>
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            if (isPlaying) {
                              pause();
                            } else {
                              play();
                            }
                          }}
                          //style={[{ width: 35, height: 35 }]}
                          style={{
                            width: 40,
                            height: 40,
                            backgroundColor:
                              CustomDefaultTheme.colors.transparent,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 99,
                          }}
                        >
                          {isPlaying ? (
                            <SVGPAUSE width={23} height={23} />
                          ) : (
                            <SVGPLAY width={23} height={23} />
                          )}
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={[
                  Platform.OS == "ios" && {
                    height: 5,
                    //backgroundColor: '#F00',width: '100%'
                  },
                ]}
              >
                <Slider
                  //vertical
                  style={{ top: Platform.OS == "ios" ? -9 : 0 }}
                  thumbTintColor={CustomDefaultTheme.colors.transparent}
                  minimumValue={0}
                  maximumValue={duration}
                  minimumTrackTintColor={CustomDefaultTheme.colors.sliderColor}
                  maximumTrackTintColor={CustomDefaultTheme.colors.transparent}
                  value={position}
                  lowerLimit={0}
                  onSlidingStart={(e) => {}}
                  onSlidingComplete={(e) => {
                    sliderSeek(e);

                    if (playerState == "paused" || playerState == "ready") {
                      TrackPlayer.play();
                    }
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </>
    );
  }, [
    isPlaying,
    playerState2,
    position,
    duration,
    trackAtual,
    tocando,
    indicator,
  ]);

  if (!exibePlayer) {
    return <></>;
  }

  return (
    <>
      {COMPONENTESLIDERBOTOESCOMPONENTE}

      {COMPONENTEMEMOBOTTOMSHEET}

      {portalListaOpen && COMPONENTEPORTAL}
    </>
  );
};

export default PlayerSlider;
