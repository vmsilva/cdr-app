import React, { useEffect } from "react";
import { Dimensions, Platform, View } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

// config
import styles from "./Styles";

export const SLIDER_WIDTH = Dimensions.get("window").width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const CarrosselCards: React.FC<any> = ({}) => {
  useEffect(() => {}, []);

  return (
    <View
      style={
        Platform.OS == "android" ? styles.containerAndroid : styles.container
      }
    >
      <ShimmerPlaceHolder
        style={[styles.circulo, { marginBottom: 10 }]}
        //visible={true}
      />
    </View>
  );
};

export default CarrosselCards;
