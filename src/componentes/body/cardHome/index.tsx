import React, { useEffect } from "react";
import { View, TouchableOpacity, Dimensions } from "react-native";
import { Foundation } from "@expo/vector-icons";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import FastImage from "react-native-fast-image";

import { useAuth } from "../../../configuracoes/hooks/auth";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

import Styles from "./Styles";
import CustomText from "../../componentes/customText";

interface CardHomeProps {
  array: any;
  quantidade: any;
  label: string;
  nome_grupo_conteudo: string;
  veja_mais: boolean;
}
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const CardHome: React.FC<CardHomeProps | any> = ({
  array,
  quantidade,
  label,
  veja_mais,
  nome_grupo_conteudo,
}) => {
  const navigation = useNavigation() as any;
  const isFocused = useIsFocused();

  const { user } = useAuth();

  const abrePagina = (item: any) => {
    navigation.navigate("sinopseDrawer", {
      item: item,
      grupo_conteudo: "grupo_conteudo",
    });
  };

  const abreBuscar = () => {
    navigation.navigate("buscaDrawer", { item: array });
  };

  useEffect(() => {
    if (isFocused) {
    }
    return () => {};
  }, [array]);

  return (
    <>
      <View
        style={{
          justifyContent: "center",
          padding: wp("5"),
        }}
      >
        <View
          style={{
            marginLeft: wp("3"),
            marginRight: wp("3"),
            bottom: 10,
            justifyContent: "space-around",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <CustomText
            style={{
              fontSize: 15,
              fontWeight: "800",
              maxWidth: wp("45"),
              maxHeight: 50,
              left: wp("-10"),
            }}
          >
            {label}
          </CustomText>
          <View
            style={{
              maxWidth: wp("50"),
              right: wp("-5"),
            }}
          >
            {veja_mais ? (
              <TouchableOpacity onPress={abreBuscar} style={{}}>
                <CustomText
                  style={{
                    color: "#161616",
                    textDecorationColor: "#161616",
                    textDecorationStyle: "solid",
                    textDecorationLine: "underline",
                    paddingBottom: 4, //,lineHeight: 0
                  }}
                >
                  veja mais
                </CustomText>
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>
        </View>

        <View
          style={{
            justifyContent: "space-evenly",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {array.map((element, index) => {
            return (
              (index <= quantidade || quantidade == "") && (
                <View key={Math.floor(Math.random() * 90000) + 10000}>
                  <View
                    style={{
                      marginTop: 10,
                      width: wp("40"),
                      height: wp("40"),
                      marginBottom: 60,
                      borderRadius: 10,
                    }}
                  >
                    <TouchableOpacity
                      style={[
                        Styles.shadow,
                        Styles.shadowElevation,
                        {
                          width: wp("40"),
                          height: wp("40"),
                          backgroundColor: "#E2E2E2",
                          borderRadius: 10,
                        },
                      ]}
                      onPress={() => {
                        abrePagina(element);
                      }}
                    >
                      <FastImage
                        source={{ uri: element.imagem_playlist }}
                        style={{
                          width: wp("40"),
                          height: wp("40"),
                          borderRadius: 10,
                        }}
                      >
                        <CustomText
                          style={{
                            color: "#FFF",
                            position: "absolute",
                            textAlign: "center",
                            top: wp("10"),
                            right: wp("5"),
                          }}
                        ></CustomText>
                        <View
                          style={{
                            position: "absolute",
                            justifyContent: "space-around",
                            width: 25,
                            height: 25,
                            backgroundColor: "#FFF",
                            borderRadius: 99,
                            bottom: wp("2"),
                            left: wp("5"),
                          }}
                        >
                          <Foundation
                            style={{ marginLeft: 10 }}
                            name="play"
                            size={15}
                            color="#000"
                          />
                        </View>
                      </FastImage>
                    </TouchableOpacity>
                    <View style={{ marginTop: 10 }}>
                      <CustomText
                        style={{
                          marginLeft: wp("2"),
                          color: "#000",
                          fontSize: 15,
                          maxHeight: 35,
                        }}
                      >
                        {element.nome_playlist}
                      </CustomText>
                      <CustomText
                        style={{
                          marginLeft: wp("2"),
                          color: "gray",
                          fontSize: 10,
                          maxHeight: 20,
                        }}
                      >
                        {element.descricao_playlist}
                      </CustomText>
                    </View>
                  </View>
                </View>
              )
            );
          })}
          {
            //((Object.keys(array).length - 1) == index) &&
            (Object.keys(array).length - 1) % 2 == 0 &&
            Object.keys(array).length <= quantidade ? (
              <>
                <View
                  style={{
                    //backgroundColor: '#000',
                    width: wp("40"),
                    height: wp("40"),
                    marginBottom: 60,
                  }}
                />
              </>
            ) : (
              <></>
            )
          }
        </View>
      </View>
    </>
  );
};
export default CardHome;
