import React, { useState } from "react";
import { View, TouchableOpacity, Animated } from "react-native";
import GoogleCast, { useRemoteMediaClient } from "react-native-google-cast";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Slider from "@react-native-community/slider";
import FastImage from "react-native-fast-image";

import styles from "./styles";
import CustomText from "../../componentes/customText"; // Importe o componente CustomText
import DownloadButton from "../../botoes/downloadButton";

import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";
import { montaJsonVideo } from "../../../configuracoes/utils/utils";

const CARDITEM: React.FC<any> = ({
  item,
  isFullScreen,
  pagina_origem,
  categoria,
  showDownloadButton,
}) => {
  const navigation = useNavigation() as any;
  const client = useRemoteMediaClient() as any;
  const [expanded, setExpanded] = useState(false);
  const toggleAccordion = () => setExpanded(!expanded);
  const rotateAnimation = useState(new Animated.Value(0))[0];
  const rotateIcon = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const ITEMTRATADO = montaJsonVideo(item, "videozoeplay") as any;

  const loadMedia = (media: any) => {
    client.loadMedia({
      autoplay: true,
      mediaInfo: {
        contentUrl: media.hls ? media.hls : media.hls_path,
        metadata: {
          images: [
            {
              url: media.imagem_v_video,
            },
          ],
          title: media.titulo_video,
          type: "movie",
        },
      },
    });

    GoogleCast.showExpandedControls();
  };

  const handleOpenUrl = (video, relacionados) => {
    if (client) {
      loadMedia(video);
    } else {
      navigation.navigate("PlayerDrawer", {
        item: montaJsonVideo(item, "videozoeplay"),
        relacionados: [],
        aovivo: false,
        isFullScreen: isFullScreen,
        pagina_origem: pagina_origem,
        materia: [],
        categoria: categoria,
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          handleOpenUrl([], []);
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
        }}
      >
        <FastImage
          source={{ uri: item.url_thumb_video }} // Substitua pelo URL da imagem retangular desejada
          style={{
            width: "45%",
            height: wp("21.5"),
            borderRadius: 8,
            marginRight: 10,
            backgroundColor: CustomDefaultTheme.colors.backgroundCards,
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
          resizeMode="cover"
        >
          {
            //item.progresso_sec != undefined && item.progresso_sec != "" && (
            true && (
            <Slider
              style={[styles.slider]}
              thumbTintColor={CustomDefaultTheme.colors.transparent}
              //maximumValue={parseInt(item.duracao_video)}
              maximumValue={100}
              //value={item.progresso_sec}
              value={60}
              minimumTrackTintColor={CustomDefaultTheme.colors.sliderAzul}
              maximumTrackTintColor="#FFF"
            />
          )}
        </FastImage>
        <View
          style={{
            width: "45%",
            height: wp("20"),
            marginBottom: 15,
            paddingTop: 5,
          }}
        >
          <View
            style={{
              padding: 2,
              flexDirection: "row",
              justifyContent: "space-between",
              //backgroundColor: '#00F'
            }}
          >
            <View
              style={{
                backgroundColor: "#707070",
                padding: 2,
                width: 90,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
            >
              <CustomText
                numberOfLines={2}
                textType="bold"
                style={{
                  fontSize: 11,
                  color: "#FFF",
                  letterSpacing: 0.2,
                  backgroundColor: "#707070",
                  padding: 5,
                }}
              >
                {item.subtitulo_video}
              </CustomText>
            </View>

            <View>
              {showDownloadButton && (
                <DownloadButton
                  color={"#707070"}
                  hls={ITEMTRATADO.mp4}
                  item={ITEMTRATADO}
                  pagina_origem={"SinopseTrilhaDrawer"}
                  relacionados={[]}
                />
              )}
            </View>
          </View>

          <CustomText
            numberOfLines={2}
            textType="bold"
            style={{ fontSize: 11, color: "#000", letterSpacing: 0.2 }}
          >
            {item.titulo_video}
          </CustomText>
          <CustomText
            numberOfLines={2}
            textType="regular"
            style={{ fontSize: 10, color: "#000" }}
          >
            {item.descricao_video}
          </CustomText>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CARDITEM;
