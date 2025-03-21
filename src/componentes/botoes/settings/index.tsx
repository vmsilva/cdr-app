import React, { ReactNode, useMemo, useRef, useState } from "react";
import { Entypo, EvilIcons } from "@expo/vector-icons";
import { Animated, View, TouchableOpacity } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import styles from "./styles";
import CustomText from "../../componentes/customText";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";
import CustomBottomSheet from "../../componentes/CustomBottomSheet";

interface settingsProps {
  //isClose: boolean;
  handleRate: any;
  settingsOpen: any;
  children: ReactNode;
  rate: number;
}

const Settings: React.FC<settingsProps> = ({ settingsOpen, rate, handleRate }) => {
  const [expanded, setExpanded] = useState(false);
  const [rateNumber, setRateNumber] = useState(rate);
  const rotateAnimation = useState(new Animated.Value(0))[0];
  const rotateIcon = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });
  const [fadeAnim] = useState(new Animated.Value(0)) as any;

  const CustomBottomSheetRef = useRef<any>(null);

  const toggleAccordion = () => {
    setExpanded(!expanded);
    settingsOpen(!expanded);
  };

  const startRotateAnimation = () => {
    Animated.timing(rotateAnimation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleRate_funcao = (data) => {
    setRateNumber(data);
    handleRate(data);
    toggleAccordion()
  }

  const COMPONENTERATE = () => {
    return (
      <View>
        <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => handleRate_funcao(0.25)}>
          <View style={{width: 20}}>{rateNumber == 0.25 && <Entypo name="check" size={15} color={CustomDefaultTheme.colors.text} />}</View>
          <CustomText style={[styles.textoRate]}>0.25</CustomText> 
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => handleRate_funcao(0.50)}>
          <View style={{width: 20}}>{rateNumber == 0.50 && <Entypo name="check" size={15} color={CustomDefaultTheme.colors.text} />}</View>
          <CustomText style={[styles.textoRate]}>0.50</CustomText> 
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => handleRate_funcao(0.75)}>
          <View style={{width: 20}}>{rateNumber == 0.75 && <Entypo name="check" size={15} color={CustomDefaultTheme.colors.text} />}</View>
          <CustomText style={[styles.textoRate]}>0.75</CustomText> 
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => handleRate_funcao(1)}>
          <View style={{width: 20}}>{rateNumber == 1 && <Entypo name="check" size={15} color={CustomDefaultTheme.colors.text} />}</View>
          <CustomText style={[styles.textoRate]}>Normal</CustomText> 
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => handleRate_funcao(1.25)}>
          <View style={{width: 20}}>{rateNumber == 1.25 && <Entypo name="check" size={15} color={CustomDefaultTheme.colors.text} />}</View>
          <CustomText style={[styles.textoRate]}>1.25</CustomText> 
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => handleRate_funcao(1.50)}>
          <View style={{width: 20}}>{rateNumber == 1.50 && <Entypo name="check" size={15} color={CustomDefaultTheme.colors.text} />}</View>
          <CustomText style={[styles.textoRate]}>1.50</CustomText> 
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => handleRate_funcao(2)}>
          <View style={{width: 20}}>{rateNumber == 2 && <Entypo name="check" size={15} color={CustomDefaultTheme.colors.text} />}</View>
          <CustomText style={[styles.textoRate]}>2</CustomText> 
        </TouchableOpacity>
      </View>
    );
  };

  const COMPONENTEBOOTOMSHEET = useMemo(() => {
    return (<CustomBottomSheet
      background={CustomDefaultTheme.colors.bottomTab}
      sheetRef={CustomBottomSheetRef}
      children={
        <></>
      }
    />
    );
  }, []);

  return (
    <>
      <Animated.View
        style={[
          {
            padding: 10,
            borderRadius: 10,
            position: "absolute",
            width: 80,
            height: 155,
            top: -165,
            right: '1%',
            backgroundColor: CustomDefaultTheme.colors.background,
            borderWidth: .3,
            borderColor: '#FFF',
            zIndex: 1
          },
          //!expanded && { opacity: fadeAnim },
          !expanded && { display: 'none' },
        ]}
      >
        <COMPONENTERATE />
      </Animated.View>
      <TouchableWithoutFeedback
        style={styles.header}
        onPress={() => {
          //CustomBottomSheetRef.current?.expand();
          toggleAccordion();
          startRotateAnimation();
        }}
      >
        <Animated.View
          style={[styles.icon, { transform: [{ rotate: rotateIcon }] }]}
        >
          <EvilIcons name="gear" size={24} color="#FFF" />
        </Animated.View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default Settings;
