import React, {
  ReactNode,
  useMemo,
} from "react";
import {
  View,
  Platform,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  AntDesign,
} from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import {
  ActivityIndicator,
  Button,
} from "react-native-paper";

// componentes
import styles from "./styles";

import CustomText from "../customText";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

interface PageHeaderProps {
  children: ReactNode;
  sheetRef: BottomSheetModal;
}

const screenHeight = Dimensions.get("screen").height;
const CustomBottomSheet: React.FC<PageHeaderProps | any> = ({
  sheetRef,
  children,
  snap,
  background
}) => {
  // variables
  const snapPoints = useMemo(() => snap != undefined ? snap : [1, 500], []);

  const renderHeader = () => (
    <View style={{ backgroundColor: CustomDefaultTheme.colors.background, height: 0 }}>
      {/* conteúdo do cabeçalho */}
    </View>
  );

  const COMPONENTEICONE = () => {
    return <></>;
  };

  const SLIDERBOTOESCOMPONENTE = () => {
    return (
      <>
        <View>
          <TouchableOpacity
            style={[styles.container, {}]}
            //onPress={() => sheetRef.current?.expand()}
          >
            <View
              style={{
                marginTop: Platform.OS == "ios" ? hp("1%") : hp("1%"),
                flexDirection: "row",
                justifyContent: "space-between",
                paddingLeft: 10,
                paddingRight: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    width: 40,
                  }}
                >
                  {Loading ? (
                    <ActivityIndicator size={24} color={"#FFF"} />
                  ) : (
                    <>
                      <COMPONENTEICONE />
                    </>
                  )}
                </View>
                <View
                  style={{
                    marginTop: 5,
                    marginLeft: 10,
                  }}
                ></View>
              </View>

              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={{ marginTop: 5, marginRight: 10 }}
                  onPress={() => {}}
                >
                  <AntDesign name="close" size={30} color="#FFF" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  //sheetRef.current?.collapse()

  return (
    <>
      <BottomSheet
        index={1}
        backgroundComponent={renderHeader}
        ref={sheetRef}
        snapPoints={snapPoints}
        handleIndicatorStyle={{backgroundColor: 'transparent'}}
      >
        <View
          style={{
            backgroundColor:  background != undefined ? background : CustomDefaultTheme.colors.branco,
            height: snapPoints[1],
            borderWidth: 0.1,
          }}
        >
          <Button
            onPress={() => sheetRef.current?.collapse()}
          >
            <CustomText textType="montserratLight" style={{color: CustomDefaultTheme.colors.branco}}>Fechar</CustomText>
          </Button>
          {children}
        </View>
      </BottomSheet>
    </>
  );
};

export default CustomBottomSheet;
