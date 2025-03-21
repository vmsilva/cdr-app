import React, { ReactNode, useEffect, useState } from "react";
import { View, ViewStyle } from "react-native";

import Sytles from "./styles";
import CustomText from "../../componentes/customText";
import styles from "./styles";

type CopyRightProps = {
  style?: ViewStyle | ViewStyle[];
  //children: ReactNode;
  width: any;
  height: any;
  nome: any;
  email: any;
};

const CopyRight: React.FC<CopyRightProps> = ({
  style,
  width,
  height,
  nome,
  email,
}) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  const getRandomPosition = () => {
    const screenWidth = Math.floor(Math.random() * width); // Substitua 300 pela largura da sua tela
    const screenHeight = Math.floor(Math.random() * height); // Substitua 500 pela altura da sua tela

    return {
      top: screenHeight,
      left: screenWidth,
    };
  };

  const randomPosition = getRandomPosition();

  useEffect(() => {
    const interval = setInterval(() => {
      const randomPosition = getRandomPosition();
      setPosition(randomPosition);
    }, 5000); // 30 segundos em milissegundos

    return () => clearInterval(interval);
  }, []);

  return (
    <View
      style={[
        Sytles.container,
        passedStyles,
        { width: width, height: height, zIndex: 99 },
      ]}
    >
        <View style={[position, {justifyContent: "center", alignItems: 'center', maxWidth: 150}]}>
            <CustomText style={[styles.fonte]}>{nome}</CustomText>
            <CustomText style={[styles.fonte]}>{email}</CustomText>
        </View>
      
    </View>
  );
};

export default CopyRight;
