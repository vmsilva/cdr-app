/*
  MUITA CALMA NESSA HORA API DE CONTEXTO ALTO RISCO DE MEMORY LEAK 
  CUIDADO COM LOOP INFINITO
  REMEMBER THAT
*/
import React, {
  useState,
  createContext,
  useLayoutEffect,
  useEffect,
} from "react";
import RNFS, { DocumentDirectoryPath, readDir } from "react-native-fs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EMPRESA } from "../utils/constants";

interface DownloadProps {
  children: any;
}

type DownloadData = {
  audiosDownload: any;
  setAudiosDownload: any;
  videosDownload: any;
  setVideosDownload: any;
  imagensDownload: any;
  setImagensDownload: any;
  progressoDownload: any;
  setProgressoDownload: any;
  progressoDownloadAudio: any;
  setProgressoDownloadAudio: any;
  certificadoDownload: any;
  setCertificadoDownload: any;
};

export const DownloadContext = createContext({} as DownloadData);

function DownloadProvider({ children }: DownloadProps): JSX.Element {
  const [certificadoDownload, setCertificadoDownload] = useState<any>([]);
  const [videosDownload, setVideosDownload] = useState<any>([]);
  const [audiosDownload, setAudiosDownload] = useState<any>([]);
  const [imagensDownload, setImagensDownload] = useState<any>([]);
  const [progressoDownload, setProgressoDownload] = useState<any>({});
  const [progressoDownloadAudio, setProgressoDownloadAudio] = useState<any>({});

  const recuperarObjetosDaColecao = async () => {
    try {
      const objetosArmazenados = await AsyncStorage.getItem(
        `${EMPRESA.EMPRESA.appName}_downloads`
      );

      if (objetosArmazenados) {
        const objetos = JSON.parse(objetosArmazenados);
        //console.log('Objetos recuperados:', objetos);
        return objetos;
      } else {
        console.log(
          "Nenhum objeto encontrado na coleção `${EMPRESA.EMPRESA.appName}_downloads`."
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
      const objetosArmazenados = await AsyncStorage.getItem(
        `${EMPRESA.EMPRESA.appName}_downloads_audios`
      );

      if (objetosArmazenados) {
        const objetos = JSON.parse(objetosArmazenados);
        //console.log('Objetos recuperados:', objetos);
        return objetos;
      } else {
        console.log('Nenhum objeto encontrado na coleção "downloads_audios".');
        return [];
      }
    } catch (error) {
      console.log("Erro ao recuperar os objetos:", error);
      return [];
    }
  };

  const recuperarObjetosDaColecaoCertificados = async () => {
    try {
      const objetosArmazenados = await AsyncStorage.getItem(
        `${EMPRESA.EMPRESA.appName}_downloads_certificados`
      );

      if (objetosArmazenados) {
        const objetos = JSON.parse(objetosArmazenados);
        //console.log('Objetos recuperados:', objetos);
        return objetos;
      } else {
        console.log(
          "Nenhum objeto encontrado na coleção `${EMPRESA.EMPRESA.appName}_downloads_certificados`."
        );
        return [];
      }
    } catch (error) {
      console.log("Erro ao recuperar os objetos:", error);
      return [];
    }
  };

  const recuperarObjetosDaColecaoImagens = async () => {
    try {
      const objetosArmazenados = await AsyncStorage.getItem("downloadsGaleria");

      if (objetosArmazenados) {
        const objetos = JSON.parse(objetosArmazenados);
        //console.log('Objetos recuperados:', objetos);
        return objetos;
      } else {
        console.log('Nenhum objeto encontrado na coleção "downloadsGaleria".');
        return [];
      }
    } catch (error) {
      console.log("Erro ao recuperar os objetos:", error);
      return [];
    }
  };

  const getDirectoryListImages = async () => {
    try {
      const pathListImages = await readDir(
        `${DocumentDirectoryPath}/media/images/`
      );
      const responseGaleria = await recuperarObjetosDaColecaoImagens();

      setImagensDownload(responseGaleria);
      //console.log(responseGaleria);
    } catch (error) {
      console.log(error);
    }
  };

  const getDirectoryListVideos = async () => {
    try {
      const pathListVideos = await readDir(
        `${DocumentDirectoryPath}/media/videos/`
      );

      const response = await recuperarObjetosDaColecao();

      setVideosDownload(response);
      console.log(Object.values(response).length, "context videos download");
    } catch (error) {
      console.log(error);
    }
  };

  const getDirectoryListAudios = async () => {
    try {
      const pathListVideos = await readDir(
        `${DocumentDirectoryPath}/media/audios/`
      );

      const response = await recuperarObjetosDaColecaoAudio();

      setAudiosDownload(response);
      console.log(Object.values(response).length, "context videos download");
    } catch (error) {
      console.log(error);
    }
  };

  const getDirectoryListCertificados = async () => {
    try {
      const pathListVideos = await readDir(
        `${DocumentDirectoryPath}/media/certificados/`
      );

      const response = await recuperarObjetosDaColecaoCertificados();

      setCertificadoDownload(response);
      console.log(Object.values(response).length, "context videos download");
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    getDirectoryListVideos();
    getDirectoryListAudios();
    getDirectoryListCertificados();
  }, []);

  useEffect(() => {
    console.log("download progresso ->>", progressoDownload);
  }, []);

  return (
    <DownloadContext.Provider
      value={{
        audiosDownload,
        setAudiosDownload,
        videosDownload,
        setVideosDownload,
        imagensDownload,
        setImagensDownload,
        progressoDownload,
        setProgressoDownload,
        progressoDownloadAudio,
        setProgressoDownloadAudio,
        certificadoDownload,
        setCertificadoDownload,
      }}
    >
      {children}
    </DownloadContext.Provider>
  );
}

export default DownloadProvider;
