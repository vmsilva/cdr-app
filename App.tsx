import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React, { useState, useCallback, useEffect } from "react";
import {
  StatusBar,
  BackHandler,
  Platform,
  PermissionsAndroid,
} from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { useKeepAwake } from "expo-keep-awake";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import {
  Ionicons,
  MaterialCommunityIcons,
  Feather,
  AntDesign,
  Entypo,
  FontAwesome,
  MaterialIcons,
  SimpleLineIcons,
  Fontisto,
  Foundation,
} from "@expo/vector-icons";
import { requestTrackingPermission } from "react-native-tracking-transparency";
//import analytics from "@react-native-firebase/analytics"; //https://rnfirebase.io/#installation-for-react-native-cli-projects
import { Dimensions } from "react-native";
import { hideNavigationBar } from "react-native-navigation-bar-color";
import OneSignal from 'react-native-onesignal';

const { width, height } = Dimensions.get("window");

// Configuracões
import {
  OrientacaoVertical,
  cacheFonts,
  getDeepLink,
} from "./src/configuracoes/utils/utils";
import { CustomDefaultTheme } from "./src/configuracoes/styles/Theme";
import NotificationsProvider from "./src/configuracoes/contexts/NotificationsContext";
import UtilProvider from "./src/configuracoes/contexts/UtilContext";
import PlayerProvider from "./src/configuracoes/contexts/PlayerContext";
import HitProvider from "./src/configuracoes/contexts/HitContext";
import AppProvider from "./src/configuracoes/hooks";
import Routes from "./src/configuracoes/routes";
import DownloadProvider from "./src/configuracoes/contexts/DownloadContext";
import CastProvider from "./src/configuracoes/contexts/CastContext";

//svgs
import SVGHOME from "./src/assets/svg/iconizer-icone-home_dark.svg";
import TESTELOGOOOO from "./src/assets/logo.png";
import ZoeIcone from "./src/componentes/funcionalidade/ZoeIcone";

const App: React.FC = (props) => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    openSansRegular: require("./src/assets/fonts/Open_Sans/static/OpenSans/OpenSans-Regular.ttf"),
    openSansMedium: require("./src/assets/fonts/Open_Sans/static/OpenSans/OpenSans-Medium.ttf"),
    openSansBold: require("./src/assets/fonts/Open_Sans/static/OpenSans/OpenSans-Bold.ttf"),
    openSansExtraBold: require("./src/assets/fonts/Open_Sans/static/OpenSans/OpenSans-ExtraBold.ttf"),
    openSansLight: require("./src/assets/fonts/Open_Sans/static/OpenSans/OpenSans-Light.ttf"),
    openSansLightCondensed: require("./src/assets/fonts/Open_Sans/static/OpenSans_Condensed/OpenSans_Condensed-Italic.ttf"),
    openSansMediumCondensed: require("./src/assets/fonts/Open_Sans/static/OpenSans_Condensed/OpenSans_Condensed-Medium.ttf"),
    openSansRegularCondensed: require("./src/assets/fonts/Open_Sans/static/OpenSans_Condensed/OpenSans_Condensed-Regular.ttf"),
    openSansSemiBoldCondensed: require("./src/assets/fonts/Open_Sans/static/OpenSans_Condensed/OpenSans_Condensed-SemiBold.ttf"),
    openSansBoldCondensed: require("./src/assets/fonts/Open_Sans/static/OpenSans_Condensed/OpenSans_Condensed-Bold.ttf"),
    soraLight: require("./src/assets/fonts/Sora/static/Sora-Light.ttf"),
    soraExtraBold: require("./src/assets/fonts/Sora/static/Sora-ExtraBold.ttf"),
    soraMedium: require("./src/assets/fonts/Sora/static/Sora-Medium.ttf"),
    soraBold: require("./src/assets/fonts/Sora/static/Sora-Bold.ttf"),
    soraRegular: require("./src/assets/fonts/Sora/static/Sora-Regular.ttf"),
    // novas fontes
    proximaNovaBlack: require("./src/assets/fonts/proxima_nova/ProximaNova-Black.ttf"),
    proximaNovaBold: require("./src/assets/fonts/proxima_nova/ProximaNova-Bold.ttf"),
    proximaNovaExtraBold: require("./src/assets/fonts/proxima_nova/ProximaNova-Extrabld.ttf"),
    proximaNovaLight: require("./src/assets/fonts/proxima_nova/ProximaNova-Light.ttf"),
    proximaNovaRegular: require("./src/assets/fonts/proxima_nova/ProximaNova-Regular.ttf"),
    proximaNovaSemiBold: require("./src/assets/fonts/proxima_nova/ProximaNova-Semibold.ttf"),
    proximaNovaThin: require("./src/assets/fonts/proxima_nova/ProximaNovaT-Thin.ttf"),
    // monteserrat
    montserratBlack: require("./src/assets/fonts/montserrat/Montserrat-Black.ttf"),
    montserratBlackItalic: require("./src/assets/fonts/montserrat/Montserrat-BlackItalic.ttf"),
    montserratBold: require("./src/assets/fonts/montserrat/Montserrat-Bold.ttf"),
    montserratBoldItalic: require("./src/assets/fonts/montserrat/Montserrat-BoldItalic.ttf"),
    montserratExtraBold: require("./src/assets/fonts/montserrat/Montserrat-ExtraBold.ttf"),
    montserratExtraBoldItalic: require("./src/assets/fonts/montserrat/Montserrat-ExtraBoldItalic.ttf"),
    montserratExtraLight: require("./src/assets/fonts/montserrat/Montserrat-ExtraLight.ttf"),
    montserratExtraLightItalic: require("./src/assets/fonts/montserrat/Montserrat-ExtraLightItalic.ttf"),
    montserratItalic: require("./src/assets/fonts/montserrat/Montserrat-Italic.ttf"),
    montserratLight: require("./src/assets/fonts/montserrat/Montserrat-Light.ttf"),
    montserratLightItalic: require("./src/assets/fonts/montserrat/Montserrat-LightItalic.ttf"),
    montserratMedium: require("./src/assets/fonts/montserrat/Montserrat-Medium.ttf"),
    montserratMediumItalic: require("./src/assets/fonts/montserrat/Montserrat-MediumItalic.ttf"),
    montserratRegular: require("./src/assets/fonts/montserrat/Montserrat-Regular.ttf"),
    montserratSemiBold: require("./src/assets/fonts/montserrat/Montserrat-SemiBold.ttf"),
    montserratSemiBoldItalic: require("./src/assets/fonts/montserrat/Montserrat-SemiBoldItalic.ttf"),
    montserratThin: require("./src/assets/fonts/montserrat/Montserrat-Thin.ttf"),
    montserratThinItalic: require("./src/assets/fonts/montserrat/Montserrat-ThinItalic.ttf"),
  });

  //useEffect(() => {alert(`Largura: ${width}  Altura: ${height}`),[]})

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const requestPermission = async () => {
    const status = await requestTrackingPermission();
    if (status === "authorized") {
      // User granted permission
    } else {
      // User denied permission
    }
  };

  React.useEffect(() => {
    const permissaoAndroidEscreverDisco = async () => {
      if (Platform.OS == "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
      }
    };

    if (Platform.OS == "ios") requestPermission();

    permissaoAndroidEscreverDisco();
  }, []);

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);

  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        const fontAssets = cacheFonts([
          Foundation.font,
          Fontisto.font,
          //FontAwesome5.font,
          SimpleLineIcons.font,
          MaterialIcons.font,
          FontAwesome.font,
          Ionicons.font,
          MaterialCommunityIcons.font,
          Feather.font,
          AntDesign.font,
          Entypo.font,
          FontAwesome.font,
          {
            openSansRegular: require("./src/assets/fonts/Open_Sans/static/OpenSans/OpenSans-Regular.ttf"),
            openSansMedium: require("./src/assets/fonts/Open_Sans/static/OpenSans/OpenSans-Medium.ttf"),
            openSansBold: require("./src/assets/fonts/Open_Sans/static/OpenSans/OpenSans-Bold.ttf"),
            openSansExtraBold: require("./src/assets/fonts/Open_Sans/static/OpenSans/OpenSans-ExtraBold.ttf"),
            openSansLight: require("./src/assets/fonts/Open_Sans/static/OpenSans/OpenSans-Light.ttf"),
            openSansLightCondensed: require("./src/assets/fonts/Open_Sans/static/OpenSans_Condensed/OpenSans_Condensed-Italic.ttf"),
            openSansMediumCondensed: require("./src/assets/fonts/Open_Sans/static/OpenSans_Condensed/OpenSans_Condensed-Medium.ttf"),
            openSansRegularCondensed: require("./src/assets/fonts/Open_Sans/static/OpenSans_Condensed/OpenSans_Condensed-Regular.ttf"),
            openSansSemiBoldCondensed: require("./src/assets/fonts/Open_Sans/static/OpenSans_Condensed/OpenSans_Condensed-SemiBold.ttf"),
            openSansBoldCondensed: require("./src/assets/fonts/Open_Sans/static/OpenSans_Condensed/OpenSans_Condensed-Bold.ttf"),
            soraLight: require("./src/assets/fonts/Sora/static/Sora-Light.ttf"),
            soraExtraBold: require("./src/assets/fonts/Sora/static/Sora-ExtraBold.ttf"),
            soraMedium: require("./src/assets/fonts/Sora/static/Sora-Medium.ttf"),
            soraBold: require("./src/assets/fonts/Sora/static/Sora-Bold.ttf"),
            soraRegular: require("./src/assets/fonts/Sora/static/Sora-Regular.ttf"),
          },
        ]);

        await Promise.all([...fontAssets]);

        console.log("foi fonts e ");
      } catch (e) {
        // You might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setAppIsReady(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  React.useEffect(() => {
    OrientacaoVertical();
  }, []);

  useEffect(() => {
    const fetchDeviceId = async () => {
      try {
        const deviceState = await OneSignal.getDeviceState();
        if (deviceState && deviceState.userId) {
          console.log('OneSignal ID do dispositivo:', deviceState.userId);
          // Aqui você pode enviar o deviceState.userId para o seu backend, se necessário
        } else {
          console.log('OneSignal ID não disponível.');
        }
      } catch (error) {
        console.error('Erro ao obter o OneSignal ID:', error);
      }
    };

    fetchDeviceId();
  }, []);

  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();

  useKeepAwake();
  useEffect(() => {
    hideNavigationBar();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={CustomDefaultTheme}>
        <SafeAreaProvider>
          <AppProvider>
            <NotificationsProvider>
              <CastProvider>
                <DownloadProvider>
                  <UtilProvider>
                    <PlayerProvider>
                      <HitProvider>
                        <NavigationContainer
                          linking={{ prefixes: [getDeepLink()] }}
                          theme={CustomDefaultTheme}
                          ref={navigationRef}
                          onReady={() => {
                            // routeNameRef.current = navigationRef.current.getCurrentRoute().name;
                          }}
                          onStateChange={async () => {/*
                            const previousRouteName = routeNameRef.current;
                            const currentRouteName = navigationRef.current.getCurrentRoute()
                              .name;

                            if (previousRouteName !== currentRouteName) {
                              console.log(currentRouteName, "testseeeee");
                              await analytics().logScreenView({
                                screen_name: currentRouteName,
                                screen_class: currentRouteName,
                              });
                            }
                            routeNameRef.current = currentRouteName;
                          */}}
                        >
                          <StatusBar
                            barStyle="dark-content"
                            //translucent
                            translucent
                            backgroundColor={"transparent"}
                          />

                          <Routes />
                        </NavigationContainer>
                      </HitProvider>
                    </PlayerProvider>
                  </UtilProvider>
                </DownloadProvider>
              </CastProvider>
            </NotificationsProvider>
          </AppProvider>
        </SafeAreaProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
};

export default App;
