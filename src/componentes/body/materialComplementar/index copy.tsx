import React from "react";
import { View, TouchableOpacity, Linking } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import CustomText from "../../componentes/customText"; // Importe o componente CustomText

import styles from "./styles";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";
import { AntDesign, Octicons } from "@expo/vector-icons";
import { openURL } from "../../../configuracoes/services/request";
import { Button } from "react-native-paper";

const MaterialComplementar: React.FC<any> = ({ array }) => {
  const handleOpenUrl = (url: string) => {
    //console.log("pressss", url); return;

    if(url == undefined){
      return;
    }
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      {array.map((_, index) => {
        return (
          <View
            key={_.file}
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
              borderBottomWidth: 0.4,
              padding: 5,
              //borderRadius: 20,
            }}
          >
            <View
              style={{
                width: '100%',
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Octicons
                size={25}
                color={CustomDefaultTheme.colors.iconsPrimaryColor}
                name="file"
                style={{ width: "10%" }}
              />
              <CustomText
                numberOfLines={5}
                style={{
                  color: CustomDefaultTheme.colors.apresentadorFont,
                  marginLeft: 10,
                  fontSize: 15,
                  width: "60%",
                }}
              >
                {_.nome}
              </CustomText>

              <TouchableOpacity onPress={() => handleOpenUrl(_.url_arquivo)}>
                <AntDesign
                  name={"download"}
                  size={20}
                  color={CustomDefaultTheme.colors.iconsPrimaryColor}
                />
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default MaterialComplementar;
