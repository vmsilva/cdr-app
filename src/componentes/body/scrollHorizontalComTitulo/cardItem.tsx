import React, { useContext } from "react";
import { View, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";
import GoogleCast, { useRemoteMediaClient } from "react-native-google-cast";

import styles from "./Styles";
import FastImage from "react-native-fast-image";
import CustomText from "../../componentes/customText";
import { montaJsonVideo } from "../../../configuracoes/utils/utils";
import { UtilContext } from "../../../configuracoes/contexts/UtilContext";

const CardItem: React.FC<any> = ({ item, tipo, isFullScreen }) => {
  const navigation = useNavigation() as any;
  const client = useRemoteMediaClient();
  const { isTablet } = useContext(UtilContext);

  const loadMedia = (media: any) => {
    console.log('loadingmedia chromecast');
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

  const handleUrl = (item: any) => { //return;
    switch (tipo) { 
      case "aoVivo":
        let ITEMVIDEO = montaJsonVideo(item, "aovivo");
        //console.log(ITEMVIDEO); return;
        if (client) {
          loadMedia(ITEMVIDEO);
        } else {
          navigation.navigate(
            item.flg_youtube == 1 ? "AoVivoTab" : "PlayerDrawer",
            {
              //navigation.navigate("PlayerDrawer", {
              item: ITEMVIDEO,
              relacionados: [],
              aovivo: true,
              isFullScreen: isFullScreen,
              titulo: "AO VIVO",
              gategoria: undefined,
              playlist: []
            }
          );
        }
        break;
      case "cameras":
        if (client) {
          loadMedia(item);
        } else {
          navigation.navigate("PlayerDrawer", {
            item: item,
            relacionados: [], //montaArrayRelacionados(array),
            aovivo: true,
            isFullScreen: true,
            titulo: item.titulo_video,
          });
        }
        break;
    }
  };

  return (
    <>
      <View style={{}}>
        <TouchableOpacity
          style={styles.containerView}
          onPress={
            () => handleUrl(item)
          }
        >
          <View style={styles.thumbContent}>
            <View style={{
              //backgroundColor: '#FF0'
            }}>
              <View>
                <FastImage
                  source={{
                    uri: item.url_thumb_player,
                  }}
                  style={styles.imgThumbContent}
                  resizeMode="cover"
                />
                <View
                style={{
                  flexDirection: "row",
                  top: 5,
                }}
              >
                <View
                  style={{
                    borderRadius: 5,
                    backgroundColor: CustomDefaultTheme.colors.vermelho,
                    padding: 5,
                  }}
                >
                  <CustomText
                    style={{
                      color: "#FFF",
                      letterSpacing: 0.7,
                      fontSize: 10
                    }}
                  >
                    Assistir Agora
                  </CustomText>
                </View>
              </View>
              </View>
              
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};
export default CardItem;
