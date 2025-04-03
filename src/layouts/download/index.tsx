import React, { useState, useEffect, useContext, useRef, useMemo } from "react";
import { ScrollView, TouchableOpacity, View, Alert, Image } from "react-native";
import RNFS, { DocumentDirectoryPath, readDir } from "react-native-fs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import RNBackgroundDownloader from "@kesha-antonov/react-native-background-downloader";

//Config
import CustomText from "../../componentes/componentes/customText";

//Componentes
import PageHeader from "../../componentes/header";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { CustomDefaultTheme } from "../../configuracoes/styles/Theme";

import Styles from "./Styles";
import { DownloadContext } from "../../configuracoes/contexts/DownloadContext";
import CustomBottomSheet from "../../componentes/componentes/CustomBottomSheet";
import {
  calcularPercentual,
  montaJsonVideo,
  segundosParaMinutos,
  verificarIndexador,
} from "../../configuracoes/utils/utils";
import Loading from "../../componentes/funcionalidade/Loading";
import { Button } from "react-native-paper";
import ItemDownloading from "../../componentes/body/itemDownloading";
import { ExibePushNotificationLocal } from "../../configuracoes/utils/notification";
import { addTracks, removerQueues } from "../../../trackPlayerServices";
import TrackPlayer from "react-native-track-player";
import { PlayerContext } from "../../configuracoes/contexts/PlayerContext";
import FastImage from "react-native-fast-image";
import { EMPRESA } from "../../configuracoes/utils/constants";
import ZoeIcone from "../../componentes/funcionalidade/ZoeIcone";

import StylesDOWNLOAD from '../../componentes/botoes/downloadButton/styles'

const DownlaodPage: React.FC<any> = (props) => {
  const navigation = useNavigation() as any;
  const CustomBottomSheetRef = useRef<any>(null);
  const {
    audiosDownload,
    setAudiosDownload,
    setVideosDownload,
    progressoDownload,
    setProgressoDownload,
    progressoDownloadAudio,
    setProgressoDownloadAudio,
  } = useContext(DownloadContext);
  const { setExibePlayer } = useContext(PlayerContext);
  const isFocused = useIsFocused();
  const [itemSelecionado, setItemSelecionado] = useState([]);
  const [fileSelecionado, setFileSelecionado] = useState([]);
  const [directory, setDirectory] = useState([]);
  const [directoryAudio, setDirectoryAudio] = useState([]);
  const [directoryThumb, setDirectoryThumb] = useState([]);
  const [directoryThumbAudio, setDirectoryThumbAudio] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [localDownloasInfo, setLocalDownloadsInfo] = useState<any>();
  const [localDownloasAudiosInfo, setLocalDownloadsAudiosInfo] = useState<
    any
  >();

  const [progresso, setProgresso] = useState<any>({});
  const [progressoDownload_PAGE, setProgressoDownload_PAGE] = useState<any>({});

  const [
    progressoDownload_PAGE_AUDIO,
    setProgressoDownload_PAGE_AUDIO,
  ] = useState<any>({});

  // TAB
  const [tabIndex, setTabIndex] = useState("videos");

  const armazenarObjetoEmColecao = async (novoObjeto) => {
    try {
      // Verifica se já existem objetos armazenados na coleção `${EMPRESA.EMPRESA.appName}_downloads`
      const objetosAntigos = await AsyncStorage.getItem(
        `${EMPRESA.EMPRESA.appName}_downloads`
      );
      let objetos = {} as any;

      if (objetosAntigos) {
        // Se existirem objetos antigos, converte a string JSON em um objeto
        objetos = JSON.parse(objetosAntigos);
      }

      // Armazena o novo objeto no objeto de downloads usando uuid_video como index
      objetos[novoObjeto.uuid_video] = novoObjeto;

      // Armazena o objeto atualizado na coleção `${EMPRESA.EMPRESA.appName}_downloads`
      await AsyncStorage.setItem(
        `${EMPRESA.EMPRESA.appName}_downloads`,
        JSON.stringify(objetos)
      );

      setVideosDownload(objetos);
      console.log("Objeto armazenado com sucesso!");
    } catch (error) {
      console.log("Erro ao armazenar o objeto:", error);
    }
  };

  const listaDownloadsExecucao = async () => {
    console.log("listão downloads");
    let lostTasks = await RNBackgroundDownloader.checkForExistingDownloads();

    if (lostTasks.length == 0) {
      setProgressoDownload({});
    }

    for (let task of lostTasks) {
      verificarIndexador(lostTasks, task.id);

      if (progressoDownload[task.id] != undefined) {
        task
          .progress((percent) => {
            console.log(
              `Downloaded: ${parseInt(
                calcularPercentual(percent.bytesDownloaded, percent.bytesTotal)
              )}%`
            );
            //setProgresso(parseInt(percent * 100));
            setProgresso(
              parseInt(
                calcularPercentual(percent.bytesDownloaded, percent.bytesTotal)
              )
            );
          })
          .done(() => {
            ExibePushNotificationLocal({
              title: "Download",
              body: "Acesse em DOWNLOADS para assistir.",
            });
            armazenarObjetoEmColecao(progressoDownload[task.id]);

            let DD = progressoDownload;
            delete DD[task.id];
            setProgressoDownload_PAGE(DD);
            setProgressoDownload(DD);
            getDirectoryList();
          })
          .error((error) => {
            console.log("Download canceled due to error: ", error);
            let DD = progressoDownload;
            delete DD[task.id];
            setProgressoDownload_PAGE(DD);
            setProgressoDownload(DD);
            getDirectoryList();
          });
      }
    }

    for (let task of lostTasks) {
      if (item.uuid_video == task.id) {
        task
          .progress((percent) => {
            console.log(
              `Downloaded: ${parseInt(
                calcularPercentual(percent.bytesDownloaded, percent.bytesTotal)
              )}%`
            );
            //setProgresso(parseInt(percent * 100));
            setProgresso(
              parseInt(
                calcularPercentual(percent.bytesDownloaded, percent.bytesTotal)
              )
            );
          })
          .done(() => {
            ExibePushNotificationLocal({
              title: "Download",
              body: "Acesse em DOWNLOADS para assistir.",
            });

            setProgresso(0);
            armazenarObjetoEmColecao(item);
            //RemoveObjetoDownloadEmExecucao();
            let DD = progressoDownload;
            delete DD[task.id];
            setProgressoDownload(DD);
          })
          .error((error) => {
            console.log("Download canceled due to error: ", error);
          });
      }
    }
  };

  const listaDownloadsExecucaoAudio = async () => {
    //alert('audios download execucaooo')
    try {
      let lostTasks = await RNBackgroundDownloader.checkForExistingDownloads();
      if (lostTasks.length == 0) {
        setProgressoDownloadAudio({});
      }

      for (let task of lostTasks) {
        verificarIndexador(lostTasks, task.id);

        if (progressoDownloadAudio[task.id] != undefined) {
          alert("baixando audio ....... victor deus");
          task
            .progress((percent) => {
              setProgresso((prevProgresso) => ({
                ...prevProgresso,
                [task.id]: parseInt(percent * 100),
              }));
            })
            .done(() => {
              ExibePushNotificationLocal({
                title: "Download",
                body: "Acesse em DOWNLOADS para assistir.",
              });
              armazenarObjetoEmColecao(progressoDownloadAudio[task.id]);

              let DD = progressoDownloadAudio;
              delete DD[task.id];
              setProgressoDownload_PAGE_AUDIO(DD);
              setProgressoDownloadAudio(DD);
              getDirectoryListAudio();
            })
            .error((error) => {
              console.log("Download canceled due to error: ", error);
              let DD = progressoDownloadAudio;
              delete DD[task.id];
              setProgressoDownload_PAGE_AUDIO(DD);
              setProgressoDownloadAudio(DD);
              getDirectoryListAudio();
            });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addTrackCard = async (params: any = null, posicao: any = null) => {
    //console.log(params, '------****------', directoryAudio); return;
    try {
      await removerQueues();
      await addTracks(params, posicao);

      //alert('foi bbzão')

      if (posicao != undefined) {
        await TrackPlayer.skip(posicao, 0);
      }

      //await TrackPlayer.play();return;
      setExibePlayer(true);
      await TrackPlayer.play();

      return;
    } catch (error) {
      console.log("addtrack error -->", error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      if (directory.length == 0) {
        getDirectoryList();
      }
      if (directoryAudio.length == 0) {
        getDirectoryListAudio();
      }
    } else {
      if (directory.length > 0) {
        setDirectory([]);
      }
      if (directoryAudio.length > 0) {
        setDirectoryAudio([]);
      }
      CustomBottomSheetRef.current?.collapse();
    }
    return () => {};
  }, [isFocused, isLoading]);

  useEffect(() => {
    if (isFocused) {
      if (tabIndex == "videos") {
        listaDownloadsExecucao();
      }
      if (tabIndex == "audios") {
        listaDownloadsExecucaoAudio();
      }
    }
  }, [isFocused, tabIndex]);

  useEffect(() => {
    if (isFocused) {
      if (tabIndex == "audios") {
        console.log(
          "progress download audio algo esta acontecendo" +
            progressoDownloadAudio
        );
        //listaDownloadsExecucaoAudio();
      }
    }
  }, [isFocused, tabIndex, progressoDownloadAudio]);

  useEffect(() => {
    if (isFocused) {
      if (tabIndex == "audios") {
        if (directoryAudio.length != Object.values(audiosDownload).length) {
          getDirectoryListAudio();
        }
      }
    }
  }, [isFocused, audiosDownload, tabIndex]);

  useEffect(() => {
    if (isFocused) {
      if (tabIndex == "videos") {
        setProgressoDownload_PAGE(progressoDownload);
      }
      if (tabIndex == "audios") {
        setProgressoDownload_PAGE_AUDIO(progressoDownloadAudio);
      }
    }
  }, [progressoDownload_PAGE, progressoDownload_PAGE_AUDIO, isFocused]);

  const handlePlay = (file: any) => {
    console;
    navigation.navigate("PlayerDrawer", {
      item: montaJsonVideo(itemSelecionado, "videozoeplaylocal", file),
      relacionados: [],
      aovivo: false,
      isFullScreen: false,
      pagina_origem: "DownloadTab",
      materia: [],
      categoria: [],
    });
  };

  const recuperarObjetosDaColecao = async () => {
    try {
      const objetosArmazenados = await AsyncStorage.getItem(
        `${EMPRESA.EMPRESA.appName}_downloads`
      );

      if (objetosArmazenados) {
        const objetos = JSON.parse(objetosArmazenados);
        return objetos;
      } else {
        console.log(
          "Nenhum objeto encontrado na coleção `${EMPRESA.EMPRESA.appName}_downloads`.",
          objetosArmazenados
        );
        return [];
      }
    } catch (error) {
      console.log("Erro ao recuperar os objetos:", error);
      return [];
    }
  };

  const recuperarObjetosDaColecaoAudio = async () => {
    try {
      // await AsyncStorage.removeItem(`${EMPRESA.EMPRESA.appName}_downloads_audios`);
      const objetosArmazenados = await AsyncStorage.getItem(
        `${EMPRESA.EMPRESA.appName}_downloads_audios`
      );

      if (objetosArmazenados) {
        const objetos = JSON.parse(objetosArmazenados);

        console.log(objetos, "-->> objetos audiosssss");
        return objetos;
      } else {
        console.log(
          "Nenhum objeto encontrado na coleção `${EMPRESA.EMPRESA.appName}_downloads_audios`.",
          objetosArmazenados
        );
        return [];
      }
    } catch (error) {
      console.log("Erro ao recuperar os objetos:", error);
      return [];
    }
  };

  const removeObjetosDaColecaoAudio = async (nome_objeto: any) => {
    let indexador_arquivo = nome_objeto.replace(/\.mp3$/, "");
    try {
      const objetosArmazenados = await AsyncStorage.getItem(
        `${EMPRESA.EMPRESA.appName}_downloads_audios`
      );

      if (objetosArmazenados) {
        const objetos = JSON.parse(objetosArmazenados);

        if (objetos.hasOwnProperty(indexador_arquivo)) {
          delete objetos[indexador_arquivo];
        }

        await AsyncStorage.removeItem(
          `${EMPRESA.EMPRESA.appName}_downloads_audios`
        );

        await AsyncStorage.setItem(
          `${EMPRESA.EMPRESA.appName}_downloads_audios`,
          JSON.stringify(objetos)
        );

        setAudiosDownload(objetos);

        return;
      } else {
        console.log(
          "Nenhum objeto encontrado na coleção `${EMPRESA.EMPRESA.appName}_downloads_audios`. ao remover item"
        );
        return [];
      }
    } catch (error) {
      console.log("Erro ao recuperar os objetos:", error);
      return [];
    }
  };

  const removeObjetosDaColecao = async (nome_objeto: any) => {
    let indexador_arquivo = nome_objeto.replace(/\.mp4$/, "");
    try {
      const objetosArmazenados = await AsyncStorage.getItem(
        `${EMPRESA.EMPRESA.appName}_downloads`
      );

      if (objetosArmazenados) {
        const objetos = JSON.parse(objetosArmazenados);

        if (objetos.hasOwnProperty(indexador_arquivo)) {
          delete objetos[indexador_arquivo];
        }

        await AsyncStorage.removeItem(`${EMPRESA.EMPRESA.appName}_downloads`);

        await AsyncStorage.setItem(
          `${EMPRESA.EMPRESA.appName}_downloads`,
          JSON.stringify(objetos)
        );

        setVideosDownload(objetos);

        return;
      } else {
        console.log(
          "Nenhum objeto encontrado na coleção `${EMPRESA.EMPRESA.appName}_downloads`. ao remover item"
        );
        return [];
      }
    } catch (error) {
      console.log("Erro ao recuperar os objetos:", error);
      return [];
    }
  };

  const getDirectoryList = async () => {
    try {
      const pathListVideos = await readDir(
        `${DocumentDirectoryPath}/media/videos/`
      );
      const pathListThumb = await readDir(
        `${DocumentDirectoryPath}/media/thumb/`
      );

      const response = await recuperarObjetosDaColecao();

      setLocalDownloadsInfo(response);
      setVideosDownload(response);
      setDirectory(pathListVideos);
      setDirectoryThumb(pathListThumb);
    } catch (error) {
      console.log(error);
    }
  };

  const getDirectoryListAudio = async () => {
    try {
      const pathListAudios = await readDir(
        `${DocumentDirectoryPath}/media/audios/`
      );

      const pathListThumbAudios = await readDir(
        `${DocumentDirectoryPath}/media/thumb_audios/`
      );

      const responseAudio = await recuperarObjetosDaColecaoAudio();

      //console.log(DocumentDirectoryPath, '')

      setLocalDownloadsAudiosInfo(responseAudio);
      setAudiosDownload(responseAudio);

      setDirectoryAudio(pathListAudios);
      setDirectoryThumbAudio(pathListThumbAudios);
    } catch (error) {
      console.log(error);
    }
  };

  const removeAllFiles = async () => {
    try {
      setIsloading(true);

      await AsyncStorage.removeItem(`${EMPRESA.EMPRESA.appName}_downloads`);

      await RNFS.unlink(`${DocumentDirectoryPath}/media/videos/`);
      await RNFS.unlink(`${DocumentDirectoryPath}/media/thumb/`);

      getDirectoryList();
      setVideosDownload([]);
      setProgressoDownload({});
      setIsloading(false);
    } catch (error) {
      console.log(error);
      setIsloading(false);
    } finally {
      setIsloading(false);
    }
  };

  const removeLocalFile = async (item) => {
    try {
      setIsloading(true);
      let uuid_video = item.name.replace(/\.mp4$/, "");
      await removeObjetosDaColecao(item.name);
      await RNFS.unlink(`${item.path}`);
      await RNFS.unlink(
        `${DocumentDirectoryPath}/media/thumb/${uuid_video}.jpg`
      );

      getDirectoryList();
      CustomBottomSheetRef.current?.collapse();
      setIsloading(false);
    } catch (error) {
      console.log(error);
      setIsloading(false);
    } finally {
      setIsloading(false);
    }
  };

  const removeLocalFileAudio = async (item) => {
    try {
      setIsloading(true);
      let uuid_video = item.name.replace(/\.mp3$/, "");
      await removeObjetosDaColecaoAudio(item.name);
      await RNFS.unlink(`${item.path}`);
      await RNFS.unlink(
        `${DocumentDirectoryPath}/media/thumb_audios/${uuid_video}.jpg`
      );

      getDirectoryListAudio();
      CustomBottomSheetRef.current?.collapse();
      setIsloading(false);
    } catch (error) {
      console.log(error);
      setIsloading(false);
    } finally {
      setIsloading(false);
    }
  };

  const COMPONENTEHEADER = () => {
    return (
      <View
        style={{
          height: hp("12"),
          backgroundColor: CustomDefaultTheme.colors.background,
        }}
      >
        <PageHeader
          headerLeft={
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
                //props.navigation.goBack();
              }}
            >
              <View
                style={{
                  backgroundColor: "#0000006b",
                  width: 40,
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  borderRadius: 199,
                  paddingRight: 3,
                }}
              >
                <FontAwesome
                  name="angle-left"
                  size={27}
                  color={CustomDefaultTheme.colors.branco}
                />
              </View>
            </TouchableOpacity>
          }
          titulo={"Downloads"}
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
                  marginRight: 10,
                }}
              ></View>
              <View
                style={{
                  right: 0,
                  marginTop: -5,
                }}
              ></View>
            </View>
          }
        />
      </View>
    );
  };

  const COMPONENTEINFORMACOESSHEET = (props) => {
    return (
      <View>
        <View style={{ marginTop: -5, padding: 2 }}>
          <View
            style={{
              paddingTop: 10,
              alignItems: "center",
            }}
          >
            <Image
              style={{
                resizeMode: "cover",
                width: "90%",
                height: 200,
                backgroundColor: CustomDefaultTheme.colors.background,
              }}
              source={{
                uri: `file://${DocumentDirectoryPath}/media/thumb/${props.informacoes.uuid_video}.jpg`,
              }}
            />

            <View>
              <View style={[Styles.blocoBotoesPlay]}>
                <View>
                  <TouchableOpacity onPress={() => handlePlay(props.file)}>
                    <AntDesign
                      name="playcircleo"
                      size={40}
                      color={CustomDefaultTheme.colors.branco}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ width: 5 }} />
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        "Tem certeza que deseja apagar esse arquivo?",
                        "nome item", //item.name,
                        [
                          {
                            text: "Sim",
                            onPress: () => {
                              removeLocalFile(props.file);
                            }, //removeLocalFile(item),
                          },
                          {
                            text: "Não",
                            onPress: () => {}, //Alert.alert("Cancel Pressed"),
                          },
                        ],
                        {
                          cancelable: true,
                          onDismiss: () => {},
                        }
                      );
                    }}
                  >
                    <MaterialCommunityIcons
                      name="delete"
                      size={40}
                      color={CustomDefaultTheme.colors.branco}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[Styles.blocoTextoPlay]}>
                <CustomText
                  textType="montserratBold"
                  style={{
                    fontSize: 15,
                    color: CustomDefaultTheme.colors.textoBottomSheetDownload,
                  }}
                >
                  {props.informacoes.titulo_video}
                </CustomText>
                <CustomText
                  style={{
                    fontSize: 12,
                    color: CustomDefaultTheme.colors.textoBottomSheetDownload,
                  }}
                  textType="montserratLight"
                >
                  {props.informacoes.descricao_video}
                </CustomText>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  // TAB
  const COMPONENTEVIDEOS = useMemo(() => {
    if (directory.length > 0) {
      return (
        <>
          {directory.length > 0 &&
            directory.map((item, index) => {
              let uuid_video = item.name.replace(/\.mp4$/, "");

              if (localDownloasInfo[uuid_video] == undefined) {
                return;
              }

              return (
                <View style={[Styles.itemVideo]} key={`${Math.random()}`}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        setFileSelecionado(item);
                        setItemSelecionado(localDownloasInfo[uuid_video]);
                        CustomBottomSheetRef.current?.expand();
                      }}
                      style={{
                        flexDirection: "row",
                        width: '100%'
                      }}
                    >
                      <Image
                        style={{
                          marginLeft: 5,
                          width: 100,
                          height: 60,
                          backgroundColor: "#FFF",
                          borderRadius: 10,
                        }}
                        source={{
                          uri: `file://${DocumentDirectoryPath}/media/thumb/${uuid_video}.jpg`,
                        }}
                      />
                      <View
                        style={{
                          width: "63%",
                        }}
                      >
                        <CustomText
                          textType="montserratMedium"
                          numberOfLines={1}
                          style={{
                            marginLeft: 5,
                            fontSize: 11,
                            letterSpacing: 0.22,
                            lineHeight: 14,
                            color: CustomDefaultTheme.colors.fontCardDownloadVideo,
                          }}
                        >
                          {localDownloasInfo[uuid_video] != undefined
                            ? localDownloasInfo[uuid_video].titulo_video
                            : item.name}
                        </CustomText>
                        <CustomText
                          textType="montserratMedium"
                          numberOfLines={2}
                          style={{
                            marginLeft: 5,
                            fontSize: 14,
                            letterSpacing: 0.21,
                            lineHeight: 15,
                            color: CustomDefaultTheme.colors.text,
                          }}
                        >
                          {localDownloasInfo[uuid_video] != undefined
                            ? localDownloasInfo[uuid_video].descricao_video
                            : ""}
                        </CustomText>
                        <CustomText
                          textType="montserratMedium"
                          numberOfLines={2}
                          style={{
                            marginLeft: 5,
                            fontSize: 11,
                            letterSpacing: 0.22,
                            lineHeight: 14,
                            color: "#666666",
                          }}
                        >
                          {localDownloasInfo[uuid_video] != undefined &&
                            segundosParaMinutos(
                              parseInt(
                                localDownloasInfo[uuid_video].duracao_video
                              )
                            )}
                        </CustomText>
                      </View>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <View
                          style={[StylesDOWNLOAD.containerIcons]}
                        >
                          <MaterialCommunityIcons
                            name="check"
                            size={22}
                            color={CustomDefaultTheme.colors.branco}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
        </>
      );
    }
  }, [directory]);

  const COMPONENTEAUDIOS = useMemo(() => {
    if (directoryAudio.length > 0) {
      let array = [];
      return (
        <View
          style={{
            paddingHorizontal: "2.5%",
          }}
        >
          {directoryAudio.length > 0 &&
            directoryAudio.map((item, index) => {
              let uuid_audio = item.name.replace(/\.mp3$/, "");

              if (localDownloasAudiosInfo[uuid_audio] == undefined) {
                return;
              }

              let OBJETOCAMINHOLOCAL = localDownloasAudiosInfo[uuid_audio];
              OBJETOCAMINHOLOCAL.url = `file://${item.path}`;
              OBJETOCAMINHOLOCAL.artwork = `file://${DocumentDirectoryPath}/media/thumb_audios/${uuid_audio}.jpg`

              //array.push(localDownloasAudiosInfo[uuid_audio]);
              array.push(OBJETOCAMINHOLOCAL);

              //console.log(`${localDownloasAudiosInfo[uuid_audio].url} testeeeee ${item.path}`);

              return (
                <View
                  key={item.name}
                  style={{
                    width: "100%",
                    paddingVertical: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        width: 61,
                        height: 63,
                      }}
                    >
                      <FastImage
                        resizeMode="cover"
                        source={{
                          uri: `${localDownloasAudiosInfo[uuid_audio].artwork}`, //localDownloasAudiosInfo[uuid_audio].artwork,
                        }}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: 10,
                          backgroundColor: CustomDefaultTheme.colors.cinza,
                        }}
                      />
                    </View>

                    <View
                      style={{
                        paddingHorizontal: 15,
                        width: "65%",
                      }}
                    >
                      <CustomText
                        numberOfLines={2}
                        textType="montserratMedium"
                        style={{
                          fontSize: 11,
                          color: CustomDefaultTheme.colors.fontCardDownloadVideo,
                        }}
                      >
                        {localDownloasAudiosInfo[uuid_audio].title}
                      </CustomText>
                      <CustomText
                        textType="montserratMedium"
                        style={{
                          top: 2,
                          fontSize: 14,
                          color: CustomDefaultTheme.colors.text,
                          letterSpacing: 0.21,
                        }}
                        numberOfLines={1}
                      >
                        {localDownloasAudiosInfo[uuid_audio].genre}
                      </CustomText>
                      <CustomText
                        textType="montserratMedium"
                        style={{
                          top: 2,
                          fontSize: 11,
                          color: "#666666",
                          letterSpacing: 0.22,
                          lineHeight: 14,
                        }}
                        numberOfLines={1}
                      >
                        {segundosParaMinutos(
                          localDownloasAudiosInfo[uuid_audio].duration
                        )}
                      </CustomText>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          Alert.alert(
                            "Tem certeza que deseja apagar esse arquivo?",
                            "nome item", //item.name,
                            [
                              {
                                text: "Sim",
                                onPress: () => {
                                  removeLocalFileAudio(item);
                                }, //removeLocalFile(item),
                              },
                              {
                                text: "Não",
                                onPress: () => {}, //Alert.alert("Cancel Pressed"),
                              },
                            ],
                            {
                              cancelable: true,
                              onDismiss: () => {},
                            }
                          );
                        }}
                      >
                        <MaterialCommunityIcons
                          name="delete"
                          size={30}
                          color={CustomDefaultTheme.colors.vermelho}
                        />
                      </TouchableOpacity>

                      <View style={{ width: 15 }} />
                      <TouchableOpacity
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor:
                            CustomDefaultTheme.colors.primaryButton,
                          width: 30,
                          height: 30,
                          borderRadius: 80,
                        }}
                        onPress={() => addTrackCard(array, index)}
                      >
                        <ZoeIcone width={15} height={15} name="icone-play" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
        </View>
      );
    }
  }, [directoryAudio]);

  const COMPONENTEHEADERTAB = () => {
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: "2.5%",
            paddingVertical: 10,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={[
              Styles.tabButton,
              tabIndex == "videos"
                ? {
                    backgroundColor: CustomDefaultTheme.colors.buttonTabexplore,
                  }
                : {
                    borderWidth: 1,
                    borderColor: CustomDefaultTheme.colors.tabButtonBorder,
                  },
            ]}
            onPress={() => setTabIndex("videos")}
          >
            <View
              style={{
                alignItems: "center",
              }}
            >
              <CustomText
                numberOfLines={2}
                textType="montserratBold"
                style={{
                  fontSize: 12,
                  letterSpacing: 0.24,
                  lineHeight: 15,
                  color:
                    tabIndex == "videos"
                      ? "#FFF"
                      : CustomDefaultTheme.colors.tabButtonBorder,
                }}
              >
                Videos
              </CustomText>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              {
                /*display: 'none'*/
              },
              Styles.tabButton,
              tabIndex == "audios"
                ? {
                    backgroundColor: CustomDefaultTheme.colors.buttonTabexplore,
                  }
                : {
                    borderWidth: 1,
                    borderColor: CustomDefaultTheme.colors.tabButtonBorder,
                  },
            ]}
            onPress={() => setTabIndex("audios")}
          >
            <View
              style={{
                alignItems: "center",
              }}
            >
              <CustomText
                numberOfLines={2}
                textType="montserratBold"
                style={{
                  fontSize: 12,
                  letterSpacing: 0.24,
                  lineHeight: 15,
                  color:
                    tabIndex == "audios"
                      ? "#FFF"
                      : CustomDefaultTheme.colors.tabButtonBorder,
                }}
              >
                Áudios
              </CustomText>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const COMPONENTEBODYTABMEMO = useMemo(() => {
    switch (tabIndex) {
      case "videos":
        return (
          <View
            style={{
              width: "100%",
            }}
          >
            {Object.values(progressoDownload_PAGE).length > 0 && (
              <>
                {Object.values(progressoDownload_PAGE).map(
                  (item: any, index) => {
                    return (
                      <ItemDownloading
                        key={item.cod_video}
                        item={item}
                        progresso={
                          progresso[item.uuid_video] != undefined
                            ? progresso[item.uuid_video]
                            : 0
                        }
                      />
                    );
                  }
                )}
              </>
            )}
            {COMPONENTEVIDEOS}
          </View>
        );
        break;
      case "audios":
        return (
          <View
            style={{
              width: "100%",
            }}
          >
            {COMPONENTEAUDIOS}
          </View>
        );
        break;
    }
  },[tabIndex, directoryAudio, directory]);
  // TAB

  const COMPONENTEBOOTOMSHEET = useMemo(() => {
    return (
      Object.values(itemSelecionado).length > 0 && (
        <CustomBottomSheet
          background={CustomDefaultTheme.colors.bottomTab}
          sheetRef={CustomBottomSheetRef}
          children={
            <COMPONENTEINFORMACOESSHEET
              informacoes={itemSelecionado}
              file={fileSelecionado}
            />
          }
        />
      )
    );
  }, [itemSelecionado]);

  return (
    <>
      <COMPONENTEHEADER />

      <View style={{ display: "none", width: "100%" }}>
        <TouchableOpacity onPress={removeAllFiles}>
          <Button>Remove Todos</Button>
        </TouchableOpacity>
        <CustomText>Em Download</CustomText>
      </View>
      <COMPONENTEHEADERTAB />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={[Styles.containerScroll]}
      >
        {COMPONENTEBODYTABMEMO}
        <View style={{ height: 150 }} />
      </ScrollView>

      {COMPONENTEBOOTOMSHEET}

      {isLoading && <Loading />}
    </>
  );
};

export default DownlaodPage;
