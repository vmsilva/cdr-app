import React, { useContext } from "react";
import { TouchableOpacity, ScrollView, View, Linking, Platform } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Dialog, Portal } from "react-native-paper";

// Config
import { CustomDefaultTheme } from "../../configuracoes/styles/Theme";
import { UtilContext } from "../../configuracoes/contexts/UtilContext";
import CustomText from "../componentes/customText";
import PortalComponente from "../funcionalidade/Portal";
import LinearGradient from "react-native-linear-gradient";

const PagePoliticaPrivacidade: React.FC<any> = ({
  paginaAnterior,
  headerRight,
  url,
}) => {
  const { politicas } = useContext(UtilContext);
  // lista em execucão
  const [visiblePoliticas, setVisiblePoliticas] = React.useState(false);

  const showDialogPoliticas = () => setVisiblePoliticas(true);
  const hideDialogPoliticas = () => setVisiblePoliticas(false);

  const handleOpenUrl = () => {
    Linking.openURL(url);
  };

  return (
    <>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: "transparent",
          marginTop: 2,
          marginBottom: 2,
          //width: 150
        }}
        onPress={() =>
          url == undefined ? showDialogPoliticas() : handleOpenUrl()
        }
      >
        <CustomText
          textType={"bold"}
          style={{
            fontSize: 10,
            color: CustomDefaultTheme.colors.fontPolitica,
            textAlign: 'justify'
          }}
        >
          Termos de Uso / Políticas de Privacidade
        </CustomText>
      </TouchableOpacity>

      {visiblePoliticas && (
        <PortalComponente
          children={
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
            <View style={{
              //backgroundColor: CustomDefaultTheme.colors.background
            }}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  backgroundColor: "transparent",
                  marginTop: hp("7"),
                  marginBottom: 20,
                }}
                onPress={() => hideDialogPoliticas()}
              >
                <CustomText textType={"bold"} style={{}}>
                  Fechar
                </CustomText>
              </TouchableOpacity>
              <ScrollView
                contentContainerStyle={{ paddingHorizontal: 24 }}
                showsHorizontalScrollIndicator={false}
                style={{
                  width: wp("100"),
                  //maxHeight: hp("74"),
                  //right: 40,
                }}
              >
                <CustomText
                  textType={"medium"}
                  style={{
                    color: CustomDefaultTheme.colors.branco,
                    padding: 20,
                  }}
                >
                  {politicas.politica_privacidade}
                </CustomText>
              </ScrollView>
            </View>
          </LinearGradient>
          }
        />
      )}
    </>
  );
};

export default PagePoliticaPrivacidade;

/*

<Portal
                theme={CustomDefaultTheme}
            >
                <Dialog 
                    style={{
                        flex: 1,
                        backgroundColor: CustomDefaultTheme.colors.background,
                    }} 
                    visible={visiblePoliticas} 
                    onDismiss={hideDialogPoliticas}
                >
                    <Dialog.ScrollArea>
                    <TouchableOpacity
                        style={{flexDirection:'row', justifyContent:'center',backgroundColor: 'transparent' ,marginTop: hp('5'), marginBottom: 20}}
                        onPress={() => hideDialogPoliticas()}
                    >
                        <CustomText 
                            textType={'bold'} style={{}}
                        >
                            Fechar
                        </CustomText>
                    </TouchableOpacity>
                    <ScrollView 
                        contentContainerStyle={{paddingHorizontal: 24}}
                        showsHorizontalScrollIndicator={false}
                        style={{
                            width: wp('100'),
                            maxHeight: hp('74'),
                            right: 40
                        }}
                    >
                        
                        <CustomText 
                            textType={'medium'}
                            style={{color: CustomDefaultTheme.colors.branco, padding: 20}}
                        >
                        {politicas.politica_privacidade}
                        </CustomText>
                    </ScrollView>
                    </Dialog.ScrollArea>
                </Dialog>
            </Portal>

*/
