import { Linking, Alert } from "react-native";
import { CustomDefaultTheme } from "../styles/Theme";
import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EMPRESA } from "../utils/constants";

interface request {
  rota: string;
  parametros: any;
  showNotification: boolean;
  showLogError: boolean;
}

export async function postData(dados: request | any) {
  //console.log(dados);return
  try {
    const inicio = performance.now();
    if (dados.rota == undefined || dados.rota == "") {
      Alert.alert("Formato de rota para requisicão invalido!");
      return false;
    }

    const response = await api.post(dados.rota, dados.parametros);

    dados.showNotification && Alert.alert("Sucesso!");

    const fim = performance.now();
    const tempoDecorrido = (fim - inicio) as any;

    dados.showLog &&
      console.log(
        `Tempo de processo async request ${dados.rota} --> ${parseInt(
          tempoDecorrido
        )}ms`
      );

    return response;
  } catch (error) {
    dados.showNotification &&
      Alert.alert(
        `Formato de rota para requisicão invalido! ${error.response.data.data}`
      );

    dados.showLogError &&
      console.log(
        "Erro console -->",
        error.request.response,
        `|[${dados.rota}]|`
      );

      
    return { error: true, response: error.request.response };
  }
}

export async function getData(dados: request | any) {
  try {
    const inicio = performance.now();
    if (dados.rota == undefined || dados.rota == "") {
      Alert.alert("Formato de rota para requisicão invalido!");

      return false;
    }

    const response = await api.get(`${dados.rota}?${dados.parametros}`);

    dados.showNotification && dados.showNotification && Alert.alert("Sucesso!");
    const fim = performance.now();
    const tempoDecorrido = (fim - inicio) as any;

    dados.showLog &&
      console.log(
        `Tempo de processo async request ${dados.rota} --> ${parseInt(
          tempoDecorrido
        )}ms`
      );

    return response;
  } catch (error) {
    dados.showNotification && Alert.alert(`Error! ${error.response.data.data}`);

    dados.showLogError &&
      console.log(
        "Erro console -->",
        error.response.data.data,
        `|[${dados.rota}]|`
      );

    return { error: true, response: error.response.data.data };
  }
}

export async function postDataUpload(dados: any) {
  try {
    const inicio = performance.now();
    if (dados.rota == undefined || dados.rota == "") {
      Alert.alert("Errro upload post");
      return false;
    }

    // Crie um objeto de configuração para a requisição
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: dados.parametros,
    };

    const response_ = await fetch(
      `https://${EMPRESA.EMPRESA.api}/${dados.rota}`,
      config
    )
      .then((response) => response.json())
      .then((json) => {
        return json;
      });

    const fim = performance.now();
    const tempoDecorrido = (fim - inicio) as any;

    dados.showLog &&
      console.log(
        `Tempo de processo async request ${dados.rota} --> ${parseInt(
          tempoDecorrido
        )}ms`
      );

    return response_;
  } catch (error) {
    if (error.response.status != undefined && error.response.status == 403) {
      console.log(error.response.status);
      return;
    }

    dados.showNotification && Alert.alert(error.response.data.data);

    dados.showLogError &&
      console.log(
        "Erro console -->",
        error.response.data.data,
        `|[${dados.rota}]|`
      );

    return { error: true, response: error.response.data.data };
  }
}

export async function openURL(url) {
  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        console.error("Não é possível abrir a URL:", url);
      }
    })
    .catch((error) => console.error("Erro ao abrir a URL:", error));
}

export async function BUSCALOCALHOMEASYNC() {
  try {
    const inicio = performance.now();
    const response = (await AsyncStorage.getItem("@phsplay:home")) as any;
    if (response != null) {
      //setHome(JSON.parse(response))
    }
    const fim = performance.now();
    const tempoDecorrido = (fim - inicio) as any;
    console.log(
      `Tempo de processo async home loadingHomeAsync ${parseInt(
        tempoDecorrido
      )}ms`
    );
    return JSON.parse(response) == null ? [] : JSON.parse(response);
  } catch (error) {
    console.log("error asyncstorage loading ->", error);
  }
}
