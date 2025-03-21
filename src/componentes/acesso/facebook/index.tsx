/* SDK 43 COM EXPO */
//import * as React, { useState } from 'react';
// Android 905736763733351 facebook
import React, { useState, useCallback, useContext } from "react";
import * as WebBrowser from "expo-web-browser";
import { TouchableOpacity, View, Text, Dimensions } from "react-native";
import * as Facebook from "expo-auth-session/providers/facebook";
import { ResponseType } from "expo-auth-session";
import { FontAwesome5 } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useAuth } from "../../../configuracoes/hooks/auth";
import api from "../../../configuracoes/services/api";

import Style from "./Styles";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";
import { Notifier, Easing, NotifierComponents } from "react-native-notifier";
import { UtilContext } from "../../../configuracoes/contexts/UtilContext";
import CustomText from "../../customText";
import { useNavigation } from "@react-navigation/native";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

WebBrowser.maybeCompleteAuthSession();

//https://github.com/thebergamo/react-native-fbsdk-next/

const FacebookLogin: React.FC<any> = ({ compartilhar }) => {
  const navigation = useNavigation() as any;
  const discovery = {
    authorizationEndpoint: "https://www.facebook.com/v9.0/dialog/oauth",
    tokenEndpoint: "https://graph.facebook.com/v9.0/oauth/access_token",
  };

  const config = {
    clientId: "905736763733351",
    scopes: [
      "public_profile",
      "email",
      "instagram_basic",
      "instagram_manage_insights",
      "pages_show_list",
    ],
    responseType: ResponseType.Token,
    extraParams: {
      // Use `popup` on web for a better experience
      // display: Platform.select({ web: 'popup' }) as string,
      // Optionally you can use this to rerequest declined permissions
      auth_type: "rerequest",
    },
  };

  const [isLoading, setIsLoading] = useState(false);
  const APPLEID = "905736763733351";
  const { signInFacebook } = useAuth();
  const { setLoadingLogin, deviceUniqueId } = useContext(UtilContext);
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: APPLEID,
    responseType: ResponseType.Token,
    scopes: ["public_profile"],
  });

  React.useEffect(() => {
    console.log("facebook teste leak", response);
    if (response?.type === "success") {
      const { code, access_token } = response.params;
      buscaDadosFacebook(access_token);
    }
    if (response?.type === "dismiss") {
      setIsLoading(false);
    }
    if (response?.type === "cancel") {
      setIsLoading(false);
    }

    //console.log(request, response, 'facebook');
  }, [response, request]);

  const buscaDadosFacebook = useCallback(
    async (token: any) => {
      setLoadingLogin(true);
      try {
        const response = await api.get(
          `https://graph.facebook.com/v13.0/me?fields=id%2Cname%2Cemail%2Cpicture&email&access_token=${token}`
        );
        const avatar_url = await api.get(
          `https://graph.facebook.com/v13.0/me/picture?width=500&height=500&access_token=${token}`
        );

        //console.log(avatar_url.config.url,'avatarrrrrrr')
        //return;
        await signInFacebook({
          avatar_url: avatar_url.config.url,
          id_facebook: response.data.id,
          email: response.data.email,
          acessToken_facebook: token,
          nome: response.data.name,
          rede_social: "facebook",
          device_id: deviceUniqueId,
        });
        handleNavigation();
      } catch (error) {
       console.log(error.response.data.data.error);
      }
      setLoadingLogin(false);
    },
    [signInFacebook]
  );

  const handleNavigation = () => {
    if (compartilhar.compartilhamento && compartilhar.compartilhamento != undefined) {
      navigation.navigate("PlayerPageDrawer", {
        item: compartilhar.item,
        posicao: 0,
        radio: false,
        titulo: compartilhar.titulo,
        queue: compartilhar.queue,
      });
    } else {
      navigation.navigate("HomeTab");
    }
  };

  return (
    <TouchableOpacity
      style={Style.facebookButton}
      onPress={() => {
        setIsLoading(true);
        promptAsync();
      }}
    >
      <Button
        loading={isLoading}
        style={[
          Style.facebookButton,
          {
            backgroundColor: CustomDefaultTheme.colors.facebookColor,
          },
        ]}
        icon={() => (
          <FontAwesome5 color={"#FFF"} size={wp("6")} name="facebook" />
        )}
      >
        {
          <>
            <CustomText style={Style.facebookText}>
              Entrar com facebook
            </CustomText>
          </>
        }
      </Button>
    </TouchableOpacity>
  );
};

export default FacebookLogin;

/* 

<Button
  title="Facebook Login"
  onPress={() => {
    logIn()
  }}
/>

*/
