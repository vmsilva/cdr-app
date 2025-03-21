import React, { useState, useCallback, useContext } from "react";
import { TouchableOpacity } from "react-native";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '../../../configuracoes/hooks/auth'
import { Button } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import api from 'axios';

import styles from './Styles';
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";
import { UtilContext } from "../../../configuracoes/contexts/UtilContext";
import CustomText from "../../customText";

//https://react-native-google-signin.github.io/docs/install


WebBrowser.maybeCompleteAuthSession();

const GoogleLogin: React.FC<any> =  ({compartilhar}) => {
  const navigation = useNavigation() as any;
  const [isLoading, setIsLoading] = useState(false);
  const { signInGoogle } = useAuth();
  const { setLoadingLogin, deviceUniqueId } = useContext(UtilContext);

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: '220174046806-4viept47ohaonadp0k2nlrg1vqnbvt2r',
    androidClientId: '220174046806-83ut806nsn7sqaksjkp4bl163qbrtk2e',//220174046806-83ut806nsn7sqaksjkp4bl163qbrtk2e.apps.googleusercontent.com
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      setLoadingLogin(true);
      const { authentication } = response;
      logaGoogle(authentication.accessToken)
    }

    if (response?.type === "dismiss") {
      setIsLoading(false);
    }

    if (response?.type === "cancel") {
      setIsLoading(false);
    }

    return () => {}
  }, [response]);

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

  const logaGoogle = useCallback(async (token:any) => {
    setLoadingLogin(true);
    try{
      let userInfoResponse = await api.get('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${token}` },
      });


      loginPlataforma({
        id_google: userInfoResponse.data.id, 
        acessToken_google: token, 
        nome: userInfoResponse.data.name, 
        rede_social:"google", 
        email : userInfoResponse.data.email,
        avatar_url : userInfoResponse.data.picture,
        device_id: deviceUniqueId
      })

    }finally{
      setIsLoading(false);
    }
    setLoadingLogin(false);
  },[]);

  const loginPlataforma = useCallback(
    async (data: any) => {
      try {
        
        await signInGoogle(data);    
        
        if(compartilhar.compartilhamento)
          handleNavigation()

        setIsLoading(false);

      } catch (error : any) {
        console.log('erro ao tentar logar no google');
        setIsLoading(false);
      }
    },
    [signInGoogle],
  );

  return (
    <TouchableOpacity 
        style={styles.googleButton}
        onPress={() =>{
          setIsLoading(true);
          promptAsync();
          //handleNavigation()
        }}
      >
        
        <Button
        loading={isLoading}
        style={[
          styles.googleButton,
          {
            backgroundColor: CustomDefaultTheme.colors.googleColor,
          },
        ]}
        icon={() => (
          <FontAwesome5 color={"#FFF"} size={wp("6")} name="google" />
        )}
      >
        {
          <>
            <CustomText style={styles.googleText}>
              Entrar com google
            </CustomText>
          </>
        }
      </Button>
      </TouchableOpacity>
  );
};

export default GoogleLogin;