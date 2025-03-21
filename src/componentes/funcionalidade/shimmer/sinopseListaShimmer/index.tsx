import React from "react";
import { View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import LinearGradient from "react-native-linear-gradient";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

import styles from "./styles";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

const SinopseListaShimmer: React.FC = () => {
  const array = [1, 2, 3, 4, 5];

  return (
    <>
      {array.map((_, i) => {
        return (
          <View key={i} style={[styles.container]}>
            <View style={[styles.textContainer, {}]}>
              <ShimmerPlaceHolder style={{ width: "70%", color: "#707070" }} />
              <ShimmerPlaceHolder
                style={{ width: "100%", marginTop: 1, color: "#707070" }}
              />
            </View>
            <ShimmerPlaceHolder
              style={{
                width: 30,
                height: 30,
              }}
            >
              <AntDesign
                name="play"
                size={30}
                color={CustomDefaultTheme.colors.primary}
                style={{}}
              />
            </ShimmerPlaceHolder>
          </View>
        );
      })}
    </>
  );
};

export default SinopseListaShimmer;
