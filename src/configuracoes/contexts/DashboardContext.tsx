/*
  MUITA CALMA NESSA HORA API DE CONTEXTO ALTO RISCO DE MEMORY LEAK 
  CUIDADO COM LOOP INFINITO
  REMEMBER THAT
*/
import React, { useState, createContext, useLayoutEffect } from 'react';
import { useAuth } from '../hooks/auth';
import { postData, getData } from '../services/request';
import { EMPRESA } from '../utils/constants/empresa';

interface UtilProps {
  children: any;
}

type DashboardData = {
  dashBoard: any;
  setDashBoard: any;
  isLoading: any; 
  setIsLoading:any;
};

export const DashboardContext = createContext({} as DashboardData);

function DashboardProvider({ children }: UtilProps): JSX.Element {
  const [dashBoard, setDashBoard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function requestMontaHome(params, programa, tipo, grupo_nome) {
    try {

      const response = await postData(params);
      
      return { [programa]: response.data.data, [grupo_nome] : response.data.data};
    } catch (error) {
      return { [grupo_nome]: false};
    }
  }

  async function requestMontaHomeGet(params, programa, tipo, grupo_nome) {
    try {

      const response = await getData(params);
      //console.log(response.data.data, '<-----------||||||B',grupo_nome)
      return {  [grupo_nome]: response.data.data};
    } catch (error) {
      return { [grupo_nome]: false };
    }
  }

  const ARRAYALLREQUEST = async (OBJETOS: any) => {
    console.log(OBJETOS[0]);
    const promises = [
      //new Promise((resolve) => setTimeout(() => resolve('1000'), 1000)),
      ...OBJETOS[0].map((programa) => requestMontaHome( {
        rota: `/programas/${programa}`,
        parametros: {
          apikey_cliente: EMPRESA.token_cliente,
        },
        showNotification: false,
        showLogError: true,
      }, programa, 'post', 'programa')),
      ...OBJETOS[1].map((personalidade) => requestMontaHome( {
        rota: `/personalidades/grupo/${personalidade}`,
        parametros: `apikey_cliente=${EMPRESA.token_cliente}`,
        showNotification: false,
        showLogError: true,
      }, personalidade, 'post', 'personalidade')),
      ...OBJETOS[2].map((utilitarios) => requestMontaHomeGet( {
        rota: `/utilitarios/grupo/${utilitarios}`,
        parametros: `apikey_cliente=${EMPRESA.token_cliente}`,
        showNotification: false,
        showLogError: true,
      }, utilitarios, 'get','utilitarios')),
      new Promise((resolve) => {
        const resp = requestMontaHome( {
          rota: "/programas",
          parametros: `apikey_cliente=${EMPRESA.token_cliente}`,
          showNotification: false,
          showLogError: true,
        }, 'programas', 'post', 'programas_');  
        resolve(resp)
      }),
      new Promise((resolve) => {
        const resp = requestMontaHome( {
          rota: "/radios",
          parametros: {
            apikey_cliente: EMPRESA.token_cliente,
          },
          showNotification: false,
          showLogError: true,
        }, 'radios', 'post', 'radios');  
        resolve(resp)
      }),
      new Promise((resolve) => {
        const resp = requestMontaHomeGet( {
          rota: "/rankings/videos",
          parametros: `apikey_cliente=${EMPRESA.token_cliente}`,
          showNotification: false,
          showLogError: true,
        }, 'maisAssistidosVideos', 'get', 'maisAssistidosVideos');  
        resolve(resp)
      }),
      new Promise((resolve) => {
        const resp = requestMontaHomeGet( {
          rota: "/cameras",
          parametros: `apikey_cliente=${EMPRESA.token_cliente}`,
          showNotification: false,
          showLogError: true,
        }, 'cameras', 'get', 'cameras');  
        resolve(resp)
      }),
      new Promise((resolve) => {
        const resp = requestMontaHomeGet( {
          rota: "/rankings/programas",
          parametros: `apikey_cliente=${EMPRESA.token_cliente}`,
          showNotification: false,
          showLogError: true,
        }, 'maisAssistidosProgramas', 'get', 'maisAssistidosProgramas');  
        resolve(resp)
      }),
    ];
    
    Promise.all(promises).then((values) => {
      let arrayprograma = [];
      let arraypersonalidades = [];
      let arrayutilitarios = [];
      let arrayProgramas = [];
      let arraymaisAssistidosProgramas = [];
      let arraymaisAssistidosVideos = [];
      let arrayCameras = [];
      let arrayradios = [];


      values.map((item, index)=> {

        if(Object.values(item)[0].programa != undefined){
          //console.log(Object.values(item.programa)[0].cod_serie)
          arrayprograma.push({ [`${Object.values(item.programa)[0].cod_serie}`] : item.programa });
        }

        if(Object.values(item)[0].personalidades != undefined){
          arraypersonalidades.push({grupo: Object.values(item)[0].grupo, personalidades: Object.values(item)[0].personalidades});
        }

        if(Object.values(item)[0].utilitarios != undefined){
          arrayutilitarios.push({grupo: Object.values(item)[0].grupo, utilitarios: Object.values(item)[0].utilitarios});
        }

        if(item.cameras != undefined){
          arrayCameras = item.cameras;
        }

        if(item.programas_ != undefined){
          arrayProgramas = item.programas_;
        }
        if(item.maisAssistidosProgramas != undefined){
          arraymaisAssistidosProgramas = item.maisAssistidosProgramas;
        }
        if(item.maisAssistidosVideos != undefined){
          arraymaisAssistidosVideos = item.maisAssistidosVideos;
        }
        if(item.radios != undefined){
          arrayradios = item.radios;
        }

      })

      setDashBoard([
        {
          programas: arrayProgramas,
          programa: arrayprograma,
          top_programas: arraymaisAssistidosProgramas,
          top_videos: arraymaisAssistidosVideos,
          cameras: arrayCameras,
          radios: arrayradios,
          utilitario_grupo: arrayutilitarios,
          personalidade_grupo: arraypersonalidades,
        },
      ]); 

      //console.log(home, 'homeeeee')
      setIsLoading(false);
    });

  };

  useLayoutEffect(()=>{ 
    if(isLoading){

      //ARRAYALLREQUEST()
    }
    //console.log(isLoading)
  },[]);  

  return (
    <DashboardContext.Provider
      value={{
        dashBoard, setDashBoard,
        isLoading, setIsLoading
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export default DashboardProvider;