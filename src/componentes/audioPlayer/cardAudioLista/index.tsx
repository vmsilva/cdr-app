import React, { ReactNode, useContext, useEffect } from "react";
import { View, TouchableOpacity, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import TrackPlayer from "react-native-track-player";
import LottieView from "lottie-react-native";
import FastImage from "react-native-fast-image";

import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

import Styles from "./Styles";
import CustomText from "../../componentes/customText";

import { addTracks, removerQueues } from "../../../../trackPlayerServices";

import LOTTIEWAVE from "../../../assets/lottie/wavegoveduca.json";
import { PlayerContext } from "../../../configuracoes/contexts/PlayerContext";
import DownloadButtonAudio from "../../botoes/downloadButtonAudio";
import ZoeIcone from "../../funcionalidade/ZoeIcone";

//: ReactNode;
interface PageHeaderProps {
  botaominhaListaFilho: ReactNode;
}

const CardAudioLista: React.FC<any | PageHeaderProps> = ({
  item,
  index,
  queue,
  botaominhaListaFilho,
}) => {
  const { setExibePlayer } = useContext(PlayerContext);

  const addTrackCard = async (params: any = null, posicao: any = null) => {
    //alert(index); return;
    try {
      await removerQueues();
      await addTracks(params, posicao);

      if (index != undefined && index > 0) {
        await TrackPlayer.skip(index, 0);
      }
      //setExibePlayer(true);
      await TrackPlayer.play();

      return;
    } catch (error) {
      console.log("addtrack error -->", error);
    }
  };

  return (
    <>
      <View
        style={{
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
              source={{ uri: item.artwork }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 10,
                backgroundColor: CustomDefaultTheme.colors.cinza,
              }}
            />
          </View>

          <View
            style={{
              paddingHorizontal: 15,
              width: "70%",
            }}
          >
            <CustomText
              textType="montserratBold"
              style={{
                fontSize: 13,
                color: CustomDefaultTheme.colors.primaryButton,
              }}
              numberOfLines={2}
            >
              {item.title}
            </CustomText>
            <CustomText
              textType="regular"
              style={{
                top: 2,
                fontSize: 14,
                color: CustomDefaultTheme.colors.text,
                letterSpacing: 0.23,
              }}
              numberOfLines={2}
            >
              {item.genre}
            </CustomText>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {botaominhaListaFilho}

            <View style={{ width: 15 }} />{/*
            <TouchableOpacity style={[Styles.containerIcons]}>
              <DownloadButtonAudio hls={item.url} item={item} />
            </TouchableOpacity>
            */}
            <View style={{ width: 15 }} />
            {index == undefined ? (
              <>
                <LottieView
                  style={{ height: 24, width: 24 }}
                  source={LOTTIEWAVE}
                  autoPlay
                  loop
                  colorFilters={[
                    {
                      keypath: "Red Heart",
                      color: CustomDefaultTheme.colors.bgcarrossel,
                    },
                    {
                      keypath: "Grey Heart",
                      color: CustomDefaultTheme.colors.bgcarrossel,
                    },
                  ]}
                />
              </>
            ) : (
              <TouchableOpacity 
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: CustomDefaultTheme.colors.primaryButton,
                  width: 30,
                  height: 30,
                  borderRadius: 80
                }}
                onPress={() => addTrackCard(queue)}>
                <ZoeIcone width={15} height={15} name="icone-play" />
                
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </>
  );
};

export default CardAudioLista;

/*
 <AntDesign
                  name="play"
                  size={24}
                  color={CustomDefaultTheme.colors.primaryButton}
                />

*/