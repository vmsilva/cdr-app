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
    console.log('loadingmedia chromecast');
    try{
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
    }catch(error){
      console.log(error, '--> cast error')
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

  useEffect(()=>{},[assistidos])

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        style={styles.header}
        onPress={() => {
          toggleAccordion();
          startRotateAnimation();
        }}
      >
        <CustomText textType="montserratBold" style={styles.title}>{titulo}</CustomText>
        <Animated.View
          style={[styles.icon, { transform: [{ rotate: rotateIcon }] }]}
        >
          <MaterialCommunityIcons name="chevron-down" size={24} color="black" />
        </Animated.View>
      </TouchableWithoutFeedback>
      <Collapsible collapsed={!expanded}>
        {Object.values(array.videos).map((_: any, index) => { console.log(_.progresso_pct) //console.log(parseInt(_.progresso_pct))
          return (
            <TouchableOpacity
              onPress={() => {
                handleOpenUrl(_, []);
              }}
              key={_.cod_video}
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
              }}
            >
              <FastImage
                source={{ uri: _.url_thumb_video }} // Substitua pelo URL da imagem retangular desejada
                style={{
                  width: "45%",
                  height: wp("21.5"),
                  borderRadius: 8,
                  marginRight: 10,
                  backgroundColor: CustomDefaultTheme.colors.backgroundCards,
                }}
                resizeMode="cover"
              >
                { _.progresso_pct > 95 && (
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
                      height:15 ,
                      backgroundColor: '#000',
                      borderRadius: 99,
                      left: 5,
                      top: 2 
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
                    width={'100%'}
                    height={10}
                    valorTotal={100}
                    valor={parseInt(_.progresso_pct)}
                    style={{
                      position: 'absolute',
                      bottom: 0
                    }}
                  />
              </FastImage>
              <View
                style={{
                  width: "50%",
                  height: wp("20"),
                  marginBottom: 5,
                  //backgroundColor: '#FF0'
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={[styles.subtituloFonte]}>
                    <CustomText style={styles.subtituloFonteText}>
                      {_.subtitulo_video}
                    </CustomText>
                  </View>

                  <View style={[{ marginLeft: 5 }]}>
                    <DownloadButton color={"#707070"} hls={_.mp4} item={_} />
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
                      textType="bold"
                      style={{ fontSize: 11, color: "#000" }}
                    >
                      {_.titulo_video} 
                    </CustomText>
                    <CustomText
                      numberOfLines={3}
                      textType="regular"
                      style={{ fontSize: 9.5, color: "#000" }}
                    >
                      {_.descricao_video}
                    </CustomText>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </Collapsible>
    </View>
  );
};

export default Accordion;
