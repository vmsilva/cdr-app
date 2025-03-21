import React, { ReactNode, useEffect, useState } from "react";
import { View, ViewStyle } from "react-native";

import Sytles from "./styles";
import CustomText from "../../componentes/customText";
import styles from "./styles";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

type ProgressoVideoProps = {
  style?: ViewStyle | ViewStyle[];
  width: any;
  height: any;
  valorTotal: any;
  valor: any;
};



const ProgressoVideo: React.FC<ProgressoVideoProps> = ({
  style,
  width,
  height,
  valorTotal,
  valor
}) => {
  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  const calulaPercentual = () => {

    if(valorTotal == 0){
      return 0
    }

    let percentual = (valor / valorTotal) * 100

    return percentual;
  }

  return (
    <View
      style={[
        Sytles.container,
        passedStyles,
        { width: width, height: height, zIndex: 99 },
      ]}
    >
        <View 
          style={{
            backgroundColor: CustomDefaultTheme.colors.progressoSlider, 
            //width: calulaPercentual() > 0 ? `${calulaPercentual()}%`: '0%',
            width: `${valor}%`,
            height: height
          }} 
          
        />
      
    </View>
  );
};

export default ProgressoVideo;
