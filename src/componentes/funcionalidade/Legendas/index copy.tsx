import React, { useState, useEffect } from "react";
import {
  View,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import { Portal } from "react-native-paper";
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons
} from "@expo/vector-icons";

import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

import Styles from "./styles";
import CustomText from "../../componentes/customText";

type legendaProps = {
  style?: ViewStyle | ViewStyle[];
  item: any;
  setShowSubtitulosPortal: boolean;
  position: any;
  optionShow: any;
  legendaAtivo: any;
  width: any;
  height: any;
  settingsOpen: any;
};

const Legendas: React.FC<legendaProps> = ({
  style,
  item,
  position,
  legendaAtivo,
  optionShow,
  width,
  height,
  settingsOpen,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [legendaSelecionada, setLegendaSelecionada] = useState<any>({});
  const [corLegenda, setCorLegenda] = useState("#FFF");
  const [tamanhoLegenda, setTamanhoLegenda] = useState(25);

  const COMPONENTELEGENDA = () => {
    if (legendaSelecionada == null) {
      return <></>;
    }

    if (legendaSelecionada.legenda != undefined) {
      let SEGUNDOS = position / 1000;

      if (position != null) {
        let TT = undefined;
        TT = Object.values(legendaSelecionada.legenda).filter((item: any) => {
          if (item.start < position && item.end > position) {
            return item.frase;
          }
        }) as any;

        if (TT[0] == undefined) return <></>;

        return (
          <CustomText
            numberOfLines={3}
            textType="bold"
            style={[
              { fontSize: tamanhoLegenda, color: corLegenda },
              Styles.legenda,
              {
                width: "100%",
                height: "200%",
                //backgroundColor: '#FF0'
              },
            ]}
          >
            {TT[0].frase}
          </CustomText>
        );
      }
    }
    return <></>;
  };

  const COMPONENTESUBTITULOS = () => {
    return (
      <View style={{}}>
        <View style={{}}>
          {item.map((_, i) => {
            return (
              <TouchableOpacity
                style={{ flexDirection: "row", marginTop: 5 }}
                key={_.lingua}
                onPress={() => {
                  setLegendaSelecionada(_);
                  //showLegenda(true);
                }}
              >
                <View style={{ width: 20 }}>
                  {legendaSelecionada != null &&
                    legendaSelecionada.lingua == _.lingua && (
                      <AntDesign
                        name="check"
                        size={15}
                        color={CustomDefaultTheme.colors.vermelho}
                      />
                    )}
                </View>
                <CustomText style={[Styles.fontPadrao]}>{_.lingua}</CustomText>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity
            style={{ flexDirection: "row", marginTop: 30 }}
            onPress={() => {
              setLegendaSelecionada(null);
              //showLegenda(false);
            }}
          >
            <AntDesign
              name="close"
              size={24}
              color={CustomDefaultTheme.colors.vermelho}
            />
            <CustomText
              style={[
                Styles.fontPadrao,
                {
                  fontSize: 18,
                  marginLeft: 15,
                },
              ]}
            >
              Remover Legenda
            </CustomText>
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
          <CustomText
            style={[Styles.fontPadrao, { fontSize: 12, paddingBottom: 10 }]}
          >
            Cor
          </CustomText>
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
          <CustomText
            style={[Styles.fontPadrao, { fontSize: 10, paddingBottom: 10 }]}
          >
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
            <CustomText style={[Styles.fontPadrao]}>Pequeno</CustomText>
            {tamanhoLegenda == 25 && (
              <AntDesign
                name="check"
                size={15}
                color={CustomDefaultTheme.colors.vermelho}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTamanhoLegenda(35)}
            style={[Styles.botaoFonteSize]}
          >
            <CustomText style={[Styles.fontPadrao]}>Médio</CustomText>
            {tamanhoLegenda == 35 && (
              <AntDesign
                name="check"
                size={15}
                color={CustomDefaultTheme.colors.vermelho}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTamanhoLegenda(45)}
            style={[Styles.botaoFonteSize]}
          >
            <CustomText style={[Styles.fontPadrao]}>Grande</CustomText>
            {tamanhoLegenda == 45 && (
              <AntDesign
                name="check"
                size={15}
                color={CustomDefaultTheme.colors.vermelho}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  useEffect(() => {
    if (legendaAtivo) {
      !showOptions && setShowOptions(true);
    }
  }, [legendaAtivo]);

  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  return (
    <>
      <TouchableOpacity
        style={{}}
        onPress={() => {
          setShowOptions(!showOptions);
          settingsOpen(!showOptions);
        }}
      >
        <MaterialCommunityIcons
          name="subtitles-outline"
          size={30}
          color={CustomDefaultTheme.colors.branco}
        />
      </TouchableOpacity>

      <View>
        <COMPONENTELEGENDA />
      </View>

      {showOptions && (
        <Portal>
          <View
            style={[
              Styles.container,
              passedStyles,
              { width: width, height: height },
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                width: width,
                height: height,
              }}
            >
              {/* primeira coluna */}
              <View
                style={{
                  width: "80%",
                  height: "100%",
                  backgroundColor: "#H00",
                }}
              >
                <View
                  style={{
                    width: "100%",
                    height: "20%",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingLeft: 20,
                    backgroundColor: "#00FF",
                  }}
                >
                  <CustomText
                    style={[
                      Styles.fontPadrao,
                      {
                        fontSize: 10,
                      },
                    ]}
                  >
                    Legendas
                    {legendaSelecionada != null &&
                      legendaSelecionada.lingua != undefined &&
                      ` -    ${legendaSelecionada.lingua}`}
                  </CustomText>
                </View>
                <View
                  style={{
                    width: "100%",
                    height: "80%",
                    flexDirection: "row",
                    paddingLeft: 20,
                  }}
                >
                  <View
                    style={{
                      height: "100%",
                      flexDirection: "row",
                      paddingLeft: 20,
                    }}
                  >
                    <COMPONENTESUBTITULOS />
                    <View
                      style={{
                        //marginLeft: 50,
                        marginTop: 0,
                        paddingRight: 10,
                      }}
                    >
                      <COMPONENTESCORESLEGENDA />
                      <COMPONENTESTAMANHOFONTE />
                    </View>
                  </View>
                </View>
              </View>
              {/* segunda coluna */}
              <View
                style={{
                  width: "20%",
                  height: "100%",
                  paddingRight: 50,
                  backgroundColor: "#0F0",
                }}
              >
                <View
                  style={{
                    width: "100%",
                    height: "20%",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      justifyContent: "flex-end",
                      marginBottom: 5,
                      marginTop: 10,
                      borderRadius: 100,
                      height: 50,
                      width: 50,
                    }}
                    onPress={() => {
                      setShowOptions(!showOptions);
                      optionShow(false);
                    }}
                  >
                    <FontAwesome
                      name="chevron-down"
                      size={30}
                      color={CustomDefaultTheme.colors.vermelho}
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
    </>
  );
};

export default Legendas;
