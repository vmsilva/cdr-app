import React, { useContext } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { View, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// component
import PageHeader from "../../componentes/header";
import { UtilContext } from "../../configuracoes/contexts/UtilContext";

import CustomText from "../../componentes/componentes/customText";
import { CustomDefaultTheme } from "../../configuracoes/styles/Theme";

const OfflinePage: React.FC<any> = (props) => {

  const COMPONENTEHEADER = () => {
    return (
      <PageHeader
        backgroundTransparent={true}
        headerLeft={
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}
          >
            <View
              style={{
                backgroundColor: "#0000006b",
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                borderRadius: 199,
                paddingRight: 3,
              }}
            >
              <FontAwesome name="angle-left" size={27} color={CustomDefaultTheme.colors.branco} />
            </View>
          </TouchableOpacity>
        }
        titulo={""}
        headerRight={
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                right: 10,
                marginRight: 10,
              }}
            ></View>
            <View
              style={{
                right: 0,
                marginTop: -5,
              }}
            ></View>
          </View>
        }
      />
    );
  };

  return (
    <>
      <COMPONENTEHEADER />

      <View
        style={{
          height: hp("100"),
          backgroundColor: "transparent",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <View
          style={{
            width: wp("100"),
            padding: "20%",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            flex: 1,
          }}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <LottieView
              //source={require("../../../assets/lottie/error_cat.json")}
              source={require("../../assets/lottie/error_cat.json")}
              colorFilters={[
                {
                  keypath: "button",
                  color: "#F00000",
                },
                {
                  keypath: "Sending Loader",
                  color: "#F00000",
                },
              ]}
              autoPlay
              loop
              style={{
                width: 300,
                height: 300,
              }}
            />
            <CustomText style={{}}>
              Seu Dispositivo se encontra offline
            </CustomText>
          </View>
        </View>
      </View>
    </>
  );
};

export default OfflinePage;
