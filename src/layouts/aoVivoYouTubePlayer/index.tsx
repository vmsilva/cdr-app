import React, { useRef, useState, useEffect, useContext } from "react";
import { View, Dimensions, TouchableOpacity, Platform } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as ScreenOrientation from "expo-screen-orientation";
import { useRemoteMediaClient } from "react-native-google-cast";
import { FontAwesome } from "@expo/vector-icons";
import { setStatusBarHidden } from "expo-status-bar";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import FastImage from "react-native-fast-image";

// Componentes
import CustomText from "../../componentes/customText";
import { montaJsonVideo } from "../../configuracoes/utils/utils";
import PageHeader from "../../componentes/header";

// Configuracoes
import Styles from "./Styles";
import StylesTablet from "./StylesTablet";
import { CustomDefaultTheme } from "../../configuracoes/styles/Theme";
import { UtilContext } from "../../configuracoes/contexts/UtilContext";
import { ActivityIndicator } from "react-native-paper";
import AoVivoRelacionados from "../../componentes/body/aoVivoRelacionados";
import { ScrollView } from "react-native-gesture-handler";
import PlayerYT from "../../componentes/playerYT";

const YTTESTE = [
  {
    cod_cliente: "26",
    cod_tv: "36",
    descricao_tv: "",
    embed_personalizado_tv: "https://www.youtube.com/embed/i5n9gcO28h8",
    flg_youtube: 1,
    hls_tv: "",
    imagem_fhd_tv:
      "https://cdn.zoeflix.com.br/storage/tvs/58bc2359-cd1b-40e3-9e97-40da1444262e.jpg",
    imagem_h_tv:
      "https://cdn.zoeflix.com.br/storage/tvs/58bc2359-cd1b-40e3-9e97-40da1444262e.jpg",
    imagem_logo_tv: "",
    nome_tv: "TV Mais Goiás",
    ordem_tv: "0",
    status_tv: "1",
    url_tv:
      "https://zoeflix.com.br/tv/36/f843b5db-2fb9-4aaf-afa4-dce1cc4e92fa/",
    uuid_tv: "f843b5db-2fb9-4aaf-afa4-dce1cc4e92fa",
    youtube_id: "i5n9gcO28h8",
  },
  {
    cod_cliente: "26",
    cod_tv: "52",
    descricao_tv: "",
    embed_personalizado_tv: "",
    flg_youtube: 0,
    hls_tv: "https://tbc.zoeweb.tv/tbc/tbc/playlist.m3u8",
    imagem_fhd_tv:
      "https://cdn.zoeflix.com.br/storage/tvs/a3c559b5-d4af-4709-9554-fb1d1201e51d.jpg",
    imagem_h_tv:
      "https://cdn.zoeflix.com.br/storage/tvs/a3c559b5-d4af-4709-9554-fb1d1201e51d.jpg",
    imagem_logo_tv: "",
    nome_tv: "TV",
    ordem_tv: "1",
    status_tv: "1",
    url_tv:
      "https://zoeflix.com.br/tv/52/e3208ae8-0cc7-4b96-a448-32ae712b7528/",
    uuid_tv: "e3208ae8-0cc7-4b96-a448-32ae712b7528",
  },
  {
    cod_cliente: "26",
    cod_tv: "900",
    descricao_tv: "",
    embed_personalizado_tv: "",
    flg_youtube: 0,
    hls_tv: "https://tbc.zoeweb.tv/tbc/tbc/playlist.m3u8",
    imagem_fhd_tv:
      "https://cdn.zoeflix.com.br/storage/tvs/a3c559b5-d4af-4709-9554-fb1d1201e51d.jpg",
    imagem_h_tv:
      "https://cdn.zoeflix.com.br/storage/tvs/a3c559b5-d4af-4709-9554-fb1d1201e51d.jpg",
    imagem_logo_tv: "",
    nome_tv: "TV",
    ordem_tv: "1",
    status_tv: "1",
    url_tv:
      "https://zoeflix.com.br/tv/52/e3208ae8-0cc7-4b96-a448-32ae712b7528/",
    uuid_tv: "e3208ae8-0cc7-4b96-a448-32ae712b7528",
  },
  {
    cod_cliente: "26",
    cod_tv: "900",
    descricao_tv: "",
    embed_personalizado_tv: "",
    flg_youtube: 0,
    hls_tv: "https://tbc.zoeweb.tv/tbc/tbc/playlist.m3u8",
    imagem_fhd_tv:
      "https://cdn.zoeflix.com.br/storage/tvs/a3c559b5-d4af-4709-9554-fb1d1201e51d.jpg",
    imagem_h_tv:
      "https://cdn.zoeflix.com.br/storage/tvs/a3c559b5-d4af-4709-9554-fb1d1201e51d.jpg",
    imagem_logo_tv: "",
    nome_tv: "TV",
    ordem_tv: "1",
    status_tv: "1",
    url_tv:
      "https://zoeflix.com.br/tv/52/e3208ae8-0cc7-4b96-a448-32ae712b7528/",
    uuid_tv: "e3208ae8-0cc7-4b96-a448-32ae712b7528",
  },
  {
    cod_cliente: "26",
    cod_tv: "900",
    descricao_tv: "",
    embed_personalizado_tv: "",
    flg_youtube: 0,
    hls_tv: "https://tbc.zoeweb.tv/tbc/tbc/playlist.m3u8",
    imagem_fhd_tv:
      "https://cdn.zoeflix.com.br/storage/tvs/a3c559b5-d4af-4709-9554-fb1d1201e51d.jpg",
    imagem_h_tv:
      "https://cdn.zoeflix.com.br/storage/tvs/a3c559b5-d4af-4709-9554-fb1d1201e51d.jpg",
    imagem_logo_tv: "",
    nome_tv: "TV",
    ordem_tv: "1",
    status_tv: "1",
    url_tv:
      "https://zoeflix.com.br/tv/52/e3208ae8-0cc7-4b96-a448-32ae712b7528/",
    uuid_tv: "e3208ae8-0cc7-4b96-a448-32ae712b7528",
  },
  {
    cod_cliente: "26",
    cod_tv: "900",
    descricao_tv: "",
    embed_personalizado_tv: "",
    flg_youtube: 0,
    hls_tv: "https://tbc.zoeweb.tv/tbc/tbc/playlist.m3u8",
    imagem_fhd_tv:
      "https://cdn.zoeflix.com.br/storage/tvs/a3c559b5-d4af-4709-9554-fb1d1201e51d.jpg",
    imagem_h_tv:
      "https://cdn.zoeflix.com.br/storage/tvs/a3c559b5-d4af-4709-9554-fb1d1201e51d.jpg",
    imagem_logo_tv: "",
    nome_tv: "TV",
    ordem_tv: "1",
    status_tv: "1",
    url_tv:
      "https://zoeflix.com.br/tv/52/e3208ae8-0cc7-4b96-a448-32ae712b7528/",
    uuid_tv: "e3208ae8-0cc7-4b96-a448-32ae712b7528",
  },
  {
    cod_cliente: "26",
    cod_tv: "900",
    descricao_tv: "",
    embed_personalizado_tv: "",
    flg_youtube: 0,
    hls_tv: "https://tbc.zoeweb.tv/tbc/tbc/playlist.m3u8",
    imagem_fhd_tv:
      "https://cdn.zoeflix.com.br/storage/tvs/a3c559b5-d4af-4709-9554-fb1d1201e51d.jpg",
    imagem_h_tv:
      "https://cdn.zoeflix.com.br/storage/tvs/a3c559b5-d4af-4709-9554-fb1d1201e51d.jpg",
    imagem_logo_tv: "",
    nome_tv: "TV",
    ordem_tv: "1",
    status_tv: "1",
    url_tv:
      "https://zoeflix.com.br/tv/52/e3208ae8-0cc7-4b96-a448-32ae712b7528/",
    uuid_tv: "e3208ae8-0cc7-4b96-a448-32ae712b7528",
  },
  {
    cod_cliente: "26",
    cod_tv: "900",
    descricao_tv: "",
    embed_personalizado_tv: "",
    flg_youtube: 0,
    hls_tv: "https://tbc.zoeweb.tv/tbc/tbc/playlist.m3u8",
    imagem_fhd_tv:
      "https://cdn.zoeflix.com.br/storage/tvs/a3c559b5-d4af-4709-9554-fb1d1201e51d.jpg",
    imagem_h_tv:
      "https://cdn.zoeflix.com.br/storage/tvs/a3c559b5-d4af-4709-9554-fb1d1201e51d.jpg",
    imagem_logo_tv: "",
    nome_tv: "TV",
    ordem_tv: "1",
    status_tv: "1",
    url_tv:
      "https://zoeflix.com.br/tv/52/e3208ae8-0cc7-4b96-a448-32ae712b7528/",
    uuid_tv: "e3208ae8-0cc7-4b96-a448-32ae712b7528",
  },
  {
    cod_cliente: "26",
    cod_tv: "900",
    descricao_tv: "",
    embed_personalizado_tv: "",
    flg_youtube: 0,
    hls_tv: "https://tbc.zoeweb.tv/tbc/tbc/playlist.m3u8",
    imagem_fhd_tv:
      "https://cdn.zoeflix.com.br/storage/tvs/a3c559b5-d4af-4709-9554-fb1d1201e51d.jpg",
    imagem_h_tv:
      "https://cdn.zoeflix.com.br/storage/tvs/a3c559b5-d4af-4709-9554-fb1d1201e51d.jpg",
    imagem_logo_tv: "",
    nome_tv: "TV",
    ordem_tv: "1",
    status_tv: "1",
    url_tv:
      "https://zoeflix.com.br/tv/52/e3208ae8-0cc7-4b96-a448-32ae712b7528/",
    uuid_tv: "e3208ae8-0cc7-4b96-a448-32ae712b7528",
  },
] as any;

const AoVivoPageYoutube: React.FC<any> = (props) => {
  const navigation = useNavigation() as any;
  const isFocused = useIsFocused();
  const client = useRemoteMediaClient();
  const { tvsAoVivo, isTablet } = useContext(UtilContext);
  const { item, pagina_origem } = props.route.params != undefined ? props.route.params : "";
  const [isCast, setIsCast] = useState(false);

  if (tvsAoVivo.length == 0) {
    return <></>;
  }

  const [subTitulo, setSubTitulo] = useState<any>([]);

  //flag para orientacao vertical nao ficar em loop infinito
  const [verticalDisparo, setVerticalDisparo] = useState(false);
  const [flagVerificaOrientacao, setFlagVerificaOrientacao] = useState(true);
  const [largura, setLargura] = useState(Dimensions.get("screen").width);
  const [altura, setAltura] = useState(Dimensions.get("screen").height);
  const [orientacao, setOrientacao] = useState("PORTRAIT");
  const [headerHide, setHeaderHide] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  const [video, setVideo] = useState<any>(
    item != undefined ? item : montaJsonVideo(tvsAoVivo[0], "aovivo")
  );

  const [showVideoTag, setShowVideoTag] = useState(false);

  const scrollRelacionadosRef = useRef() as any;

  const handleOrientacao = () => {
    try {
      !headerHide ? PlayerNaHorizontal() : PlayerVertical();
    } catch (error) {
      console.log(error);
    }
  };

  const PlayerVertical = async () => {
    if (false) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    } else {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    }
    setStatusBarHidden(false, "fade");
    setHeaderHide(false);
    setSubTitulo([]);
    setVerticalDisparo(false);
    setOrientacao("PORTRAIT");
    console.log("verticall");
  };

  const PlayerNaHorizontal = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
    );
    setStatusBarHidden(true, "fade");
    setHeaderHide(true);
    setOrientacao("landscape");
  };

  const handleUrl = () => {

    if(pagina_origem != undefined){
      navigation.navigate(pagina_origem,{});
    }else{
      navigation.goBack();
    }
    
  };

  // COMPONENTE
  const AOVIVORELACIONADOSCOMPONENTE = (props) => {
    //console.log(props.array)
    return (
      <>
        {props.array.map((_, index) => {
          //props.array.map((_, index) => {
          if (_.cod_tv == props.cod_tv) {
            return;
          }

          return (
            <AoVivoRelacionados
              key={_.cod_tv + index}
              item={_}
              relacionados={props.array}
              abreDiretoPlayer={true}
              titulo={"Ao Vivo"}
              page={"AoVivoTab"}
              pagina_origem={"AoVivoTab"}
            />
          );
        })}
      </>
    );
  };
  // COMPONENTE

  if (client) {
    if (!isCast) {
      setTimeout(() => {
        setIsCast(true);
      }, 100);
    }
  } else {
    if (isCast) {
      setTimeout(() => {
        setIsCast(false);
      }, 100);

      console.log("cast debug");
    }
  }

  useEffect(() => {
    if (isFocused) {
      if (item != undefined && item.cod_video != video.cod_video) {
        console.log(isFocused, item.cod_video, video.cod_video);
        setVideo(item);
      }
      setVerticalDisparo(true);
      setTimeout(() => setShowVideoTag(true), 300);
      scrollRelacionadosRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
    } else {
      if (verticalDisparo) {
        PlayerVertical();

        setShowVideoTag(false);
      }

      if (!flagVerificaOrientacao) {
        setFlagVerificaOrientacao(true);
      }
    }

    return () => {
      setIsloading(false);
    };
  }, [
    isFocused,
    subTitulo,
    verticalDisparo,
    flagVerificaOrientacao,
    largura,
    altura,
    orientacao,
    headerHide,
    isLoading,
    video,
    item,
  ]);

  //hideNavigationBar();
  return (
    <View
      style={{
        backgroundColor: headerHide
          ? CustomDefaultTheme.colors.preto
          : "transparent",
        height: hp("100"),
      }}
    >
      <View
        style={
          {
            //height: hp('50'), backgroundColor: '#FF0'
          }
        }
      >
        {!headerHide && (
          <>
            <PageHeader
              style={{ backgroundColor: CustomDefaultTheme.colors.background }}
              headerLeft={
                <TouchableOpacity
                  onPress={handleUrl}
                >
                  <FontAwesome name="angle-left" size={27} color={CustomDefaultTheme.colors.branco} />
                </TouchableOpacity>
              }
              titulo={"Ao Vivo"}
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
                      width: 26,
                    }}
                  />
                  <View
                    style={{
                      right: 10,
                      width: 26,
                    }}
                  />
                </View>
              }
            />
            <View
              style={isTablet ? StylesTablet.linhaheader : Styles.linhaheader}
            />
          </>
        )}

        {showVideoTag ? (
          <View
            style={{
              backgroundColor: CustomDefaultTheme.colors.background,
              width: headerHide ? altura : largura,
              height: largura / 2 + 30,
            }}
          >
            <PlayerYT
              isCast={isCast}
              seek_video={video.seek_video != undefined ? video.seek_video : 0}
              aovivo={true}
              orientacao={orientacao}
              item={tvsAoVivo[0]}
              width={headerHide ? altura : largura}
              height={largura / 2 + 30}
              titulo={video.titulo_video}
              ChromeCastButton={<></>}
              backButton={<></>}
              backButtonLeft={<></>}
            />
          </View>
        ) : (
          <View>
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              source={{ uri: video.url_thumb_video }}
              style={{
                marginTop: Platform.OS == "ios" ? 100 : 0,
                height: hp("30"),
                width: wp("100"),
              }}
            />
            <View
              style={{
                marginTop: Platform.OS == "ios" ? hp("0") : hp("14"),
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <View style={{}}>
                <ActivityIndicator
                  color={CustomDefaultTheme.colors.buttonPrimary}
                  size={40}
                />
                <CustomText
                  textType="bold"
                  style={{
                    color: CustomDefaultTheme.colors.buttonPrimary,
                    fontSize: 20,
                  }}
                >
                  Carregando ....
                </CustomText>
              </View>
            </View>
          </View>
        )}
      </View>
      {!headerHide && showVideoTag && (
        <>
          <View
            style={
              isTablet ? StylesTablet.blocoInformacoes : Styles.blocoInformacoes
            }
          >
            {video.imagem_logo_tv != "" ? (
              <FastImage
                source={{
                  uri: video.imagem_logo_tv,
                }}
                style={{
                  minWidth: wp("18"),
                  minHeight: wp("10"),
                  marginRight: 30,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
            ) : (
              <CustomText
                textType="bold"
                style={{ marginTop: 10, fontSize: 12, width: wp("35") }}
              >
                {video.titulo_video}
              </CustomText>
            )}
            <View>
              <CustomText
                textType="bold"
                color={"#FFF"}
                style={[Styles.font, { maxWidth: wp("100") }]}
              >
                {video.titulo_video}
              </CustomText>
              <CustomText
                textType="light"
                color={"#FFF"}
                style={[{ maxWidth: wp("100"), fontSize: 15 }]}
              >
                Exibição Agora
              </CustomText>
            </View>
          </View>
          <ScrollView
            style={
              isTablet
                ? StylesTablet.scrollRelacionados
                : Styles.scrollRelacionados
            }
          >
            {
              <AOVIVORELACIONADOSCOMPONENTE
                array={tvsAoVivo}
                cod_tv={video.cod_video}
              />
            }
            <View style={{height: 100}} />
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default AoVivoPageYoutube;
