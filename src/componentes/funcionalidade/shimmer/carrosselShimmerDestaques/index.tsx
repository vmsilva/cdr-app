import React, { useContext } from "react";
import { Platform, View, Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import LinearGradient from "react-native-linear-gradient";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

import styles from "./Styles";
import stylesTablet from "./StylesTablet";
import { UtilContext } from "../../../../configuracoes/contexts/UtilContext";
import { CustomDefaultTheme } from "../../../../configuracoes/styles/Theme";
import { CONFIG } from "../../../../configuracoes/utils/constants/config";

export const SLIDER_WIDTH = Dimensions.get("window").width;

const CarrosselShimmerDestaques: React.FC<any> = ({}) => {
  const { isTablet } = useContext(UtilContext);
  return (
    <>
      <View
        style={[
          {
            width: SLIDER_WIDTH,
            marginTop: hp("13.5"),
            height: hp("60"),
          },
        ]}
      >
        <View
          style={[
            isTablet
              ? Platform.OS == "android"
                ? stylesTablet.containerAndroid
                : stylesTablet.container
              : Platform.OS == "android"
              ? styles.containerAndroid
              : styles.container,{ width: wp("89"), justfyContent:'center', alignItems: 'center' }
          ]}
        >
          <>
            <ShimmerPlaceHolder
            location={CONFIG[0].location}
             shimmerColors={['transparent', 'transparent',  CustomDefaultTheme.colors.cinzaSecundario]}
              style={
                isTablet
                  ? stylesTablet.imgCardCarrossel
                  : styles.imgCardCarrossel
              }
            ></ShimmerPlaceHolder>
          </>
        </View>
      </View>
    </>
  );
};

export default CarrosselShimmerDestaques;
