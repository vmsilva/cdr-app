import React, { useContext } from "react";
import { ScrollView, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

import styles from "./Styles";
import stylesTablet from "./StylesTablet";
import { UtilContext } from "../../../../configuracoes/contexts/UtilContext";
import { CustomDefaultTheme } from "../../../../configuracoes/styles/Theme";
import { CONFIG } from "../../../../configuracoes/utils/constants/config";

const CardHomeShimmerHorizontal: React.FC<any> = ({}) => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8];
  const { isTablet } = useContext(UtilContext);
  return (
    <>
      <View style={isTablet ? stylesTablet.container : styles.container}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          removeClippedSubviews={true}
        >
          {array.length != undefined &&
            array.map((_: any, i: any) => {
              return (
                <View
                  key={i}
                  style={
                    isTablet ? stylesTablet.containerView : styles.containerView
                  }
                >
                  <View style={styles.thumbContent}>
                    <ShimmerPlaceHolder
                       location={CONFIG[0].location}
                       shimmerColors={['transparent', 'transparent',  CustomDefaultTheme.colors.cinzaSecundario]}
                      style={
                        isTablet
                          ? stylesTablet.imgThumbContent
                          : styles.imgThumbContent
                      }
                    />
                    <View
                      style={{
                        left: 7,
                        marginTop: 5,
                      }}
                    ></View>
                  </View>
                </View>
              );
            })}
        </ScrollView>
      </View>
    </>
  );
};

export default CardHomeShimmerHorizontal;
