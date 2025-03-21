import React, { useRef, useState, useEffect, useContext } from "react";
import { View, Platform, TouchableOpacity, Animated } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomDefaultTheme } from "../../configuracoes/styles/Theme";
import { useIsFocused, useNavigation } from "@react-navigation/native";

// config
import { getData } from "../../configuracoes/services/request";

// estilos
import Styles from "./Styles";
import PageHeader from "../../componentes/header";
import FastImage from "react-native-fast-image";

// imagem
import IMGPODCASTCAT from "../../assets/audiocapa.png";
import CustomText from "../../componentes/componentes/customText";
import { Button } from "react-native-paper";
import CardAudio from "../../componentes/audioPlayer/cardAudio";
import { PlayerContext } from "../../configuracoes/contexts/PlayerContext";
import TrackPlayer from "react-native-track-player";
import { addTracks, removerQueues } from "../../../trackPlayerServices";
import { playlist } from "../../configuracoes/utils/constants/playlist";

const SinopseAudio: React.FC<any> = (props) => {
  const navigation = useNavigation() as any;
  const isFocused = useIsFocused();
  const scrollRef = useRef() as any;
  //const { playlist, audios } = props.route.params;

  const { setExibePlayer, setIsTabRoute, setTocando } = useContext(PlayerContext);

  useEffect(() => {
    if(isFocused){
      setIsTabRoute(false);
    }
  } ,[isFocused])

  const COMPONENTEHEADER = () => {
    return (
      <PageHeader
        headerLeft={
          <TouchableOpacity
            onPress={() => {
              //props.navigation.goBack();
              navigation.navigate("HomeDrawer");
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

  const addTrackCard = async (params: any = null, posicao: any = null) => {
    try {

      await removerQueues();
      await addTracks(params, posicao);

      setExibePlayer(true);
      await TrackPlayer.play();

      return;
    } catch (error) {
      console.log("addtrack error -->", error);
    }
  };

  const FAKE = [1, 2, 3, 4, 5, 6, 7];

  return (
    <>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: CustomDefaultTheme.colors.background,
        }}
      >
        <View style={[Styles.bannerContainer]}>
          <LinearGradient
            colors={["#A7A7A7", "transparent"]}
            start={{ x: 0, y: 0 }}
            end={{
              x: 0,
              y: 0.9, //Platform.OS == "ios" ? 0.9 : 0.8,
            }}
            style={{
              height: "100%",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <COMPONENTEHEADER />
            <FastImage
              source={IMGPODCASTCAT}
              style={{
                width: 200,
                height: 202,
              }}
            />

            <View
              style={{
                width: "100%",
                paddingHorizontal: "5%",
                top: wp("5"),
              }}
            >
              <CustomText
                textType="bold"
                style={{
                  fontSize: 24,
                  color: "#000",
                }}
              >
                O Assunto
              </CustomText>
              <CustomText
                textType="regular"
                style={{
                  top: 10,
                  fontSize: 15,
                  color: "#000",
                  letterSpacing: 0.23,
                }}
              >
                Programa diário da Rádio Assembleia Legislativa de Mato Grosso
              </CustomText>

              <TouchableOpacity
                style={{
                  top: 25,
                }}
                onPress={() => addTrackCard(playlist)}
              >
                <Button
                  uppercase={false}
                  style={{
                    top: 25,
                    backgroundColor: "#004147",
                    borderRadius: 10,
                  }}
                  icon={() => (
                    <FontAwesome name="play" size={23} color="#FFF" />
                  )}
                >
                  <CustomText
                    textType="bold"
                    style={{ color: "#FFF", fontSize: 19 }}
                  >
                    Reproduzir
                  </CustomText>
                </Button>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        <View
          style={{
            width: "100%",
            paddingHorizontal: "5%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 3,
              borderBottomColor: "#000",
              maxWidth: 140,
            }}
          >
            <MaterialIcons name="playlist-play" size={40} color="black" />
            <CustomText
              textType="bold"
              style={{
                top: 10,
                fontSize: 15,
                color: "#000",
                letterSpacing: 0.23,
              }}
            >
              10 episódios
            </CustomText>
          </View>
          <View style={{ height: 20 }} />
        </View>

        <View
          style={{
            width: "100%",
            paddingHorizontal: "5%",
            paddingBottom: 20,
          }}
        >
          {FAKE.map((_, index) => {
            return <CardAudio key={index} item={[]} index={index} />;
          })}
        </View>
      </Animated.ScrollView>
    </>
  );
};

export default SinopseAudio;
