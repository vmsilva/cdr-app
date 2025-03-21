import React, { useContext } from "react";
import { View, TouchableOpacity, Alert } from "react-native";
import FastImage from "react-native-fast-image";
import TrackPlayer from "react-native-track-player";

import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

import Styles from "./Styles";
import CustomText from "../../componentes/customText";

import { PlayerContext } from "../../../configuracoes/contexts/PlayerContext";
import { addTracks, removerQueues } from "../../../../trackPlayerServices";
import {
  converterData,
  segundosParaMinutos,
  convertObjetoZoeParaPlaylistReactTrackPlayer,
} from "../../../configuracoes/utils/utils";
import DownloadButtonAudio from "../../botoes/downloadButtonAudio";
import MinhaListaButtonAudio from "../../botoes/minhaListaButtonAudio";
import { UtilContext } from "../../../configuracoes/contexts/UtilContext";
import CompartilharButton from "../../botoes/compartilharButton";

//SVG
import SVGPLAY from "../../../assets/svg/icone-play.svg";

const CardAudio: React.FC<any> = ({ item, index, playlist }) => {
  const { setExibePlayer } = useContext(PlayerContext);
  const { continuarAssistindoAudio } = useContext(UtilContext);

  const addTrackCard = async (
    params: any = null,
    posicao: any = null,
    segundos: any = null
  ) => {
    //console.log(item, index); return;
    try {
      let OBJETOPARAMS = await convertObjetoZoeParaPlaylistReactTrackPlayer(
        playlist
      );
      await removerQueues();
      await addTracks(OBJETOPARAMS, posicao);
      //await addTracks(params, posicao);
      if (segundos != null) {
        await TrackPlayer.seekTo(segundos);
      }

      setExibePlayer(true);

      await TrackPlayer.play();
      return;
    } catch (error) {
      console.log("addtrack error --> cardAudio", error);
    }
  };

  return (
    <>
      <View
        style={{
          borderColor: CustomDefaultTheme.colors.bottomTab,
          borderBottomWidth: 0.2,
          width: "100%",
          paddingVertical: 10,
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
            <FastImage
              resizeMode="cover"
              source={{ uri: item.url_foto_playlist }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 10,
                backgroundColor: CustomDefaultTheme.colors.bottomTab,
              }}
            />
          </View>
          <View
            style={{
              paddingHorizontal: 15,
              width: "85%",
            }}
          >
            <CustomText
              textType="montserratBold"
              style={{
                fontSize: 14,
                color: CustomDefaultTheme.colors.iconsPrimaryColor,
                letterSpacing: 0.21,
                lineHeight: 18,
              }}
            >
              {item.etiqueta_playlist_audio}
            </CustomText>
            <CustomText
              numberOfLines={2}
              textType="montserratBold"
              style={{
                fontSize: 14,
                color: CustomDefaultTheme.colors.text,
                letterSpacing: 0.21,
                lineHeight: 18,
              }}
            >
              {item.titulo_playlist_audio}
            </CustomText>
            <CustomText
              textType="montserratRegular"
              style={{
                fontSize: 12,
                color: CustomDefaultTheme.colors.bioapresentadorFont,
              }}
            >
              {converterData(item.data_playlist_audio)}{" "}
              {segundosParaMinutos(item.json_mp3_playlist.duration)}
            </CustomText>
            <CustomText
              numberOfLines={2}
              textType="montserratLight"
              style={{
                display: "none",
                top: 2,
                fontSize: 15,
                color: CustomDefaultTheme.colors.text,
                letterSpacing: 0.23,
              }}
            >
              {item.descricao_playlist_audio}
            </CustomText>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MinhaListaButtonAudio
              cod_playlist_audio={item.cod_playlist_audio}
              color={"#FFF"}
              background={CustomDefaultTheme.colors.backgroundIconsButton}
            />
            <View style={{ width: 15 }} />
            <TouchableOpacity style={[Styles.containerIcons]}>
              <DownloadButtonAudio
                background={CustomDefaultTheme.colors.backgroundIconsButton}
                hls={item.url_mp3}
                item={{
                  cod_playlist_audio: item.cod_playlist_audio,
                  cod_playlist: item.cod_playlist,
                  url: item.url_mp3,
                  title: item.titulo_playlist_audio,
                  artist: item.titulo_playlist_audio,
                  album: item.descricao_playlist_audio,
                  genre: item.descricao_playlist_audio,
                  date: item.data_playlist_audio, // RFC 3339
                  artwork: item.url_foto_playlist,
                  duration: item.json_mp3_playlist.duration,
                }}
              />
            </TouchableOpacity>
            <View style={{ width: 15 }} />
            <CompartilharButton
              background={CustomDefaultTheme.colors.backgroundIconsButton}
              array={{
                cod_playlist_audio: item.cod_playlist_audio,
                cod_playlist: item.cod_playlist,
                url: item.url_mp3,
                title: item.titulo_playlist_audio,
                artist: item.titulo_playlist_audio,
                album: item.descricao_playlist_audio,
                genre: item.descricao_playlist_audio,
                date: item.data_playlist_audio, // RFC 3339
                artwork: item.url_foto_playlist,
                duration: item.json_mp3_playlist.duration,
              }}
              tipo={101}
            />
          </View>
          <View>
            <TouchableOpacity
              style={{
                width: 50,
                height: 50,
                backgroundColor: CustomDefaultTheme.colors.primaryButton,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 99,
              }}
              //onPress={() => addTrackCard(playlist, index)}
              onPress={() => {
                if (
                  continuarAssistindoAudio[item.cod_playlist_audio] != undefined
                ) {
                  if (
                    continuarAssistindoAudio[item.cod_playlist_audio]
                      .assistido != undefined
                  ) {
                    Alert.alert(
                      "Continuar audio de onde parou?",
                      "", //item.name,
                      [
                        {
                          text: "Sim",
                          onPress: () => {
                            addTrackCard(
                              playlist,
                              index,
                              parseInt(
                                continuarAssistindoAudio[
                                  item.cod_playlist_audio
                                ].assistido
                              )
                            );
                          }, //removeLocalFile(item),
                        },
                        {
                          text: "Reproduzir do inicio",
                          onPress: () => {
                            addTrackCard(playlist, index);
                          },
                        },
                      ],
                      {
                        cancelable: true,
                        onDismiss: () => {},
                      }
                    );

                    return;
                  }
                }

                addTrackCard(playlist, index);
              }}
            >
              <SVGPLAY width={23} height={23} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default CardAudio;
