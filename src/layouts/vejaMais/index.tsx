import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";

//Componentes
import Header from "../../componentes/header";
import MosaicoVertical from "../../componentes/body/mosaicoVertical";
import MosaicoHorizontal from "../../componentes/body/mosaicoHorizontal";

const VejaMais: React.FC<any> = (props) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [data, setData] = useState<any>([]);
  const { item, tipo, titulo } = props.route.params;

  useEffect(() => {
    if (!isFocused) {
      if (data.length > 0) setData([]);
    }

    return () => {};
  }, [isFocused, data]);

  const SWITCHCOMPONENTE = (props) => {
    switch (tipo) {
      case "programas":
        return (
          <>
            <MosaicoVertical item={props.array} tipo={"programas"} />
          </>
        );
        break;
      case "programa":
        return (
          <>
            <MosaicoHorizontal
              isFullScreen={false}
              item={props.array}
              tipo="programa"
            />
          </>
        );
        break;
    }
  };

  if (!isFocused) {
    return <></>;
  }

  return (
    <>
      <Header
        headerLeft={
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{ width: 40, height: 40, bottom: 10 }}
          >
            <FontAwesome name="angle-left" size={27} color={CustomDefaultTheme.colors.branco} />
          </TouchableOpacity>
        }
        titulo={titulo}
      />
      <View style={{ marginTop: hp("5%"), flex: 1 }}>
        <SWITCHCOMPONENTE array={item} />
      </View>
    </>
  );
};

export default VejaMais;
