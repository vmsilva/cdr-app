import React, { useContext, useEffect } from "react";
import { Platform, useWindowDimensions } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

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
import AoVivoConteudosPage from '../../../layouts/aoVivoConteudos';
import { UtilContext } from "../../contexts/UtilContext";
import { PlayerContext } from "../../contexts/PlayerContext";
import ZoeIcone from "../../../componentes/funcionalidade/ZoeIcone";

const Tab = createMaterialBottomTabNavigator();

// Constants for styles and sizes
export const STYLESVG = { bottom: 5 };
export const STYLETAB = [
  { backgroundColor: CustomDefaultTheme.colors.bottomTab, height: 80, paddingTop: 5 },
  Platform.OS === "android" && { height: 70 },
];
export const SIZEUNSELECTED = 20;
export const SIZESELECTED = 22;

// Tab Icon Component
const TabIcon = ({ name, focused, darkName }) => (
  <ZoeIcone
    name={focused ? name : darkName}
    width={focused ? SIZESELECTED : SIZEUNSELECTED}
    height={focused ? SIZESELECTED : SIZEUNSELECTED}
    style={STYLESVG}
  />
);

const BottomTabNavigator = () => {
  const { width, height } = useWindowDimensions();
  const orientation = width > height ? "landscape" : "portrait";
  const { aoVivo } = useContext(UtilContext);
  const { setIsTabRoute } = useContext(PlayerContext);

  useEffect(() => {}, [orientation]);

  return (
    <Tab.Navigator
      barStyle={STYLETAB}
      shifting={false}
      activeColor={CustomDefaultTheme.colors.textFundoEscuro}
      inactiveColor={CustomDefaultTheme.colors.textBottomunselect}
    >
      <Tab.Screen
        name="HomeTab"
        component={DashBoardStackNavigator}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon name="icone-home" darkName="icone-home-dark" focused={focused} />
          ),
        }}
        listeners={{
          focus: () => setIsTabRoute(true),
        }}
      />

      <Tab.Screen
        name="BuscarTab"
        component={BuscaStackNavigator}
        options={{
          tabBarLabel: "Buscar",
          tabBarIcon: ({ focused }) => (
            <TabIcon name="icone-busca" darkName="icone-busca-dark" focused={focused} />
          ),
        }}
      />

      <Tab.Screen
        name="ExploreTab"
        component={ExploreStackNavigator}
        options={{
          tabBarLabel: "Explore",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name="icone-centraldeinteratividade"
              darkName="icone-centraldeinteratividade-dark"
              focused={focused}
            />
          ),
        }}
        listeners={{
          focus: () => setIsTabRoute(true),
        }}
      />

      {Object.values(aoVivo).length > 0 && (
        <Tab.Screen
          name="aoVivoTab"
          component={AoVivoConteudosPage}
          options={{
            tabBarBadge: Object.values(aoVivo).length || false,
            tabBarLabel: "Agora",
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name="radio"
                size={SIZESELECTED}
                color={focused ? CustomDefaultTheme.colors.branco : color}
              />
            ),
          }}
          listeners={{
            /*focus: () => setIsTabRoute(true),
            tabPress: ({ navigation }) => navigation.navigate("MinhaContaTab"),*/
          }}
        />
      )}

      <Tab.Screen
        name="MinhaListaTab"
        component={MinhaListaStackNavigator}
        options={{
          tabBarLabel: "Minha Lista",
          tabBarIcon: ({ focused }) => (
            <TabIcon name="icone-bookmark" darkName="icone-bookmark-dark" focused={focused} />
          ),
        }}
        listeners={{
          focus: () => setIsTabRoute(true),
        }}
      />

      <Tab.Screen
        name="DownloadTab"
        component={DownloadStackNavigator}
        options={{
          tabBarLabel: "Downloads",
          tabBarIcon: ({ focused }) => (
            <TabIcon name="icone-download" darkName="icone-download-dark" focused={focused} />
          ),
        }}
        listeners={{
          focus: () => setIsTabRoute(true),
        }}
      />

      {/* Uncomment if MinhaContaTab is needed in the future */}
      {false && (
        <Tab.Screen
          name="MinhaContaTab"
          component={MinhaContaStackNavigator}
          options={{
            tabBarLabel: "Meu Perfil",
            tabBarIcon: ({ focused, color }) => (
              <FontAwesome
                name="user-circle-o"
                size={SIZESELECTED}
                color={focused ? CustomDefaultTheme.colors.branco : color}
              />
            ),
          }}
          listeners={{
            focus: () => setIsTabRoute(true),
          }}
        />
      )}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;