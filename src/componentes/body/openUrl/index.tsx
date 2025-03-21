import React, { useState, ReactNode } from "react";
import { View, Animated, TouchableOpacity } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Collapsible from "react-native-collapsible";
import CustomText from "../../componentes/customText"; // Importe o componente CustomText

import Styles from "./styles";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const OpenUrl: React.FC<any> = ({
  background,
  titulo,
  icone,
  pagina_destino,
  pagina_origem,
  iconColor,
}) => {
  const navigation = useNavigation() as any;

  const handleOpen = () => {
    navigation.navigate(pagina_destino,{pagina_origem: pagina_origem})
  }

  return (
    <View
      style={[
        Styles.container,
        {
          backgroundColor:
            background != undefined
              ? background
              : CustomDefaultTheme.colors.primary,
        },
      ]}
    >
      <TouchableOpacity style={Styles.header} onPress={handleOpen}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icone != undefined && <MaterialCommunityIcons name={icone} size={20} color={iconColor} />}
          <CustomText textType="bold" style={[Styles.title, iconColor != undefined && {color: iconColor}]}>
            {titulo}
          </CustomText>
        </View>
        <Animated.View style={[Styles.icon]}>
          <MaterialCommunityIcons
            name="arrow-top-right"
            size={20}
            color={iconColor != undefined ? iconColor : "#FFF"}
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default OpenUrl;
