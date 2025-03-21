import React from "react";
import { View, Image } from "react-native";

//Config
import Styles from "./styles";
import CustomText from "../../componentes/customText";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";
import { ActivityIndicator } from "react-native-paper";

const ItemDownloading: React.FC<any> = ({ item, progresso }) => {
  return (
    <View style={[Styles.itemVideo]}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Image
            style={{
              marginLeft: 20,
              width: 80,
              height: 45,
            }}
            source={{ uri: item.url_thumb_video }}
          />
          <View
            style={{
              width: "64%",
            }}
          >
            <CustomText numberOfLines={1} style={{ marginLeft: 5 }}>
              {item.titulo_video}
            </CustomText>
            <CustomText numberOfLines={1} style={{ marginLeft: 5 }}>
              {item.descricao_video}
            </CustomText>
          </View>
          <View>

           { 
            progresso == 0 ?
            <ActivityIndicator size={30} color={CustomDefaultTheme.colors.iconsPrimaryColor} />
            :
            <AnimatedCircularProgress
              size={30}
              width={3}
              fill={parseInt(progresso)}
              tintColor={CustomDefaultTheme.colors.iconsPrimaryColor}
              backgroundColor="#FFF"
            >
              {(fill) => (
                <CustomText
                  style={{
                    fontSize: 10,
                  }}
                >
                  {progresso}%
                </CustomText>
              )}
            </AnimatedCircularProgress>
            }
          </View>
        </View>
      </View>
    </View>
  );
};

export default ItemDownloading;
