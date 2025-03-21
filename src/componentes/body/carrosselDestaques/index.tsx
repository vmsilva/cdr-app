import React, { useMemo } from "react";
import { View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// componentes
import CarrosselCards, { SLIDER_WIDTH, ITEM_WIDTH } from "./carrosselCards";

const CarrosselDestaques: React.FC<any> = ({ array }) => {
  const CARROSSELLMEMO = useMemo(() => {
    if (!array) {
      return;
    }

    return (
      <Carousel
        panGestureHandlerProps={{ activeOffsetX: [-10, 10] }}
        loop={array.length > 1 ? true : false}
        width={SLIDER_WIDTH}
        maxScrollDistancePerSwipe={SLIDER_WIDTH}
        windowSize={3}
        autoPlay={true}
        data={array}
        autoPlayInterval={2500}
        scrollAnimationDuration={1000}
        modeConfig={{
          parallaxScrollingScale: 0.94,
          parallaxScrollingOffset: 50,
        }}
        renderItem={({ item, index }) => {
          return (
            <>
              <CarrosselCards array={item} />
            </>
          );
        }}
        mode="parallax"
      />
    );
  }, [array]);

  return (
    <View
      style={[
        {
          marginTop: hp("10.5"),
          height: hp("60"),
        },
      ]}
    >
      {CARROSSELLMEMO}
    </View>
  );
};
export default CarrosselDestaques;
