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
          <TouchableOpacity
            onPress={() => handleOpenUrl(_.url != undefined ? _.url : _.url_arquivo)}
          >
            <View
              key={_.file}
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
                borderBottomWidth: 0,
                padding: 10,
                borderRadius: 10,
                backgroundColor: CustomDefaultTheme.colors.backgroundMaterialComplementar,
              }}
            >
              <View
                style={{
                  width: '100%',
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <View
                  style={{
                    width: '87%',
                    flexDirection: 'row',
                    //backgroundColor: CustomDefaultTheme.colors.vermelho,
                    alignItems: 'center'
                  }}
                >
                  <Octicons
                    size={25}
                    color={CustomDefaultTheme.colors.iconsPrimaryColor}
                    name="file"
                    //style={{ width: "10%" }}
                  />
                  <CustomText
                    textType="montserratSemiBold"
                    numberOfLines={5}
                    style={{
                      color: CustomDefaultTheme.colors.text,
                      marginLeft: 10,
                      fontSize: 14,
                    }}
                  >
                    {_.name != undefined ? _.name : _.nome}
                  </CustomText>
                </View>
                  <AntDesign
                    name={"download"}
                    size={20}
                    color={CustomDefaultTheme.colors.iconsPrimaryColor}
                  />
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default MaterialComplementar;
