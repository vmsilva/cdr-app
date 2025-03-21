import React from "react";
import { View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import LinearGradient from "react-native-linear-gradient";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

import Styles from "./Styles";

const CardHomeShimmer: React.FC<any> = ({}) => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <>
      <View style={[Styles.container]}>
        <View style={[Styles.content]}>
          {array.map((element, index) => {
            return (
              <View key={index}>
                <View style={[Styles.item, { marginBottom: 10 }]}>
                  <ShimmerPlaceHolder
                    style={[
                      Styles.shadow,
                      Styles.shadowElevation,
                      Styles.blocoIMG,
                    ]}
                  ></ShimmerPlaceHolder>
                </View>
                <View style={{ marginTop: 10, maxWidth: 100 }}>
                  <ShimmerPlaceHolder
                    style={[
                      Styles.itemTexto,
                      {
                        marginLeft: wp("1"),
                        maxHeight: 35,
                      },
                    ]}
                  ></ShimmerPlaceHolder>
                  <ShimmerPlaceHolder
                    style={[
                      Styles.itemTexto,
                      {
                        maxHeight: 20,

                        marginTop: 2,
                      },
                    ]}
                  ></ShimmerPlaceHolder>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </>
  );
};

export default CardHomeShimmer;

/*
 <ShimmerPlaceHolder style={{ marginTop: 10 }}>
                    <CustomText
                      numberOfLines={1}
                      style={{
                        marginLeft: wp("2"),
                        color: "#000",
                        fontSize: 15,
                        maxHeight: 35,
                      }}
                    >
                      teste
                    </CustomText>
                    <CustomText
                      numberOfLines={1}
                      style={{
                        marginLeft: wp("2"),
                        color: "gray",
                        fontSize: 10,
                        maxHeight: 20,
                      }}
                    >
                      teste
                    </CustomText>
                  </ShimmerPlaceHolder>
*/
