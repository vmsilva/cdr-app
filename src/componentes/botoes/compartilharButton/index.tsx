import React from "react";
import { TouchableOpacity, View, Share, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

//Config
import { useAuth } from "../../../configuracoes/hooks/auth";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";
import { EMPRESA } from "../../../configuracoes/utils/constants";

//SVG
import SVGCOMPARTILHAR from "../../../assets/svg/icone-compartilhar.svg";

// 1 - personalidade 2 - aovivo 3 - radios 4 - video 5 - serie   indexador victor 100 - playlist | 101 - audio

interface compartilharProps {
  tipo: any;
  array: any;
  background: string;
}

interface arrayData {
  nome: string;
  codigo: number;
}

const CompartilharButton: React.FC<compartilharProps | any> = ({
  array,
  tipo,
  background,
  size,
  temporada,
  palestrante,
}) => {
  const { cliente } = useAuth();

  const onShare = async () => {
    //console.log(temporada.apresentadores_temporada[0], 'tempooo')
    try {
      let ARRAYINFO = {} as arrayData | any;
      switch (tipo) {
        case 1:
          ARRAYINFO = {
            nome: `Deputado: ${array.nome_personalidade}`,
            codigo: array.cod_personalidade,
          };
          break;
        case 2:
          console.log(tipo);
          ARRAYINFO = {
            nome: `Assista Ao Vivo ${array.titulo_video}`,
            codigo: array.cod_video,
          };
          break;
        case 3:
          ARRAYINFO = {
            nome: array.titulo_video,
            codigo: array.cod_video,
          };
          break;
        case 4:
          ARRAYINFO = {
            nome: `Assista ${array.titulo_video}`,
            codigo: array.cod_video,
          };
          break;
        case 5:
          ARRAYINFO = {
            nome: `Assista a serie de videos ${array.nome_serie}`,
            codigo: array.cod_serie,
          };
          break;
        case 100:
          ARRAYINFO = {
            nome: `Ouça a playlist: ${array.nome_playlist}`,
            codigo: array.cod_playlist,
          };
          break;
        case 101:
          ARRAYINFO = {
            nome: `Ouça: ${array.title}`,
            codigo: array.cod_playlist_audio,
          };
          break;
        case 199:
          ARRAYINFO = {
            nome: `Leia: ${array.titulo_biblioteca}`,
            codigo: array.cod_biblioteca,
          };
          break;
        case 210:
          let cod_apresentador = temporada.apresentadores_temporada[0];
          let cod_categoria = temporada.cod_categoria;
          ARRAYINFO = {
            nome: `Assista ${array.titulo_video} em ${temporada.nome_temporada}`,
            codigo: `${array.cod_video}|${
              temporada.cod_categoria_temporada
            }|${parseInt(cod_apresentador)}|${cod_categoria}`, //|${temporada.apresentadores_temporada[0]}
            codigoIOS: `${array.cod_video}_${
              temporada.cod_categoria_temporada
            }_${parseInt(cod_apresentador)}_${cod_categoria}`, //|${temporada.apresentadores_temporada[0]}
            cod_categoria_temporada: temporada.cod_categoria_temporada,
          };
          break;
      }

      const uri = `${EMPRESA.EMPRESA.uriScheme}://${tipo}/${ARRAYINFO.codigo}`;
      const encodedURI = encodeURIComponent(uri);

      console.log(
        `https://${EMPRESA.EMPRESA.dominio}/share/?s=${encodedURI}`,
        "blooob"
      );

      const result = await Share.share({
        //message: `${cliente.nome}  ${ARRAYINFO.nome} ${Platform.OS == 'android' ? `https://${cliente.dominio}/share/?s=${encodedURI}` : '' }`,
        //title: `${ARRAYINFO.nome}`,
        //url: `https://${cliente.dominio}/share/${tipo}/${ARRAYINFO.codigo}`
        title: `${ARRAYINFO.nome}`,
        //message: `${cliente.nome}  ${ARRAYINFO.nome}`+' '+ Platform.OS == 'android' ? `https://${cliente.dominio}/share/?s=${encodedURI}` : '',
        message:
          Platform.OS == "ios"
            ? `${cliente.nome}  ${ARRAYINFO.nome}`
            : `${cliente.nome}  ${ARRAYINFO.nome}  https://${EMPRESA.EMPRESA.dominio}/share/?s=${encodedURI}`,
        url: `https://${EMPRESA.EMPRESA.dominio}/share/?s=${encodedURI}`,

        //url: `https://${EMPRESA.EMPRESA.dominio}/share/?s=${encodedURI}`,
        //url: Platform.OS == 'android' ?  `https://${EMPRESA.EMPRESA.dominio}/share/?s=${encodedURI}`:  `https://${EMPRESA.EMPRESA.dominio}/${tipo}/${ARRAYINFO.codigoIOS}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log("Error compartilhar ", error.message);
    }
  };

  return (
    <TouchableOpacity onPress={onShare}>
      <View
        style={{
          padding: 2,
          borderRadius: 99,
          width: size ? size + 15 : 30,
          height: size ? size + 15 : 30,
          backgroundColor:
            background != undefined
              ? background
              : CustomDefaultTheme.colors.backgroundIconsButton,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <SVGCOMPARTILHAR width={size ? size : 15} height={size ? size  : 15} />
      </View>
    </TouchableOpacity>
  );
};

export default CompartilharButton;
