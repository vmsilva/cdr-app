import React, { useCallback, useContext, useEffect, useState } from "react";
import { Platform, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import { ActivityIndicator, Button } from "react-native-paper";
import { WebView } from "react-native-webview";
import { Portal, Provider } from "react-native-paper";

// Config
import { CustomDefaultTheme } from "../../configuracoes/styles/Theme";

// Components
import PageHeader from "../../componentes/header";
import CustomText from "../../componentes/componentes/customText";
import { UtilContext } from "../../configuracoes/contexts/UtilContext";
import Loading from "../../componentes/funcionalidade/Loading";
import { useAuth } from "../../configuracoes/hooks/auth";

const WebSeeAppInterno: React.FC<any> = (props) => {
  const navigation = useNavigation() as any;
  const isFocused = useIsFocused();
  const {
    signInPlataformaWithToken,
  } = useAuth();
  const { LINK_REDE_SOCIAL_LOGIN } = useContext(UtilContext)
  const { url, titulo } = props.route.params;
  const [userInfo, setUserInfo] = useState<any>({});
  const [isLoading, setIsLoading] = useState<any>(false);
  const urlAuth = 'https://educaejug.tjgo.jus.br/custom/special-login/ejug/';
  //const urlAuth = LINK_REDE_SOCIAL_LOGIN.urlAuth;



  const userAgent = Platform.select({
    android:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    //"Mozilla/5.0 (Linux; Android 12; Pixel 5 Build/RQ1A.210205.003) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Mobile Safari/537.36",
      //"Mozilla/5.0 (Linux; Android 10; Android SDK built for x86) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36",
      //"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36",
    ios:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
  });

  const injectedJavaScript = `
    (function() {
      const targetUrl = '${urlAuth}';
      
      function captureResponse(response) {
        let responseClone = response.clone(); 
        responseClone.text().then(text => {
          try {
            const data = JSON.parse(text);
            window.ReactNativeWebView.postMessage(JSON.stringify({ url: response.url, data }));
          } catch (error) {
            window.ReactNativeWebView.postMessage(JSON.stringify({ error: 'Error parsing JSON from Fetch', details: error.message, text }));
          }
        });
        return response;
      }

      function captureHtmlContent() {
        const html = document.documentElement.outerHTML;
        window.ReactNativeWebView.postMessage(JSON.stringify({ url: window.location.href, html }));
      }

      const originalFetch = window.fetch;
      window.fetch = function(...args) {
        return originalFetch.apply(this, args).then(response => {
          if (response.url.startsWith(targetUrl)) {
            return captureResponse(response);
          }
          return response;
        });
      };

      const originalXHR = window.XMLHttpRequest.prototype.open;
      window.XMLHttpRequest.prototype.open = function(method, url) {
        this.addEventListener('load', function() {
          if (url.startsWith(targetUrl)) {
            try {
              const contentType = this.getResponseHeader('content-type');
              const responseText = this.responseText;
              if (contentType && contentType.includes('application/json')) { 
                const jsonResponse = JSON.parse(responseText);
                window.ReactNativeWebView.postMessage(JSON.stringify({ url, data: jsonResponse }));
              } else {
                window.ReactNativeWebView.postMessage(JSON.stringify({ url, data: responseText }));
              }
            } catch (e) {
              window.ReactNativeWebView.postMessage(JSON.stringify({ error: 'Error parsing XHR JSON', details: e.message, responseText: this.responseText }));
            }
          }
        });
        return originalXHR.apply(this, arguments);
      };

      window.addEventListener('load', () => {
        if (window.location.href.startsWith(targetUrl)) {
          captureHtmlContent();
        }
      });
    })();
    true;
  `;

  const injectedJavaScriptAndroid = `
    (function(){
      const targetUrl = '${urlAuth}';

      const originalFetch = window.fetch;
      const originalXHR = window.XMLHttpRequest.prototype.open;

      // Função para capturar o conteúdo HTML da página
      function captureHtmlContent() {
        const html = document.documentElement.outerHTML;
        //window.ReactNativeWebView.postMessage(html);
        window.ReactNativeWebView.postMessage(JSON.stringify({ url: window.location.href, html }));
      }

      // Atraso para garantir que o DOM esteja completamente carregado antes de tentar capturar o conteúdo
      setTimeout(() => {
       

        if (window.location.href.startsWith(targetUrl)) {
          window.ReactNativeWebView.postMessage("Script Executado Após Atraso");
          captureHtmlContent();
        }
      }, 100); 
    })();

    true;
  `;

  const extractJsonFromHtml = (html) => {
    const jsonMatch = html.match(/<pre.*?>(.*?)<\/pre>/);
    if (jsonMatch && jsonMatch[1]) {
      try {
        return JSON.parse(jsonMatch[1]);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    }
    return null;
  };

  const handleMessage = (event) => {
    try {
      const { url, data, html, error, text } = JSON.parse(event.nativeEvent.data);
      if (html) {
        
        const jsonData = extractJsonFromHtml(html);
        if (jsonData) {
          console.log('Captured JSON from HTML:', url, '\nData:', jsonData);
          setUserInfo(jsonData)
        } else {
          console.log('No JSON found in HTML from URL:', url);
        }
      } else if (error) {
        console.error('Error:', error, '\nResponse Text:', text);
      } else {
        console.log('Captured data from URL:', url, '\nData:', data);
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  };

  const onNavigationStateChange = (navState) => {
    //console.log('Navigated to URL:', navState.url);
    // Você pode adicionar lógica adicional para processar a URL aqui
  };

  const handleLoginUsuario = useCallback( async (data) => {
    try {
      setIsLoading(true);
      const resp = (await signInPlataformaWithToken({
        token: data.token, //a1808d75-7790-43d2-95e4-548cfb103dbf
      })) as any;

      console.log(resp.error, "error ->>> error");

      /*if (resp.error !== undefined) {
        if (containsHtmlTags(resp.error)) {
          setIsLoading(false);
          navigation.navigate("errorPageAuth", { erro: resp.error });
        } else {
          AlertNotfier({ tipo: "error", msg: resp.error });
        }
        setIsLoading(false);
        return;
      }*/

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  },[signInPlataformaWithToken])

  useEffect(() => {
    /*if(userInfo.K1 != undefined){
      navigation.navigate('loginAuth',{userInfo: userInfo});
    }*/

    if(userInfo.cod_usuario != undefined){
      handleLoginUsuario(userInfo);
    }
    
  },[userInfo,isFocused]);

  useEffect(() => {
    console.log(url, LINK_REDE_SOCIAL_LOGIN.urlAuth)

  },[LINK_REDE_SOCIAL_LOGIN, url])

  return (
    <>
      <PageHeader
        style={{
          backgroundColor: CustomDefaultTheme.colors.background,
        }}
        headerLeft={
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <View
              style={{
                backgroundColor: "#0000006b",
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                borderRadius: 199,
                paddingRight: 3,
              }}
            >
              <FontAwesome name="angle-left" size={27} color={CustomDefaultTheme.colors.branco} />
            </View>
          </TouchableOpacity>
        }
        titulo={titulo}
      />
      <Provider>
        <Portal>
          <WebView
            userAgent={userAgent}
            source={{ uri: url }}
            incognito={true}
            mixedContentMode="always"
            androidLayerType="hardware"
            mediaPlaybackRequiresUserAction={false}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            onMessage={handleMessage}
            injectedJavaScript={Platform.OS == 'ios' ? injectedJavaScript : injectedJavaScriptAndroid}
            onNavigationStateChange={onNavigationStateChange}
            style={{
              marginTop: hp("12"),
            }}
            renderLoading={() => (
              <View
                style={{
                  marginTop: hp("50"),
                  alignItems: "center",
                  height: hp("100"),
                }}
              >
                <ActivityIndicator
                  color={CustomDefaultTheme.colors.cinzaSecundario}
                  animating={true}
                  size="large"
                />
              </View>
            )}
            renderError={() => (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CustomText textType="bold" style={{ color: "#FFF" }}>
                  Não foi possível carregar.
                </CustomText>
                <Button onPress={() => navigation.goBack()} mode="contained" style={{backgroundColor: CustomDefaultTheme.colors.buttonPrimary}}>
                  <CustomText textType="bold" style={{ color: "#FFF" }}>
                    Voltar.
                  </CustomText>
                </Button>
              </View>
            )}
          />
        </Portal>
      </Provider>
      {isLoading && <Loading />}
    </>
  );
};

export default WebSeeAppInterno;
