import React, { Children, ReactNode, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';


import Sytles from "./styles";
import CustomText from '../../componentes/customText';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';

type TextoExpandProps = {
  children: ReactNode;
};

const TextoExpand: React.FC<any|TextoExpandProps> = ({ text, numberOfLines = 3, children }) => {
  const [expanded, setExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

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
    outputRange: [60, 200], // ajuste esses valores conforme necessário
  });

  return (
    <View>
      <Animated.View style={{ maxHeight }}>
        <CustomText textType="montserratLight" style={Sytles.text}>
          {text}
        </CustomText>
      </Animated.View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          paddingVertical: 20
        }}
      >
        <TouchableOpacity 
          style={{
            borderRadius: 10,
            height: 40,
            width: 120,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: CustomDefaultTheme.colors.sliderTrackplayer
          }}
          onPress={toggleExpanded}>
          <CustomText textType="montserratSemiBold" style={Sytles.readMore}>{expanded ? 'Leia menos' : 'Leia mais'}</CustomText>
        </TouchableOpacity>
      </View>
      <View>{children}</View>
    </View>
  );
};

export default TextoExpand;
