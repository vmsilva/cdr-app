import React from "react";
import { View, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { AntDesign, Ionicons, FontAwesome, MaterialIcons, MaterialCommunityIcons, FontAwesome6 } from "@expo/vector-icons";

// Config
import CustomText from "../componentes/customText";
import { CustomDefaultTheme } from "../../configuracoes/styles/Theme";
import styles from "./styles";

interface headerSroll {
  label: string;
  show: boolean;
  openOnSinopse: boolean;
  array: any;
  tipo:
    | "personalidade"
    | "radio"
    | "video"
    | "programas"
    | "programa"
    | "cameras";
  icon: any;
}

const HeaderScroll: React.FC<headerSroll | any> = ({
  show,
  label,
  array,
  tipo,
  openOnSinopse,
  icon,
}) => {
  const navigation = useNavigation() as any;

  const abreBuscar = () => {
    switch (tipo) {
      case "programa":
        let PAGE = openOnSinopse
          ? [
              "SinopseSerieDrawer" as string,
              { item: array, relacionados: [] } as any,
            ]
          : [
              "VejaMaisDrawer" as string,
              {
                item: array,
                tipo: tipo,
                titulo: label,
              } as any,
            ];

        navigation.navigate(PAGE[0], PAGE[1]);
        break;
      case "programas":
        navigation.navigate("VejaMaisDrawer", {
          item: array,
          tipo: tipo,
          titulo: label,
        });
        break;
    }
  };

  return (
    <>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            paddingHorizontal: "4%",
            paddingVertical: 5,
            alignItems: "center",

            //backgroundColor: '#FF0'
          }}
        >
          {icon != undefined &&
            icon != "" &&
            (icon == "podcast" ? (
              <FontAwesome
                name={icon}
                size={25}
                color={CustomDefaultTheme.colors.iconsHeaderScroll}
              />
            ) : (
              icon == "tv" ? <MaterialIcons
              name={icon}
              size={25}
              color={CustomDefaultTheme.colors.iconsHeaderScroll}
            /> :
              icon == "videocam-outline" ? 
                <Ionicons
                  name={icon}
                  size={25}
                  color={CustomDefaultTheme.colors.iconsHeaderScroll}
                />
              :
              <FontAwesome6
                name={icon}
                size={25}
                color={CustomDefaultTheme.colors.iconsHeaderScroll}
              />
            ))}
          <CustomText
            numberOfLines={3}
            textType="montserratBold"
            style={{
              width: '95%',
              letterSpacing: 0.36,
              fontSize: 16,
              left: icon != undefined && icon != "" ? wp("2") : 0,
              color: CustomDefaultTheme.colors.fontSecundaria,
            }}
          >
            {label}
          </CustomText>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "30%"
          }}
        >
          {show && (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
              onPress={abreBuscar}
            >
              <CustomText
                textType="regular"
                style={{
                  color: CustomDefaultTheme.colors.fontSecundaria,
                  paddingBottom: 4,
                  marginRight: 10,
                }}
              >
                veja mais
                <AntDesign
                  name="right"
                  size={12}
                  color={CustomDefaultTheme.colors.fontPrimaria}
                />
              </CustomText>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
};

export default HeaderScroll;
