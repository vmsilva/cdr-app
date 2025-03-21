import React, { ReactNode, useState } from "react";
import {
  ImageStyle,
  View,
  Image,
} from "react-native";

type CustomImageProps = {
  source: any;
  style?: ImageStyle | ImageStyle[];
  numberOfLines?: any;
  children: ReactNode;
};

const CustomImage: React.FunctionComponent<CustomImageProps> = ({
  children,
  style,
  source,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <Image
        onLoadStart={() => {
          setIsLoading(true);
        }}
        onLoad={() => setIsLoading(false)}
        style={[
          {
            zIndex: -1,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
          { ...passedStyles },
        ]}
        source={source}
      />
      {children}
    </View>
  );

};

export default CustomImage;
