/*
  MUITA CALMA NESSA HORA API DE CONTEXTO ALTO RISCO DE MEMORY LEAK 
  CUIDADO COM LOOP INFINITO
  REMEMBER THAT
*/
import React, { useState, createContext, useEffect } from "react";

interface PlayerProps {
  children: any;
}

type PlayerData = {
  exibePlayer: any;
  setExibePlayer: any;
  isTabRoute: any;
  setIsTabRoute: any;
  tocando: any;
  setTocando: any;
  tab: any;
  setTab: any;
};

export const PlayerContext = createContext({} as PlayerData);

function PlayerProvider({ children }: PlayerProps): JSX.Element {
  // usando essas bb
  const [exibePlayer, setExibePlayer] = useState<any>(false);
  const [isTabRoute, setIsTabRoute] = useState<any>(false);
  const [tab, setTab] = useState<any>(false);
  const [tocando, setTocando] = useState<string>("");

  useEffect(() => {}, [exibePlayer, isTabRoute]);

  return (
    <PlayerContext.Provider
      value={{
        exibePlayer,
        setExibePlayer,
        isTabRoute,
        setIsTabRoute,
        tocando,
        setTocando,
        tab,
        setTab
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export default PlayerProvider;
