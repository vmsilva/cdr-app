import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";

/* Telas */
import Dashboard from "../../../layouts/dashboard";
import Explore from "../../../layouts/explore";
import Perfil from "../../../layouts/perfil";
import MinhaLista from "../../../layouts/minhaLista";
import Busca from "../../../layouts/busca";
import FaleConoscoPage from "../../../layouts/faleConosco";
import AoVivoPage from "../../../layouts/aoVivo";
import PlayerPage from "../../../layouts/playerPage";
import Programacao from "../../../layouts/programacao";
import DownlaodPage from "../../../layouts/download";

const Stack = createStackNavigator<any>();

const DashBoardStackNavigator: React.FC<any> = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "transparent" },
        headerTintColor: "#101010",
        headerTitleAlign: "center",
        headerTitle: () => <></>,
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="DashboardStack"
        component={Dashboard}
        options={{
          headerRight: () => (
            <Feather.Button
              name="menu"
              size={20}
              style={{ backgroundColor: "#FFF" }}
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const ExploreStackNavigator: React.FC<any> = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "transparent" },
        headerTintColor: "#101010",
        headerTitleAlign: "center",
        headerTitle: () => <></>,
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="ExploreStack"
        component={Explore}
        options={{
          headerRight: () => (
            <Feather.Button
              name="menu"
              size={20}
              style={{ backgroundColor: "#FFF" }}
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const BuscaStackNavigator: React.FC<any> = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "transparent" },
        headerTintColor: "#101010",
        headerTitleAlign: "center",
        headerTitle: () => <></>,
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="buscaHomeStack"
        component={Busca}
        options={{
          headerRight: () => (
            <Feather.Button
              name="menu"
              size={20}
              style={{ backgroundColor: "#FFF" }}
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const FaleConoscoStackNavigator: React.FC<any> = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "transparent" },
        headerTintColor: "#101010",
        headerTitleAlign: "center",
        headerTitle: () => <></>,
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="faleConoscoStack"
        component={FaleConoscoPage}
        options={{
          headerRight: () => (
            <Feather.Button
              name="menu"
              size={20}
              style={{ backgroundColor: "#FFF" }}
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const AoVivoStackNavigator: React.FC<any> = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "transparent" },
        headerTintColor: "#101010",
        headerTitleAlign: "center",
        headerTitle: () => <></>,
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="aoVivoStack"
        component={AoVivoPage}
        options={{
          headerRight: () => (
            <Feather.Button
              name="menu"
              size={20}
              style={{ backgroundColor: "#FFF" }}
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const PlayerPageStackNavigator: React.FC<any> = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "transparent" },
        headerTintColor: "#101010",
        headerTitleAlign: "center",
        headerTitle: () => <></>,
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="playerPageStack"
        component={PlayerPage}
        options={{
          headerRight: () => (
            <Feather.Button
              name="menu"
              size={20}
              style={{ backgroundColor: "#FFF" }}
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const MinhaListaStackNavigator: React.FC<any> = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "transparent" },
        headerTintColor: "#101010",
        headerTitleAlign: "center",
        headerTitle: () => <></>,
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="minhaListaStack"
        component={MinhaLista}
        options={{
          headerRight: () => (
            <Feather.Button
              name="menu"
              size={20}
              style={{ backgroundColor: "#FFF" }}
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const MinhaContaStackNavigator: React.FC<any> = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "transparent" },
        headerTintColor: "#101010",
        headerTitleAlign: "center",
        headerTitle: () => <></>,
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="minhaContaStack"
        component={Perfil}
        options={{
          headerRight: () => (
            <Feather.Button
              name="menu"
              size={20}
              style={{ backgroundColor: "#FFF" }}
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const ProgramacaoStackNavigator: React.FC<any> = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "transparent" },
        headerTintColor: "#101010",
        headerTitleAlign: "center",
        headerTitle: () => <></>,
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="programacaoStack"
        component={Programacao}
        options={{
          headerRight: () => (
            <Feather.Button
              name="menu"
              size={20}
              style={{ backgroundColor: "#FFF" }}
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const DownloadStackNavigator: React.FC<any> = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "transparent" },
        headerTintColor: "#101010",
        headerTitleAlign: "center",
        headerTitle: () => <></>,
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="downloadStack"
        component={DownlaodPage}
        options={{
          headerRight: () => (
            <Feather.Button
              name="menu"
              size={20}
              style={{ backgroundColor: "#FFF" }}
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export {
  DashBoardStackNavigator,
  ExploreStackNavigator,
  BuscaStackNavigator,
  FaleConoscoStackNavigator,
  MinhaListaStackNavigator,
  MinhaContaStackNavigator,
  AoVivoStackNavigator,
  PlayerPageStackNavigator,
  ProgramacaoStackNavigator,
  DownloadStackNavigator
};
