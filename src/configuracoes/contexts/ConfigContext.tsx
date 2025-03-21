/*
  MUITA CALMA NESSA HORA API DE CONTEXTO ALTO RISCO DE MEMORY LEAK 
  CUIDADO COM LOOP INFINITO
  REMEMBER THAT VICTOR

  1241 - the lac roquet pinto
*/
import React, { useState, createContext, useLayoutEffect } from 'react';
import { Notifier, Easing, NotifierComponents } from 'react-native-notifier';
import { EMPRESA } from '../utils/constants/empresa';

import api from '../services/api';
import { useAuth } from '../hooks/auth';

interface ConfigProps {
  children: any;
}

type ConfigData = {
  configuracoes: any;
  setConfiguracoes: any;
  minhaLista: any;
  setMinhaLista: any;
  
};

export const ConfigContext = createContext({} as ConfigData);

function ConfigProvider({ children }: ConfigProps): JSX.Element {
  const { user } = useAuth();
  const [configuracoes, setConfiguracoes] = useState([]);
  const [minhaLista, setMinhaLista] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const buscaConfiguracao = async () => {

    try{
      const response = await api.post('base/',{
        cod_cliente: EMPRESA.cod_cliente
      });
      
      setConfiguracoes(response.data.data);
      console.log('config context')
    } catch(error: any) {
      Notifier.showNotification({
        title: 'Erro na autenticação',
        description: error.response.data.data.error,
        translucentStatusBar: true,
        duration: 3000,
        showAnimationDuration: 800,
        showEasing: Easing.bounce,
        onHidden: () => {},
        onPress: () => {},
        hideOnPress: true,
        Component: NotifierComponents.Alert,
        componentProps: {
          alertType: 'error',
        },
      });
    }
  };

  const buscaMinhaLista = async() => {
    
    console.log('buscaMinhaLista');
    let parametros = {
      rota: '/minhalista',
      parametros:{
        token: user.token
      },
      showNotification: false,
      showLogError: true,
    }
    const response =  await getData(parametros);
    setMinhaLista(response.data.data);
  }

  useLayoutEffect(()=>{

    if(loading){
      buscaConfiguracao();

      if(user){
        buscaMinhaLista();
      }
    }
    
    return() =>{
      setLoading(false)
    }
  },[
    loading,
    configuracoes,
    minhaLista
  ]);  

  
  return (
    <ConfigContext.Provider
      value={{
        configuracoes,
        setConfiguracoes,
        minhaLista,
        setMinhaLista
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

export default ConfigProvider;