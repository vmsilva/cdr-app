import React, { ReactNode, useContext } from "react";
import { View, Style, TouchableOpacity, Platform } from "react-native";
import Animated from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

// Config
import styles from "./styles";
import StylesHeaderDashboard from "../../layouts/dashboard/Styles";

// Imagens
import { CustomDefaultTheme } from "../../configuracoes/styles/Theme";
import CustomText from "../componentes/customText";
import { FontAwesome } from "@expo/vector-icons";
import { UtilContext } from "../../configuracoes/contexts/UtilContext";
import LinearGradient from "react-native-linear-gradient";

interface PageHeaderProps {
  headerLeft: ReactNode;
  headerRight: ReactNode;
  nomePaginaAnterior: string;
  titulo: string;
  paginaAnterior: string;
  style: Style;
  isLinear: boolean;
  showBarLinear: boolean;
  backgroundTransparent: boolean;
}

const PageHeaderPlayerPage: React.FC<PageHeaderProps | any> = ({
  headerRight,
  headerLeft,
  style,
  titulo,
  isLinear,
  showBarLinear,
  backgroundTransparent
}) => {
  const navigation = useNavigation() as any;
  const { isTablet } = useContext(UtilContext);

  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  return (
    <>
      <Animated.View
        style={[
          styles.container,
          { ...passedStyles, color: CustomDefaultTheme.colors.background },
        ]}
      >
        {isLinear && (
          <LinearGradient
            style={styles.LinearContentTop}
            start={{ x: 0, y: 0 }}
            end={{
              x: 0,
              y: Platform.OS == "ios" ? .8 : 0.8,
            }}
            colors={[
              CustomDefaultTheme.colors.background,
              CustomDefaultTheme.colors.background,
              'transparent'
            ]}
          ></LinearGradient>
        )}
        <View style={[styles.topBar,{ backgroundColor: (backgroundTransparent !== undefined && backgroundTransparent)  ? CustomDefaultTheme.colors.background : 'transparent' }]}>
          <View style={StylesHeaderDashboard.headerBloco}>
            <View style={[styles.cornerschild]}>{headerLeft}</View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: wp("70"),
              }}
            >
              <CustomText
                style={{
                  fontSize: 20,
                  color: backgroundTransparent ? CustomDefaultTheme.colors.textFundoClaro : CustomDefaultTheme.colors.textFundoEscuro
                }}
              >
                {
                  (titulo != undefined && titulo != '') && titulo.slice(0, 20)
                }
              </CustomText>
            </View>

            <View style={[styles.cornerschild, {right: 15}]}>
              {headerRight}
              <TouchableOpacity
                onPress={() => navigation.toggleDrawer()}
                style={{
                  marginRight: 20,
                  display: showBarLinear == true ? 'flex': 'none'
                }}
              >
                <FontAwesome
                  name="bars"
                  size={isTablet ? 30 : 26}
                  color={CustomDefaultTheme.colors.iconsPrimaryColor}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.View>
    </>
  );
};

export default PageHeaderPlayerPage;
