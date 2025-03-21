import React, { useContext, useEffect } from "react";
import { Platform, useWindowDimensions } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  FontAwesome,
  Ionicons
} from "@expo/vector-icons";
import {
  DashBoardStackNavigator,
  BuscaStackNavigator,
  MinhaListaStackNavigator,
  MinhaContaStackNavigator,
  DownloadStackNavigator,
  ExploreStackNavigator,
} from "../navigation/StackNavigator";

import { CustomDefaultTheme } from "../../styles/Theme";

import AoVivoPage from "../../../layouts/aoVivo";
import { UtilContext } from "../../contexts/UtilContext";
import { PlayerContext } from "../../contexts/PlayerContext";

//SVGS
import SVGBUSCAR from "../../../assets/svg/icone-busca.svg";
import SVGBUSCARDARK from "../../../assets/svg/iconizer-icone-busca_dark.svg";
import SVGHOME from "../../../assets/svg/icone-home.svg";
import SVGHOMEDARK from "../../../assets/svg/iconizer-icone-home_dark.svg";
import SVGEXPLORE from "../../../assets/svg/icone-centraldeinteratividade.svg";
import SVGEXPLOREDARK from "../../../assets/svg/iconizer-icone-centraldeinteratividade_dark.svg";
import SVGBOOKMARK from "../../../assets/svg/icone-bookmark.svg";
import SVGBOOKMARKDARK from "../../../assets/svg/iconizer-icone-bookmark_dark.svg";
import SVGDOWNLOAD from "../../../assets/svg/icone-download.svg";
import SVGDOWNLOADDARK from "../../../assets/svg/iconizer-icone-download_dark.svg";

const Tab = createMaterialBottomTabNavigator();
export const STYLESVG = {
  bottom: 5,
};
export const STYLETAB = [
  {
    backgroundColor: CustomDefaultTheme.colors.bottomTab,
    //display: orientation == "landscape" ? "none" : "flex",
    height: 80,
    paddingTop: 5,
  },
  Platform.OS == "android" && { height: 70 },
];

export const SIZEUNSELECTED = 20;
export const SIZESELECTED = 22;

const BottomTabNavigator: React.FC = () => {
  const windowDimensions = useWindowDimensions();
  const orientation =
    windowDimensions.width > windowDimensions.height ? "landscape" : "portrait";
  const { aoVivo } = useContext(UtilContext);
  const { setIsTabRoute } = useContext(PlayerContext);

  useEffect(() => {
    return () => {};
  }, [orientation]);

  return (
    <Tab.Navigator
      barStyle={STYLETAB}
      shifting={false}
      activeColor={CustomDefaultTheme.colors.textFundoEscuro}
      inactiveColor={CustomDefaultTheme.colors.cinzaEscuro}
    >
      <Tab.Screen
        name="HomeTab"
        component={DashBoardStackNavigator}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <SVGHOME
                width={SIZESELECTED}
                height={SIZESELECTED}
                style={STYLESVG}
              />
            ) : (
              <SVGHOMEDARK
                width={SIZEUNSELECTED}
                height={SIZEUNSELECTED}
                style={STYLESVG}
              />
            ),
        }}
        listeners={({ navigation, route }) => ({
          focus: () => {
            setIsTabRoute(true);
          },
          tabPress: () => {},
        })}
      />
      <Tab.Screen
        name="BuscarTab"
        component={BuscaStackNavigator}
        options={{
          tabBarLabel: "Buscar",
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <SVGBUSCAR
                width={SIZESELECTED}
                height={SIZESELECTED}
                style={STYLESVG}
              />
            ) : (
              <SVGBUSCARDARK
                width={SIZEUNSELECTED}
                height={SIZEUNSELECTED}
                style={STYLESVG}
              />
            ),
        }}
      />

      <Tab.Screen
        name="ExploreTab"
        component={ExploreStackNavigator}
        options={{
          tabBarLabel: "Explore",
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <SVGEXPLORE
                width={SIZESELECTED}
                height={SIZESELECTED}
                style={STYLESVG}
              />
            ) : (
              <SVGEXPLOREDARK
                width={SIZEUNSELECTED}
                height={SIZEUNSELECTED}
                style={STYLESVG}
              />
            ),
        }}
        listeners={({ navigation, route }) => ({
          focus: () => {
            setIsTabRoute(true);
          },
          tabPress: () => {},
        })}
      />
      {Object.values(aoVivo).length > 0 && (
        <Tab.Screen
          name="aoVivoTab"
          component={AoVivoPage}
          options={{
            tabBarBadge:
              Object.values(aoVivo).length > 0
                ? Object.values(aoVivo).length
                : false,
            tabBarLabel: "Agora",
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name="radio"
                size={SIZESELECTED}
                color={focused ? CustomDefaultTheme.colors.branco : color}
              />
            ),
          }}
          listeners={({ navigation, route }) => ({
            focus: () => {
              setIsTabRoute(true);
            },
            tabPress: () => {
              navigation.navigate("MinhaContaTab");
            },
          })}
        />
      )}
      <Tab.Screen
        name="MinhaListaTab"
        component={MinhaListaStackNavigator}
        options={{
          tabBarLabel: "Minha Lista", //() => (<Text style={{color: '#FFF'}}>"Minha Lista"</Text>),
          tabBarBadge: false, //Object.values(podcast).length, //aoVivoBadge > 0 ? aoVivoBadge : false,
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <SVGBOOKMARK
                width={SIZESELECTED}
                height={SIZESELECTED}
                style={STYLESVG}
              />
            ) : (
              <SVGBOOKMARKDARK
                width={SIZEUNSELECTED}
                height={SIZEUNSELECTED}
                style={STYLESVG}
              />
            ),
        }}
        listeners={({ navigation, route }) => ({
          focus: () => {
            setIsTabRoute(true);
          },
          tabPress: () => {},
        })}
      />

      <Tab.Screen
        name="DownloadTab"
        component={DownloadStackNavigator}
        options={{
          tabBarLabel: "Downloads",
          tabBarBadge: false, //Object.values(podcast).length, //aoVivoBadge > 0 ? aoVivoBadge : false,
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <SVGDOWNLOAD
                width={SIZESELECTED}
                height={SIZESELECTED}
                style={STYLESVG}
              />
            ) : (
              <SVGDOWNLOADDARK
                width={SIZEUNSELECTED}
                height={SIZEUNSELECTED}
                style={STYLESVG}
              />
            ),
        }}
        listeners={({ navigation, route }) => ({
          focus: () => {
            setIsTabRoute(true);
          },
          tabPress: () => {},
        })}
      />

      {false && (
        <Tab.Screen
          name="MinhaContaTab"
          component={MinhaContaStackNavigator}
          options={{
            tabBarLabel: "Meu Perfil",
            tabBarBadge: false, //Object.values(podcast).length, //aoVivoBadge > 0 ? aoVivoBadge : false,
            tabBarIcon: ({ focused, color }) => (
              <FontAwesome
                name="user-circle-o"
                size={SIZESELECTED}
                color={focused ? CustomDefaultTheme.colors.branco : color}
              />
            ),
          }}
          listeners={({ navigation, route }) => ({
            focus: () => {
              setIsTabRoute(true);
            },
            tabPress: () => {},
          })}
        />
      )}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
