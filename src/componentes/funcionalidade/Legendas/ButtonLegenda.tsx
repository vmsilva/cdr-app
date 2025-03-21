import React, { ReactNode, useState } from "react";
import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Animated, View, TouchableOpacity, Dimensions } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Styles from "./styles";
import CustomText from "../../componentes/customText";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";
import { Portal } from "react-native-paper";

interface ButtonLegendaProps {
  ButtonLegendaOpen: any;
  width: any;
  height: any;
  legendaSelecionada: any;
  legendas: any;
  configuracoesLegenda: any;
  legendaAtual: any;
  fullscreen: any;
}

const ButtonLegenda: React.FC<ButtonLegendaProps> = ({
  ButtonLegendaOpen,
  width,
  height,
  legendaSelecionada,
  legendas,
  configuracoesLegenda,
  legendaAtual,
  fullscreen,
}) => {
  const [expanded, setExpanded] = useState(false);
  const rotateAnimation = useState(new Animated.Value(0))[0];
  const rotateIcon = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });
  const [fadeAnim] = useState(new Animated.Value(0)) as any;
  const [legendaSelecionada_, setLegendaSelecionada_] = useState<any>(
    legendaAtual
  );
  const ICONSIZE = 15;
  //const VETICAL = windowWidth < 700 ? true : false;

  const toggleButtonSubtitulo = () => {
    setExpanded(!expanded);
    ButtonLegendaOpen(!expanded);
  }; //

  const startRotateAnimation = () => {
    Animated.timing(rotateAnimation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const COMPONENTESUBTITULOS = () => {
    return (
      <View>
        <View
          style={{
            marginLeft: -50,
          }}
        >
          {legendas.map((_, i) => {
            return (
              <View
                style={{
                  //backgroundColor: "#FF0",
                  padding: 2,
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: "row", marginTop: 5 }}
                  key={_.lingua}
                  onPress={() => {
                    legendaSelecionada(_);
                    toggleButtonSubtitulo();
                  }}
                >
                  <View
                    style={{
                      width: 20,
                    }}
                  >
                    {legendaSelecionada_ != null &&
                      legendaSelecionada_.lingua == _.lingua && (
                        <AntDesign
                          name="check"
                          size={ICONSIZE}
                          color={CustomDefaultTheme.colors.vermelho}
                        />
                      )}
                  </View>
                  <CustomText style={[Styles.fontPadrao]}>
                    {_.lingua.toUpperCase()}
                  </CustomText>
                </TouchableOpacity>
              </View>
            );
          })}
          <TouchableOpacity
            style={{ flexDirection: "row", marginTop: 30 }}
            onPress={() => {
              legendaSelecionada({});
              toggleButtonSubtitulo();
            }}
          >
            <View
              style={{
                width: 20,
              }}
            >
              <AntDesign
                name="close"
                size={ICONSIZE}
                color={CustomDefaultTheme.colors.vermelho}
              />
            </View>
            <CustomText style={[Styles.fontPadrao]}>Remover Legenda</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const COMPONENTESCORESLEGENDA = () => {
    return (
      <View
        style={{
          marginLeft: 50,
          marginTop: 0,
          paddingRight: 10,
        }}
      >
        <View
          style={{
            paddingRight: 10,
          }}
        >
          <CustomText style={[Styles.fontPadrao, {}]}>Cor</CustomText>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingRight: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => setCorLegenda("#FF0")}
            style={[
              Styles.cores,
              corLegenda == "#FF0" && Styles.coresSelecionadas,
              { backgroundColor: "#FF0" },
            ]}
          ></TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCorLegenda("#FFF")}
            style={[
              Styles.cores,
              corLegenda == "#FFF" && Styles.coresSelecionadas,
              { backgroundColor: "#FFF" },
            ]}
          ></TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCorLegenda("#F00")}
            style={[
              Styles.cores,
              corLegenda == "#F00" && Styles.coresSelecionadas,
              { backgroundColor: "#F00" },
            ]}
          ></TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCorLegenda("#0F0F")}
            style={[
              Styles.cores,
              corLegenda == "#0F0F" && Styles.coresSelecionadas,
              { backgroundColor: "#0F0F" },
            ]}
          ></TouchableOpacity>
        </View>
      </View>
    );
  };

  const COMPONENTESTAMANHOFONTE = () => {
    return (
      <View
        style={{
          marginLeft: 50,
          marginTop: 15,
          paddingRight: 10,
        }}
      >
        <View
          style={{
            paddingRight: 10,
          }}
        >
          <CustomText style={[Styles.fontPadrao, {}]}>
            Fonte: {tamanhoLegenda != null ? tamanhoLegenda : "12"}px
          </CustomText>
        </View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={() => setTamanhoLegenda(25)}
            style={[Styles.botaoFonteSize]}
          >
            <CustomText style={[Styles.fontPadrao, {}]}>Pequeno</CustomText>
            {tamanhoLegenda == 25 && (
              <AntDesign
                name="check"
                size={ICONSIZE}
                color={CustomDefaultTheme.colors.vermelho}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTamanhoLegenda(35)}
            style={[Styles.botaoFonteSize]}
          >
            <CustomText style={[Styles.fontPadrao, {}]}>Médio</CustomText>
            {tamanhoLegenda == 35 && (
              <AntDesign
                name="check"
                size={ICONSIZE}
                color={CustomDefaultTheme.colors.vermelho}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTamanhoLegenda(45)}
            style={[Styles.botaoFonteSize]}
          >
            <CustomText style={[Styles.fontPadrao, {}]}>Grande</CustomText>
            {tamanhoLegenda == 45 && (
              <AntDesign
                name="check"
                size={ICONSIZE}
                color={CustomDefaultTheme.colors.vermelho}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (!legendas) {
    return <></>;
  }
  return (
    <>
      {expanded && (
        <Portal>
          <View
            style={[
              Styles.container,
              {
                width: width,
                height: height,
                marginTop: fullscreen ? 0 : hp("12%"),
              },
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                width: width,
                height: height,
              }}
            >
              <View
                style={{
                  width: "80%",
                  height: "100%",
                  paddingLeft: 50,
                }}
              >
                <View
                  style={{
                    width: "100%",
                    height: "20%",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CustomText style={[Styles.fontPadrao, {}]}>
                    Subtitulos
                    {legendaSelecionada != null &&
                      legendaSelecionada.lingua != undefined && (
                        <>
                          <CustomText style={[Styles.fontPadrao, {}]}>
                            {` -    ${legendaSelecionada.lingua}`}
                          </CustomText>
                        </>
                      )}
                  </CustomText>
                </View>
                <View
                  style={{
                    width: "100%",
                    height: "80%",
                    flexDirection: "row",
                    paddingLeft: fullscreen ? 60 : 20,
                  }}
                >
                  <View
                    style={{
                      height: "100%",
                      flexDirection: "row",
                    }}
                  >
                    <View>
                      <COMPONENTESUBTITULOS />
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={{
                  width: "20%",
                  height: "100%",
                  paddingRight: 50,
                }}
              >
                <View
                  style={{
                    width: "100%",
                    height: "20%",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      toggleButtonSubtitulo();
                    }}
                  >
                    <FontAwesome
                      name="chevron-down"
                      size={ICONSIZE}
                      color={CustomDefaultTheme.colors.branco}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: "100%",
                    height: "80%",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                ></View>
              </View>
            </View>
          </View>
        </Portal>
      )}
      <TouchableWithoutFeedback
        style={Styles.header}
        onPress={() => {
          toggleButtonSubtitulo();
          startRotateAnimation();
        }}
      >
        <Animated.View
          style={[Styles.icon, { transform: [{ rotate: rotateIcon }] }]}
        >
          <MaterialIcons
            name="subtitles"
            size={28}
            color={CustomDefaultTheme.colors.branco}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default ButtonLegenda;
