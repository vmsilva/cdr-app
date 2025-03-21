import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SimpleLineIcons } from "@expo/vector-icons";
import { ActivityIndicator, Button } from "react-native-paper";
import { WebView } from "react-native-webview";
import { Portal, Provider } from "react-native-paper";

// Config
import { CustomDefaultTheme } from "../../configuracoes/styles/Theme";

// Components
import PageHeader from "../../componentes/header";
import CustomText from "../../componentes/componentes/customText";

const WebSeeAppInterno: React.FC<any> = (props) => {
  const navigation = useNavigation();
  const { url, titulo } = props.route.params;

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
      <Provider>
        <Portal>
          <WebView
            source={{ uri: url }}
            incognito={true}
            mixedContentMode="always"
            androidLayerType="hardware"
            mediaPlaybackRequiresUserAction={false}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            style={{
              marginTop: hp("12"),
              backgroundColor: CustomDefaultTheme.colors.background,
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
                <Button onPress={() => navigation.goBack()} mode="contained">
                  <CustomText textType="bold" style={{ color: "#FFF" }}>
                    Voltar.
                  </CustomText>
                </Button>
              </View>
            )}
            onNavigationStateChange={(event) => {}}
          />
        </Portal>
      </Provider>
    </>
  );
};

export default WebSeeAppInterno;
