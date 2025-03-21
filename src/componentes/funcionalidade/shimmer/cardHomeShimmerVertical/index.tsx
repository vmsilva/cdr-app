import React from "react";
import { ScrollView, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import LinearGradient from "react-native-linear-gradient";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

import styles from "./Styles";
import { CustomDefaultTheme } from "../../../../configuracoes/styles/Theme";
import { CONFIG } from "../../../../configuracoes/utils/constants/config";

const CardHomeShimmerVertical: React.FC<any> = ({}) => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <>
      <View style={styles.container}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {array != undefined &&
            array.map((_: any, i: any) => {
              return (
                <View key={i}>
                  <View style={styles.thumbContent}>
                    <ShimmerPlaceHolder
                      //location={[0.9, 0.5, 0.8]}
                      location={CONFIG[0].location}
                      shimmerColors={['transparent', 'transparent',  CustomDefaultTheme.colors.cinzaSecundario]}
                      style={styles.imgThumbContent}
                    ></ShimmerPlaceHolder>
                  </View>
                </View>
              );
            })}
        </ScrollView>
      </View>
    </>
  );
};

export default CardHomeShimmerVertical;
