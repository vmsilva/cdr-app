import React, { useImperativeHandle, useRef } from "react";
import { TextStyle, Text } from "react-native";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

type CustomTextProps = {
  textType?:
    | "regular"
    | "bold"
    | "extraBold"
    | "light"
    | "medium"
    | "regularCondensed"
    | "mediumCondensed"
    | "boldCondensed"
    | "lightCondensed"
    | "soraLight"
    | "soraExtraBold"
    | "soraMedium"
    | "soraBold"
    | "soraRegular"
    | "proximaNovaBlack"
    | "proximaNovaBold"
    | "proximaNovaExtraBold"
    | "proximaNovaLight"
    | "proximaNovaRegular"
    | "proximaNovaSemiBold"
    | "proximaNovaThin"
    | "montserratBlack"
    | "montserratBlackItalic"
    | "montserratBold"
    | "montserratExtraBold"
    | "montserratBoldItalic"
    | "montserratExtraBoldItalic"
    | "montserratExtraLight"
    | "montserratExtraLightItalic"
    | "montserratItalic"
    | "montserratLight"
    | "montserratLightItalic"
    | "montserratMedium"
    | "montserratMediumItalic"
    | "montserratRegular"
    | "montserratSemiBold"
    | "montserratSemiBoldItalic"
    | "montserratThin"
    | "montserratThinItalic";
  style?: TextStyle | TextStyle[];

  numberOfLines?: any;
};

const CustomText: React.FunctionComponent<CustomTextProps | any> = ({
  children,
  textStyle,
  style,
  textType,
  numberOfLines,
}) => {
  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  switch (textType) {
    case "regular":
      textStyle = { fontFamily: "openSansRegular" };
      break;
    case "medium":
      textStyle = { fontFamily: "openSansMedium" };
      break;
    case "extraBold":
      textStyle = { fontFamily: "openSansExtraBold" };
      break;
    case "bold":
      textStyle = { fontFamily: "openSansBold" };
      break;
    case "light":
      textStyle = { fontFamily: "openSansLight" };
      break;
    case "regularCondensed":
      textStyle = { fontFamily: "openSansRegularCondensed" };
      break;
    case "mediumCondensed":
      textStyle = { fontFamily: "openSansMediumCondensed" };
      break;
    case "boldCondensed":
      textStyle = { fontFamily: "openSansBoldCondensed" };
      break;
    case "lightCondensed":
      textStyle = { fontFamily: "openSansLightCondensed" };
      break;
    case "soraLight":
      textStyle = { fontFamily: "soraLight" };
      break;
    case "soraExtraBold":
      textStyle = { fontFamily: "soraExtraBold" };
      break;
    case "soraMedium":
      textStyle = { fontFamily: "soraMedium" };
      break;
    case "soraBold":
      textStyle = { fontFamily: "soraBold" };
      break;
    case "soraRegular":
      textStyle = { fontFamily: "soraRegular" };
      break;
    case "proximaNovaThin":
      textStyle = { fontFamily: "proximaNovaThin" };
      break;
    case "proximaNovaSemiBold":
      textStyle = { fontFamily: "proximaNovaSemiBold" };
      break;
    case "proximaNovaRegular":
      textStyle = { fontFamily: "proximaNovaRegular" };
      break;
    case "proximaNovaLight":
      textStyle = { fontFamily: "proximaNovaLight" };
      break;
    case "proximaNovaExtraBold":
      textStyle = { fontFamily: "proximaNovaExtraBold" };
      break;
    case "proximaNovaBold":
      textStyle = { fontFamily: "proximaNovaBold" };
      break;
    case "proximaNovaBlack":
      textStyle = { fontFamily: "proximaNovaBlack" };
      break;

    case "montserratBlack":
      textStyle = { fontFamily: "montserratBlack" };
      break;
    case "montserratBlackItalic":
      textStyle = { fontFamily: "montserratBlackItalic" };
      break;
    case "montserratBold":
      textStyle = { fontFamily: "montserratBold" };
      break;
    case "montserratExtraBold":
      textStyle = { fontFamily: "montserratExtraBold" };
      break;
    case "montserratBoldItalic":
      textStyle = { fontFamily: "montserratBoldItalic" };
      break;
    case "montserratExtraBoldItalic":
      textStyle = { fontFamily: "montserratExtraBoldItalic" };
      break;
    case "montserratExtraLight":
      textStyle = { fontFamily: "montserratExtraLight" };
      break;
    case "montserratExtraLightItalic":
      textStyle = { fontFamily: "montserratExtraLightItalic" };
      break;
    case "montserratItalic":
      textStyle = { fontFamily: "montserratItalic" };
      break;
    case "montserratLight":
      textStyle = { fontFamily: "montserratLight" };
      break;
    case "montserratLightItalic":
      textStyle = { fontFamily: "montserratLightItalic" };
      break;
    case "montserratMedium":
      textStyle = { fontFamily: "montserratMedium" };
      break;
    case "montserratMediumItalic":
      textStyle = { fontFamily: "montserratMediumItalic" };
      break;
    case "montserratRegular":
      textStyle = { fontFamily: "montserratRegular" };
      break;
    case "montserratSemiBold":
      textStyle = { fontFamily: "montserratSemiBold" };
      break;
    case "montserratSemiBoldItalic":
      textStyle = { fontFamily: "montserratSemiBoldItalic" };
      break;
    case "montserratThin":
      textStyle = { fontFamily: "montserratThin" };
      break;
    case "montserratThinItalic":
      textStyle = { fontFamily: "montserratThinItalic" };
      break;

    default:
      textStyle = { fontFamily: "openSansSemiBoldCondensed" };
      break;
  }


  const textElementRef = useRef<any>(null);
  /*useImperativeHandle(ref, () => ({
    focus() {
      textElementRef.current.focus();
    },
  }));*/

  return (
    <Text
      //ref={textElementRef}
      numberOfLines={numberOfLines != undefined ? numberOfLines : 0}
      style={[
        { color: CustomDefaultTheme.colors.fontPrimaria },
        textStyle,
        { ...passedStyles },
      ]}
    >
      {children}
    </Text>
  );
};

export default CustomText;
