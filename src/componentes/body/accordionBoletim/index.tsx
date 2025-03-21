import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Animated } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import Collapsible from "react-native-collapsible";

import CustomText from "../../componentes/customText"; // Importe o componente CustomText

import Styles from "./styles";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const AccordionBoletim: React.FC<any> = ({ titulo, item, isExpanded }) => {
  const navigation = useNavigation() as any;
  const [expanded, setExpanded] = useState(
    isExpanded != undefined ? isExpanded : false
  );
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

  //useEffect(() => {},[expanded])

  return (
    <View style={Styles.container}>
      <TouchableWithoutFeedback
        style={Styles.header}
        onPress={() => {
          toggleAccordion();
          startRotateAnimation();
        }}
      >
        <CustomText style={Styles.title}>{titulo}</CustomText>
        <Animated.View
          style={[
            Styles.icon,
            {
              //transform: [{ rotate: rotateIcon }]
            },
          ]}
        >
          <CustomText style={{ color: "#FFF" }}>Avaliação</CustomText>
        </Animated.View>
      </TouchableWithoutFeedback>
      <>
        <View>
          {item.map((_, index) => {
            return (
              <View key={_.cod_avaliacao} style={{ backgroundColor: "#FFF" }}>
                <View
                  style={{
                    backgroundColor: CustomDefaultTheme.colors.accordion,
                    padding: 10,
                    display: "none",
                  }}
                >
                  <CustomText style={{ color: "#FFF", fontSize: 16 }}>
                    {_.titulo_avaliacao}
                  </CustomText>
                </View>
                <View style={[Styles.item]}>
                  <CustomText
                    style={{ color: "#FFF", fontSize: 14, width: "80%" }}
                  >
                    {_.titulo_avaliacao}
                  </CustomText>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: "20%",
                    }}
                  >
                    <CustomText style={{ color: "#FFF", fontSize: 14 }}>
                      {_.nota_obtida}
                    </CustomText>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </>
    </View>
  );
};

export default AccordionBoletim;

/*

 return (
    <View style={Styles.container}>
      <TouchableWithoutFeedback
        style={Styles.header}
        onPress={() => {
          toggleAccordion();
          startRotateAnimation();
        }}
      >
        <CustomText style={Styles.title}>{titulo}</CustomText>
        <Animated.View
          style={[
            Styles.icon,
            {
              //transform: [{ rotate: rotateIcon }]
            },
          ]}
        >
          <CustomText style={{ color: "#FFF" }}>Avaliação</CustomText>
        </Animated.View>
      </TouchableWithoutFeedback>
      <Collapsible
        collapsed={!expanded}
        //collapsed={true}
      >
        <View>
          {item.map((_, index) => {
            return (
              <View key={_.cod_avaliacao} style={{ backgroundColor: "#FFF" }}>
                <View
                  style={{
                    backgroundColor: CustomDefaultTheme.colors.accordion,
                    padding: 10,
                    display: "none",
                  }}
                >
                  <CustomText style={{ color: "#FFF", fontSize: 16 }}>
                    {_.titulo_avaliacao}
                  </CustomText>
                </View>
                <View style={[Styles.item]}>
                  <CustomText
                    style={{ color: "#FFF", fontSize: 14, width: "80%" }}
                  >
                    {_.titulo_avaliacao}
                  </CustomText>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: "20%",
                    }}
                  >
                    <CustomText style={{ color: "#FFF", fontSize: 14 }}>
                      {_.nota_obtida}
                    </CustomText>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </Collapsible>
    </View>
  );
*/
