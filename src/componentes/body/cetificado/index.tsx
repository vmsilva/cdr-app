import React, { useEffect } from "react";
import { View, TouchableOpacity, Linking } from "react-native";
import { Card, Button as ButtonPaper, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import styles from "./Styles";
import { Ionicons, MaterialCommunityIcons, Zocial } from "@expo/vector-icons";
import CustomText from "../../componentes/customText";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";
import DownloadButtonCertificado from "../../botoes/downloadButtonCertificado";

interface CertificadoProps {
  cod_certificado: any;
  cod_cliente: any;
  nome_certificado: any;
  data_criacao_certificado: any;
  status: "0|1";
  url_certificado: any;
  url_share_certificado: any;
}

interface Certificado {
  item: CertificadoProps;
}

const Certificado: React.FC<Certificado> = ({ item }) => {
  const url = encodeURIComponent(item.url_share_certificado);
  const link =  `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
  
  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: `93%`,
          }}
        >
          <MaterialCommunityIcons
            name="certificate"
            size={24}
            color={CustomDefaultTheme.colors.iconsPrimaryColor}
          />
          <CustomText
            //numberOfLines={2}
            style={{
              color: CustomDefaultTheme.colors.fontPrimaria,
              left: 10,
              width: "90%",
              //backgroundColor: '#FF0'
            }}
          >
            {item.nome_certificado}
          </CustomText>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() =>{ Linking.openURL(link); console.log(link)} //console.log(link)//
            }
          >
            <View
              style={{
                padding: 2,
                borderRadius: 99,
                width:  30,
                height:  30,
                backgroundColor: CustomDefaultTheme.colors.backgroundButtonLinkedin, // 
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Zocial
                name="linkedin"
                size={15}
                color={CustomDefaultTheme.colors.branco}
              />
            </View>
          </TouchableOpacity>
          <View style={{width: 5}}/>
          <DownloadButtonCertificado item={item} />
         
        </View>
      </View>
    </>
  );
};
export default Certificado;
