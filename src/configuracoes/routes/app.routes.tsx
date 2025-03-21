import React, { useState, useEffect, useContext, useCallback } from "react";
import { DeviceEventEmitter, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NetInfo from "@react-native-community/netinfo";
import DrawerNavigation from "./drawerNavigation/DrawerNavigation";
import DrawerNavigatorOfflineRoutes from "./drawerNavigation/DrawerNavigationOffline";
import PlayerPage from "../../layouts/playerPage";
import Buscar from "../../layouts/busca";
import PlayerSlider from "../../componentes/audioPlayer/playerSlider";
import { UtilContext } from "../contexts/UtilContext";
import { ExibePushNotificationLocal } from "../utils/notification";
import { useAuth } from "../hooks/auth";
import { getData, postData } from "../services/request";
import { setupPlayer } from "../../../trackPlayerServices";
import { PlayerContext } from "../contexts/PlayerContext";

const Stack = createStackNavigator();

const AppRoutes = () => {
  const [statusRede, setStatusRede] = useState(false);
  const navigation = useNavigation() as any;
  const {
    setMinhaLista,
    setPip,
    setAoVivo,
    setBase,
    setReload,
  } = useContext(UtilContext);
  const { exibePlayer, tab } = useContext(PlayerContext);
  const { user, cliente } = useAuth();
  const [isConnected, setIsConnected] = useState(true);

  const buscaMinhaLista = useCallback(async () => {
    try {
      const parametros = {
        rota: "/minhalista",
        parametros: `token=${user.token}`,
        showNotification: false,
        showLogError: true,
      };
      const response = (await getData(parametros)) as any;
      setMinhaLista(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }, [cliente]);

  const buscaAoVivo = async () => {
    try {
      const parametrosBase = {
        rota: "/base/",
        parametros: {
          cod_cliente: cliente.cod_cliente,
        },
        showNotification: false,
        showLogError: true,
        showLog: true,
      };
      const responseHomeBase = await postData(parametrosBase);

      const parametros = {
        rota: "/salas",
        parametros: {
          token_cliente: user.token,
          token: user.token,
        },
        showNotification: false,
        showLogError: true,
      };
      const response = await postData(parametros);

      setAoVivo(response.data.data);
      setBase(responseHomeBase.data.data);
    } catch (error) {
      console.log(error, "ao vivo erro");
    }
  };

  useEffect(() => {
    if (cliente.layout) {
      buscaMinhaLista();
      buscaAoVivo();
      navigation.navigate("HomeDrawer");
    }
  }, [cliente]);

  //PIP MOD
  useEffect(() => {
    let subscription;
    let subscription2;
    if (Platform.OS == "android") {
      subscription = DeviceEventEmitter.addListener(
        "PiPClosed",
        (eventData) => {
          console.log("PiP foi fechado victorrrrr:", eventData);
          if (eventData) {
            setPip(false);
          } else {
            console.log("naoooooo");
          }
          // Faça o que for necessário com os dados recebidos
        }
      );
      subscription2 = DeviceEventEmitter.addListener(
        "PipSizeChanged",
        (event) => {
          const { width, height } = event;
          console.log("PiP tamanho alteradoooo:");

          // Faça o que for necessário com os dados recebidos
        }
      );
    }

    return () => {
      if (Platform.OS == "android") {
        subscription.remove();
        subscription2.remove();
      }
    };
  }, []);
  //PIP MOD

  const verificaOnline = async () => {
   try{
    await NetInfo.addEventListener((state) => {
      setStatusRede(!state.isConnected);
      //setStatusOffLine(!state.isConnected)
    });
   }catch(error){
    console.log(error)
   }
  };

  useEffect(() => {
    verificaOnline();
  }, [statusRede]);

  useEffect(() => {
    if (!statusRede) {
      setReload(true);
    }
  }, [statusRede]);

  useEffect(() => {
    async function setup() {
      try {
        await setupPlayer();
      } catch (error) {
        console.log(error, "--> setupplayer");
      }
    }
    setup();
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log(state.isConnected);
      setIsConnected(state.isConnected);
      if (!state.isConnected) {
        ExibePushNotificationLocal({
          title: "Sem Rede",
          body:
            "Você está offline, por favor conecte-se à rede para aproveitar o melhor do nosso app.",
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      {statusRede ? (
        <Stack.Navigator>
          <Stack.Screen
            name="DrawerNavigator"
            component={DrawerNavigatorOfflineRoutes}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BuscarNavigatorStack"
            component={Buscar}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PlayerDrawer"
            component={PlayerPage}
            options={{ headerShown: false, gestureEnabled: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="DrawerNavigator"
            component={DrawerNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BuscarNavigatorStack"
            component={Buscar}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PlayerDrawer"
            component={PlayerPage}
            options={{ headerShown: false, gestureEnabled: false }}
          />
        </Stack.Navigator>
      )}
      {exibePlayer && <PlayerSlider tab={tab} />}
    </>
  );
};

export default AppRoutes;
