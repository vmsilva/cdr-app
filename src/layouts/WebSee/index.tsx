import React from "react";
import { View } from "react-native";
import { Title, ActivityIndicator, Button } from "react-native-paper";
import { WebView } from "react-native-webview";
// import { Container } from './styles';

const WebSee: React.FC<any> = ({ route, navigation }) => {
  const { url } = route.params;

  return (
    <WebView
      incognito={true}
      source={{ uri: url }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      startInLoadingState={true}
      renderLoading={() => (
        <View style={{ flex: 1, alignItems: "center" }}>
          <ActivityIndicator animating={true} size="large" />
        </View>
      )}
      renderError={() => (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Title>Não foi possível carregar a página.</Title>
          <Button onPress={() => navigation.goBack()} mode="contained">
            Voltar para o Aplicativo
          </Button>
        </View>
      )}
    />
  );
};

export default WebSee;
