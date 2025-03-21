import React from "react";
import { View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

import Styles from "./Styles";
import { CustomDefaultTheme } from "../../../../configuracoes/styles/Theme";
import { CONFIG } from "../../../../configuracoes/utils/constants/config";

const CardProgramacaoShimmer: React.FC<any> = ({}) => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <>
      {array.map((_, i) => (
        <View key={i}>
          <ShimmerPlaceHolder
            style={[Styles.content]}
            location={CONFIG[0].location}
            shimmerColors={[
              "transparent",
              "transparent",
              CustomDefaultTheme.colors.cinzaSecundario,
            ]}
          ></ShimmerPlaceHolder>
          <View style={{ height: 10 }} />
        </View>
      ))}
    </>
  );
};

export default CardProgramacaoShimmer;
