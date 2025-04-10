/*
  MUITA CALMA NESSA HORA API DE CONTEXTO ALTO RISCO DE MEMORY LEAK 
  CUIDADO COM LOOP INFINITO
  REMEMBER THAT
*/
import React, { useState, createContext, useEffect } from "react";
import DeviceInfo from "react-native-device-info";
import { useAuth } from "../hooks/auth";
import { postData, getData } from "../services/request";
import {
  getTEXT,
  montaArrayContinuarAssistindoAudio,
  montaArrayMinhaLista,
} from "../utils/utils";
import { EMPRESA } from "../utils/constants";

interface UtilProps {
  children: any;
}

type UtilData = {
  minhaLista: any;
  setMinhaLista: any;
  loadingUtil: any;
  setLoadingUtil: any;
  politicas: any;
  setPoliticas: any;
  aoVivo: any;
  setAoVivo: any;
  isTablet: any;
  setIsTablet: any;
  categorias: any;
  setCategorias: any;
  home: any;
  setHome: any;
  empresa: any;
  setEmpresa: any;
  TEXTO_PADRAO_COMPRA_PLANO_ANUAL: any;
  setTEXTO_PADRAO_COMPRA_PLANO_ANUAL: any;
  LINK_ASSINATURA: any;
  setLINK_ASSINATURA: any;
  like: any;
  setLike: any;
  disLike: any;
  setDisLike: any;
  pip: any;
  setPip: any;
  pipItem: any;
  setPipItem: any;
  biblioteca: any;
  setBiblioteca: any;
  destaques: any;
  setDestaques: any;
  minhaListaBook: any;
  setMinhaListaBook: any;
  assistidos: any;
  setAssistidos: any;
  base: any;
  setBase: any;
  setPlaylistsAudio: any;
  playlistsAudio: any;
  grupoPlaylistsAudio: any;
  setGrupoPlaylistsAudio: any;
  minhaListaAudio: any;
  setMinhaListaAudio: any;
  meusAudios: any;
  setMeusAudios: any;
  podcast: any;
  setPodcast: any;
  continuarAssistindoAudio: any;
  setContinuarAssistindoAudio: any;
  continuarAssistindo: any;
  setContinuarAssistindo: any;
  tvsAoVivo: any;
  setTvsAoVivo: any;
  reload: any;
  setReload: any;
  FLG_BOTOES_REDES_SOCIAIS: any;
  setFLG_BOTOES_REDES_SOCIAIS: any;
  FLG_BOTAO_ASSINE_AGORA: any;
  setFLG_BOTAO_ASSINE_AGORA: any;
  palestrantes: any;
  setPalestrantes: any;
  LINK_REDE_SOCIAL_LOGIN: any;
  setLINK_REDE_SOCIAL_LOGIN: any;
};

export const UtilContext = createContext({} as UtilData);
const TEMPOLOOPAOVIVO = 300000; // 5 minutos300000

function UtilProvider({ children }: UtilProps): JSX.Element {
  const { user, token, cliente, signOut } = useAuth();
  const [minhaLista, setMinhaLista] = useState([]);
  const [minhaListaBook, setMinhaListaBook] = useState([]);
  const [minhaListaAudio, setMinhaListaAudio] = useState([]);
  const [meusAudios, setMeusAudios] = useState([]);
  const [assistidos, setAssistidos] = useState([]);
  const [politicas, setPoliticas] = useState([]);
  const [loadingUtil, setLoadingUtil] = useState(true);
  const [aoVivo, setAoVivo] = useState([]);
  const [isTablet, setIsTablet] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [home, setHome] = useState<any>([]);
  const [empresa, setEmpresa] = useState<any>([]);
  const [base, setBase] = useState<any>([]);
  const [biblioteca, setBiblioteca] = useState<any>([]);
  const [playlistsAudio, setPlaylistsAudio] = useState<any>([]);
  const [grupoPlaylistsAudio, setGrupoPlaylistsAudio] = useState<any>([]);
  const [tvsAoVivo, setTvsAoVivo] = useState<any>([]);
  const [palestrantes, setPalestrantes] = useState<any>([]);
  const [
    TEXTO_PADRAO_COMPRA_PLANO_ANUAL,
    setTEXTO_PADRAO_COMPRA_PLANO_ANUAL,
  ] = useState<any>("");
  const [like, setLike] = useState<any>([]);
  const [disLike, setDisLike] = useState<any>([]);
  const [LINK_ASSINATURA, setLINK_ASSINATURA] = useState<any>("");
  const [pip, setPip] = useState<boolean>(false); // mudar para false
  const [pipItem, setPipItem] = useState<any>({
    width: 320,
    height: 250,
  });
  const [destaques, setDestaques] = useState([]);
  const [podcast, setPodcast] = useState([]);
  const [continuarAssistindoAudio, setContinuarAssistindoAudio] = useState([]);
  const [continuarAssistindo, setContinuarAssistindo] = useState([]);
  const [reload, setReload] = useState(false);
  const [FLG_BOTOES_REDES_SOCIAIS, setFLG_BOTOES_REDES_SOCIAIS] = useState<any>(
    0
  );
  const [FLG_BOTAO_ASSINE_AGORA, setFLG_BOTAO_ASSINE_AGORA] = useState<any>("");
  const [LINK_REDE_SOCIAL_LOGIN, setLINK_REDE_SOCIAL_LOGIN] = useState<any>({});

  const buscaHome = async () => {
    try {

      let parametrosBase = {
        rota: "/base/",
        parametros: {
          cod_cliente: EMPRESA.EMPRESA.cod_cliente,
        },
        showNotification: false,
        showLogError: true,
        showLog: true,
      };

      let parametros = {
        rota: "home/",
        parametros: {
          token: user.token,
        },
        showNotification: false,
        showLogError: true,
        showLog: true,
      }; 
      console.log(parametros)
      let parametrosPalestrantes = {
        rota: `home/itemsorting/palestrantes`,
        parametros: {
          token: user.token,
        },
        showNotification: false,
        showLogError: true,
        showLog: true,
      };

      const responseHomeBase = (await postData(parametrosBase)) as any;
      const response = (await postData(parametros)) as any;
      const responsePalestrantes = (await postData(
        parametrosPalestrantes
      )) as any;

      if (response.error) {
        alert("Sua Sessão expirou!");
        signOut();
        return;
      }

      console.log(parametrosPalestrantes, 'teste parametrooooo')
      setBase(responseHomeBase.data.data);
      setHome(response.data.data);
      setDestaques(response.data.data.destaques);
      console.log(response.data.data, '---->>> categoriassa');
      setCategorias(response.data.data.categorias);
      setPalestrantes(responsePalestrantes.data.data);
    } catch (error) {
      console.log(error, "))))))error");
    }
  };

  const buscaContinuarAssistindoAudio = async () => {
    //return;
    try {
      let parametros = {
        rota: "/playlists/continuarassistindo",
        parametros: `token=${user.token}`,
        showNotification: false,
        showLogError: true,
      };

      const response = (await getData(parametros)) as any;

      const ret = (await montaArrayContinuarAssistindoAudio(
        response.data.data
      )) as any;

      setContinuarAssistindoAudio(ret);
    } catch (error) {
      console.log(error, "--> continuar assistindo");
    }
  };

  const buscaContinuarAssistindo = async () => {
    //return;
    try {
      let parametros = {
        rota: "/videos/continuarassistindo",
        parametros: {
          token: user.token,
          token_cliente: cliente.token,
        },
        showNotification: false,
        showLogError: true,
      };

      const response = (await postData(parametros)) as any;
      setContinuarAssistindo(response.data.data);
    } catch (error) {
      console.log(error, "--> continuar assistindo");
    }
  };

  const buscaPlaylists = async () => {
    try {
      let parametros = {
        rota: "home/playlists",
        parametros: {
          token: user.token,
        },
        showNotification: false,
        showLogError: true,
      };

      let parametrosGrupos = {
        rota: "/home/gruposplaylists",
        parametros: {
          token: user.token,
        },
        showNotification: false,
        showLogError: true,
      };

      const response = (await postData(parametros)) as any;
      const responseGrupos = (await postData(parametrosGrupos)) as any;

      if (responseGrupos.data.data.length > 0) {
        setPodcast(
          responseGrupos.data.data.find(
            (objeto) => objeto.nome_grupo_playlist === "Podcast"
          ) || null
        );
      }

      /*console.log(
        "-->> victorrr",
        responseGrupos.data.data.find(
          (objeto) => objeto.nome_grupo_playlist === "Podcast"
        ) || null
      );*/

      //console.log(responseGrupos.data.data, 'busca grupo playlist audio', parametrosGrupos);
      setGrupoPlaylistsAudio(responseGrupos.data.data);
      setPlaylistsAudio(response.data.data);
    } catch (error) {
      console.log(error, "biblioteca digital");
    }
  };

  const buscaBibliotecaDigital = async () => {
    try {
      let parametros = {
        rota: "/biblioteca",
        parametros: {
          token: user.token,
        },
        showNotification: false,
        showLogError: true,
      };

      console.log(parametros, '<<--')

      const response = (await postData(parametros)) as any;
      setBiblioteca(response.data.data);
    } catch (error) {
      console.log(error, "biblioteca digital");
    }
  };

  const buscaLGPD = async () => {
    console.log(cliente);
    try {

      const RTTT = await getTEXT("FLG_BOTOES_REDES_SOCIAIS");
      //const RTTTASSINEAGOR = await getTEXT("FLG_BOTAO_ASSINE_AGORA");

      const LINK_LOGIN_FACEBOOK = await getTEXT("LINK_LOGIN_FACEBOOK");
      const LINK_LOGIN_GOOGLE = await getTEXT("LINK_LOGIN_GOOGLE");
      const LINK_LOGIN_APPLE = await getTEXT("LINK_LOGIN_APPLE");
      const URL_AUTH_RETORNO = await getTEXT("URL_AUTH_RETORNO");

      setLINK_REDE_SOCIAL_LOGIN({
        google: LINK_LOGIN_GOOGLE,
        facebook: LINK_LOGIN_FACEBOOK,
        apple: LINK_LOGIN_APPLE,
        urlAuth: URL_AUTH_RETORNO
      });

      setFLG_BOTOES_REDES_SOCIAIS(RTTT);
      //setFLG_BOTAO_ASSINE_AGORA(RTTTASSINEAGOR);

      let parametros = {
        rota: "/lgpd/",
        parametros: {
          cod_cliente: EMPRESA.EMPRESA.cod_cliente, //cliente.cod_cliente
        },
        showNotification: false,
        showLogError: true,
      };
      const response = (await postData(parametros)) as any;

      setPoliticas(response.data.data);
    } catch (error) {
      console.log(error, "ao vivo erro");
    }
  };

  const buscaAoVivo = async () => {
    if(!user){
      return
    }
    
    console.log("busca salas ao vivo", cliente);
    try {
      let parametros = {
        rota: "/salas",
        parametros: {
          //token_cliente: cliente.token,
          token_cliente: user.token,
          token: user.token,
        },
        showNotification: false,
        showLogError: true,
      };

      console.log(parametros, 'salas')

      const response = (await postData(parametros)) as any;

      setAoVivo(response.data.data);
      setTvsAoVivo(response.data.data);

      setTimeout(() => {
        buscaAoVivo();
      }, TEMPOLOOPAOVIVO);
    } catch (error) {
      console.log(error, "ao vivo erro");
    }
  };

  const buscaAssistidos = async () => {
    //console.log("busca minha lista");
    let parametros = {
      rota: "/videos/assistidos",
      parametros: `token=${user.token}`,
      showNotification: false,
      showLogError: true,
    };
    const response = (await getData(parametros)) as any;
    setAssistidos(response.data.data);
  };

  const buscaMinhaLista = async () => {
    try {
      //console.log("busca minha lista");
      let parametros = {
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
  };

  const buscaMinhaListaBook = async () => {
    let parametros = {
      rota: "/minhalista/biblioteca",
      parametros: `token=${user.token}`,
      showNotification: false,
      showLogError: true,
    };
    const response = (await getData(parametros)) as any;
    setMinhaListaBook(response.data.data);
  };

  const buscaMinhaListaAudio = async () => {
    try {
      let parametros = {
        rota: "/minhalista/playlistaudio",
        parametros: `token=${user.token}`,
        showNotification: false,
        showLogError: true,
      };
      const response = (await getData(parametros)) as any;

      let ret = (await montaArrayMinhaLista([
        response.data.data,
        "audio",
      ])) as any;

      setMeusAudios(ret);

      setMinhaListaAudio(response.data.data);
    } catch (error) {
      console.log(error, "<-- minha lista audio carregando");
    }
  };

  const EXECTUAMETODOS = async () => {
    try {
      setLoadingUtil(true);
      console.log("carregando tudo...........");
      await buscaHome();
      await buscaMinhaListaBook();
      await buscaMinhaListaAudio();
      await buscaMinhaLista();
      await buscaContinuarAssistindoAudio();
      await buscaContinuarAssistindo();
      await buscaBibliotecaDigital();
      await buscaPlaylists();
      await buscaAssistidos();

      console.log("Carregadoooo ...........");
      setLoadingUtil(false);
      setReload(false);
    } catch (error) {
      console.log(error, "--> executametodos error");
      setLoadingUtil(false);
    }
  };

  useEffect(() => {
    if (DeviceInfo.isTablet()) {
      setIsTablet(true);
    } else {
      setIsTablet(false);
    }

    buscaAoVivo();
    buscaLGPD();

    setTimeout(() => {
      setLoadingUtil(false);
    }, 3000);
  }, [user]);

  useEffect(() => {
    if (token) {
      EXECTUAMETODOS();
    }
  }, [token]);

  useEffect(() => {
    if (reload) {
      //alert(token)
      EXECTUAMETODOS();
    }
  }, [reload, token]);

  useEffect(() => {}, [assistidos]);

  useEffect(() => {}, [user]);

  useEffect(() => {}, [continuarAssistindoAudio]);

  return (
    <UtilContext.Provider
      value={{
        minhaLista,
        setMinhaLista,
        loadingUtil,
        setLoadingUtil,
        politicas,
        setPoliticas,
        aoVivo,
        setAoVivo,
        isTablet,
        setIsTablet,
        categorias,
        setCategorias,
        home,
        setHome,
        empresa,
        setEmpresa,
        TEXTO_PADRAO_COMPRA_PLANO_ANUAL,
        setTEXTO_PADRAO_COMPRA_PLANO_ANUAL,
        LINK_ASSINATURA,
        setLINK_ASSINATURA,
        like,
        setLike,
        disLike,
        setDisLike,
        pip,
        setPip,
        pipItem,
        setPipItem,
        biblioteca,
        setBiblioteca,
        destaques,
        setDestaques,
        minhaListaBook,
        setMinhaListaBook,
        assistidos,
        setAssistidos,
        base,
        setBase,
        setPlaylistsAudio,
        playlistsAudio,
        grupoPlaylistsAudio,
        setGrupoPlaylistsAudio,
        minhaListaAudio,
        setMinhaListaAudio,
        meusAudios,
        setMeusAudios,
        podcast,
        setPodcast,
        continuarAssistindoAudio,
        setContinuarAssistindoAudio,
        continuarAssistindo,
        setContinuarAssistindo,
        tvsAoVivo,
        setTvsAoVivo,
        reload,
        setReload,
        FLG_BOTOES_REDES_SOCIAIS,
        setFLG_BOTOES_REDES_SOCIAIS,
        FLG_BOTAO_ASSINE_AGORA,
        setFLG_BOTAO_ASSINE_AGORA,
        palestrantes,
        setPalestrantes,
        LINK_REDE_SOCIAL_LOGIN,
        setLINK_REDE_SOCIAL_LOGIN,
      }}
    >
      {children}
    </UtilContext.Provider>
  );
}

export default UtilProvider;
