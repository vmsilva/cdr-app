import React, { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useRemoteMediaClient } from "react-native-google-cast";
import { Button, Text } from "react-native-paper";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";
import CustomText from "../../componentes/customText";
import CastButtonPlay from "../castButtonPlay";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Linking, TouchableOpacity } from "react-native";
import { AlertNotfier } from "../../../configuracoes/services/funcoes";
import { useAuth } from "../../../configuracoes/hooks/auth";
import { getData } from "../../../configuracoes/services/request";
import { montaJsonVideo } from "../../../configuracoes/utils/utils";
import Loading from "../../funcionalidade/Loading";

interface videoProps {
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

interface assistirButtonProps {
  isFullScreen: boolean;
  item: videoProps;
  relacionados: any;
  aovivo: boolean;
  cod_tipo_conteudo: boolean;
  titulo: string;
  tipo: string;
}

const AssistirButton: React.FC<assistirButtonProps | any> = ({
  item,
  isFullScreen,
  aovivo,
  tipo,
}) => {
  const client = useRemoteMediaClient();
  const { cliente, user } = useAuth();
  const navigation = useNavigation() as any;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const buscaCategoria = async (cod_categoria: any) => {
    try {
      let parametros = {
        rota: `/categorias/categoria/${cod_categoria}`,
        parametros: `token=${cliente.token}&token_usuario=${user.token}`,
        showNotification: false,
        showLogError: true,
      };
      let parametrosCAT = {
        rota: `/categorias/categoria/${cod_categoria}/temporadas`,
        parametros: `token=${cliente.token}&token_usuario=${user.token}`,
        showNotification: false,
        showLogError: true,
      };

      //console.log(parametros, "sinopse serieeee");
      const responseCat = (await getData(parametrosCAT)) as any;
      let response = (await getData(parametros)) as any;

      response.data.data["temporadas"] = responseCat.data.data.temporadas;

      let RESPOSTATRATADO = response.data.data;
      RESPOSTATRATADO["apresentacao_apresentador"] =
        responseCat.data.data.temporadas[0].apresentacao_apresentador_temporada;
      RESPOSTATRATADO["nome_apresentador"] =
        responseCat.data.data.temporadas[0].nome_apresentador_temporada;
      RESPOSTATRATADO["subtitulo_apresentador"] =
        responseCat.data.data.temporadas[0].subtitulo_apresentador_temporada;
      RESPOSTATRATADO["url_foto_apresentador"] =
        responseCat.data.data.temporadas[0].url_foto_apresentador_temporada;

      //console.log(RESPOSTATRATADO, 'teste')

      return RESPOSTATRATADO;
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const buscaPlaylist = async (cod_playlist: any) => {
    try {
      let parametros = {
        rota: `/playlists/audios/${cod_playlist}`,
        parametros: `token=${user.token}`,
        showNotification: false,
        showLogError: true,
      };
      const response = (await getData(parametros)) as any;

      return response.data.data;
    } catch (error) {
      console.log(error, "Erro ao buscar categoria");
    }
  };

  const handlePress = useCallback(async (url: any) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      AlertNotfier({
        tipo: "error",
        msg: `Don't know how to open this URL: ${url}`,
      });
    }
  }, []);

  const handleNavigation = async () => {
    //console.log(item.video); return;
    try {
      setIsLoading(true);
      switch (tipo) {
        case "playlist":
          

          let retornorPlaylistAudios = await buscaPlaylist(item.cod_playlist);
          //console.log(item, 'playlist --->> ')
          setIsLoading(false);
          navigation.navigate("SinopseAudioDrawer",{playlist: item.playlist, audios: retornorPlaylistAudios })
          break;
        case "biblioteca":
          setIsLoading(false);
          navigation.navigate('ExploreDrawer', { item: 'biblioteca_digital'});
          break;
        case "link":
          setIsLoading(false);
          handlePress(item.custom_url);
          break;
        case "aovivo":
          
          //let ITEMVIDEO22 = montaJsonVideo(item.ao_vivo, "aovivo");   console.log(ITEMVIDEO22, 'ao vivo'); return
          if (item.ao_vivo.hls_aovivo == "") {
            alert("Error: Hls vazio ou invalido!");
            setIsLoading(false);
            return;
          }

          let ITEMVIDEO = montaJsonVideo(item.ao_vivo, "aovivo");
          setIsLoading(false);
          navigation.navigate(
            item.flg_youtube == 1 ? "AoVivoTab" : "PlayerDrawer",
            {
              item: ITEMVIDEO,
              relacionados: [],
              aovivo: true,
              //isFullScreen: true,
              titulo: "AO VIVO",
            }
          );
          //navigation.navigate('PlayerDrawer',{item:item, relacionados: relacionados, isFullScreen: isFullScreen, aovivo:aovivo, titulo: titulo})
          break;
        case "video":
          
          const CAT = await buscaCategoria(item.video.cod_categoria_especifica);
          // console.log(item.video.cod_categoria_temporada_especifica);return;
          setIsLoading(false);
          navigation.navigate("PlayerDrawer", {
            item: montaJsonVideo(item.video, "videozoeplay"),
            aovivo: aovivo,
            isFullScreen: isFullScreen,
            categoria: CAT,
            cod_categoria_temporada:
              item.video.cod_categoria_temporada_especifica,
          });
          break;
        case "categoria":
          
          const CATcategoria = await buscaCategoria(item.cod_categoria);
          const CATEGORIA2 = item;

          /*CATcategoria.categoria["apresentacao_apresentador"] =  CATcategoria.apresentacao_apresentador;
          CATcategoria.categoria["url_foto_apresentador"] = CATcategoria.url_foto_apresentador;
          CATcategoria.categoria["subtitulo_apresentador"] =  CATcategoria.subtitulo_apresentador;
          CATcategoria.categoria["nome_apresentador"] = CATcategoria.nome_apresentador;*/
          CATEGORIA2["nome_categoria"] = CATcategoria.categoria.nome_categoria;
          CATEGORIA2["descricao_categoria"] =
            CATcategoria.categoria.descricao_categoria;

          setIsLoading(false);

          //console.log(item); return;

          // aponta para categoria e lista apresentadores
          navigation.navigate("FiltroTemporadaDrawer", {
            //SinopseSerieDrawer
            item: CATEGORIA2,
            relacionados: [],
            categoria: item,
          });

          /*console.log(item);return;
          navigation.navigate("SinopseSerieDrawer", {
            item: CATcategoria.categoria,
            relacionados: [],
            categoria: CATcategoria,
            cod_categoria_temporada: item.cod_categoria_temporada,
          }); */
          break;
        default:
          return (
            <Ionicons
              name="play-circle-outline"
              size={24}
              color={CustomDefaultTheme.colors.background}
            />
          );
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
    console.log(item);
    return;
  };

  const COMPONENTEICONEBOTAO = () => {
    switch (tipo) {
      case "playlist":
        return (
          <MaterialCommunityIcons
            name="headphones"
            size={30}
            color={CustomDefaultTheme.colors.primary}
          />
        );
        break;
      case "biblioteca":
        return (
          <MaterialCommunityIcons
            name="open-in-new"
            size={30}
            color={CustomDefaultTheme.colors.primary}
          />
        );
        break;
      case "link":
        return (
          <MaterialCommunityIcons
            name="open-in-new"
            size={30}
            color={CustomDefaultTheme.colors.primary}
          />
        );
        break;
      case "aovivo":
        return (
          <AntDesign
            name="play"
            size={30}
            color={CustomDefaultTheme.colors.primary}
          />
        );
        break;
      case "video":
        return (
          <AntDesign
            name="play"
            size={30}
            color={CustomDefaultTheme.colors.primary}
          />
        );
        break;
      case "categoria":
        return (
          <AntDesign
            name="play"
            size={30}
            color={CustomDefaultTheme.colors.primary}
          />
        );
        break;
      default:
        return (
          <AntDesign
            name="play"
            size={30}
            color={CustomDefaultTheme.colors.primary}
          />
        );
    }
  };

  const textoBotao = () => { 
    switch (tipo) {
      case "playlist":
        return item.label_botao_destaque ? item.label_botao_destaque : "Ouvir";
        break;
      case "biblioteca":
        return item.label_botao_destaque ? item.label_botao_destaque : "Ir Até Biblioteca";
        break;
      case "link":
        return item.label_botao_destaque ? item.label_botao_destaque : "Ir Até";
        break;
      case "aovivo":
        return item.label_botao_destaque ? item.label_botao_destaque : "Assistir ao vivo";
        break;
      case "video":
        return item.label_botao_destaque ? item.label_botao_destaque : "Assistir";
        break;
      case "categoria":
        return item.label_botao_destaque ? item.label_botao_destaque : "Acesse agora";
        break;
      default:
        return "Acesse agora";
    }
  };

  

  return (
    <>
      {client ? (
        <CastButtonPlay media={item} />
      ) : (
        <TouchableOpacity onPress={handleNavigation}>
          <Button
            uppercase={false}
            style={{
              backgroundColor: CustomDefaultTheme.colors.ButtonDestaque,
              //height: 45,
              flexDirection: "row-reverse",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 99,
            }}
            contentStyle={{
              borderRadius: 30,
              //height: 50,
              padding: 5,
              flexDirection: "row-reverse",
            }}
            icon={() => <COMPONENTEICONEBOTAO />}
          >
            <CustomText
              textType="montserratExtraBold"
              style={{
                fontSize: 17,
                //lineHeight: 35,
                color: CustomDefaultTheme.colors.primary,
                letterSpacing: 0.92,
              }}
            >
              {textoBotao()}
            </CustomText>
          </Button>
        </TouchableOpacity>
      )}
      {isLoading && <Loading />}
    </>
  );
};

export default AssistirButton;
