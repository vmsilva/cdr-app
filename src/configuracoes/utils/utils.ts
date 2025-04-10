import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { getData } from "../services/request";
import { EMPRESA } from "./constants/empresa";
import { DocumentDirectoryPath } from "react-native-fs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ScreenOrientation from "expo-screen-orientation";
import NetInfo from "@react-native-community/netinfo";
import { btoa, atob } from "react-native-quick-base64";
import { Platform } from "react-native";
import { TextTrackType } from "react-native-video";
import Share from "react-native-share";

export function retornaNumeroComMascara(data: any) {
  if (data > 1000) {
    return `${data}k`;
  } else {
    return data;
  }
}

export function trataData(data: string) {
  let REMOVESPACO = data.split(" ");
  let FINAL = REMOVESPACO[0].split("-");

  return `${FINAL[2]}/${FINAL[1]}/${FINAL[0]}`;
}

export function trataDataComHora(data: string) {
  let REMOVESPACO = data.split(" ");
  let FINAL = REMOVESPACO[0].split("-");

  return `${FINAL[2]}/${FINAL[1]}/${FINAL[0]} ${REMOVESPACO[1].substring(
    5,
    -8
  )}`;
}

export function trataDataRetornoTexto(data: string) {
  let MESTEXTO = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agostos",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  if (data == undefined) {
    return "";
  }

  let REMOVESPACO = data.split(" ");
  let FINAL = REMOVESPACO[0].split("-");

  return `${FINAL[2]} ${MESTEXTO[parseInt(FINAL[1])]}.${FINAL[0]}`;
}

function removeDateParam(url) {
  const index = url.indexOf("?date=");
  if (index !== -1) {
    return url.substring(0, index);
  }
  return url; // Retorna a string original se não encontrar ?date=
}

export function calcularPercentual(bytesDownloaded, bytesTotal) {
  if (bytesTotal === 0) {
    return 0; // Evitar divisão por zero
  }
  return (bytesDownloaded / bytesTotal) * 100;
}

/*const TextTrackTypeIdentificador = {
  VTT: "text/vtt",
  SRT: "application/x-subrip"
};*/

export function formatSubtitles(legendas) {
  // Verifica se o array de legendas existe
  if (!legendas || !Array.isArray(legendas)) {
    return [];
  }

  // Mapeia cada legenda para o formato desejado
  let leg = legendas.map((legenda) => {
    // Detecta o tipo de legenda baseado na extensão do arquivo
    //const type = legenda.file.endsWith(".srt") ? TextTrackType.SUBRIP : TextTrackType.VTT;
    const type = TextTrackType.VTT;

    // Retorna o objeto formatado conforme o padrão desejado
    return {
      id:legenda.url_webvtt, 
      subtype: 'subtitles',
      name:  legenda.name,
      contentId: legenda.url_webvtt, //legenda.url_srt // URL da legenda
      
      title: legenda.name, // O nome da legenda
      language: legenda.name.toLowerCase(), // O idioma em letras minúsculas
      type: type, // Define o tipo com base na extensão do arquivo
      uri: legenda.url_webvtt, //legenda.url_srt // URL da legenda
    };
  });

  return leg;

  /* chrome cast
  id: 2,
  type: 'text',
  subtype: 'subtitles',
  name: 'French Subtitle',
  contentId: 'https://some-url/caption_fr.vtt',
  language: 'fr',
  */

  leg.unshift({
    title: null,
    language: null,
    type: null,
    uri: null,
  } as any);
  
  console.log(leg, "-->> legendass");
  return leg;
}

function videoAssistidoMaisDe90(tempoAssistido, tempoTotal) {
  if (!tempoTotal || tempoTotal === 0) {
    throw new Error("Tempo total do vídeo deve ser maior que zero.");
  }

  const percentualAssistido = (tempoAssistido / tempoTotal) * 100;

  return percentualAssistido >= 90;
}

function extractM3U8(url) {
  // Utiliza regex para capturar tudo até o .m3u8
  const regex = /(.*\.m3u8)/;
  const match = url.match(regex);
  return match ? match[0] : null;  // Retorna a URL até o .m3u8, ou null se não encontrar
}

export function montaJsonVideo(data: any, tipo: string, file: any = null) {
  switch (tipo) {
    case "aovivo":
      let ARRAYVIDEOAOVIVO = {
        cod_video: data.cod_aovivo,
        cod_cliente: data.cod_cliente,
        hash_video: "",
        titulo_video: data.nome_aovivo,
        descricao_video: data.nome_aovivo,
        id_cdn_video: "",
        hls: data.hls_aovivo != undefined ? data.hls_aovivo : data.hls,
        data_upload_video: "",
        data_liberacao_video: "",
        data_remocao_video: "",
        url_thumb_video: data.url_thumb_aovivo,
        url_thumb_vertical_video: "",
        url_hover_vertical_video: "",
        duracao_video: "",
        json_video: "",
        url_tmp_video: "",
        tags_video: "",
        versao_streaming: "",
        ordem_video: "",
        status_video: "",
        cod_categoria: "",
        imagem_logo_tv: data.imagem_logo_tv,
        cod_status_chat: data.cod_status_chat,
      };
      return ARRAYVIDEOAOVIVO;
      break;
    case "aovivoYT":
      let ARRAYVIDEOAOVIVOTY = {
        cod_video: data.cod_tv,
        cod_cliente: data.cod_cliente,
        hash_video: "",
        titulo_video: data.nome_tv,
        descricao_video: data.descricao_tv,
        id_cdn_video: "",
        hls: data.hls_tv,
        data_upload_video: "",
        data_liberacao_video: "",
        data_remocao_video: "",
        url_thumb_video: data.imagem_h_tv,
        url_thumb_vertical_video: "",
        url_hover_vertical_video: "",
        duracao_video: "",
        json_video: "",
        url_tmp_video: "",
        tags_video: "",
        versao_streaming: "",
        ordem_video: "",
        status_video: "",
        cod_categoria: "",
        imagem_logo_tv: data.imagem_logo_tv,
        flg_youtube: data.flg_youtube,
      };
      return ARRAYVIDEOAOVIVOTY;
      break;
    case "cameras":
      let ARRAYCAMERAS = {
        cod_video: data.cod_camera,
        cod_cliente: "",
        hash_video: data.uuid_camera,
        titulo_video: data.nome_camera,
        descricao_video: data.descricao_camera,
        id_cdn_video: "",
        hls: data.hls_camera,
        data_upload_video: "",
        data_liberacao_video: "",
        data_remocao_video: "",
        url_thumb_video: data.imagem_h_camera,
        url_thumb_vertical_video: "",
        url_hover_vertical_video: "",
        duracao_video: "",
        json_video: "",
        url_tmp_video: "",
        tags_video: "",
        versao_streaming: "",
        ordem_video: "",
        status_video: "",
        cod_categoria: "",
      };
      return ARRAYCAMERAS;
      break;
    case "radio":
      let ARRAYRADIO = {
        cod_video: data.cod_radio,
        cod_cliente: data.cod_cliente,
        hash_video: "",
        titulo_video: data.nome_radio,
        descricao_video: data.descricao_radio,
        id_cdn_video: "",
        hls: data.hls_radio,
        data_upload_video: "",
        data_liberacao_video: "",
        data_remocao_video: "",
        url_thumb_video: data.imagem_h_tv,
        url_thumb_vertical_video: "",
        url_hover_vertical_video: "",
        duracao_video: "",
        json_video: "",
        url_tmp_video: "",
        tags_video: "",
        versao_streaming: "",
        ordem_video: "",
        status_video: "",
        cod_categoria: "",
        imagem_logo_tv: data.imagem_logo_tv,
      };
      return ARRAYRADIO;
      break;
    case "videozoeplay":
      let ARRAYVIDEOZOEPLAY = {
        legenda_video:
          Object.values(data.legenda_video).length > 0
            ? Object.values(formatSubtitles(data.legenda_video))
            : data.legenda_video,
        cod_video: data.cod_video,
        cod_cliente: data.cod_cliente,
        hash_video: data.id_cdn_video,
        titulo_video: data.titulo_video,
        descricao_video: data.descricao_video,
        subtitulo_video: data.subtitulo_video,
        id_cdn_video: data.id_cdn_video,
        uuid_video: data.id_cdn_video,
        hls: extractM3U8(data.hls_path),// data.mp4, //data.hls_path,
        data_upload_video: data.data_upload_video,
        data_liberacao_video: data.data_liberacao_video,
        data_remocao_video: data.data_remocao_video,
        url_thumb_video: data.url_thumb_video,
        url_thumb_vertical_video: data.url_thumb_vertical_video,
        url_hover_vertical_video: data.url_hover_vertical_video,
        duracao_video: data.duracao_video,
        json_video: data.json_video,
        url_tmp_video: data.url_tmp_video,
        tags_video: data.tags_video,
        versao_streaming: data.versao_streaming,
        ordem_video: data.ordem_video,
        status_video: data.status_video,
        cod_categoria: data.cod_categoria,
        imagem_logo_tv: data.imagem_logo_tv,
        mp4: data.mp4,
        seek_video: data.progresso_sec != undefined ? data.progresso_sec : 0,
        segundos_assistidos:
          data.progresso_sec != undefined
            ? videoAssistidoMaisDe90(data.progresso_sec, data.duracao_video)
              ? 0
              : data.progresso_sec
            : 0,
        //arquivos_video: data.arquivos_video === 'string' ? JSON.parse(data.arquivos_video) : data.arquivos_video
        arquivos_video:
          typeof data.arquivos_video === "string"
            ? JSON.parse(data.arquivos_video)
            : data.arquivos_video,
      };
      return ARRAYVIDEOZOEPLAY;
      break;
    case "videozoeplaylocal":
      let uuid_video = file.name.replace(/\.mp4$/, "");
      //return file;
      let ARRAYVIDEOZOEPLAYLOCAL = {
        legenda_video: data.legenda_video,
        cod_video: data.cod_video,
        cod_cliente: data.cod_cliente,
        hash_video: data.id_cdn_video,
        titulo_video: data.titulo_video,
        descricao_video: data.descricao_video,
        subtitulo_video: data.subtitulo_video,
        id_cdn_video: data.id_cdn_video,
        uuid_video: data.id_cdn_video,
        hls: `file://${file.path}`,
        url_thumb_video: `file://${DocumentDirectoryPath}/media/thumb/${uuid_video}.jpg`,
        data_upload_video: data.data_upload_video,
        data_liberacao_video: data.data_liberacao_video,
        data_remocao_video: data.data_remocao_video,
        //url_thumb_video: data.url_thumb_video,
        url_thumb_vertical_video: data.url_thumb_vertical_video,
        url_hover_vertical_video: data.url_hover_vertical_video,
        duracao_video: data.duracao_video,
        json_video: data.json_video,
        url_tmp_video: data.url_tmp_video,
        tags_video: data.tags_video,
        versao_streaming: data.versao_streaming,
        ordem_video: data.ordem_video,
        status_video: data.status_video,
        cod_categoria: data.cod_categoria,
        imagem_logo_tv: data.imagem_logo_tv,
        mp4: data.mp4,
        arquivos_video: [],
      };
      return ARRAYVIDEOZOEPLAYLOCAL;
      break;
    case "videozoeplayContinuarAssistindo":
      //return data;
      let ARRAYVIDEOZOEPLAYCONTINUARASSISTINDO = {
        uuid_video: data.id_cdn_video,
        legenda_video:
          Object.values(data.legenda_video).length > 0
            ? Object.values(formatSubtitles(data.legenda_video))
            : data.legenda_video,
        cod_video: data.cod_video,
        cod_cliente: data.cod_cliente,
        hash_video: data.id_cdn_video,
        titulo_video: data.titulo_video,
        descricao_video: data.descricao_video,
        subtitulo_video: data.subtitulo_video,
        id_cdn_video: data.id_cdn_video,
        hls: extractM3U8(data.hls_path),// data.mp4, //data.hls_path,
        mp4: data.mp4,
        data_upload_video: data.data_upload_video,
        data_liberacao_video: data.data_liberacao_video,
        data_remocao_video: data.data_remocao_video,
        url_thumb_video: data.url_thumb_video,
        url_thumb_vertical_video: data.url_thumb_vertical_video,
        url_hover_vertical_video: data.url_hover_vertical_video,
        duracao_video: data.duracao_video,
        json_video: data.json_video,
        url_tmp_video: data.url_tmp_video,
        tags_video: data.tags_video,
        versao_streaming: data.versao_streaming,
        ordem_video: data.ordem_video,
        status_video: data.status_video,
        seek_video: data.assistido,//data.progresso_sec != undefined ? data.progresso_sec : 0,
        segundos_assistidos:
          data.assistido != undefined
            ? videoAssistidoMaisDe90(data.assistido, data.duracao_video)
              ? 0
              : data.assistido
            : 0,
        cod_categoria: Object.values(data.categorias)[0].cod_categoria,
        imagem_logo_tv: data.imagem_logo_tv,
        //arquivos_video: data.arquivos_video === 'string' ? JSON.parse(data.arquivos_video) : data.arquivos_video
        arquivos_video:
          typeof data.arquivos_video === "string"
            ? JSON.parse(data.arquivos_video)
            : data.arquivos_video,
      };
      return ARRAYVIDEOZOEPLAYCONTINUARASSISTINDO;
      break;
  }
}

export function montaArrayRelacionados(array: any) {
  let ARRAYRELACIONADOSCAMERAS = [] as any;

  array.map((data: any, i: any) =>
    ARRAYRELACIONADOSCAMERAS.push({
      cod_video: data.cod_camera,
      cod_cliente: "",
      hash_video: data.uuid_camera,
      titulo_video: data.nome_camera,
      descricao_video: data.descricao_camera,
      id_cdn_video: "",
      hls: data.hls_camera,
      data_upload_video: "",
      data_liberacao_video: "",
      data_remocao_video: "",
      url_thumb_video: data.imagem_h_camera,
      url_thumb_vertical_video: "",
      url_hover_vertical_video: "",
      duracao_video: "",
      json_video: "",
      url_tmp_video: "",
      tags_video: "",
      versao_streaming: "",
      ordem_video: "",
      status_video: "",
      cod_categoria: "",
    })
  );

  return ARRAYRELACIONADOSCAMERAS;
}

export function AlertNotfier(dados: any) {
  switch (dados.tipo) {
    case "error":
      alert(dados.msg);
      break;
    case "success":
      alert(dados.msg);
      break;
    case "alert":
      alert(dados.msg);
      break;
  }
}

export function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export function cacheFonts(fonts) {
  return fonts.map((font) => Font.loadAsync(font));
}

export async function getTEXT(slug: any) {
  try {
    const response = (await getData({
      rota: `/textos/texto/${slug}`,
      parametros: `token_cliente=${EMPRESA.token_cliente}`,
      showNotification: false,
      showLogError: true,
      showLog: true,
    })) as any;

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
}

export function adicionarVideoAoObjeto(objetoDeVideos, uuid_video, progress) {
  let OBJ = {}; //objetoDeVideos;
  // Crie um novo objeto com o UUID do vídeo como chave
  OBJ[uuid_video] = {
    progress: progress,
    uuid_video: uuid_video,
  };

  return OBJ;
}

export async function salvaLoacalLikeDisLike(dados: any) {
  try {
    switch (dados.tipo) {
      case "like":
        // Verifica se já existem objetos armazenados na coleção "downloads"
        const objetosAntigosLike = await AsyncStorage.getItem(
          "@casafolha:like"
        );
        let objetosLike = {} as any;

        if (objetosAntigosLike) {
          // Se existirem objetosLike antigos, converte a string JSON em um objeto
          objetosLike = JSON.parse(objetosAntigosLike);
        }

        objetosLike[dados.cod_video] = dados.cod_video;

        await AsyncStorage.setItem(
          "@casafolha:like",
          JSON.stringify(objetosLike)
        );
        break;
      case "dislike":
        // Verifica se já existem objetos armazenados na coleção "downloads"
        const objetosAntigosDisLike = await AsyncStorage.getItem(
          "@casafolha:dislike"
        );
        let objetosDisLike = {} as any;

        if (objetosAntigosDisLike) {
          // Se existirem objetosDisLike antigos, converte a string JSON em um objeto
          objetosDisLike = JSON.parse(objetosAntigosDisLike);
        }

        objetosDisLike[dados.cod_video] = dados.cod_video;

        await AsyncStorage.setItem(
          "@casafolha:dislike",
          JSON.stringify(objetosDisLike)
        );

        break;
    }
  } catch (error) {
    console.log("Erro ao armazenar o objeto:", error);
  }
}

export async function buscaLoacalLikeDisLike(dados: any) {
  try {
    switch (dados.tipo) {
      case "like":
        // Verifica se já existem objetos armazenados na coleção "downloads"
        const objetosAntigosLike = await AsyncStorage.getItem(
          "@casafolha:like"
        );

        return objetosAntigosLike;
        break;
      case "dislike":
        // Verifica se já existem objetos armazenados na coleção "downloads"
        const objetosAntigosDisLike = await AsyncStorage.getItem(
          "@casafolha:dislike"
        );

        return objetosAntigosDisLike;
        break;
    }
  } catch (error) {
    console.log("Erro ao armazenar o objeto:", error);
  }
}

export const OrientacaoVertical = async () => {
  await ScreenOrientation.lockAsync(
    ScreenOrientation.OrientationLock.PORTRAIT_UP
  );
};

export function verificarIndexador(array, indexador) {
  // Utiliza o método find() para procurar um objeto com o indexador especificado
  const objetoEncontrado = array.find((objeto) => objeto.id === indexador);

  // Verifica se o objeto foi encontrado
  if (objetoEncontrado) {
    console.log(`O indexador ${indexador} existe no array de objetos.`);
  } else {
    console.log(`O indexador ${indexador} NÃO existe no array de objetos.`);
  }
}

export function encontrarPosicaoPorCodVideo(array, cod_video) {
  //console.log(array)
  if (array.lenght == 0) {
    return null;
  }
  // console.log(array,'buscaaaaaaaa posicao por video codigo -->> ', cod_video); return;
  const indiceEncontrado = array.findIndex(
    (item) => item.cod_video === cod_video
  );
  return indiceEncontrado !== -1 ? indiceEncontrado : null;
}

export function trataString(string) {
  const base64 = btoa(string);
  const decoded = atob(string);

  return decodeURIComponent(decoded);
}

export function isEqual(a, b) {
  if (a.length != b.length) return false;
  else {
    // comapring each element of array
    for (var i = 0; i < a.length; i++) if (a[i] != b[i]) return false;
    return true;
  }
}

export function msToHMS(ms: any) {
  let totalSeconds = ms / 1000;
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  minutes = String(minutes).padStart(2, "0");
  hours = String(hours).padStart(2, "0");
  seconds = String(seconds).padStart(2, "0");

  return `${hours}:${minutes}:${
    seconds.split(".")[0].length == 1
      ? `0${seconds.split(".")[0]}`
      : seconds.split(".")[0]
  }`;
}

export function converterData(data) {
  const meses = [
    "jan",
    "fev",
    "mar",
    "abr",
    "mai",
    "jun",
    "jul",
    "ago",
    "set",
    "out",
    "nov",
    "dez",
  ];
  const partes = data.split(" ");

  if (partes.length !== 2) {
    return "Formato de data inválido";
  }

  const dataPartes = partes[0].split("-");
  const horaPartes = partes[1].split(":");

  if (dataPartes.length !== 3 || horaPartes.length !== 3) {
    return "Formato de data inválido";
  }

  const dia = parseInt(dataPartes[2], 10);
  const mes = parseInt(dataPartes[1], 10) - 1; // Subtraímos 1 porque os meses em JavaScript são baseados em zero
  const ano = dataPartes[0];

  if (isNaN(dia) || isNaN(mes)) {
    return "Formato de data inválido";
  }

  const dataFormatada = dia + " " + meses[mes] + ".";

  return dataFormatada;
}

export function segundosParaMinutos(segundos) {
  if (typeof segundos !== "number" || segundos < 0) {
    return "Tempo invalido.";
  }

  if (segundos < 60) {
    return segundos + " seg";
  }

  const minutos = Math.floor(segundos / 60); // Obtém a parte inteira dos minutos
  const segundosRestantes = segundos % 60; // Calcula os segundos restantes

  return minutos + " min";
}

export function convertObjetoZoeParaPlaylistReactTrackPlayer(OBJETOZOE) {
  let ARRAY = [];
  OBJETOZOE.map((item) => {
    ARRAY.push({
      cod_playlist: item.cod_playlist,
      cod_playlist_audio: item.cod_playlist_audio,
      url: item.url_mp3,
      title: item.titulo_playlist_audio,
      artist: item.titulo_playlist_audio,
      album: item.descricao_playlist_audio,
      genre: item.descricao_playlist_audio,
      date: item.data_playlist_audio, // RFC 3339
      artwork: item.url_foto_playlist,
      duration: item.json_mp3_playlist.duration,
    });
  });
  console.log(ARRAY);

  return ARRAY;
}

export function montaArrayMinhaLista(OBJETO) {
  let ARRAY = {};
  switch (OBJETO[1]) {
    case "audio":
      OBJETO[0].map((item) => {
        //console.log(item.cod_playlist_audio, '-->>  ooobjetooo')
        ARRAY[item.cod_playlist_audio] = item.cod_playlist_audio;
      });
      break;
  }

  console.log(ARRAY);

  return ARRAY;
}

export function montaArrayContinuarAssistindoAudio(OBJETO) {
  let ARRAY = {};

  OBJETO.map((item) => {
    ARRAY[item.cod_playlist_audio] = item;
  });

  //console.log(ARRAY);

  return ARRAY;
}

export function containsHtmlTags(text) {
  // Expressão regular para tags HTML
  const htmlTagPattern = /<[^>]+>/;
  return htmlTagPattern.test(text);
}

export const MONTACATEGORIACOMTRILHAAPRESENTADORUNICA = (
  cat,
  item_cat_selecionado
) => {
  cat["videos"] = item_cat_selecionado.videos;

  return cat;
};

export function getVideosByCategory(cod_categoria_temporada, data) {
  const temporada = data.temporadas.find(
    (t) => t.cod_categoria_temporada === cod_categoria_temporada
  );
  return temporada ? temporada : null;
}

export const checkNetworkConnection = async (): Promise<boolean> => {
  const state = await NetInfo.fetch();
  return state.isConnected;
};

export const getDeepLink = (path = "") => {
  const scheme = EMPRESA.uriScheme;
  const prefix = Platform.OS == "android" ? `${scheme}://` : `${scheme}://`;
  //const prefix = Platform.OS == 'android' ? `${scheme}://casafolha/` : `${scheme}://`
  return prefix + path;
};

export function getDeviceIdFromUrl(url) {
  const regex = /device_id=([\w-]+)/;
  const match = url.match(regex);
  return match ? match[1] : false;
}

export const decodeUrlAndExtractCodes = (url) => {
  try {
    // Decodifica a URL
    const decodedUrl = decodeURIComponent(url);

    // Extrai a parte relevante após o parâmetro `s`
    const urlParams = new URLSearchParams(decodedUrl.split('?')[1]);
    const sValue = urlParams.get('s');

    if (!sValue) {
      throw new Error("Parâmetro 's' não encontrado na URL.");
    }

    // Extrai a parte do URI após `://` e antes do próximo `/`
    const contentTypeCode = sValue.split('://')[1].split('/')[0]; // Extrai apenas o código do tipo de conteúdo

    // Extrai os códigos restantes após o código do tipo de conteúdo
    const remainingString = sValue.split('://')[1].split('/').slice(1)[0];
    const remainingCodesArray = sValue.split('://')[1].split('/').slice(1).join('|').split('|');

    return { decodedUrl, contentTypeCode, remainingCodesArray, remainingString };
  } catch (e) {
    console.error("Erro ao processar a URL:", e);
    return { decodedUrl: url, contentTypeCode: null, remainingCodesArray: [] }; // Retorna a URL original e arrays vazios em caso de erro
  }
};

 // Função para aplicar a máscara de telefone
 export const applyPhoneMask = (value: string) => {
  // Remove todos os caracteres não numéricos
  const numericValue = value.replace(/\D/g, "");

  // Aplica a máscara de telefone
  if (numericValue.length <= 10) {
    // Formato (99) 9999-9999
    return numericValue
      .replace(/(\d{0,2})(\d{0,4})(\d{0,4})/, (_, p1, p2, p3) => {
        let result = "";
        if (p1) result += `(${p1}`;
        if (p2) result += `) ${p2}`;
        if (p3) result += `-${p3}`;
        return result;
      })
      .trim();
  } else {
    // Formato (99) 99999-9999 para celulares
    return numericValue
      .replace(/(\d{0,2})(\d{0,5})(\d{0,4})/, (_, p1, p2, p3) => {
        let result = "";
        if (p1) result += `(${p1}`;
        if (p2) result += `) ${p2}`;
        if (p3) result += `-${p3}`;
        return result;
      })
      .trim();
  }
};

 // Função para aplicar a máscara de telefone
 export const applyCpfMask = (value: string) => { return
  // Remove todos os caracteres não numéricos
  const numericValue = value.replace(/\D/g, "");

  // Aplica a máscara de telefone
  if (numericValue.length <= 10) {
    // Formato (99) 9999-9999
    return numericValue
      .replace(/(\d{0,2})(\d{0,4})(\d{0,4})/, (_, p1, p2, p3) => {
        let result = "";
        if (p1) result += `(${p1}`;
        if (p2) result += `) ${p2}`;
        if (p3) result += `-${p3}`;
        return result;
      })
      .trim();
  } else {
    // Formato (99) 99999-9999 para celulares
    return numericValue
      .replace(/(\d{0,2})(\d{0,5})(\d{0,4})/, (_, p1, p2, p3) => {
        let result = "";
        if (p1) result += `(${p1}`;
        if (p2) result += `) ${p2}`;
        if (p3) result += `-${p3}`;
        return result;
      })
      .trim();
  }
};

// Função para aplicar a máscara de telefone
export const applyCepMask = (value: string) => { return
  // Remove todos os caracteres não numéricos
  const numericValue = value.replace(/\D/g, "");

  // Aplica a máscara de telefone
  if (numericValue.length <= 10) {
    // Formato (99) 9999-9999
    return numericValue
      .replace(/(\d{0,2})(\d{0,4})(\d{0,4})/, (_, p1, p2, p3) => {
        let result = "";
        if (p1) result += `(${p1}`;
        if (p2) result += `) ${p2}`;
        if (p3) result += `-${p3}`;
        return result;
      })
      .trim();
  } else {
    // Formato (99) 99999-9999 para celulares
    return numericValue
      .replace(/(\d{0,2})(\d{0,5})(\d{0,4})/, (_, p1, p2, p3) => {
        let result = "";
        if (p1) result += `(${p1}`;
        if (p2) result += `) ${p2}`;
        if (p3) result += `-${p3}`;
        return result;
      })
      .trim();
  }
};

export const tratanomeremoveespaco = (data) => {

  return data.replaceAll(' ','');
}

// funcão gambiarra total
export function normalizeFileProtocol(url) {
  // Remove todos os "file://" repetidos
  const normalizedUrl = url.replace(/(file:\/\/)+/g, 'file://');
  return normalizedUrl;
}

export const openLocalFile = async (objeto) => {
  try {
      // Define as opções de compartilhamento com base no tipo de arquivo
      const options = {
          title: "Compartilhar Imagem",
          type: "image/png", // Define o tipo MIME correto
      };
      
      // Normaliza o protocolo do arquivo e abre o compartilhamento
      const fileUrl = normalizeFileProtocol(`file://${objeto.path}`);
      await Share.open({ url: fileUrl, ...options });

  } catch (error) {
      console.error("Erro ao abrir o arquivo:", error);
  }
};

export function convertSeconds(inputSeconds) {
  // Calcular o número de horas, minutos e segundos
  const hours = Math.floor(inputSeconds / 3600);
  const remainingSecondsAfterHours = inputSeconds % 3600;
  const minutes = Math.floor(remainingSecondsAfterHours / 60);
  const seconds = remainingSecondsAfterHours % 60;
  
  // Construir a string de saída
  let result = '';
  if (hours > 0) {
      result += `${hours} hora${hours > 1 ? 's' : ''}`;
  }
  if (minutes > 0) {
      if (result) result += ' e ';
      result += `${minutes} minuto${minutes > 1 ? 's' : ''}`;
  }
  if (seconds > 0) {
      if (result) result += ' e ';
      result += `${seconds} segundo${seconds > 1 ? 's' : ''}`;
  }
  
  return result;
}
