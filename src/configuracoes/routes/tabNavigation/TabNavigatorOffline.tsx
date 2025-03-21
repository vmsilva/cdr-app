import React, { useEffect } from "react";
import { useWindowDimensions } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { DownloadStackNavigator } from "../navigation/StackNavigator";

const Tab = createMaterialBottomTabNavigator();

import OfflinePage from "../../../layouts/offlinePage";
import {
  SIZESELECTED,
  SIZEUNSELECTED,
  STYLESVG,
  STYLETAB,
} from "./TabNavigator";
import ZoeIcone from "../../../componentes/funcionalidade/ZoeIcone";

// Tab Icon Component
const TabIcon = ({ name, focused, darkName }) => (
  <ZoeIcone
    name={focused ? name : darkName}
    width={focused ? SIZESELECTED : SIZEUNSELECTED}
    height={focused ? SIZESELECTED : SIZEUNSELECTED}
    style={STYLESVG}
  />
);

const BottomTabNavigatorOffline: React.FC = () => {
  const windowDimensions = useWindowDimensions();
  const orientation =
    windowDimensions.width > windowDimensions.height ? "landscape" : "portrait";

  useEffect(() => {
    return () => {};
  }, [orientation]);

  return (
    <Tab.Navigator
      barStyle={STYLETAB}
      shifting={false}
      initialRouteName="DownloadTab"
    >
      <Tab.Screen
        name="HomeTab"
        component={OfflinePage}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              name="icone-home"
              darkName="icone-home-dark"
              focused={focused}
            />
          ),
        }}
      />

      <Tab.Screen
        name="BuscarTab"
        component={OfflinePage}
        options={{
          tabBarLabel: "Explore",
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              name="icone-busca"
              darkName="icone-busca-dark"
              focused={focused}
            />
          ),
        }}
      />

      <Tab.Screen
        name="ExploreTab"
        component={OfflinePage}
        options={{
          tabBarLabel: "Explore",
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              name="icone-centraldeinteratividade"
              darkName="icone-centraldeinteratividade-dark"
              focused={focused}
            />
          ),
        }}
      />

      <Tab.Screen
        name="minhaListaTab"
        component={OfflinePage}
        options={{
          tabBarLabel: "Minha Lista",
          tabBarBadge: false, //Object.values(podcast).length, //aoVivoBadge > 0 ? aoVivoBadge : false,
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              name="icone-bookmark"
              darkName="icone-bookmark-dark"
              focused={focused}
            />
          ),
        }}
      />

      <Tab.Screen
        name="DownloadTab"
        component={DownloadStackNavigator}
        options={{
          tabBarLabel: "Downloads",
          tabBarBadge: false, //Object.values(podcast).length, //aoVivoBadge > 0 ? aoVivoBadge : false,
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              name="icone-download"
              darkName="icone-download-dark"
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigatorOffline;
