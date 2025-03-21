import React, { useEffect, useState, useContext, useCallback } from "react";
import { View, Linking, Platform } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import DeviceInfo from "react-native-device-info";
import { MaterialIcons } from "@expo/vector-icons";
import TrackPlayer from "react-native-track-player";
import LinearGradient from "react-native-linear-gradient";

// Rotass
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";
import { useAuth } from "../hooks/auth";

// Config
import versionapi from "../services/versionApi";
import { CustomDefaultTheme } from "../styles/Theme";
import { getData } from "../services/request";
import {
  convertObjetoZoeParaPlaylistReactTrackPlayer,
  getVideosByCategory,
  montaJsonVideo,
} from "../utils/utils";
import CustomText from "../../componentes/componentes/customText";
import { PlayerContext } from "../contexts/PlayerContext";
import { addTracks, removerQueues } from "../../../trackPlayerServices";
import { EMPRESA } from "../utils/constants";

import Loading from "../../componentes/funcionalidade/Loading";

const Routes: React.FC = () => {
  const navigation = useNavigation() as any;
  const { user, loading: loadingStorage , signOut} = useAuth();
  const { setExibePlayer } = useContext(PlayerContext);
  const version = DeviceInfo.getVersion();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingShare, setIsLoadingShare] = useState(false);
  const [update, setUpdate] = useState(false);
  const [updateInfo, setUpdateInfo] = useState<any>([]);

  useEffect(() => {
    console.log("carrega storageeeeeee", loadingStorage);
  }, [loadingStorage]);

  const buscaUltimaVersaoAppLoja = async () => {
    try { //signOut(); setIsLoading(false);return;
     
      const response = await versionapi.get("educaejug");

      if (response.data.force_update) {
        setUpdate(true);
      }
      //console.log(response.data, 'testeeeee')
      setUpdateInfo(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const buscaDeviceID = async (device_id_url: any) => {
    try {
      let id = await DeviceInfo.getUniqueId();

      if (id != device_id_url) {
        return;
      }

      let parametros = {
        rota: `/clientesespeciais/casafolha_device_to_k1_k2`,
        parametros: `device_id=${device_id_url}`,
        showNotification: false,
        showLogError: true,
      };
      const response = (await getData(parametros)) as any;

      if (response.data.data.k1 == undefined) {
        return;
      }

      console.log("loginAuth", { userInfo: response.data.data });
      navigation.navigate("loginAuth", { userInfo: response.data.data });
      //return response.data.data;
    } catch (error) {
      console.log(error, "Erro ao buscar categoria");
    }
  };

  const navegar = async (url) => {
    try {
      /*let device_id = getDeviceIdFromUrl(url);
      if(device_id){
        await buscaDeviceID(device_id);
        return;
      }

      const result = decodeUrlAndExtractCodes(url);
      if(result && Platform.OS == 'ios'){
        if(result.remainingString){
          await buscaMidiaInfo(result.contentTypeCode, result.remainingString.replace(/\|/g, '%7C'));
        }
        return;
      }

      const route = url.replace(/.*?:\/\//g, "");
      const routeName = route.split("/")[0];
      const id = route.match(/\/([^\/]+)\/?$/)[1];

      await buscaMidiaInfo(routeName, id);*/
      const route = url.replace(/.*?:\/\//g, "");
      const routeName = route.split("/")[0];
      const id = route.match(/\/([^\/]+)\/?$/)[1];

      await buscaMidiaInfo(routeName, id);
    } catch (error) {
      console.log(error, "erro ao abrir link");
    }
  };

  const addTrackCard = async (params: any = null, posicao: any = null) => {
    try {
      let OBJETOPARAMS = await convertObjetoZoeParaPlaylistReactTrackPlayer(
        params
      );

      await removerQueues();
      await addTracks(OBJETOPARAMS, posicao);

      //setTimeout(() =>
      setExibePlayer(true);
      //,200);
      await TrackPlayer.play();

      return;
    } catch (error) {
      console.log("addtrack error -->", error);
    }
  };

  const buscaMidiaInfo = useCallback(
    async (tipo: any, codigo: any) => {
      //console.log('busca midiaaa'); console.log(user)
      if (user == null) {
        return;
      }
      try {
        let PARAM = [] as any;
        switch (tipo) {
          case "100":
            setIsLoadingShare(true);

            let parametros100 = {
              rota: `/playlists/get/${codigo}`,
              parametros: `token=${user.token}`,
              showNotification: false,
              showLogError: true,
            };
            const response100 = (await getData(parametros100)) as any;

            PARAM = [
              "SinopseAudioDrawer",
              {
                playlist: response100.data.data,
                audios: response100.data.data.audios,
              },
            ];

            break;
          case "101":
            if (user.token == undefined) {
              return;
            }

            let parametros101 = {
              rota: `/playlists/audio/${codigo}`,
              parametros: `token=${user.token}`,
              showNotification: false,
              showLogError: true,
            };
            const response101 = (await getData(parametros101)) as any;

            console.log(parametros101);

            await addTrackCard([response101.data.data]);

            break;
          case "210":
            setIsLoadingShare(true);
            if (user.token == undefined) {
              return;
            }

            let CODIGO_ = codigo.split("%7C");
            //posicão array 0 - cod-video 1 - cod-temporada 2 - cod-palestrante 3 - cod-categoria

            let parametrosCategoria = {
              rota: `/categorias/categoria/${CODIGO_[3]}`,
              parametros: `token=${EMPRESA.EMPRESA.token_cliente}&token_usuario=${user.token}`,
              showNotification: false,
              showLogError: true,
            };

            let parametrosCATTEMPORADAS = {
              rota: `/categorias/categoria/${CODIGO_[3]}/temporadas`,
              parametros: `token=${EMPRESA.EMPRESA.token_cliente}&token_usuario=${user.token}`,
              showNotification: false,
              showLogError: true,
            };

            const responseCatTEMPORADAS = (await getData(
              parametrosCATTEMPORADAS
            )) as any;
            const responseCategoria = (await getData(
              parametrosCategoria
            )) as any;

            responseCategoria.data.data["temporadas"] =
              responseCatTEMPORADAS.data.data.temporadas;
            let categoria = responseCategoria.data.data;

            let VIDEOTEMPORADASELECIONADAINCORPORADOCATEGORIA = getVideosByCategory(
              CODIGO_[1],
              categoria
            );

            categoria["videos"] = Object.values(
              VIDEOTEMPORADASELECIONADAINCORPORADOCATEGORIA.videos
            );
            categoria.categoria["apresentacao_apresentador"] =
              VIDEOTEMPORADASELECIONADAINCORPORADOCATEGORIA.apresentacao_apresentador_temporada;
            categoria.categoria["nome_apresentador"] =
              VIDEOTEMPORADASELECIONADAINCORPORADOCATEGORIA.nome_apresentador_temporada;
            categoria.categoria["subtitulo_apresentador"] =
              VIDEOTEMPORADASELECIONADAINCORPORADOCATEGORIA.subtitulo_apresentador_temporada;
            categoria.categoria["url_foto_apresentador"] =
              VIDEOTEMPORADASELECIONADAINCORPORADOCATEGORIA.url_foto_apresentador_temporada;

            const video = Object.values(categoria["videos"]).find(
              (video) => video.cod_video === CODIGO_[0]
            );
            setIsLoadingShare(false);

            PARAM = [
              "PlayerDrawer",
              {
                item: montaJsonVideo(video, "videozoeplay"),
                relacionados: [],
                aovivo: false,
                isFullScreen: false,
                titulo: "",
                materia: [],
                pagina_origem: undefined,
                categoria: categoria,
                cod_categoria_temporada: CODIGO_[1],
              },
            ];

            break;
          default:
            PARAM = [false];
            break;
        }

        if (!PARAM[0]) {
          return;
        }

        handleNavigate(PARAM);
      } catch (error) {
        setIsLoadingShare(false);
        console.log(error);
      }
    },
    [user]
  );

  const handleNavigate = useCallback((params: any) => {
    setIsLoadingShare(false);
    navigation.navigate(params[0], params[1] as any);
  }, []);

  useEffect(() => {
    return () => setIsLoading(false);
  }, [isLoading, updateInfo, update]);

  useEffect(() => {
    buscaUltimaVersaoAppLoja();
  }, []);

  useEffect(() => {
    function _handleOpenURL(event) {
      if (event.url !== null) {
        navegar(event.url);
      }
    }

    Linking.getInitialURL().then((url) => {
      if (url !== null) {
        navegar(url);
      }
    });

    Linking.addEventListener("url", _handleOpenURL);
  }, [user]);

  useEffect(() => {
    console.log(isLoadingShare, "<-- isloadingsharee");
    //return () => setIsLoadingShare(false);
  }, [isLoadingShare]);

  // Componente
  const COMPONENTEUPDATE = () => {
    return (
      <View
        style={{
          flex: 1,
          padding: 100,
          justifyContent: "center",
          backgroundColor: CustomDefaultTheme.colors.background,
        }}
      >
        <CustomText style={{ textAlign: "center", color: "#FFF" }}>
          New Update
        </CustomText>
        <CustomText style={{ textAlign: "center", color: "#FFF" }}>
          Versão Instalada no dispositivo {version} Nova versão
          {Platform.OS == "ios"
            ? updateInfo.version.ios
            : updateInfo.version.android}
          disponivel na loja. Para obter acesso a todos os recursos do app
          atualize seu app por favor!
        </CustomText>

        <Button
          style={{}}
          onPress={() =>
            Linking.openURL(
              Platform.OS == "ios"
                ? updateInfo.links.ios
                : updateInfo.links.android
            )
          }
        >
          <MaterialIcons
            name="system-update"
            size={70}
            color={CustomDefaultTheme.colors.branco}
          />
        </Button>
      </View>
    );
  };

  if (update && updateInfo.version != undefined) {
    switch (Platform.OS) {
      case "android":
        if (updateInfo.version.android !== undefined) {
          if (updateInfo.version.android != version)
            return (
              <>
                <COMPONENTEUPDATE />
              </>
            );
        }
        break;
      case "ios":
        if (updateInfo.version.ios !== undefined) {
          if (updateInfo.version.ios != version)
            return (
              <>
                <COMPONENTEUPDATE />
              </>
            );
        }
        break;
    }
  }

  //loadingStorage
  //if (isLoading) {
  if (isLoading) {
    return (
      <LinearGradient
        start={{
          x: 0,
          y: Platform.OS == "ios" ? 0.15 : 0,
        }}
        end={{
          x: 0,
          y: Platform.OS == "ios" ? 0.99 : 0.99,
        }}
        colors={[
          CustomDefaultTheme.colors.gradiente1,
          CustomDefaultTheme.colors.gradiente2,
          CustomDefaultTheme.colors.gradiente2,
        ]}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {true && (
          <LottieView
            source={require("../../assets/lottie/animacao_transparente.json")}
            autoPlay
            loop
            colorFilters={[]}
            style={{
              width: "100%",
              height: "100%",
              //backgroundColor: '#FF0'
            }}
          />
        )}
      </LinearGradient>
    );
  }

  return user ? ( <>
      <AppRoutes />
      {isLoadingShare && <Loading />}
    </>
  ) : (
    <AuthRoutes />
  );
};

export default Routes;
