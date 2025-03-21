/* SDK 43 COM EXPO */
import React, { useState, useCallback, useContext } from "react";
import { SignInWithAppleButton } from 'react-native-apple-authentication'
import { TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useAuth } from "../../../configuracoes/hooks/auth";

import styles from "./Styles";
import { Button } from "react-native-paper";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";
import { UtilContext } from "../../../configuracoes/contexts/UtilContext";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../../componentes/customText";

//WebBrowser.maybeCompleteAuthSession();
//https://www.npmjs.com/package/react-native-apple-authentication

const AppleLogin: React.FC<any> = ({ compartilhar }) => {
  const navigation = useNavigation() as any;
  const [isLoading, setIsLoading] = useState(false);
  //const { setLoadingLogin, deviceUniqueId } = useContext(UtilContext);
  //const { signInWithApple } = useAuth();

  const appleSignIn = (result) => {
    console.log('Resssult',result);
  };

  return(
    <View style = {styles.container}>
     {SignInWithAppleButton({
          buttonStyle: styles.appleButton, 
          callBack: appleSignIn,
          buttonText: <><FontAwesome5 color={"#000"} size={24} name="apple" /> Entrar com apple</>,
          textStyle: styles.appleText
        })}
    </View>)

  /*const handleNavigation = () => {
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

  const handleEntrarApple = useCallback(async () => {
    try {
      setIsLoading(true);

      //let usuario = await signInWithApple({device_id:deviceUniqueId});
      handleNavigation();
    } catch (error) {
      console.log(error);
      
    }finally{
      setIsLoading(false);
    }
  }, [signInWithApple]);


  return (
    <TouchableOpacity
      style={styles.appleButton}
      onPress={() => {
        handleEntrarApple();
      }}
    >
      <Button
        loading={isLoading}
        style={[
          styles.appleButton,
          {
            backgroundColor: CustomDefaultTheme.colors.appleColor,
          },
        ]}
        icon={() => <FontAwesome5 color={"#FFF"} size={24} name="apple" />}
      >
        {
          <>
            <CustomText style={styles.appleText}>Entrar com Apple</CustomText>
          </>
        }
      </Button>
    </TouchableOpacity>
  ); */
};

export default AppleLogin;
