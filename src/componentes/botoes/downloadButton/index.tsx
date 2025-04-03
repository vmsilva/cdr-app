import React, { useState, useEffect, useContext } from "react";
import {
  PermissionsAndroid,
  TouchableOpacity,
  View,
  Platform,
  Alert,
} from "react-native";

import { AnimatedCircularProgress } from "react-native-circular-progress";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import RNFS, {
  DocumentDirectoryPath,
  readDir,
} from "react-native-fs";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Config
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";
import RNBackgroundDownloader, {download, completeHandler, directories} from "@kesha-antonov/react-native-background-downloader";
import { DownloadContext } from "../../../configuracoes/contexts/DownloadContext";
import { ExibePushNotificationLocal } from "../../../configuracoes/utils/notification";
import CustomText from "../../componentes/customText";
import styles from "./styles";
import { calcularPercentual } from "../../../configuracoes/utils/utils";
import { EMPRESA } from "../../../configuracoes/utils/constants";

const DownloadButton: React.FC<any> = ({ hls, item, color }) => {
  //return <></>;
  const {
    videosDownload,
    setVideosDownload,
    setProgressoDownload,
    progressoDownload,
  } = useContext(DownloadContext);
  const [directory, setDirectory] = useState([]);
  // diretorio videos
  const mediaDir = `${DocumentDirectoryPath}/media/videos/`;
  const filePath = `${DocumentDirectoryPath}/media/videos/${item.uuid_video}.mp4`;
  // diretorio capas videos
  const mediaDirThumb = `${DocumentDirectoryPath}/media/thumb/`;
  const filePathThumb = `${DocumentDirectoryPath}/media/thumb/${item.uuid_video}${item.url_thumb_video.slice(-4)}`;
  const [progresso, setProgresso] = useState<any>(0);

  const AdcionaObjetoDownloadEmExecucao = () => {
    setProgressoDownload({...progressoDownload, [item.uuid_video]: item})
  }

  const armazenarObjetoEmColecao = async (novoObjeto) => {
    try {
      // Verifica se já existem objetos armazenados na coleção `${EMPRESA.EMPRESA.appName}_downloads`
      const objetosAntigos = await AsyncStorage.getItem(`${EMPRESA.EMPRESA.appName}_downloads`);
      let objetos = {} as any;

      if (objetosAntigos) {
        // Se existirem objetos antigos, converte a string JSON em um objeto
        objetos = JSON.parse(objetosAntigos);
      }

      // Armazena o novo objeto no objeto de downloads usando uuid_video como index
      objetos[novoObjeto.uuid_video] = novoObjeto;

      // Armazena o objeto atualizado na coleção `${EMPRESA.EMPRESA.appName}_downloads`
      await AsyncStorage.setItem(`${EMPRESA.EMPRESA.appName}_downloads`, JSON.stringify(objetos));

      setVideosDownload(objetos);
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
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Permissão de Armazenamento',
            message: 'O aplicativo precisa de acesso ao armazenamento externo para salvar arquivos.',
            buttonNeutral: 'Perguntar depois',
            buttonNegative: 'Cancelar',
            buttonPositive: 'OK',
          }
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
          alert(
            "Permissão de escrita no armazenamento externo não concedida"
          );
        }
      } else {
        const dirExists = await RNFS.exists(`${dados.mediaDir}`);

        console.log(dirExists, '))))))))---->>>>')

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

    if(lostTasks.length == 0){
      setProgressoDownload({})
    }
    
    for (let task of lostTasks) {

      if (item.uuid_video == task.id) {
        task
          .progress((percent) => {
            console.log(`Downloaded: ${parseInt(calcularPercentual(percent.bytesDownloaded, percent.bytesTotal))}%`);
            //setProgresso(parseInt(percent * 100));
            setProgresso(parseInt(calcularPercentual(percent.bytesDownloaded, percent.bytesTotal)));
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

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Permissão de Armazenamento',
          message: 'O aplicativo precisa de acesso ao armazenamento externo para salvar arquivos.',
          buttonNeutral: 'Perguntar depois',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Permissão de armazenamento concedida');
      } else {
        console.log('Permissão de armazenamento negada');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleDownload = async () => { console.log('bunda', hls)
    try {

      const url = hls; //"https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg";
      const path = `${filePath}`; //`${DocumentDirectoryPath}/testImage.png`;
      const pathThumb = `${filePathThumb}`; //`${DocumentDirectoryPath}/testImage.png`;

      const optionsThumb = {
        fromUrl: item.url_thumb_video,
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

      await createDirectory({ mediaDir: mediaDirThumb, tipo: "thumb" });

      // thumbnails
      AdcionaObjetoDownloadEmExecucao();
      setProgresso(0.1);
      //await requestStoragePermission()
      const resThumb = await RNFS.downloadFile(optionsThumb).promise;

      if (resThumb.statusCode === 200) {
        console.log("Arquivo salvo na pasta de mídia THUMB com sucesso");
      } else {
        console.log("Falha ao baixar o arquivo");
        if (resThumb.statusCode == 404)
          Alert.alert("Falha ao Baixar arquivo Thumb do video, 404 not found!");
      }

      createDirectory({ mediaDir: mediaDir, tipo: "Video" });
      //console.log(`-->> url downloadddd ${url}`); return
      let task = download({
        id: item.uuid_video,
        url: url,
        destination: `${path}`,
        metadata: {}
      }).begin(({ expectedBytes, headers }) => {
        console.log('carregando download.....');
        //setProgresso(0.2);
      }).progress(({ bytesDownloaded, bytesTotal }) => {
        setProgresso(parseInt(calcularPercentual(bytesDownloaded, bytesTotal)));
        console.log(parseInt(bytesDownloaded / bytesTotal * 100), '-->> progresso', { bytesDownloaded, bytesTotal });
      }).done(({ bytesDownloaded, bytesTotal }) => {
        ExibePushNotificationLocal({
          title: "Download",
          body: "Acesse em DOWNLOADS para assistir.",
        });
      
        setProgresso(0);
        armazenarObjetoEmColecao(item);
      
        let DD = progressoDownload;
        delete DD[task.id];
        setProgressoDownload(DD);
      }).error(({ error, errorCode }) => {
        console.log("Download canceled due to error: ", { error, errorCode });
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
    console.log(`progresso ===>>> ${progresso}`)
  },[progresso])

  useEffect(() => {
  },[progressoDownload])

  if (videosDownload[item.uuid_video] !== undefined && progresso == 0) {
    return (
      <View>
        {
          <View
            style={[styles.containerIcons]}
          >
            <MaterialCommunityIcons
              name="check"
              size={22}
              color={CustomDefaultTheme.colors.branco}
            />
          </View>
        }
      </View>
    );
  }

  if (progresso > 0 && progressoDownload[item.uuid_video]) {
    return (
      <View>
        {
          <View
            style={{
              //marginRight: 10, //display: 'none'
            }}
          >
            <AnimatedCircularProgress
              size={30}
              width={3}
              fill={progresso}
              tintColor={CustomDefaultTheme.colors.primaryButton}
              backgroundColor="#FFF"
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
        }
      </View>
    );
  }

  return (
    <View>
      {
        <View
          style={[styles.containerIcons]}
        >
          <TouchableOpacity onPress={handleDownload}
          style={[styles.containerIcons]}
          >
            <AntDesign
              name={"download"}
              size={16}
              color={CustomDefaultTheme.colors.branco}
            />
          </TouchableOpacity>
        </View>
      }
    </View>
  );
};

export default DownloadButton;
