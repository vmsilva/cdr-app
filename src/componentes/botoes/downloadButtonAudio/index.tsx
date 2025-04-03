import React, { useState, useEffect, useContext } from "react";
import {
  PermissionsAndroid,
  TouchableOpacity,
  View,
  Platform,
  Alert,
} from "react-native";
import RNBackgroundDownloader from "@kesha-antonov/react-native-background-downloader";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import RNFS, { DocumentDirectoryPath, readDir } from "react-native-fs";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Config
import styles from "./styles";
import CustomText from "../../componentes/customText";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";
import { DownloadContext } from "../../../configuracoes/contexts/DownloadContext";
import { ExibePushNotificationLocal } from "../../../configuracoes/utils/notification";
import { calcularPercentual } from "../../../configuracoes/utils/utils";
import { EMPRESA } from "../../../configuracoes/utils/constants";

//SVG
import SVGDOWNLOAD from "../../../assets/svg/icone-download.svg";

const DownloadButtonAudio: React.FC<any> = ({ hls, item, color, background }) => {
  const {
    audiosDownload,
    setAudiosDownload,
    setProgressoDownloadAudio,
    progressoDownloadAudio,
  } = useContext(DownloadContext);
  const [progresso, setProgresso] = useState<any>(0);
  const [directory, setDirectory] = useState([]);
  // diretorio videos
  const mediaDir = `${DocumentDirectoryPath}/media/audios/`;
  const filePath = `${DocumentDirectoryPath}/media/audios/${item.cod_playlist_audio}.mp3`;
  // diretorio capas videos
  const mediaDirThumb = `${DocumentDirectoryPath}/media/thumb_audios/`;
  let ATW = item.artwork != undefined ? item.artwork.slice(-4) : "";
  let filePathThumb = `${DocumentDirectoryPath}/media/thumb_audios/${item.cod_playlist_audio}${ATW}`;

  const AdcionaObjetoDownloadEmExecucao = () => {
    setProgressoDownloadAudio({
      ...progressoDownloadAudio,
      [item.cod_playlist_audio]: item,
    });
  };

  const armazenarObjetoEmColecao = async (novoObjeto) => {
    try {
      // Verifica se já existem objetos armazenados na coleção "downloads"
      const objetosAntigos = await AsyncStorage.getItem(`${EMPRESA.EMPRESA.appName}_downloads_audios`);
      let objetos = {} as any;

      if (objetosAntigos) {
        // Se existirem objetos antigos, converte a string JSON em um objeto
        objetos = JSON.parse(objetosAntigos);
      }

      // Armazena o novo objeto no objeto de downloads usando uuid_video como index
      objetos[novoObjeto.cod_playlist_audio] = novoObjeto;

      // Armazena o objeto atualizado na coleção `${EMPRESA.EMPRESA.appName}_downloads_audios`
      await AsyncStorage.setItem(`${EMPRESA.EMPRESA.appName}_downloads_audios`, JSON.stringify(objetos));

      setAudiosDownload(objetos);
      console.log("Objeto armazenado com sucesso!");
    } catch (error) {
      console.log("Erro ao armazenar o objeto:", error);
    }
  };

  async function hasAndroidPermission() {
    if (Number(Platform.Version) >= 33) {
      return true;
    }
  
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
  
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }
  
    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  const createDirectory = async (dados: any) => {
    try {
      if (Platform.OS == "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );

        //if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        if (await hasAndroidPermission()) {
          const dirExists = await RNFS.exists(`${dados.mediaDir}`);

          if (!dirExists) {
            await RNFS.mkdir(`${dados.mediaDir}`);
            console.log(
              `Diretório ${dados.tipo} criado com sucesso:`,
              dados.mediaDir
            );
          } else {
            //console.log("O diretório já existe:", dados.mediaDir);
          }
        } else {
          console.log(
            "Permissão de escrita no armazenamento externo não concedida"
          );
        }
      } else {
        const dirExists = await RNFS.exists(`${dados.mediaDir}`);

        if (!dirExists) {
          await RNFS.mkdir(`${dados.mediaDir}`);
          console.log(
            `Diretório ${dados.tipo} criado com sucesso:`,
            dados.mediaDir
          );
        } else {
          //console.log("O diretório já existe:", dados.mediaDir);
        }
      }
    } catch (error) {
      console.log("Erro ao criar o diretório:", error);
    }
  };

  const listaDownloadsExecucao = async () => {
    let lostTasks = await RNBackgroundDownloader.checkForExistingDownloads();

    if (lostTasks.length == 0) {
      setProgressoDownloadAudio({});
    }

    for (let task of lostTasks) {
      if (item.cod_playlist_audio == task.id) {
        task
          .progress((percent) => {
            console.log(`Downloaded: ${parseInt(calcularPercentual(percent.bytesDownloaded, percent.bytesTotal))}%`);
            setProgresso(parseInt(calcularPercentual(percent.bytesDownloaded, percent.bytesTotal)));
          })
          .done(() => {
            ExibePushNotificationLocal({
              title: "Download",
              body: "Acesse em DOWNLOADS para ouvir.",
            });

            item.artwork = `file://${filePathThumb}`;
            item.url = `file://${filePath}`;

            setProgresso(0);
            armazenarObjetoEmColecao(item);
            //RemoveObjetoDownloadEmExecucao();
            let DD = progressoDownloadAudio;
            delete DD[task.id];
            setProgressoDownloadAudio(DD);
          })
          .error((error) => {
            console.log("Download canceled due to error: ", error);
          });
      }
    }
  };

  const handleDownload = async () => {
    try {
      const url = hls;
      const path = `${filePath}`;
      const pathThumb = `${filePathThumb}`;

      const optionsThumb = {
        fromUrl: item.artwork,
        toFile: pathThumb,
        progress: (res) => {
          // Handle download progress updates if needed
          const progress = (res.bytesWritten / res.contentLength) * 100;
          //console.log(`Progress thumb: ${progress.toFixed(2)}%`);
        },
        begin: (res) => {
          // Handle download progress updates if needed
          const progress = (res.bytesWritten / res.contentLength) * 100;
          //console.log(`Progress: ${progress.toFixed(2)}%`);
        },
      };

      createDirectory({ mediaDir: mediaDirThumb, tipo: "thumb" });

      // thumbnails
      AdcionaObjetoDownloadEmExecucao();
      setProgresso(0.1);
      const resThumb = await RNFS.downloadFile(optionsThumb).promise;

      if (resThumb.statusCode === 200) {
        console.log("Arquivo salvo na pasta de mídia THUMB AUDIO  com sucesso");
      } else {
        console.log("Falha ao baixar o arquivo");
        if (resThumb.statusCode == 404)
          Alert.alert("Falha ao Baixar arquivo Thumb do AUDIO, 404 not found!");
      }

      createDirectory({ mediaDir: mediaDir, tipo: "Audio" });

      let task = RNBackgroundDownloader.download({
        id: item.cod_playlist_audio,
        url: url,
        destination: `${path}`,
        //type: 'parallel'
      })
        .begin(({ expectedBytes, headers }) => {
          setProgresso(0.2);
        })
        .progress((percent) => {
          console.log(`Downloaded: ${parseInt(calcularPercentual(percent.bytesDownloaded, percent.bytesTotal))}%`);
          setProgresso(parseInt(calcularPercentual(percent.bytesDownloaded, percent.bytesTotal)));
        })
        .done(() => {
          ExibePushNotificationLocal({
            title: "Download",
            body: "Acesse em DOWNLOADS para ouvir.",
          });

          item.artwork = `file://${filePathThumb}`;
          item.url = `file://${filePath}`;

          console.log(filePath)

          setProgresso(0);
          armazenarObjetoEmColecao(item);
          let DD = progressoDownloadAudio;
          delete DD[task.id];
          setProgressoDownloadAudio(DD);
        })
        .error((error) => {
          console.log("Download canceled due to error: ", error);
          return;
        });
    } catch (error) {
      console.log(error, "download errorrr");
    }
  };

  useEffect(() => {
    const getDirectoryList = async () => {
      try {
        const pathList = await readDir(`${DocumentDirectoryPath}/media/`);

        setDirectory(pathList);
      } catch (error) {
        console.log(error);
      }
    };
    getDirectoryList();
  }, []);

  useEffect(() => {
    listaDownloadsExecucao();
  }, []);

  useEffect(() => {
  },[audiosDownload])

  if (audiosDownload[item.cod_playlist_audio] !== undefined && progresso == 0) {
    return (
      <View
        style={{
          padding: 1,
          borderRadius: 99,
          width: 30,
          height: 30,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: background != undefined ? background : CustomDefaultTheme.colors.sliderTrackplayer,
        }}
      >
        <MaterialCommunityIcons
          name="check"
          size={22}
          color={"#FFF"}
        />
      </View>
    );
  }

  ///if (true){
  if (progresso > 0 && progressoDownloadAudio[item.cod_playlist_audio]) {
    return (
        <View
          style={{
            padding: 1,
            borderRadius: 99,
            width: 30,
            height: 30,
            justifyContent: "center",
            alignItems: "center",
            //backgroundColor: background != undefined ? background : CustomDefaultTheme.colors.sliderTrackplayer,
            backgroundColor: background ? background : CustomDefaultTheme.colors.iconsBackgroundEscuro
          }}
        >
          <AnimatedCircularProgress
            size={30}
            width={3}
            fill={progresso}
            tintColor={CustomDefaultTheme.colors.primaryButton}
            backgroundColor={CustomDefaultTheme.colors.branco}
          >
            {(fill) => (
              <CustomText
                style={{
                  fontSize: 10,
                }}
              >
                {progresso}%
              </CustomText>
            )}
          </AnimatedCircularProgress>
        </View>
    );
  }

  return (
    
    <View 
      style={{
        padding: 1,
        borderRadius: 99,
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: background != undefined ? background : CustomDefaultTheme.colors.sliderTrackplayer,
      }}
    >
      <TouchableOpacity
        onPress={handleDownload} //handleDownload
        style={[styles.containerIcons, {backgroundColor: background != undefined ? background : CustomDefaultTheme.colors.sliderTrackplayer}]}
      >
         <SVGDOWNLOAD width={15} height={15} />
      </TouchableOpacity>
    </View>
  );
};

export default DownloadButtonAudio;
