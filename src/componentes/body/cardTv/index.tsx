import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GoogleCast, { useRemoteMediaClient } from "react-native-google-cast";

import CustomText from "../../componentes/customText";
import FastImage from "react-native-fast-image";
import { montaJsonVideo } from "../../../configuracoes/utils/utils";
import { useAuth } from "../../../configuracoes/hooks/auth";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

interface CardTvProps {
  item: any;
  array: any;
  isFullScreen: any;
}

const CardTv: React.FC<CardTvProps> = ({ item, array, isFullScreen }) => {
  const navigation = useNavigation() as any;
  const { user } = useAuth();
  const client = useRemoteMediaClient();

  const loadMedia = async (media: any) => {
    //console.log(media); return
    try {
      await client.loadMedia({
        autoplay: true,
        mediaInfo: {
          contentType: "application/x-mpegURL",
          contentUrl: media.hls_cast_tv, // novo hls na tv ao vivo
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
      console.log(error);
      alert(error);
    }
  };

  const handleUrl = async (i: any) => {
    try {
      if (item.cod_visibilidade_conteudo == 2 && !user) {
        navigation.navigate("LoginDrawer", {});
        return;
      }

      let ITEMVIDEO = montaJsonVideo(i, "aovivo");
      //console.log(ITEMVIDEO); return
      if (client) {
        loadMedia(ITEMVIDEO);
      } else {
        navigation.navigate("PlayerDrawer", {
          item: ITEMVIDEO,
          relacionados: array,
          aovivo: true,
          isFullScreen: isFullScreen,
          titulo: "AO VIVO",
          tipo: 'tvs'
          
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TouchableOpacity onPress={() => handleUrl(item)}>
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            width: '50%'
          }}
        >
          <FastImage
            source={{ uri: item.url_thumb_player }}
            style={{
              width: 160,
              height: 90,
              borderRadius: 10,
            }}
          />
          <View
            style={{
              left: 10,
            }}
          >
            <View
              style={{
                backgroundColor: CustomDefaultTheme.colors.informacoesSinopse,
                //paddingHorizontal: 15,
                //paddingVertical: 5,
                borderRadius: 100,
                width: 70,
                alignItems: 'center',
                paddingHorizontal: 10,
                paddingVertical: 5
              }}
            >
              <CustomText
                textType="montserratExtraBold"
                style={{
                  fontSize: 9,
                }}
              >
                AO VIVO
              </CustomText>
            </View>
            <View
              style={{
                left: 10,
                top: 5
              }}
            >
              <CustomText
                numberOfLines={3}
                textType="montserratExtraBold"
                style={{
                  fontSize: 15,
                }}
              >
                {item.nome_aovivo}
              </CustomText>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};
export default CardTv;
