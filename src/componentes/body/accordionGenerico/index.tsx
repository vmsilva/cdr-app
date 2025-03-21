import React, { useState, ReactNode, useEffect } from "react";
import { View, Animated } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Collapsible from "react-native-collapsible";
import CustomText from "../../componentes/customText"; // Importe o componente CustomText

import Styles from "./styles";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface AccordionProps {
  children: ReactNode;
  accordionTitulo: ReactNode;
}
const AccordionGenerico: React.FC<any | AccordionProps> = ({
  titulo,
  children,
  background,
  iconColor,
  isExpanded,
  icone,
  headerColor
}) => {
  const [expanded, setExpanded] = useState(false);
  //const [expanded, setExpanded] = useState(isExpanded != undefined ? isExpanded : false);
  const toggleAccordion = () => setExpanded(!expanded);
  const rotateAnimation = useState(new Animated.Value(0))[0];
  const rotateIcon = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const startRotateAnimation = () => {
    Animated.timing(rotateAnimation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    setExpanded(!isExpanded ? true : false);
  }, [isExpanded]);
  

  return (
    <View
      style={[
        Styles.container,
        {
          backgroundColor:
            background != undefined
              ? background
              : CustomDefaultTheme.colors.bottomTab,
        },
      ]}
    >
      <TouchableWithoutFeedback
        style={[Styles.header, headerColor != undefined && { backgroundColor: headerColor}]}
        onPress={() => {
          toggleAccordion();
          startRotateAnimation();
        }}
      >
         <>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                //justifyContent: "center",
                //backgroundColor: '#FF0',
                width: '90%'
              }}
            >
              {icone != undefined && (
                <MaterialCommunityIcons
                  name={icone}
                  size={20}
                  color={iconColor}
                />
              )}
              <CustomText
                textType="montserratBold"
                style={[
                  Styles.title,
                  iconColor != undefined && { color: iconColor },
                ]}
              >
                {titulo}
              </CustomText>
            </View>
            <Animated.View
              style={[Styles.icon, { transform: [{ rotate: rotateIcon }] }]}
            >
              <MaterialCommunityIcons
                name="chevron-down"
                size={24}
                color={iconColor != undefined ? iconColor : "#FFF"}
              />
            </Animated.View>
          </>
      </TouchableWithoutFeedback>
      <Collapsible collapsed={!expanded}>
        <View>{children}</View>
      </Collapsible>
    </View>
  );
};

export default AccordionGenerico;
