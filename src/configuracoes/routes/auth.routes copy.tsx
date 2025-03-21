//import React from 'react';
import * as React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

// Config
import { useTheme } from "react-native-paper";
import { CustomDefaultTheme } from "../styles/Theme";
import { useAuth } from "../hooks/auth";

// Telas
import WebSee from "../../layouts/WebSee/index";
import WebSeeAuth from "../../layouts/WebSeeAuth/index";
import LoginPage from "../../layouts/acesso/login";
import Forgot from "../../layouts/acesso/forgot";
import Cadastrar from "../../layouts/acesso/cadastrar";
import ErrorPage from "../../layouts/acesso/errorPage";
import WebSeeInappbrowserAuth from "../../layouts/WebSeeInappbrowserAuth";

const Auth = createStackNavigator();//uriPrefix={getDeepLink()}

const AuthRoutes: React.FC = () => {
  const { colors } = useTheme();
  const { user } = useAuth();
  return (
    <Auth.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: CustomDefaultTheme.colors.primary,
          height: Platform.OS === "ios" ? 90 : 75,
        },
        headerTintColor: "#FFF",
        headerTitleAlign: "center",
        headerTitle: () => <></>,
        keyboardHandlingEnabled: false,
      }}
    >
      {/*<Auth.Screen
        name="landPageAuth"
        component={LandPage}
        options={{ headerShown: false }}
      />*/}
      <Auth.Screen
        name="loginAuth"
        component={LoginPage}
        options={{ headerShown: false }}
      />
      <Auth.Screen
        name="forgotAuth"
        component={Forgot}
        options={{ headerShown: false }}
      />
      <Auth.Screen
        name="errorPageAuth"
        component={ErrorPage}
        options={{ headerShown: false }}
      />
      <Auth.Screen
        name="cadastrarAuth"
        component={Cadastrar}
        options={{ headerShown: false }}
      />
      <Auth.Screen
        name="WebSeeAuth"
        component={WebSeeAuth}
        options={{ headerShown: false }}
      />
      <Auth.Screen
        name="WebSeeInappbrowserAuth"
        component={WebSeeInappbrowserAuth}
        options={{ headerShown: false }}
      />
      <Auth.Screen
        name="WebSee"
        component={WebSee}
        options={{ headerShown: true }}
      />
    </Auth.Navigator>
  );
};

export default AuthRoutes;
