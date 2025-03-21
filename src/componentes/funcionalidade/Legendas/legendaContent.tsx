import React, { useState, useEffect, SetStateAction } from "react";
import { View, Style, TouchableOpacity, Platform } from "react-native";
import { Portal } from "react-native-paper";

import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

import Styles from "./styles";
import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import CustomText from "../../componentes/customText";

interface legendaProps {
  showLegenda: boolean;
  position: any;
  width: any;
  height: any;
  legendaSelecionada: any;
}

const LegendasContent: React.FC<legendaProps> = ({
  showLegenda,
  position,
  width,
  height,
  legendaSelecionada,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  //const [legendaSelecionada, setLegendaSelecionada] = useState<any>({});
  const [corLegenda, setCorLegenda] = useState("#FFF");
  const [tamanhoLegenda, setTamanhoLegenda] = useState(15);

  const ICONSIZE = 15;
  const VERTICALMODE = width < height ? true : false;

  const COMPONENTELEGENDAOLD = () => {
    if (legendaSelecionada == null) {
      return <></>;
    }

    if (legendaSelecionada.legendas != undefined) {
      //let SEGUNDOS = position / 1000;

    let SEGUNDOS = parseInt(position * 1000);

      if (position != null) {
        let TT = undefined;
        TT = Object.values(legendaSelecionada.legendas).filter((item: any) => {
          //console.log(item)
          if (item.start < SEGUNDOS && item.end > SEGUNDOS) {
            console.log(item.frase)
            return item.frase;
          }
        }) as any;

        if (TT[0] == undefined) return <></>;
        console.log(TT[0].frase);
        return (
          <CustomText
            numberOfLines={3}
            textType="bold"
            style={[
              { fontSize: tamanhoLegenda, color: corLegenda },
              Styles.legenda,
              {
                backgroundColor: "#000",
                paddingLeft: 3,
                paddingRight: 3,
                textAlign: "center",
              },
            ]}
          >
            {TT[0].frase}
          </CustomText>
        );
      }
    }
    return <></>;
  };

  const COMPONENTELEGENDAODER = () => {
    if (legendaSelecionada == null) {
      return <></>;
    }

    let SEGUNDOS = parseInt(position * 1000);
    if (position != null) {
      let TT = undefined;
    
      // Acessando o array de legendas
      const legendas = legendaSelecionada.legendas;
      //console.log(SEGUNDOS)
      // Convertendo as chaves para números para comparação
      TT = Object.entries(legendas).filter(([key, value]: [string, any]) => {
        const start = parseInt(key); // Convertendo a chave para número
        const end = start + 4000; // Supondo que a legenda dura 4 segundos, ajuste conforme necessário
        //console.log(key, SEGUNDOS)
        if (start < SEGUNDOS && end > SEGUNDOS) {
          //console.log(value)
          return value;
          //return value[0]; // Retornando o primeiro objeto dentro do array da legenda
        }
      }) as any;
    
      if (TT[0] == undefined) return <></>;
    
      // Pegando a legenda da frase
      const fraseLegenda = TT[0][1].frase;
    
      console.log(TT[0][1].frase);
    
      return (
        <CustomText
          numberOfLines={3}
          textType="bold"
          style={[
            { fontSize: tamanhoLegenda, color: corLegenda },
            Styles.legenda,
            {
              backgroundColor: "#000",
              paddingLeft: 3,
              paddingRight: 3,
              textAlign: "center",
            },
          ]}
        >
          {fraseLegenda}
        </CustomText>
      );
    }
    /*if (position != null) {
      let TT = undefined;
      TT = Object.values(legendaSelecionada.legendas).filter((item: any) => {
        if (item.start < position && item.end > position) {
          return item.frase;
        }
      }) as any;

      if (TT[0] == undefined) return <></>;
      console.log(TT[0].frase);

      return (
        <CustomText
          numberOfLines={3}
          textType="bold"
          style={[
            { fontSize: tamanhoLegenda, color: corLegenda },
            Styles.legenda,
            {
              backgroundColor: "#000",
              paddingLeft: 3,
              paddingRight: 3,
              textAlign: "center",
            },
          ]}
        >
          {TT[0].frase}
        </CustomText>
      );
      /*return (
        <CustomText
          numberOfLines={3}
          textType="bold"
          style={[
            { fontSize: tamanhoLegenda, color: corLegenda },
            Styles.legenda,
            {
              backgroundColor: "#000",
              paddingLeft: 3,
              paddingRight: 3,
              textAlign: 'center'
            },
          ]}
        >
          {TT[0].frase}
        </CustomText>
      );
    }*/
  };

  useEffect(() => {}, [legendaSelecionada]);

  //legendaSelecionada.legendas != undefined &&  console.log(legendaSelecionada.legendas[`87620`], "--->", showLegenda);
  return (
    <View
      style={{
        //display: !showLegenda ? 'none' : 'flex',
        width: width,
        height: height,
        alignItems: "center",
        justifyContent: "flex-end",
        zIndex: 99,
        paddingBottom: Platform.OS == "android" ? 30 : 30,

        //top: -20,
        //backgroundColor: '#FF0'
      }}
    >
      <COMPONENTELEGENDAOLD />
    </View>
  );
};

export default LegendasContent;
