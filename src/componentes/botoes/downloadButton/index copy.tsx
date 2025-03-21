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
import RNBackgroundDownloader from "@kesha-antonov/react-native-background-downloader";
import { DownloadContext } from "../../../configuracoes/contexts/DownloadContext";
import { ExibePushNotificationLocal } from "../../../configuracoes/utils/notification";
import CustomText from "../../componentes/customText";
import styles from "./styles";
import { calcularPercentual } from "../../../configuracoes/utils/utils";

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
      // Verifica se já existem objetos armazenados na coleção "casafolha_downloads"
      const objetosAntigos = await AsyncStorage.getItem("casafolha_downloads");
      let objetos = {} as any;

      if (objetosAntigos) {
        // Se existirem objetos antigos, converte a string JSON em um objeto
        objetos = JSON.parse(objetosAntigos);
      }

      // Armazena o novo objeto no objeto de downloads usando uuid_video como index
      objetos[novoObjeto.uuid_video] = novoObjeto;

      // Armazena o objeto atualizado na coleção "casafolha_downloads"
      await AsyncStorage.setItem("casafolha_downloads", JSON.stringify(objetos));

      setVideosDownload(objetos);
      console.log("Objeto armazenado com sucesso!");
    } catch (error) {
      console.log("Erro ao armazenar o objeto:", error);
    }
  };

  const recuperarObjetosDaColecao = async () => {
    try {
      const objetosArmazenados = await AsyncStorage.getItem("casafolha_downloads");

      if (objetosArmazenados) {
        const objetos = JSON.parse(objetosArmazenados);
        return objetos;
      } else {
        console.log('Nenhum objeto encontrado na coleção "casafolha_downloads".');
        return [];
      }
    } catch (error) {
      console.log("Erro ao recuperar os objetos:", error);
      return [];
    }
  };

  const createDirectory = async (dados: any) => {
    try {
      if (Platform.OS == "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
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

  const listaDownloadsExecucao = async () => {console.log('listão downloads')
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

      createDirectory({ mediaDir: mediaDirThumb, tipo: "thumb" });

      // thumbnails
      AdcionaObjetoDownloadEmExecucao();
      setProgresso(0.1);
      const resThumb = await RNFS.downloadFile(optionsThumb).promise;

      if (resThumb.statusCode === 200) {
        console.log("Arquivo salvo na pasta de mídia THUMB com sucesso");
      } else {
        console.log("Falha ao baixar o arquivo");
        if (resThumb.statusCode == 404)
          Alert.alert("Falha ao Baixar arquivo Thumb do video, 404 not found!");
      }

      createDirectory({ mediaDir: mediaDir, tipo: "Video" });

      console.log({
        id: item.uuid_video,
        url: url,
        destination: `${path}`,
        //type: 'parallel' 
      },'victorio')

      let task = RNBackgroundDownloader.download({
        id: item.uuid_video,
        url: url,
        destination: `${path}`,
        //type: 'parallel' 
      }).begin(({ expectedBytes, headers }) => { console.log('carregando download.....')
          
          setProgresso(0.2);
        })
        .progress((percent) => {
          setProgresso(parseInt(calcularPercentual(percent.bytesDownloaded, percent.bytesTotal)));
          //setProgresso(parseInt(percent * 100));
          console.log(parseInt(percent * 100), '-->> progresso', percent);
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
    console.log(`progresso ===>>> ${progresso}`)
  },[progresso])

  if (videosDownload[item.uuid_video] !== undefined && progresso == 0) {
    return (
      <View>
        {
          <View
            style={[styles.containerIcons]}
          >
            <MaterialCommunityIcons
              //name={"cellphone-check"}<MaterialCommunityIcons name="checkbox-marked-circle-outline" size={24} color="black" />
              //name={"cellphone-check"}
              name="checkbox-marked-circle-outline"
              size={17}
              color={CustomDefaultTheme.colors.branco}
            />
          </View>
        }
      </View>
    );
  }

  if (progresso > 0) {
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
              tintColor={CustomDefaultTheme.colors.branco}
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
