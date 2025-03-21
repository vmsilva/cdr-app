/**
 * Inspiration: https://dribbble.com/shots/8257559-Movie-2-0
 *
 */
import React, { useState } from "react";
import { View, Dimensions, Platform } from "react-native";
import Carousel, { getInputRangeFromIndexes } from "react-native-snap-carousel";
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

// componentes
import CarrosselCards, { SLIDER_WIDTH, ITEM_WIDTH } from "./carrosselCards";

//configuracoes
import styles from "./Styles";

interface CircularListProps {
  array: any;
}

const { width, height } = Dimensions.get("window");

const SPACING = 2;
const ITEM_SIZE = Platform.OS === "ios" ? width * 0.3 : width * 0.32;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;

//ProgramacaoDrawer
const CarrossselCircularListShimmer: React.FC<any> = ({ array }) => {

  const isCarousel = React.useRef(null);
  const [movies, setMovies] = React.useState([0,1,2,3,4,5,6]);

  React.useEffect(() => {
  }, [array, movies, isCarousel]);

  function stackScrollInterpolator(index, carouselProps) {
    const range = [3, 1, 0, -1, -3];
    const inputRange = getInputRangeFromIndexes(range, index, carouselProps);
    const outputRange = range;
    return { inputRange, outputRange };
  }

  function stackAnimatedStyles(index, animatedValue, carouselProps) {
    return {
      opacity: animatedValue.interpolate({
        inputRange: [-3, -1, 0, 1, 3],
        outputRange: [0.9, 0.9, 1, 0.9, 0.9],
      }),
      transform: [
        {
          translateY: animatedValue.interpolate({
            inputRange: [-2, -1, 0, 1, 2],
            outputRange: [60, 30, 0, 30, 60],
            extrapolate: "clamp",
          }),
        },
      ],
    };
  }

  const ComponenteTitulo = () => {
    return (
      <View style={[styles.blocoAgora]}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
        <ShimmerPlaceHolder
          style={{
            borderRadius: 10,
            padding: 5,
            minHeight: 20,
            width: 200, // Ajuste o valor de largura conforme necessário
          }}
          //visible={true}
        />
         <ShimmerPlaceHolder
          style={{
            padding: 5,
            minHeight: 20,
            width: 150, // Ajuste o valor de largura conforme necessário
          }}
          //visible={true}
        ></ShimmerPlaceHolder>
        </View>
      </View>
    );
  };

  return (
    <View
      style={[
       styles.container
      ]}
    >
      <Carousel
        loop={true}
        ref={isCarousel}
        data={movies}
        renderItem={({ item, index }) => {
          return (
            <>
              <CarrosselCards
                array={item}
                index_item={index - 3}
              />
            </>
          );
        }}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={110}
        enableMomentum={true}
        decelerationRate={"fast"}
        scrollInterpolator={stackScrollInterpolator}
        slideInterpolatedStyle={stackAnimatedStyles}
        layout={"stack"}
        layoutCardOffset={18}
      />
      <ComponenteTitulo />
    </View>
  );
};
export default CarrossselCircularListShimmer;
