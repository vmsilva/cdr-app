import React from "react";
import { View, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import LinearGradient from "react-native-linear-gradient";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

// Config
import styles from "./styles";
import { CONFIG } from "../../../../configuracoes/utils/constants/config";
import { CustomDefaultTheme } from "../../../../configuracoes/styles/Theme";

const HeaderScrollShimmer: React.FC<any> = ({}) => {
  return (
    <>
      <View
        style={{
          paddingLeft: wp("14"),
          paddingRight: wp("12"),
          flexDirection: "row",
        }}
      >
        <ShimmerPlaceHolder
          location={CONFIG[0].location}
          shimmerColors={[
            "transparent",
            "transparent",
            CustomDefaultTheme.colors.cinzaSecundario,
          ]}
          style={{
            fontSize: 17,
            width: wp("45"),
            maxHeight: 50,
            left: wp("-10"),
            backgroundColor: CustomDefaultTheme.colors.backgroundCards
          }}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            right: wp("-10"),
          }}
        />
      </View>
    </>
  );
};

export default HeaderScrollShimmer;
