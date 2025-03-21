import React, { ReactNode, useEffect, useState } from "react";
import { Entypo, EvilIcons, MaterialIcons } from "@expo/vector-icons";
import { Animated, View, TouchableOpacity, Modal } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import styles from "./styles";
import CustomText from "../../componentes/customText";

interface subtituloProps {
  //isClose: boolean;
  handleSubtitulo: any;
  subtituloOpen: any;
  children: ReactNode;
  rate: number;
  subtitulos: any;
  subtituloSelecionado: any;
}

const Subtitulo: React.FC<subtituloProps> = ({
  subtituloOpen,
  rate,
  handleSubtitulo,
  subtitulos,
  subtituloSelecionado,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [rateNumber, setRateNumber] = useState(rate);
  const rotateAnimation = useState(new Animated.Value(0))[0];
  const rotateIcon = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });
  const [fadeAnim] = useState(new Animated.Value(0)) as any;
  const [modalVisible, setModalVisible] = useState(false);

  const toggleAccordion = () => {
    setExpanded(!expanded);
    subtituloOpen(!expanded);
    setModalVisible(!modalVisible);
  };

  const startRotateAnimation = () => {
    Animated.timing(rotateAnimation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleSubtitulo_funcao = (data) => {
    console.log(data);

    setRateNumber(data);
    handleSubtitulo(data);
    toggleAccordion();
  };

  const COMPONENTELEGENDAS = () => {
    console.log('subtitulos')
    if (subtitulos == undefined) {
      return;
    }

    return (
      <>
        {subtitulos.map((item, i) => {
          return (
            <TouchableOpacity
              key={item.lingua}
              style={{
                flexDirection: "row",
                minWidth: 100,
                marginTop: 5,
              }}
              onPress={() =>
                handleSubtitulo_funcao(item)
              }
            >
              <View style={{ width: 20 }}>
                {subtituloSelecionado &&  subtituloSelecionado.value == item.language && (
                  <Entypo name="check" size={15} color="#FFF" />
                )}
              </View>
              <CustomText style={[styles.textoRate]}>{item.lingua}</CustomText>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            minWidth: 100,
            marginTop: 5,
          }}
          onPress={() => handleSubtitulo_funcao(null)}
        >
          <View style={{ width: 20 }}></View>
          <CustomText style={[styles.textoRate]}>Nenhum subtitulo</CustomText>
        </TouchableOpacity>
      </>
    );
  };

  useEffect(() => {
    console.log('atualizad subtitulooo')
  },[subtitulos])


  if(subtitulos.length == 0){
    return <></>
  }

  return (
    <>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity onPress={() => setModalVisible(false)}>
          <View style={styles.overlay}>
            <TouchableOpacity>
              {/* Área do componente de rate */}
              <View style={styles.rateBox}>
                <COMPONENTELEGENDAS />
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <TouchableWithoutFeedback
        style={styles.header}
        onPress={() => {
          toggleAccordion();
          startRotateAnimation();
        }}
      >
        <Animated.View
          style={[styles.icon, { transform: [{ rotate: rotateIcon }] }]}
        >
          <MaterialIcons name="subtitles" size={22} color="#FFF" />
        </Animated.View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default Subtitulo;
