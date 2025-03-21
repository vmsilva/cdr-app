import React, { useState, useCallback, useContext, useMemo, useEffect } from "react";
import { Linking, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import styles from "./Styles";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";
import CustomText from "../../componentes/customText";
import DeviceInfo from "react-native-device-info";

const GenericoRedesSociais: React.FC<any> = ({ redesocial, link }) => {
  const navigation = useNavigation() as any;

  useEffect(() => {
    console.log(link)
  },[link])

  const poolVerify = async () => {
    try {
      setTimeout(() => {
        poolVerify();
      }, 1000)
    } catch (error) {
      console.log(error, "erro hit");
    }
  };

  const getDeviceid = async () => {
    try {
      let id =  await DeviceInfo.getUniqueId();
      
      console.log(`${link}&device_id=${id}`)
      //poolVerify();
      Linking.openURL(`${link}&device_id=${id}`);
    } catch (error) {
      console.log(error, "erro hit");
    }
  };

  const BUTTONREDES = useMemo(() => {
    switch (redesocial) {
      case "google":
        return (
          <>
            <TouchableOpacity
              style={styles.googleButton}
              onPress={getDeviceid}
            >
              <Button
                uppercase={false}
                style={[
                  //styles.googleButton,
                  {
                    backgroundColor: CustomDefaultTheme.colors.googleColor,
                  },
                ]}
                icon={() => (
                  <FontAwesome5 color={"#000"} size={18} name="google" />
                )}
              >
                {
                  <>
                    <CustomText style={styles.googleText}>
                      {`   Continuar com Google `}
                    </CustomText>
                  </>
                }
              </Button>
            </TouchableOpacity>
          </>
        );
        break;
      case "apple":
        return (
          <>
            <TouchableOpacity
              style={styles.appleButton}
              onPress={getDeviceid}
            >
              <Button
                uppercase={false}
                style={[
                  //styles.appleButton,
                  {
                    // backgroundColor: CustomDefaultTheme.colors.appleColor,
                  },
                ]}
                icon={() => (
                  <FontAwesome5 color={"#000"} size={18} name="apple" />
                )}
              >
                {
                  <>
                    <CustomText style={styles.appleText}>
                      {`   Continuar com Apple `}
                    </CustomText>
                  </>
                }
              </Button>
            </TouchableOpacity>
          </>
        );
        break;
      case "facebook":
        return (
          <>
            <TouchableOpacity
              style={styles.facebookButton}
              onPress={getDeviceid}
            >
              <Button
                uppercase={false}
                style={[
                  //style.facebookButton,
                  {
                    backgroundColor: CustomDefaultTheme.colors.facebookColor,
                  },
                ]}
                icon={() => (
                  <FontAwesome5 color={"#FFF"} size={18} name="facebook" />
                )}
              >
                {
                  <>
                    <CustomText style={styles.facebookText}>
                      Continuar com Facebook
                    </CustomText>
                  </>
                }
              </Button>
            </TouchableOpacity>
          </>
        );

        break;
    }
  }, [link]);

  return <>{BUTTONREDES}</>;
};

export default GenericoRedesSociais;
