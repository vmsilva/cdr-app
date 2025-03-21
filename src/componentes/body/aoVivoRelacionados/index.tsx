import React from "react";
import { View, TouchableOpacity, Dimensions } from "react-native";
import FastImage from "react-native-fast-image";
import { useNavigation } from "@react-navigation/native";
import GoogleCast, { useRemoteMediaClient } from "react-native-google-cast";
import LottieView from "lottie-react-native";

// Config
import Styles from "./Styles";

// Component
import CustomText from "../../componentes/customText";
import { montaJsonVideo } from "../../../configuracoes/utils/utils";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";
import styles from "./Styles";

interface videoProps {
  cod_video: any;
  cod_cliente: any;
  uuid_video: any;
  storage: any;
  cod_associacao_conteudo: any;
  cod_serie: any;
  cod_serie_temporada: any;
  cod_visibilidade_conteudo: any;
  grupos_conteudo: any;
  subgrupos_conteudo: any;
  assuntos: any;
  titulo_video: any;
  descricao_video: any;
  sinopse_video: any;
  ficha_tecnica_video: any;
  imagem_h_video: any;
  imagem_v_video: any;
  imagem_fhd_video: any;
  data_cadastro_video: any;
  data_video: any;
  classificacao_indicativa_video: any;
  trailer_video: any;
  legenda_video: any;
  json_video: any;
  duracao_video: any;
  flg_destaque: any;
  ordem_serie: any;
  ordem_video: any;
  status_video: any;
  tags: any;
  generos: any;
  duracao_video_segundos: any;
  seek_video: any;
}

interface AoVivoRelacionadosProps {
  item: videoProps;
  relacionados: any;
  abreDiretoPlayer: boolean;
  titulo: string;
  page: string;
}

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const AoVivoRelacionados: React.FC<AoVivoRelacionadosProps | any> = ({
  item,
  array,
  page,
  titulo,
}) => {
  const navigation = useNavigation() as any;
  const client = useRemoteMediaClient();

  const handleNavigate_OLD = () => {
    const isYoutube = item.flg_youtube === 1;
    const itemJson = montaJsonVideo(item, isYoutube ? "aovivoYT" : "aovivo");

    const routeName = isYoutube ? "AoVivoTab" : "AoVivoDrawer";

    navigation.navigate(routeName, {
      item: itemJson,
      relacionados: relacionados,
      isFullScreen: false,
      titulo: titulo,
      aovivo: true,
    });
  };

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

  const handleNavigate = () => {
    let ITEMVIDEO = montaJsonVideo(item, "aovivo");

    if (client) {
      loadMedia(ITEMVIDEO);
    } else {
      navigation.navigate("PlayerDrawer", {
        item: ITEMVIDEO,
        relacionados: array,
        aovivo: true,
      });
    }
  };

  return (
    <>
      <TouchableOpacity onPress={handleNavigate} style={Styles.all}>
        <View style={Styles.containerView}>
          <View style={{ padding: 5, width: "30%" }}>
            <FastImage
              resizeMode={FastImage.resizeMode.cover}
              source={{ uri: item.url_thumb_aovivo }}
              style={Styles.imgThumbContent}
            >
              <LottieView
                style={{ height: 20, left: 10 }}
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
            </FastImage>
          </View>
          <View
            style={{
              width: "65%",
              //backgroundColor: '#FFF'
            }}
          >
            <CustomText
              textType="bold"
              style={[Styles.textoRodaPeCard, { fontSize: 12, marginTop: 10 }]}
            >
              {item.nome_aovivo}
            </CustomText>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};
export default AoVivoRelacionados;
