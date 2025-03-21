import React, { useState, createContext, useLayoutEffect } from "react";
import { Platform } from "react-native";

import api from "../services/api";
import zoeAnalyticsApi from "../services/zoeAnalyticsApi";
import DeviceInfo from "react-native-device-info";
import { postData } from "../services/request";
import { useAuth } from "../hooks/auth";
import { EMPRESA } from "../utils/constants";

interface HitProps {
  children: any;
}

type HitData = {
  click: any;
  setClick: any;
};

export const HitContext = createContext({} as HitData);

function HitProvider({ children }: HitProps): JSX.Element {
  const TIMER = 1000;
  const PACOTE =
    Platform.OS == "ios"
      ? `${EMPRESA.EMPRESA.uriScheme}.ios`
      : `${EMPRESA.EMPRESA.uriScheme}.android`;
  const version = DeviceInfo.getVersion();
  const { user } = useAuth();
  const [click, setClick] = useState([]);

  useLayoutEffect(() => {
    pixelZoePlay();
    return () => {};
  }, [click]);

  const pixelZoePlay = async () => {
    try {
      const inicio = performance.now();
      const response = await zoeAnalyticsApi.post("/hit/?app", {
        from: PACOTE,
        version: version,
      });

      if(user){
        let params = {
          rota: "/acessos/ping",
          parametros: {
            token: user.token,
            os: Platform.OS
          },
          showNotification: false,
          showLogError: false,
        }
        //console.log(params)
        await postData(params) as any;
      }
      
     
      const fim = performance.now();
      const tempoDecorrido = (fim - inicio) as any;

      //console.log( `Tempo de processo async request /hit/?app  && /acessos/ping --> ${parseInt(tempoDecorrido)}ms`);
    } catch (error) {
      console.log("analytics zoe", error);
    }
    setTimeout(() => {
      pixelZoePlay();
    }, TIMER * 60);
  };

  const hit = async () => {
    try {
      let id = DeviceInfo.getUniqueId();
      const response = await api.post("hit/", {
        device_id: id,
      });

      console.log("hit")
    } catch (error) {
      console.log(error, "erro hit");
    }

    setTimeout(() => {
      hit();
    }, 45000);
  };

  return (
    <HitContext.Provider
      value={{
        click,
        setClick,
      }}
    >
      {children}
    </HitContext.Provider>
  );
}

export default HitProvider;
