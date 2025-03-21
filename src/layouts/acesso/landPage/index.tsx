import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity
} from "react-native";
import { Button } from "react-native-paper";
import FastImage from "react-native-fast-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SimpleLineIcons as SIcon, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// Config
import Styles, { Container } from "./styles";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

// Components
import VersoesApp from "../../../componentes/versaoApp";
import Loading from "../../../componentes/funcionalidade/Loading";

// Imagens
import LOGOBRANCA from "../../../assets/logo_branco.png";
import CustomText from "../../../componentes/componentes/customText";
import LinearGradient from "react-native-linear-gradient";
import { useAuth } from "../../../configuracoes/hooks/auth";

const LandPage: React.FC = (props) => {
  const navigation = useNavigation() as any;
  const [loading, setLoading] = useState(false);
  const { signInPlataformaWithToken, signOut, user } = useAuth();


  return (
    <>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: CustomDefaultTheme.colors.background,
        }}
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
            CustomDefaultTheme.colors.bottomTab,
            CustomDefaultTheme.colors.bottomTab,
            CustomDefaultTheme.colors.bottomTab,
            CustomDefaultTheme.colors.preto,
          ]}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              height: "100%",
            }}
          >
            <Container>
              <View style={Styles.logoView}>
                <FastImage
                  style={Styles.logo}
                  source={LOGOBRANCA}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </View>
              <View
                style={{
                  bottom: 10,
                  //borderBottomWidth: 0.5,
                  borderBottomColor: CustomDefaultTheme.colors.primary,
                  width: wp("85"),
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  
                 //uppercase={false}
                  //loading={loading}
                  //disabled={loading}
                  style={{
                    backgroundColor: CustomDefaultTheme.colors.primaryButton,
                    padding: 14,
                    alignItems: 'center',
                    //height: 50,
                    //justifyContent: "center",
                    borderRadius: 10,
                    //borderWidth: 1,
                    //borderColor: CustomDefaultTheme.colors.primaryButton,
                  }}
                  /*contentStyle={{
                    borderRadius: 10,
                    height: 50,
                    padding: 1,
                  }}*/
                  //mode="contained"
                  onPress={() =>
                    navigation.navigate("WebSeeAuth", {
                      url:
                        "https://educaejug.tjgo.jus.br/custom/special-login/ejug/",
                      titulo: "Login",
                    })
                  }
                >
                  <CustomText
                    textType="montserratBold"
                    style={{
                      color: CustomDefaultTheme.colors.branco,
                      textAlign: 'center'
                    }}
                  >
                    ACESSO MAGISTRADOS(AS)
                    E SERVIDORES(AS)
                  </CustomText>
                </TouchableOpacity>

                <CustomText
                  textType="montserratExtraBold"
                  style={{
                    textAlign: "center",
                    top: 10,
                    letterSpacing: .3,
                    color: CustomDefaultTheme.colors.cinza
                  }}
                >
                  Para suporte ou troca de senha, entre em contato com a
                  Central: (62) 3216-2202
                </CustomText>
                {/*
              <CustomText
                textType="bold"
                style={{
                  textAlign: "center",
                  bottom: 2,
                  letterSpacing: 3,
                  marginTop: 10
                }}
              >
                NÃO TEM CADASTRO?
              </CustomText>
              <Button
                loading={loading}
                disabled={loading}
                style={{
                  backgroundColor: CustomDefaultTheme.colors.buttonPrimary,
                  height: 50,
                  justifyContent: "center",
                  borderRadius: 99,
                }}
                contentStyle={{ borderRadius: 30, height: 50, padding: 1 }}
                mode="contained"
                onPress={() => navigation.navigate('cadastrarAuth')
              }
              >
                <CustomText
                  style={{
                    color: CustomDefaultTheme.colors.branco,
                    fontWeight: "800",
                  }}
                >
                  Cadastre-se
                </CustomText>
              </Button>
              */}
              </View>
              <VersoesApp style={{ bottom: -100 }} />
            </Container>
          </ScrollView>
        </LinearGradient>
        {loading && <Loading />}
      </KeyboardAvoidingView>
    </>
  );
};

export default LandPage;
