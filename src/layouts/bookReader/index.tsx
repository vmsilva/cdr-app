import React, { useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Pdf from "react-native-pdf";
import { View } from "react-native";
// component
import PageHeader from "../../componentes/header";

import Styles from "./Styles";
import StylesBoletim from "../boletim/Styles";
import { getData } from "../../configuracoes/services/request";
import { useAuth } from "../../configuracoes/hooks/auth";
import { CustomDefaultTheme } from "../../configuracoes/styles/Theme";
import { ActivityIndicator } from "react-native-paper";

const BookReader: React.FC<any> = (props) => {
  const navigation = useNavigation() as any;
  const isFocused = useIsFocused();
  const { user } = useAuth();
  const { item, pagina_origem } = props.route.params;

  const handleNavigation = () =>{
    if(pagina_origem == undefined){
      //navigation.goBack();

      navigation.navigate('HomeDrawer');
    }else{
      navigation.navigate(pagina_origem,{item:item})
    }
  }

  const COMPONENTEHEADER = () => {
    return (
      <PageHeader
        color={CustomDefaultTheme.colors.background}
        backgroundTransparent={false}
        headerLeft={
          <TouchableOpacity
            onPress={() => {handleNavigation()}}
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
        titulo={item.titulo_biblioteca}
        headerRight={
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                right: 10,
                marginRight: 10,
              }}
            ></View>
            <View
              style={{
                right: 0,
                marginTop: -5,
              }}
            ></View>
          </View>
        }
      />
    );
  };

  const hitBook = async () => {
    try {
     
      let parametros = {
        rota: `/biblioteca/hit/${item.cod_biblioteca}`,
        parametros: `token=${user.token}`,
        showNotification: false,
        showLogError: false,
      };
     
      const response = (await getData(parametros)) as any;

      console.log(response.data.data, parametros)
     
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    if(isFocused)
      hitBook();

    return () => {}
  },[isFocused])

  return (
    <>
      <View
        style={[StylesBoletim.headerContent]}
      >
        <COMPONENTEHEADER />
      </View>

      <View style={Styles.container}>
        <Pdf
          trustAllCerts={false}
          source={{
            uri: item.url_biblioteca,
            cache: true,
            }}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={(error) => {
            console.log(error);
          }}
          onPressLink={(uri) => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={Styles.pdf}
          //progressContainerStyle={{backgroundColor: CustomDefaultTheme.colors.text}}

          renderActivityIndicator={() => <ActivityIndicator size={40} color={CustomDefaultTheme.colors.buttonPrimary} />}

        />
      </View>
    </>
  );
};

export default BookReader;
