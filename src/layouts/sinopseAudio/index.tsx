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

// estilos
import Styles from "./Styles";
import PageHeader from "../../componentes/header";
import FastImage from "react-native-fast-image";

// imagem
import CustomText from "../../componentes/componentes/customText";
import { Button } from "react-native-paper";
import CardAudio from "../../componentes/audioPlayer/cardAudio";
import { PlayerContext } from "../../configuracoes/contexts/PlayerContext";
import TrackPlayer from "react-native-track-player";
import { addTracks, removerQueues } from "../../../trackPlayerServices";
import { convertObjetoZoeParaPlaylistReactTrackPlayer } from "../../configuracoes/utils/utils";
import CompartilharButton from "../../componentes/botoes/compartilharButton";

//SVG
import SVGPLAY from "../../assets/svg/icone-play.svg";


const SinopseAudio: React.FC<any> = (props) => {
  const navigation = useNavigation() as any;
  const isFocused = useIsFocused();
  const scrollRef = useRef() as any;
  const { playlist, audios, pagina_origem } = props.route.params;
  const { setExibePlayer, setIsTabRoute, setTocando } = useContext(
    PlayerContext
  );

  useEffect(() => {
    console.log(playlist);
    if (isFocused) {
      setIsTabRoute(false);
    }
  }, [isFocused]);

  const COMPONENTEHEADER = () => {
    return (
      <PageHeader
        headerLeft={
          <TouchableOpacity
            onPress={() => {
              //props.navigation.goBack();
              if(pagina_origem){
                navigation.navigate(pagina_origem);
              }else{
                navigation.navigate("HomeDrawer");
              }
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
                marginTop: -5,
              }}
            >
              <CompartilharButton size={25} array={playlist} tipo={101} background={'transparent'}/>
            </View>
          </View>
        }
      />
    );
  };

  const addTrackCard = async (params: any = null, posicao: any = null) => {
    try {
      let OBJETOPARAMS = await convertObjetoZoeParaPlaylistReactTrackPlayer(
        audios
      );

      await removerQueues();
      await addTracks(OBJETOPARAMS, posicao);

      setExibePlayer(true);
      await TrackPlayer.play();

      return;
    } catch (error) {
      console.log("addtrack error -->", error);
    }
  };

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
            colors={["transparent", "transparent"]}
            start={{ x: 0, y: 0.2 }}
            end={{
              x: 0,
              y: 0.3, //Platform.OS == "ios" ? 0.9 : 0.8,
            }}
            style={[
              {
                height: "100%",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
          >
            <COMPONENTEHEADER />
            <View
              style={[
                Platform.OS == "ios" ? Styles.sombraIos : Styles.sombraAndroid,
              ]}
            >
              <FastImage
                source={{ uri: playlist.url_foto_playlist }}
                style={[
                  {
                    width: 200,
                    height: 202,
                    borderRadius: 20,
                  },
                ]}
                resizeMode="contain"
              />
            </View>

            <View
              style={{
                width: "100%",
                paddingHorizontal: "5%",
                top: wp("5"),
                //backgroundColor: '#FF0'
              }}
            >
              <CustomText
                textType="montserratBold"
                style={{
                  fontSize: 20,
                  color: CustomDefaultTheme.colors.text,
                  letterSpacing: 0.3,
                  lineHeight: 24,
                }}
              >
                {playlist.nome_playlist}
              </CustomText>
              <CustomText
                numberOfLines={3}
                textType="montserratRegular"
                style={{
                  top: 10,
                  fontSize: 13,
                  color: CustomDefaultTheme.colors.text,
                  letterSpacing: 0.2,
                  lineHeight: 16,
                }}
              >
                {playlist.descricao_playlist}
              </CustomText>

              <TouchableOpacity
                style={{
                  //top: 25,
                }}
                onPress={() => addTrackCard(playlist)}
                disabled={audios.length == 0 ? true : false}
              >
                <Button
                  uppercase={false}
                  style={{
                    top: 25,
                    backgroundColor:
                      CustomDefaultTheme.colors.primaryButton,
                    borderRadius: 10,
                    padding: 5
                  }}
                  icon={() => (
                    <>
                      <SVGPLAY width={23} height={23} />
                    </>
                    // victor
                  )}
                >
                  <CustomText
                    textType="montserratBold"
                    style={{ color: CustomDefaultTheme.colors.branco, fontSize: 19 }}
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
              borderBottomColor: CustomDefaultTheme.colors.text,
              maxWidth: 140,
            }}
          >
            <MaterialIcons name="playlist-play" size={40} color={CustomDefaultTheme.colors.buttonPrimary} />
            <CustomText
              textType="montserratBold"
              style={{
                top: 10,
                fontSize: 14,
                color: CustomDefaultTheme.colors.text,
                letterSpacing: 0.21,
                lineHeight: 18,
              }}
            >
              {`${audios.length} Faixas`}
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
          {audios.map((_, index) => {
            return (
              <CardAudio key={index} item={_} index={index} playlist={audios} />
            );
          })}
        </View>
      </Animated.ScrollView>
    </>
  );
};

export default SinopseAudio;
