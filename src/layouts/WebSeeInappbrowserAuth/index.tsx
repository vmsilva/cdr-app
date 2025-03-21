import React, { useEffect, useState } from "react";
import { TouchableOpacity, Linking } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as WebBrowser from 'expo-web-browser';
//import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import { SimpleLineIcons } from "@expo/vector-icons";

// Config
import { CustomDefaultTheme } from "../../configuracoes/styles/Theme";

// Components
import PageHeader from "../../componentes/header";
import { EMPRESA } from "../../configuracoes/utils/constants";
import { getDeepLink } from "../../configuracoes/utils/utils";
import CustomText from "../../componentes/componentes/customText";

const WebSeeExpoWebBrowser: React.FC<any> = (props) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { url, titulo } = props.route.params;
  const [userInfo, setUserInfo] = useState<any>({});

  const urlAuth = 'https://educaejug.tjgo.jus.br/custom/special-login/ejug/';
  //const urlAuth = 'https://test.casafolha.folha.com.br/custom/special-login/casafolha/';

  const propsAuth = {};

  const propsDefault = {
    // Configurações adicionais para customizar o navegador embutido
    dismissButtonStyle: 'cancel',
    preferredBarTintColor: CustomDefaultTheme.colors.background,
    preferredControlTintColor: 'white',
    readerMode: true,
    animated: true,
    modalPresentationStyle: 'formSheet',
    modalTransitionStyle: 'coverVertical',
    modalEnabled: true,
    enableBarCollapsing: true,
    showTitle: true,
    toolbarColor: CustomDefaultTheme.colors.background,
    secondaryToolbarColor: 'black',
    forceCloseOnRedirection: false,
    hasBackButton: false,
    enableUrlBarHiding: true,
    enableDefaultShare: false,

    animations: {
      startEnter: 'slide_in_right',
      startExit: 'slide_out_left',
      endEnter: 'slide_in_left',
      endExit: 'slide_out_right'
    },
    headers: {
      'my-custom-header': 'my custom header value'
    }
  }

  useEffect(() => {
    const openInAppBrowser = async () => {
      //const deepLink = getDeepLink('callback')
      const deepLink = getDeepLink('')
      //const url = `https://my-auth-login-page.com?redirect_uri=${deepLink}`
      const url = `${urlAuth}?redirect_uri=${deepLink}`
      console.log(deepLink)
      try {
        if (await InAppBrowser.isAvailable()) {
          const result = await InAppBrowser.openAuth(urlAuth, deepLink, {
            // Configurações adicionais
            showTitle: false,
            enableUrlBarHiding: true,
            enableDefaultShare: false,
          });
  
          console.log(result, '--> result');
        } else { // Linking.openURL(url)
        }
      } catch (error) {
        //Linking.openURL(url)
      }
      /*try {
        if (await InAppBrowser.isAvailable()) {
          const result = await InAppBrowser.openAuth(urlAuth,EMPRESA.EMPRESA.uriScheme, propsAuth);

          console.log(result, 'InAppBrowser -->');
          // Verifique o resultado para ver se foi um sucesso ou se houve algum erro
        } else {
          alert(urlAuth)
          //Linking.openURL(urlAuth);
        }
      } catch (error) {
        console.error(error);
      }*/
    };

    if(isFocused){

      //openInAppBrowser();
      _handlePressButtonAsync();
    }
  }, [isFocused]);

  // Certifique-se de adicionar um listener para URLs quando a aplicação é aberta
  React.useEffect(() => {
    const handleOpenURL = (event) => {
      console.log('Open URL event:', event.url);
      const urlParams = new URLSearchParams(new URL(event.url).search);
      const authToken = urlParams.get('auth_token'); // Substitua 'auth_token' pelo parâmetro que você espera
      if (authToken) {
        console.log('Auth Token:', authToken);
        // Atualize o estado ou navegue para outra tela
      }
    };

    Linking.addEventListener('url', handleOpenURL);

    return () => {
      //Linking.removeEventListener('url', handleOpenURL);
    };
  }, []);

  useEffect(() => {
    if (userInfo.K1 !== undefined) {
      navigation.goBack();
    }
  }, [userInfo, isFocused]);

  useEffect(() => {
    const handleUrl = ({ url }) => {
      // Captura o URL de retorno e processa a resposta
      console.log("URL capturado:", url);
      // Extraia o código ou token do URL
      const token = url.split('token=')[1];
      if (token) {
        setUserInfo({ token });
        navigation.goBack();
      }
    };
  
    const subscription = Linking.addEventListener('url', handleUrl);
  
    return () => {
      subscription.remove();
    };
  }, []);

  const [result, setResult] = useState(null);

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync(urlAuth);
    setResult(result);
  };

  return (
    <>
      <PageHeader
        style={{
          backgroundColor: CustomDefaultTheme.colors.background,
        }}
        headerLeft={
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              marginLeft: -10,
              width: 50,
              height: 50,
            }}
          >
            <SimpleLineIcons name="arrow-left" size={25} color="#FFF" />
          </TouchableOpacity>
        }
        titulo={titulo}
      />

      <CustomText>{result && JSON.stringify(result)}</CustomText>
    </>
  );
};

export default WebSeeExpoWebBrowser;
