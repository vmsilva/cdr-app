import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  MaterialCommunityIcons as MDCIcon,
  MaterialIcons as MDIcon,
  FontAwesome5 as FA5Icon,
  Entypo,
  FontAwesome,
  Feather,
} from "@expo/vector-icons";

// Config
import DrawerContent from "./DrawerContent";
import { CustomDefaultTheme } from "../../styles/Theme";

// Components
import CustomText from "../../../componentes/componentes/customText";

//paginas
import { UtilContext } from "../../contexts/UtilContext";
import { PlayerContext } from "../../contexts/PlayerContext";
import Configruacoes from "../../../layouts/configuracoes";
import PlayerPage from "../../../layouts/playerPage";
import BottomTabNavigatorOffline from "../tabNavigation/TabNavigatorOffline";

const DrawerNavigator = createDrawerNavigator();

const DrawerNavigatorOfflineRoutes = () => {
  const { empresa } = useContext(UtilContext);
  const { exibePlayer } = useContext(PlayerContext);

  return (
    <>
      <DrawerNavigator.Navigator
        id="PrincipalDrawerOffline"
        drawerContent={(props: any) => <DrawerContent {...props} />}
        initialRouteName="HomeDrawer"
      >
        <DrawerNavigator.Screen
          name="DownloadDrawer"
          component={BottomTabNavigatorOffline}
          options={({ navigation }) => ({
            headerShown: false,
            drawerLabel: () => (
              <CustomText
                textType={"regular"}
                style={{ color: CustomDefaultTheme.colors.textFundoEscuro }}
              >
                Home
              </CustomText>
            ),
            drawerIcon: ({ color, size }) => (
              <Entypo
                name="home"
                size={24}
                color={CustomDefaultTheme.colors.textFundoEscuro}
              />
            ),
            drawerItemStyle: {
              borderBottomColor: "#FFF",
              borderBottomWidth: 0.4,
              width: 220,
              display: Object.values(empresa).length == 0 ? "none" : "flex",
            },
          })}
        />

        <DrawerNavigator.Screen
          name="ConfiguracoesDrawer"
          component={Configruacoes}
          options={({ navigation }) => ({
            headerShown: false,
            drawerLabel: () => (
              <CustomText style={{ color: "#FFF" }}>Configurações</CustomText>
            ),
            drawerIcon: ({ color, size }) => (
              <FontAwesome name="gear" size={24} color="#FFF" />
            ),
            drawerItemStyle: {
              borderBottomColor: "#FFF",
              borderBottomWidth: 0.4,
              width: 220,
            },
          })}
        />

        <DrawerNavigator.Screen
          name="PlayerDrawer"
          component={PlayerPage}
          options={({ navigation }) => ({
            headerShown: false,
            drawerLabel: () => (
              <CustomText style={{ color: "#FFF" }}>AO VIVO</CustomText>
            ),
            drawerIcon: ({ color, size }) => <></>,
            drawerItemStyle: {
              borderBottomColor: "#FFF",
              borderBottomWidth: 0.4,
              width: 220,
              display: "none",
            },
          })}
        />
      </DrawerNavigator.Navigator>
    </>
  );
};

export default DrawerNavigatorOfflineRoutes;
