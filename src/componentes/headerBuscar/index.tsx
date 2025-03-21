import React, { ReactNode, useEffect, useState } from "react";
import { View, Platform, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Searchbar } from "react-native-paper";

// CONFIGURACOES
import styles from "./styles";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { CustomDefaultTheme } from "../../configuracoes/styles/Theme";

// COMPONENTES
import CustomText from "../componentes/customText";

// IMAGEM
import LOGOHEADER from "../../assets/logo.png";

interface PageHeaderBuscarProps {
  headerLeft: ReactNode;
  headerRight: ReactNode;
  nomePaginaAnterior: string;
  titulo: string;
  paginaAnterior: string;
  termo: string;
}

const PageHeaderBuscar: React.FC<PageHeaderBuscarProps | any> = ({ termo }) => {
  const navigation = useNavigation() as any;
  const isFocused = useIsFocused();
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    termo(query);
  };

  useEffect(() => {
    if (isFocused) {
    }
  }, [searchQuery]);

  return (
    <>
      <Animated.View style={[styles.container]}>
        <View style={styles.topBar}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              width: wp("100%"),
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 10,
            }}
          >
            <View
              style={{
                width: "12%",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <View
                  style={{
                    backgroundColor: "#0000006b",
                    width: 40,
                    height: 40,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    borderRadius: 199,
                    paddingRight: 3,
                  }}
                >
                  <FontAwesome
                    name="angle-left"
                    size={27}
                    color={CustomDefaultTheme.colors.branco}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomText
                textType="montserratBold"
                style={{
                  fontSize: 14,
                  letterSpacing: 0.21,
                  lineHeight: 18,
                  color: CustomDefaultTheme.colors.text,
                  //color: backgroundTransparent ? CustomDefaultTheme.colors.branco : CustomDefaultTheme.colors.branco
                }}
              >
                Buscar
              </CustomText>
            </View>

            <View
              style={{
                width: "12%",
              }}
            />
          </View>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: "88%",
            }}
          >
            <Searchbar
              selectionColor={CustomDefaultTheme.colors.headerBuscaTextColor}
              inputStyle={{
                color: CustomDefaultTheme.colors.headerBuscaTextColor,
              }}
              placeholderTextColor={CustomDefaultTheme.colors.iconeSearchBar}
              placeholder="O que você quer assistir?"
              //placeholderTextColor={CustomDefaultTheme.colors.branco}
              onChangeText={onChangeSearch}
              value={searchQuery}
              style={{
                backgroundColor: CustomDefaultTheme.colors.backgroundInputBusca,
                borderRadius: 30,
                color: CustomDefaultTheme.colors.preto,
              }}
              //textSyle={{color: CustomDefaultTheme.colors.primary}}
              iconColor={CustomDefaultTheme.colors.iconeSearchBar}
              icon={() => (
                <FontAwesome5
                  name="search"
                  size={15}
                  color={CustomDefaultTheme.colors.iconeSearchBar}
                />
              )}
              //theme={CustomDefaultTheme}
            />
          </View>
        </View>
      </Animated.View>
    </>
  );
};

export default PageHeaderBuscar;
