import React, { Children, ReactNode, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
  UIManager,
} from "react-native";

import Sytles from "./styles";
import CustomText from "../../componentes/customText";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

type TextoExpandProps = {
  children: ReactNode;
};

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TextoExpand: React.FC<any | TextoExpandProps> = ({
  text,
  numberOfLines = 3,
  children,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [fullHeight, setFullHeight] = useState(0);
  const customTextRef = useRef(null);

  const toggleExpanded = () => {
    if (expanded) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    setExpanded(!expanded);
  };

  const maxHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [60, 300], // ajuste esses valores conforme necessário
    //outputRange: [60, fullHeight > 0 ? fullHeight : 3200], // ajuste esses valores conforme necessário
  });


  useEffect(() => {
    if (customTextRef.current) { 
      const lineCount = customTextRef.current.getLineCount();

    

      console.log('bb', lineCount);
      if (lineCount > 0) {
        setFullHeight(lineCount)
       /* const singleLineHeight = fullHeight / lineCount;
        const calculatedCollapsedHeight = singleLineHeight * numberOfLines;
        setCollapsedHeight(calculatedCollapsedHeight);

        Animated.timing(animation, {
          toValue: expanded ? fullHeight : calculatedCollapsedHeight,
          duration: 300,
          useNativeDriver: false,
        }).start(); */
      }
    }
  }, [expanded, fullHeight]);

  return (
    <View>
      <Animated.View style={{ maxHeight,  paddingBottom:  expanded ? 10 : 0, paddingRight: 10}}>
        <CustomText
          ref={customTextRef}
          textType="montserratLight"
          style={Sytles.text}
        >
          {text}
        </CustomText>
      </Animated.View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          paddingVertical: 20,
        }}
      >
        <TouchableOpacity
          style={{
            borderRadius: 10,
            height: 40,
            width: 120,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: CustomDefaultTheme.colors.leiamaisbuttoncolor,
          }}
          onPress={toggleExpanded}
        >
          <CustomText textType="montserratSemiBold" style={Sytles.readMore}>
            {expanded ? "Leia menos" : "Leia mais"}
          </CustomText>
        </TouchableOpacity>
      </View>
      <View>{children}</View>
    </View>
  );
};

export default TextoExpand;
