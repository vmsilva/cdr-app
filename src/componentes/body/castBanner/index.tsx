import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Card, Button, ActivityIndicator } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import styles from "./Styles";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";
import CustomText from "../../componentes/customText";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

interface CastBannerProps {
  item: any;
  width: any;
  height: any;
}

const CastBanner: React.FC<CastBannerProps> = ({ item, width, height }) => {
  return (
    <View
      style={{
        left: width > height && Platform.OS == "android" ? hp("-5") : 0,
        top:
          width > height
            ? hp("0%")
            : Platform.OS == "android"
            ? hp("-11.2")
            : hp("-0.1"),
        width: width > height ? width : width,
        height: width > height ? height : width,
        backgroundColor:
          width > height
            ? CustomDefaultTheme.colors.preto
            : CustomDefaultTheme.colors.background,
      }}
    >
      <View
        style={{
          height: width,
          width: height,
          zIndex: 100,
          position: "absolute",
        }}
      >
        <View
          style={{
            top: Platform.OS == "ios" ? hp("16") : wp("5%"),
            width: width,
            height: height,
            position: "absolute",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <MaterialIcons name="cast-connected" size={50} color="#FFF" />
            <CustomText style={{ textAlign: "center", fontSize: 18 }}>
              Cast conectado
            </CustomText>
          </View>
        </View>
      </View>
    </View>
  );
};
export default CastBanner;
