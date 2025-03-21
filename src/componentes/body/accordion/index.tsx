import React, { useContext, useEffect, useState } from "react";
import { View, TouchableOpacity, Animated } from "react-native";
import GoogleCast, { useRemoteMediaClient } from "react-native-google-cast";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import Collapsible from "react-native-collapsible";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import CustomText from "../../componentes/customText"; // Importe o componente CustomText

import styles from "./styles";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";
import FastImage from "react-native-fast-image";
import { montaJsonVideo, trataData } from "../../../configuracoes/utils/utils";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import DownloadButton from "../../botoes/downloadButton";
import { UtilContext } from "../../../configuracoes/contexts/UtilContext";
import Slider from "@react-native-community/slider";
import ProgressoVideo from "../../funcionalidade/ProgressoVideo";
import {
  convertSeconds,
  convertTime,
} from "../../../configuracoes/utils/constants/utils";

type AccordionProps = {
  isPressed: any;
};

const Accordion: React.FC<any | AccordionProps> = ({
  array,
  pagina_origem,
  titulo,
  isExpanded,
  categoria,
  isPressed,
}) => {
  const navigation = useNavigation() as any;
  const { assistidos } = useContext(UtilContext);
  const client = useRemoteMediaClient() as any;
  const [expanded, setExpanded] = useState(
    isExpanded == undefined ? false : true
  );
  const toggleAccordion = () => setExpanded(!expanded);
  const rotateAnimation = useState(new Animated.Value(0))[0];
  const rotateIcon = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const startRotateAnimation = () => {
    Animated.timing(rotateAnimation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const loadMedia = (media: any) => {
    console.log("loadingmedia chromecast");
    try {
      client.loadMedia({
        autoplay: true,
        mediaInfo: {
          contentUrl: media.hls ? media.hls : media.hls_path,
          metadata: {
            images: [
              {
                url: media.url_thumb_video,
              },
            ],
            title: media.titulo_video,
            type: "movie",
          },
        },
      });

      GoogleCast.showExpandedControls();
    } catch (error) {
      console.log(error, "--> cast error");
    }
  };

  const handleOpenUrl = (video, relacionados) => {
    isPressed("apertou");
    if (client) {
      loadMedia(montaJsonVideo(video, "videozoeplay"));
    } else {
      navigation.navigate("PlayerDrawer", {
        item: montaJsonVideo(video, "videozoeplay"),
        relacionados: relacionados,
        aovivo: false,
        isFullScreen: false,
        titulo: "",
        materia: [],
        pagina_origem: pagina_origem,
        categoria: categoria,
      });
    }

    return;
  };

  if (array.videos == undefined) {
    return <></>;
  }

  useEffect(() => {}, [assistidos]);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        style={styles.header}
        onPress={() => {
          toggleAccordion();
          startRotateAnimation();
        }}
      >
        <CustomText textType="montserratBold" style={styles.title}>
          {titulo}
        </CustomText>
        <Animated.View
          style={[styles.icon, { transform: [{ rotate: rotateIcon }] }]}
        >
          <MaterialCommunityIcons name="chevron-down" size={24} color="#FFF" />
        </Animated.View>
      </TouchableWithoutFeedback>
      <Collapsible collapsed={!expanded}>
        {Object.values(array.videos).map((_: any, index) => {
          return (
            <View
              key={_.cod_video}
            >
              <TouchableOpacity
                onPress={() => {
                  handleOpenUrl(_, []);
                }}
                style={{
                  borderBottomWidth: .3,
                  borderBottomColor: '#282828',
                  paddingBottom: 15
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <View
                    style={{
                      height: 50,
                      width: 50,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <View
                      style={{
                        height: 40,
                        width: 40,
                        backgroundColor: CustomDefaultTheme.colors.bottomTab,
                        borderRadius: 99,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CustomText>{index + 1}</CustomText>
                    </View>
                  </View>
                  <FastImage
                    source={{ uri: _.url_thumb_video }} // Substitua pelo URL da imagem retangular desejada
                    style={{
                      width: 120,
                      height: 68,
                      borderRadius: 8,
                      marginRight: 10,
                      backgroundColor:
                        CustomDefaultTheme.colors.backgroundCards,
                    }}
                    resizeMode="cover"
                  >
                    {_.progresso_pct > 95 && (
                      <View
                        style={{
                          position: "absolute",
                          bottom: 15,
                          left: 5,
                          borderRadius: 99,
                        }}
                      >
                        <View
                          style={{
                            position: "absolute",
                            width: 15,
                            height: 15,
                            backgroundColor: "#000",
                            borderRadius: 99,
                            left: 5,
                            top: 2,
                          }}
                        />
                        <MaterialCommunityIcons
                          name="checkbox-marked-circle"
                          size={24}
                          color={CustomDefaultTheme.colors.visto}
                        />
                      </View>
                    )}
                    <ProgressoVideo
                      width={"100%"}
                      height={2}
                      valorTotal={100}
                      valor={parseInt(_.progresso_pct)}
                      style={{
                        position: "absolute",
                        bottom: 0,
                      }}
                    />
                  </FastImage>
                  <View
                    style={{
                      width: "55%",
                      height: "100%",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        display: "none",
                      }}
                    >
                      <View style={[styles.subtituloFonte]}>
                        <CustomText style={styles.subtituloFonteText}>
                          {_.subtitulo_video}
                        </CustomText>
                      </View>

                      <View style={[{ marginLeft: 5 }]}>
                        <DownloadButton
                          color={"#707070"}
                          hls={_.mp4}
                          item={_}
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        top: 3,
                      }}
                    >
                      <View>
                        <CustomText
                          numberOfLines={2}
                          textType="montserratSemiBold"
                          style={{
                            fontSize: 14,
                            color: CustomDefaultTheme.colors.branco,
                            letterSpacing: 0.28,
                            lineHeight: 18,
                          }}
                        >
                          {_.titulo_video}
                        </CustomText>
                        <CustomText
                          numberOfLines={2}
                          textType="montserratRegular"
                          style={{
                            fontSize: 11,
                            color:
                              CustomDefaultTheme.colors.bioapresentadorFont,
                            letterSpacing: 0,
                            lineHeight: 14,
                          }}
                        >
                          {convertSeconds(_.duracao_video)}
                        </CustomText>
                      </View>
                    </View>
                  </View>
                </View>

                <CustomText
                  //numberOfLines={3}
                  textType="montserratRegular"
                  style={{
                    fontSize: 12,
                    color: CustomDefaultTheme.colors.bioapresentadorFont,
                    letterSpacing: 0.12,
                    lineHeight: 15,
                    textAling: "left",
                    marginTop: 5,
                  }}
                >
                  {_.descricao_video}
                </CustomText>
              </TouchableOpacity>
            </View>
          );
        })}
      </Collapsible>
    </View>
  );
};

export default Accordion;
