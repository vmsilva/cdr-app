import React, { useCallback, useRef, useState, useEffect } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import FastImage from "react-native-fast-image";
import { SimpleLineIcons as SIcon, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// Config
import Styles, { Container } from "./styles";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

// Imagens
import LOGO from "../../../assets/logoAuth.png";
import LinearGradient from "react-native-linear-gradient";
import RenderHTML, {
  HTMLElementModel,
  HTMLContentModel,
} from "react-native-render-html";

const ErrorPage: React.FC<any> = (props) => {
  const navigation = useNavigation() as any;
  const { erro } = props.route.params;

  const COMPONENTEHEADER = () => {
    return (
      <>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 40,
            height: 40,
            marginTop: 50,
            marginLeft: 20,
          }}
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
      </>
    );
  };

  const tagsStyles = {
    h4: {
      color: "#FFF",
      textAlign: "center",
      fontSize: 14,
    },
    body: {
      whiteSpace: "normal",
      color: "gray",
    },
    a: {},
  };

  // The eponym prop to pass to RenderHTML
  const customHTMLElementModels = {
    a: HTMLElementModel.fromCustomModel({
      tagName: "a",
      mixedUAStyles: {
        width: "100%",
        borderRadius: 10,
        alignSelf: "center",
        backgroundColor: "blue",
        padding: 15,
      },
      contentModel: HTMLContentModel.block,
    }),
    p: HTMLElementModel.fromCustomModel({
      tagName: "p",
      mixedUAStyles: {
        textAlign: "center",
        color: "#999999",
        //backgroundColor: '#FF0'
      },
      contentModel: HTMLContentModel.block,
    }),
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        enabled
      >
        <LinearGradient
          start={{
            x: 0,
            y: Platform.OS == "ios" ? 0.15 : 0,
          }}
          end={{
            x: 0,
            y: Platform.OS == "ios" ? 0.99 : 0.99,
          }}
          colors={[
            CustomDefaultTheme.colors.gradiente1,
            CustomDefaultTheme.colors.gradiente2,
            CustomDefaultTheme.colors.gradiente2,
          ]}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              height: "100%",
            }}
          >
            <COMPONENTEHEADER />
            <Container>
              <View style={Styles.logoView}>
                <FastImage
                  style={Styles.logo}
                  source={LOGO}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </View>

              <RenderHTML
                contentWidth={400}
                source={{
                  html: erro,
                }}
                ignoredDomTags={["link"]}
                tagsStyles={tagsStyles}
                classesStyles={{
                  welcomeText: {
                    textAlign: "center",
                    color: "#999999",
                  },
                  btn: {
                    backgroundColor:
                      CustomDefaultTheme.colors.iconsPrimaryColor,
                    borderColor: "#FFF",
                    textAlign: "center", // Esta propriedade não é usada em React Native
                    color: "white",
                    fontSize: 14,
                    textDecorationLine: "none",
                  },
                  "btn-secundario": {
                    top: 10,
                    backgroundColor: CustomDefaultTheme.colors.transparent,
                    borderWidth: 1,
                    borderColor: "#FFF",
                    textAlign: "center", // Esta propriedade não é usada em React Native
                    color: "white",
                    fontSize: 14,
                    textDecorationLine: "none",
                  },
                }}
                customHTMLElementModels={customHTMLElementModels}
              />
            </Container>
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingView>
    </>
  );
};

export default ErrorPage;
