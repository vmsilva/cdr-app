import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";
import { Platform } from "react-native";
import apiTv from "../services/apiTv";
import { AlertNotfier, containsHtmlTags } from "../utils/utils";
import { EMPRESA } from "../utils/constants";

interface AuthState {
  token: string;
  user: object | any;
  cliente: object | any;
  arrayEmpresasUsuario: object | any;
}

interface UpdateUser {
  dadosUpdate: any[];
}

interface SignInCredentials {
  email: string;
  senha: string;
  cod_cliente: any;
}

interface SignInCredentialsGoogle {
  id_google: any;
  acessToken_google: any;
  nome: any;
  rede_social: any;
  email: any;
  avatar_url: any;
  device_id: any;
}

interface SignInCredentialsFacebook {
  id_facebook: any;
  acessToken_facebook: any;
  nome: any;
  email: any;
  avatar_url: any;
  rede_social: any;
  device_id: any;
}
interface UserCredentials {
  tokenUsuario: string;
}

interface SignInCredentialsWithToken {
  token: any;
}

interface AuthContextData {
  user: any;
  token: string;
  cliente: any;
  arrayEmpresasUsuario: any;
  signIn(credentials: SignInCredentials): Promise<void>;
  signInPlataforma(credentials: SignInCredentials): Promise<void>;
  signInPlataformaWithToken(credentials: SignInCredentialsWithToken): Promise<void>; // com token do usuaio
  signInPlataformaSingle(credentials: SignInCredentials): Promise<void>;
  signInPlataformaSingleCasaFolha(credentials: any): Promise<void>;
  montaSessaoEmpresaUsuario(dados: any, dadosSelecionado: any): Promise<void>;
  signOut(): void;
  loadingProfile(credentials: UserCredentials): Promise<void>;
  reloadStorageData(): void;
  updateUser(update: any): Promise<void>;
  loading: boolean;

  // login com rede social via expo auth
  signInWithApple(): Promise<void>;
}

interface UserProps {
  id: number;
  nome: string;
  email: string;
  id_facebook: string;
  acessToken_facebook: string;
  id_google: string;
  acessToken_google: string;
  avatar_url: string;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoadding] = useState(true);

  // multilogin
  const signInPlataforma = useCallback(async ({ email, senha }) => {
    try {
      const response = await api.post(`/acessos/multilogin`, {
        email, //: "victormdots@gmail.com",
        senha, //: "102030",
        so: Platform.OS,
      });

      console.log(response.data.data);

      let theme = null;
      if (response.data.data.length > 0) {
        if (response.data.data.length == 1) {
          theme = (await buscaTheme(
            response.data.data[0].cliente.token
          )) as any;
        }

        await montaSessaoEmpresaUsuario(response.data.data, null, theme);
      }
      return response.data.data;
    } catch (error) {
      console.log(error.response.data.error, "--> login error");
      AlertNotfier({ tipo: "error", msg: error.response.data.error });
      return error.response;
    }
  }, []);

  // single login
  const signInPlataformaSingle = useCallback(async ({ email, senha }) => {
    try {
      
      console.log({
        cod_cliente: EMPRESA.EMPRESA.cod_cliente,
        email, //: "victormdots@gmail.com",
        senha, //: "102030",
        so: Platform.OS,
      }, 'acessos/login');

      const response = await api.post(`/acessos/login`, {
        cod_cliente: EMPRESA.EMPRESA.cod_cliente,
        email, //: "victormdots@gmail.com",
        senha, //: "102030",
        so: Platform.OS,
      });

      let theme = null;
      if (Object.values(response.data.data).length > 0) {
        theme = (await buscaTheme(
          EMPRESA.EMPRESA.token_cliente
        )) as any;

        await montaSessaoEmpresaUsuarioSingle(response.data.data, null, theme);
      }
      //console.log(response.data.data, 'login retorno retirar')
      return response.data.data;
    } catch (error) {
      console.log(error.response.data.error, "--> login error single", error.response);
      if(!containsHtmlTags(error.response.data.error)){
        AlertNotfier({ tipo: "error", msg: error.response.data.error });
      }
      return error.response;
    }
  }, []);

  const signInPlataformaSingleCasaFolha = useCallback(async ({ userInfo }) => { 
    try {

      const response = await api.post(`/acessos/customlogincasafolha`, {
        cod_cliente: EMPRESA.EMPRESA.cod_cliente,
        EMAIL: userInfo.email, //: "victormdots@gmail.com",
        K1: userInfo.k1, //: "102030",
        K2: userInfo.k2, //: "102030",
        so: Platform.OS,
      });

      let theme = null;
      if (Object.values(response.data.data).length > 0) {
        theme = (await buscaTheme(
          EMPRESA.EMPRESA.token_cliente
        )) as any;

        await montaSessaoEmpresaUsuarioSingle(response.data.data, null, theme);
      }
      return response.data.data;
      
    } catch (error) {
      console.log(error.response.data.error, "--> login error");
      if(!containsHtmlTags(error.response.data.error)){
        AlertNotfier({ tipo: "error", msg: error.response.data.error });
      }
      return error.response;
    }
  }, []);

  const signInPlataformaWithToken = useCallback(async ({ token }) => { 
    try {

      const response = await api.post(`/acessos/me`, {
        token: token,
        so: Platform.OS,
      });

      response.data.data.token = token;

      let theme = null;
      if (Object.values(response.data.data).length > 0) {
        theme = (await buscaTheme(
          EMPRESA.EMPRESA.token_cliente
        )) as any;

        await montaSessaoEmpresaUsuarioSingle(response.data.data, null, theme);
      }

      console.log(response.data.data, 'victor')
      return response.data.data;
      
    } catch (error) {
      console.log(error.response.data.error, "--> login error");
      if(!containsHtmlTags(error.response.data.error)){
        AlertNotfier({ tipo: "error", msg: error.response.data.error });
      }
      return error.response;
    }
  }, []);

  const buscaTheme = useCallback(async (token_cliente: any) => {
    try {
      let parametros = {
        rota: "/theme",
        parametros: {
          apikey: token_cliente,
        },
        showNotification: false,
        showLogError: true,
        showLog: true,
      };

      const response = await apiTv.post(parametros.rota, parametros.parametros);

      return response.data.data;
    } catch (error) {
      console.log(error, "--> busca configuracao empresa");
    }
  }, []);

  const montaSessaoEmpresaUsuario = useCallback(
    async (dados: any, dadosSelecionado: any = null, theme: any = null) => {
      try {
        const user = dadosSelecionado
          ? {
              nome: dadosSelecionado.usuario.nome,
              cod_usuario: dadosSelecionado.usuario.cod_usuario,
              email: dadosSelecionado.usuario.email,
              token: dadosSelecionado.usuario.token,
              departamentos: dadosSelecionado.usuario.departamentos,
              url_avatar: dadosSelecionado.usuario.url_avatar,
            }
          : {
              nome: dados[0].usuario.nome,
              cod_usuario: dados[0].usuario.cod_usuario,
              email: dados[0].usuario.email,
              token: dados[0].usuario.token,
              departamentos: dados[0].usuario.departamentos,
              url_avatar: dados[0].usuario.url_avatar,
              //contato: response.data.data.json.contato
            };

        const cliente = dadosSelecionado
          ? {
              cod_cliente: dadosSelecionado.cliente.cod_cliente,
              dominio: dadosSelecionado.cliente.dominio,
              nome: dadosSelecionado.cliente.nome,
              token: dadosSelecionado.cliente.token,
              layout: dadosSelecionado.layout,
              url_logo: dadosSelecionado.url_logo,
            }
          : {
              cod_cliente: dados[0].cliente.cod_cliente,
              dominio: dados[0].cliente.dominio,
              nome: dados[0].cliente.nome,
              token: dados[0].cliente.token,
              url_logo: dados[0].cliente.url_logo,
              layout: theme,
            };

        const token = dados[0].usuario.token;

        await AsyncStorage.multiSet([
          [`@${EMPRESA.EMPRESA.appName}:token`, token],
          [`@${EMPRESA.EMPRESA.appName}:user`, JSON.stringify(user)],
          [`@${EMPRESA.EMPRESA.appName}:cliente`, JSON.stringify(cliente)],
          [`@${EMPRESA.EMPRESA.appName}:arrayEmpresasUsuario`, JSON.stringify(dados)],
        ]);

        setData({ token, user, cliente, arrayEmpresasUsuario: dados });
      } catch (error) {
        console.log("montaSessaoEmpresaUsuario ->", error);
      }
    },
    []
  );

  const montaSessaoEmpresaUsuarioSingle = useCallback(
    async (dados: any, dadosSelecionado: any = null, theme: any = null) => {
      try { 

        //console.log(dados, dadosSelecionado, 'victor'); return

        const user = dadosSelecionado
          ? {
              nome: dadosSelecionado.usuario.nome,
              cod_usuario: dadosSelecionado.usuario.cod_usuario,
              email: dadosSelecionado.usuario.email,
              token: dadosSelecionado.usuario.token,
              departamentos: dadosSelecionado.usuario.departamentos,
              url_avatar: dadosSelecionado.usuario.url_avatar,
            }
          : {
              nome: dados.nome,
              cod_usuario: dados.cod_usuario,
              email: dados.email,
              token: dados.token,
              departamentos: dados.departamentos,
              url_avatar: dados.url_avatar,
              contato: dados.json.contato,
              cargo: dados.json.cargo ? dados.json.cargo: '', // aqui pode bugar
            };

        const cliente = dadosSelecionado
          ? {
              cod_cliente: dadosSelecionado.cliente.cod_cliente,
              dominio: dadosSelecionado.cliente.dominio,
              nome: dadosSelecionado.cliente.nome,
              token: dadosSelecionado.cliente.token,
              layout: dadosSelecionado.layout,
              url_logo: dadosSelecionado.url_logo,
            }
          : {
              cod_cliente : EMPRESA.EMPRESA.cod_cliente,
              token: EMPRESA.EMPRESA.token_cliente,
              dominio: EMPRESA.EMPRESA.dominio,
              nome: EMPRESA.EMPRESA.nome
            };

        const token = dados.token;

        console.log(cliente, ' montasessaoempresausuariosingle');
        

        await AsyncStorage.multiSet([
          [`@${EMPRESA.EMPRESA.appName}:token`, token],
          [`@${EMPRESA.EMPRESA.appName}:user`, JSON.stringify(user)],
          [`@${EMPRESA.EMPRESA.appName}:cliente`, JSON.stringify(cliente)],
          [`@${EMPRESA.EMPRESA.appName}:arrayEmpresasUsuario`, JSON.stringify(dados)],
        ]);

        console.log({ token, user, cliente, arrayEmpresasUsuario: dados }, 'Monta json usuario -->>>>>>');

        setData({ token, user, cliente, arrayEmpresasUsuario: dados });
      } catch (error) {
        console.log("montaSessaoEmpresaUsuarioSingle ->", error);
      }
    },
    []
  );

  const signOut = useCallback(async () => {
    try {
      console.log("remove");
      AsyncStorage.multiRemove([
        `@${EMPRESA.EMPRESA.appName}:token`,
        `@${EMPRESA.EMPRESA.appName}:user`,
        `@${EMPRESA.EMPRESA.appName}:cliente`,
        `@${EMPRESA.EMPRESA.appName}:arrayEmpresasUsuario`,
        `@${EMPRESA.EMPRESA.appName}:home`,
      ]);
      setData({} as AuthState);
    } catch (error) {
      console.log(error, "logout bugggggg");
    }
  }, []);

  const updateUser = useCallback(async (DadosAtualizados) => {
    try {
      await AsyncStorage.removeItem(`@${EMPRESA.EMPRESA.appName}:user`);

      await AsyncStorage.setItem(
        `@${EMPRESA.EMPRESA.appName}:user`,
        JSON.stringify(DadosAtualizados)
      );

      await reloadStorageData();

      let token = DadosAtualizados.token;
      let user = DadosAtualizados;

      //setData({ token, user });
    } catch (error) {
      console.log(error);
    }
  }, []);

  async function reloadStorageData(): Promise<void> {
    const [
      token,
      user,
      cliente,
      arrayEmpresasUsuario,
    ] = await AsyncStorage.multiGet([
      `@${EMPRESA.EMPRESA.appName}:token`,
      `@${EMPRESA.EMPRESA.appName}:user`,
      `@${EMPRESA.EMPRESA.appName}:cliente`,
      `@${EMPRESA.EMPRESA.appName}:arrayEmpresasUsuario`,
    ]);
    if (token[1] && user[1]) {
      setData({
        token: token[1],
        user: JSON.parse(user[1]),
        cliente: JSON.parse(cliente[1]),
        arrayEmpresasUsuario: JSON.parse(arrayEmpresasUsuario[1]),
      });
    }
  }

  const loadingProfile = useCallback(async ({ tokenUsuario }) => {
    try {
      const response = await api.post(`acessos/me`, { token: tokenUsuario });

      await AsyncStorage.removeItem(`@${EMPRESA.EMPRESA.appName}:user`);

      const user = {
        nome: response.data.data.nome,
        cod_usuario: response.data.data.cod_usuario,
        email: response.data.data.email,
        token: tokenUsuario,
        departamentos: response.data.data.departamentos,
        url_avatar: response.data.data.url_avatar,
        contato: response.data.data.json.contato,
      };

      const token = response.data.data.token;
      await AsyncStorage.setItem(`@${EMPRESA.EMPRESA.appName}:user`, JSON.stringify(user));
      const [
        cliente,
        arrayEmpresasUsuario,
      ] = await AsyncStorage.multiGet([
        `@${EMPRESA.EMPRESA.appName}:cliente`,
        `@${EMPRESA.EMPRESA.appName}:arrayEmpresasUsuario`,
      ]);

     
      setData({ token, user, cliente, arrayEmpresasUsuario });
    } catch (error) {
      console.log("auth erro ao atulaizar usuario", error);
    }
  }, []);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      console.log('loadStorageData   ')
      try {
        setLoadding(true);
        const [
          token,
          user,
          cliente,
          arrayEmpresasUsuario,
        ] = await AsyncStorage.multiGet([
          `@${EMPRESA.EMPRESA.appName}:token`,
          `@${EMPRESA.EMPRESA.appName}:user`,
          `@${EMPRESA.EMPRESA.appName}:cliente`,
          `@${EMPRESA.EMPRESA.appName}:arrayEmpresasUsuario`,
        ]);

        if (token[1] && user[1]) {
          setData({
            token: token[1],
            user: JSON.parse(user[1]),
            cliente: JSON.parse(cliente[1]),
            arrayEmpresasUsuario: JSON.parse(arrayEmpresasUsuario[1]),
          });

          api.defaults.headers.authorization = `Bearer ${token[1]}`;

          // axios intercep
          api.interceptors.response.use(
            (response) => {
              return response;
            },
            async (error) => {
              if (error.response.status === 401) {
                signOut();
              }
              return Promise.reject(error);
            }
          );
        }

        setLoadding(false);
      } catch (error) {
        console.log(error);
      }
    }

    loadStorageData();
  }, [signOut, loadingProfile]);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        token: data.token,
        cliente: data.cliente,
        arrayEmpresasUsuario: data.arrayEmpresasUsuario,
        loading,
        signInPlataforma,
        signInPlataformaWithToken,
        signInPlataformaSingle,
        signInPlataformaSingleCasaFolha,
        montaSessaoEmpresaUsuario,
        updateUser,
        signOut,
        loadingProfile,
        reloadStorageData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
