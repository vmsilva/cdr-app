import React, { useState, useEffect, useContext } from "react";
import {
  PermissionsAndroid,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";

import { AnimatedCircularProgress } from "react-native-circular-progress";
import {
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
import RNFS, { DocumentDirectoryPath, readDir } from "react-native-fs";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Config
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";
import RNBackgroundDownloader, {
  download,
  completeHandler,
  directories,
} from "@kesha-antonov/react-native-background-downloader";
import { DownloadContext } from "../../../configuracoes/contexts/DownloadContext";
import { ExibePushNotificationLocal } from "../../../configuracoes/utils/notification";
import CustomText from "../../componentes/customText";
import {
  calcularPercentual,
  openLocalFile,
} from "../../../configuracoes/utils/utils";
import { EMPRESA } from "../../../configuracoes/utils/constants";
import { Button } from "react-native-paper";

const DownloadButtonCertificado: React.FC<any> = ({ item }) => {
  //return <></>;
  const {
    certificadoDownload,
    setCertificadoDownload,
    setProgressoDownload,
    progressoDownload,
  } = useContext(DownloadContext);
  const uui_id = item.id;
  const mediaDirCertificados = `${DocumentDirectoryPath}/media/certificados/`;
  const filePathCertificados = `${DocumentDirectoryPath}/media/certificados/${item.id}.png`;
  const [progresso, setProgresso] = useState<any>(0);

  const AdcionaObjetoDownloadEmExecucao = () => {
    setProgressoDownload({ ...progressoDownload, [uui_id]: item });
  };

  const armazenarObjetoEmColecao = async (novoObjeto) => {
    try {
      // Verifica se já existem objetos armazenados na coleção `${EMPRESA.EMPRESA.appName}_downloads_certificados`
      const objetosAntigos = await AsyncStorage.getItem(
        `${EMPRESA.EMPRESA.appName}_downloads_certificados`
      );
      let objetos = {} as any;

      if (objetosAntigos) {
        // Se existirem objetos antigos, converte a string JSON em um objeto
        objetos = JSON.parse(objetosAntigos);
      }

      // Armazena o novo objeto no objeto de downloads usando uuid_video como index
      objetos[uui_id] = novoObjeto;

      // Armazena o objeto atualizado na coleção `${EMPRESA.EMPRESA.appName}_downloads_certificados`
      await AsyncStorage.setItem(
        `${EMPRESA.EMPRESA.appName}_downloads_certificados`,
        JSON.stringify(objetos)
      );

      setCertificadoDownload(objetos);
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
    return status === "granted";
  }

  const createDirectory = async (dados: any) => {
    try {
      if (Platform.OS == "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Permissão de Armazenamento",
            message:
              "O aplicativo precisa de acesso ao armazenamento externo para salvar arquivos.",
            buttonNeutral: "Perguntar depois",
            buttonNegative: "Cancelar",
            buttonPositive: "OK",
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
          alert("Permissão de escrita no armazenamento externo não concedida");
        }
      } else {
        const dirExists = await RNFS.exists(`${dados.mediaDir}`);

        console.log(dirExists, "))))))))---->>>>");

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
    console.log("listão downloads certificados");
    let lostTasks = await RNBackgroundDownloader.checkForExistingDownloads();

    if (lostTasks.length == 0) {
      setProgressoDownload({});
    }

    for (let task of lostTasks) {
      if (uui_id == task.id) {
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

            setProgresso(0);
            armazenarObjetoEmColecao(item);
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

  const removeAllFiles = async () => {
    try {

      await AsyncStorage.removeItem(`${EMPRESA.EMPRESA.appName}_downloads_certificados`);

      await RNFS.unlink(`${DocumentDirectoryPath}/media/certificados/`);

      setCertificadoDownload([]);
    } catch (error) {
      console.log(error, 'Erro ao remover todos arquivos');
    } 
  };

  const handleDownload = async () => {
    try {
      const url = `${item.url_certificado}&png`; //hls; //"https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg";
      const path = `${filePathCertificados}`; //`${DocumentDirectoryPath}/testImage.png`;

      // thumbnails
      AdcionaObjetoDownloadEmExecucao();
      setProgresso(0.1);
      //await requestStoragePermission()

      createDirectory({ mediaDir: mediaDirCertificados, tipo: "certificados" });
      //console.log(`-->> url downloadddd ${url}`); return
      let task = download({
        id: url,
        url: url,
        destination: `${path}`,
        metadata: {},
      })
        .begin(({ expectedBytes, headers }) => {
          console.log("carregando download.....");
          //setProgresso(0.2);
        })
        .progress(({ bytesDownloaded, bytesTotal }) => {
          setProgresso(
            parseInt(calcularPercentual(bytesDownloaded, bytesTotal))
          );
          console.log(
            parseInt((bytesDownloaded / bytesTotal) * 100),
            "-->> progresso",
            { bytesDownloaded, bytesTotal }
          );
        })
        .done(({ bytesDownloaded, bytesTotal }) => {

          setProgresso(0);
          armazenarObjetoEmColecao(item);

          let DD = progressoDownload;
          delete DD[task.id];
          setProgressoDownload(DD);
        })
        .error(({ error, errorCode }) => {
          console.log("Download canceled due to error: ", { error, errorCode });
        });
    } catch (error) {
      console.log(error, "download errorrr");
    }
  };

  const getDirectoryList = async () => {
    try {
      const pathList = await readDir(`${DocumentDirectoryPath}/media/certificados`);

      return pathList;
    } catch (error) {
      console.log(error, "--> diretorio  video");
    }
  };

  const compartilhar = async () => {
    try {

      const retorno = await getDirectoryList();

      const share = retorno.filter(_ =>  (_.name.replace(/\.png$/, "") === uui_id) ) as any;

      await openLocalFile(share[0]);

    } catch (error) {
      console.log(error, "compartilhar error");
    }
  };

  useEffect(() => {
    getDirectoryList();
  }, []);

  useEffect(() => {
    if (progressoDownload[uui_id]) {
      listaDownloadsExecucao();
    }
  }, []);

  useEffect(() => {}, [progressoDownload]);

  useEffect(() => {
  }, [certificadoDownload]);

  if (certificadoDownload[uui_id] !== undefined && progresso == 0) {
    return (
      <>
        <TouchableOpacity onPress={compartilhar}>
          <View
            style={{
              padding: 2,
              borderRadius: 99,
              width: 30,
              height: 30,
              backgroundColor: CustomDefaultTheme.colors.cinzaEscuro,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Ionicons
              name="share-outline"
              size={20}
              color={CustomDefaultTheme.colors.branco}
            />
          </View>
        </TouchableOpacity>
      </>
    );
  }

  if (progresso > 0 && progressoDownload[uui_id]) {
    return (
      <View>
        {
          <View>
            <AnimatedCircularProgress
              size={30}
              width={3}
              fill={progresso}
              tintColor={CustomDefaultTheme.colors.buttonPrimary}
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
    
    <View 
      style={{
        padding: 1,
        borderRadius: 99,
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: CustomDefaultTheme.colors.cinzaEscuro,
      }}
    >
      <TouchableOpacity
        onPress={handleDownload} //handleDownload
        //style={[styles.containerIcons, {backgroundColor: CustomDefaultTheme.colors.sliderTrackplayer}]}
      >
        <AntDesign
          name={"download"}
          size={16}
          color={CustomDefaultTheme.colors.branco}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <TouchableOpacity onPress={handleDownload}>
        <Button
          style={{
            borderRadius: 99,
            backgroundColor: CustomDefaultTheme.colors.iconsPrimaryColor,
          }}
        >
          <CustomText style={{ color: "#FFF", fontSize: 10 }}>
            Baixar
          </CustomText>
        </Button>
      </TouchableOpacity>
    </>
  );

};

export default DownloadButtonCertificado;
