import React, { useContext } from "react";
import { View, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import LottieView from "lottie-react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";
import GoogleCast, { useRemoteMediaClient } from "react-native-google-cast";

import styles from "./Styles";
import stylesTablet from "./StylesTablet";
import FastImage from "react-native-fast-image";
import CustomText from "../../componentes/customText";
import {
  montaJsonVideo
} from "../../../configuracoes/utils/utils";
import { UtilContext } from "../../../configuracoes/contexts/UtilContext";
import CardItem from "./cardItem";
import { SCROLLSTYLEGERAL } from "../../../configuracoes/utils/constants/style";

interface cameraProps {
  cod_camera: any;
  uuid_camera: any;
  nome_camera: any;
  descricao_camera: any;
  hls_camera: any;
  imagem_h_camera: any;
  imagem_fhd_camera: any;
  url_camera: any;
  grupo: any;
  slug: any;
}

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
}

interface CapaHorizontalComTituloProps {
  array: any[];
  tipo: "cameras" | "programa" | "tvaovivo" | "aoVivo";
  isFullScreen: boolean;
}

const ScrollHorizontalComTitulo: React.FC<CapaHorizontalComTituloProps> = ({
  array,
  tipo,
  isFullScreen,
}) => {
  const navigation = useNavigation() as any;
  const client = useRemoteMediaClient();
  const { isTablet } = useContext(UtilContext);

  const loadMedia = (media: any) => {
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
  };

  const handleUrl = (item: any) => {
    switch (tipo) {
      case "tvaovivo":
        let ITEMVIDEO = montaJsonVideo(item, "aovivo");

        if (client) {
          loadMedia(ITEMVIDEO);
        } else {
          
          navigation.navigate(item.flg_youtube == 1 ? "AoVivoTab" : "PlayerDrawer", {
            item: ITEMVIDEO,
            relacionados: array,
            aovivo: true,
            isFullScreen: isFullScreen,
            titulo: "AO VIVO",
          });
        }
        break;
      case "cameras":
        if (client) {
          loadMedia(item);
        } else {
          navigation.navigate("PlayerDrawer", {
            item: item,
            relacionados: [],//montaArrayRelacionados(array),
            aovivo: true,
            isFullScreen: true,
            titulo: item.titulo_video,
          });
        }
        break;
    }
  };

  if (tipo == "aoVivo") {
    return (
      <View
        style={isTablet ? stylesTablet.container : styles.container}
      >
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          style={[SCROLLSTYLEGERAL]}
        >
          {array.length != undefined && (
            array.map((_: any, i: any) => {
              return(
                <CardItem key={_.cod_aovivo + Math.random()} item={_} tipo="aoVivo" isFullScreen={false}/>
              )
            })
          )}
        </ScrollView>
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <ScrollView
          horizontal={true}
          scrollEventThrottle={200}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
        >
          {array.length != undefined ? (
            array.map((_: any, i: any) => {
              return (
                <TouchableOpacity
                  key={tipo == "cameras" ? _.cod_camera : _.cod_video}
                  style={styles.containerView}
                  onPress={() =>
                    handleUrl(
                      montaJsonVideo(_, tipo == "cameras" ? "cameras" : "video")
                    )
                  }
                  //onPress={() => navigation.navigate('SinopseDrawer',{item:_})} //handleUrl(montaJsonVideo(_, tipo == "cameras" ? 'cameras' : 'video'))
                >
                  <View style={styles.thumbContent}>
                    <View style={styles.blocoHeader}>
                      <CustomText style={{ fontSize: 12 }} textType="bold">
                        {tipo == "cameras" ? _.nome_camera : _.imagem_h_video}
                      </CustomText>
                    </View>
                    <FastImage
                      source={{
                        uri:
                          tipo == "cameras"
                            ? _.imagem_h_camera
                            : _.imagem_h_video,
                      }}
                      style={styles.imgThumbContent}
                    />
                    <View
                      style={{
                        flexDirection: "row",
                        left: 7,
                      }}
                    >
                      <CustomText
                        textType="bold"
                        style={[styles.textoSubititulo]}
                      >
                        {tipo == "cameras" ? _.nome_camera : _.titulo_video}
                      </CustomText>
                      {tipo == "cameras" && (
                        <View
                          style={{
                            flex: 1,
                            height: 30,
                          }}
                        >
                          <LottieView
                            style={{ height: 20 }}
                            source={{
                              uri:
                                "https://assets8.lottiefiles.com/packages/lf20_buuuwhvb.json",
                            }}
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
                        </View>
                      )}
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        left: 10,
                        marginTop: -8,
                      }}
                    >
                      <CustomText
                        numberOfLines={1}
                        textType="light"
                        style={{ fontSize: 10 }}
                      >
                        {tipo == "cameras"
                          ? _.descricao_camera
                          : _.titulo_video}
                      </CustomText>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <View style={{ width: wp("100%") }}>
              <ActivityIndicator
                animating={true}
                color={CustomDefaultTheme.colors.buttonPrimary}
                size={wp("20%")}
                style={{
                  justifyContent: "center",
                  top: hp("1"),
                  height: hp("20%"),
                }}
              />
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
};
export default ScrollHorizontalComTitulo;
