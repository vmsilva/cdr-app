import React, { useContext, useMemo } from "react";
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
import Carousel from "react-native-reanimated-carousel";


// componentes
import CarrosselCards, { SLIDER_WIDTH, ITEM_WIDTH } from "./carrosselCards";

//export const SLIDER_WIDTH = Dimensions.get("window").width;

const CarrosselShimmerDestaques: React.FC<any> = ({}) => {
  const { isTablet } = useContext(UtilContext);

  const CARROSSELLMEMO = () => {

    return(
      <Carousel
        panGestureHandlerProps={{ activeOffsetX: [-10, 10] }}
        loop
        width={SLIDER_WIDTH}
        maxScrollDistancePerSwipe={SLIDER_WIDTH}
        windowSize={3}
        autoPlay={true}
        data={[1,2,3]}
        autoPlayInterval={2500}
        scrollAnimationDuration={1000}
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        renderItem={({ item, index }) => {
          return (
            <>
              <View>
              <ShimmerPlaceHolder
                location={CONFIG[0].location}
                shimmerColors={['transparent', 'transparent',  CustomDefaultTheme.colors.backgroundCards]}
                  style={
                    isTablet
                      ? stylesTablet.imgCardCarrossel
                      : styles.imgCardCarrossel
                  }
                ></ShimmerPlaceHolder>
              </View>
            </>
          );
        }}
        mode="parallax"
      />
    )
  }

  return (
    <View
      style={[
        {
          marginTop: hp("10.5"),
          height: hp("60"),
        },
      ]}
    >
      <CARROSSELLMEMO />
    </View>);


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
             shimmerColors={['transparent', 'transparent',  CustomDefaultTheme.colors.backgroundCards]}
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
