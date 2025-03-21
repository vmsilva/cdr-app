import React, { useContext } from "react";
import { View, Dimensions, Platform, TouchableOpacity } from "react-native";

// Components

// config
import styles from "./Styles";
import stylesTablet from "./StylesTablet";
import LinearGradient from "react-native-linear-gradient";
import { UtilContext } from "../../../../configuracoes/contexts/UtilContext";

export const SLIDER_WIDTH = Dimensions.get("window").width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.65);
export const ITEM_WIDTH_TABLET = Math.round(SLIDER_WIDTH * 0.89);




const CarrosselCards: React.FC<any> = ({ array }) => {
  const { isTablet } = useContext(UtilContext);

  return (
    <View
      style={
        isTablet
          ? Platform.OS == "android"
            ? stylesTablet.containerAndroid
            : stylesTablet.container
          : Platform.OS == "android"
          ? styles.containerAndroid
          : styles.container
      }
    >
      <View>
        <>
          
        </>
      </View>
    </View>
  );
};

export default CarrosselCards;
